import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ userId }) => {
  const chartRef = useRef(null);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    const fetchResumenMensual = async () => {
      const year = currentDate.getFullYear(); 
      const month = currentDate.getMonth() + 1;
      const url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/resumenmensual/fecha?year=${year}&month=${month}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setDataMeses(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener resumen mensual:", error);
      }
    };

    const fetchGastosYAhorros = async () => {
      const gastosFijosUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosfijos`;
      const tarjetasCreditoUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito`;
      const ahorrosUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/ahorros`;
      const gastosDiariosUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosdiario`;
      const gastosVariablesUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosvariables`;

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
          top: '7%',
          left: 'center',
          
          textStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
          }
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
