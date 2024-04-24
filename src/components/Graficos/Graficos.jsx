import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ userId }) => {
  const chartRef = useRef(null);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    const fetchGastosYAhorros = async () => {
      // URLs de todos los endpoints incluyendo gastos diarios y gastos variables
      const gastosFijosUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos`;
      const tarjetasCreditoUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;
      const ahorrosUrl = `http://localhost:8080/usuarios/${userId}/ahorros`;
      const gastosDiariosUrl = `http://localhost:8080/usuarios/${userId}/gastosdiario`;
      const gastosVariablesUrl = `http://localhost:8080/usuarios/${userId}/gastosvariables`;

      try {
        // Obtiene los datos de los cinco endpoints
        const [gastosFijosResponse, tarjetasCreditoResponse, ahorrosResponse, gastosDiariosResponse, gastosVariablesResponse] = await Promise.all([
          fetch(gastosFijosUrl),
          fetch(tarjetasCreditoUrl),
          fetch(ahorrosUrl),
          fetch(gastosDiariosUrl),  
          fetch(gastosVariablesUrl),
        ]);

        const gastosFijosData = await gastosFijosResponse.json();
        const tarjetasCreditoData = await tarjetasCreditoResponse.json();
        const ahorrosData = await ahorrosResponse.json();
        const gastosDiariosData = await gastosDiariosResponse.json();
        const gastosVariablesData = await gastosVariablesResponse.json();
        console.log(tarjetasCreditoData); 
        // Combina los arrays de gastos y ahorros en un solo array
        const todosLosGastosYAhorros = [
          ...gastosFijosData.flatMap(gasto => gasto.gastos),
          ...tarjetasCreditoData.flatMap(tarjeta => tarjeta.gastos),
          ...ahorrosData,
          ...gastosDiariosData.flatMap(gasto => gasto.gastos),
          ...gastosVariablesData.flatMap(gasto => gasto.gastos),
       
        ];
    
         // console.log("Gastos y ahorros:", todosLosGastosYAhorros);
        // Cuenta la cantidad de gastos y ahorros por categoría
        const contadorCategorias = todosLosGastosYAhorros.reduce((acc, item) => {
          const tipo = item.tipo || item.categoria; // Ajusta según la estructura de los datos
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        // Transforma el contador en un formato adecuado para ECharts
        const categoriasData = Object.keys(contadorCategorias).map(key => ({
          name: key,
          value: contadorCategorias[key]
        }));

        setDataCategorias(categoriasData);
       // console.log("Gastos y ahorros por categoría:", categoriasData);
      } catch (error) {
        console.error("Error al obtener los gastos y ahorros:", error);
      }
    };

    if (userId) {
      fetchGastosYAhorros();
    }
  }, [userId]);



  useEffect(() => {
    if (chartRef.current && dataCategorias.length > 0) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'item',
          // Usar un formatter para mostrar el porcentaje
          formatter: '{a} <br/>{b} : {c} ({d}%)',
            
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Gastos por Categoría',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: dataCategorias
          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose(); // Asegura la limpieza al desmontar el componente
      };
    }
  }, [dataCategorias]);



  return <div className="" ref={chartRef} style={{ width: '600px', height: '400px' }}></div>;
};

export default PieChart;
