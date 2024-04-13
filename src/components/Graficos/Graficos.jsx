import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ userId }) => {
  const chartRef = useRef(null);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      // URLs de los endpoints
      const gastosFijosUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos`;
      const tarjetasCreditoUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;

      try {
        // Obtiene los datos de ambos endpoints
        const [gastosFijosResponse, tarjetasCreditoResponse] = await Promise.all([
          fetch(gastosFijosUrl),
          fetch(tarjetasCreditoUrl),
        ]);

        const gastosFijosData = await gastosFijosResponse.json();
        const tarjetasCreditoData = await tarjetasCreditoResponse.json();

        // Combina los arrays de gastos en un solo array
        const todosLosGastos = [
          ...gastosFijosData.flatMap(gasto => gasto.gastos),
          ...tarjetasCreditoData.flatMap(tarjeta => tarjeta.gastos),
        ];

        // Cuenta la cantidad de gastos por categoría
        const contadorCategorias = todosLosGastos.reduce((acc, { tipo }) => {
          acc[tipo] = (acc[tipo] || 0) + 1; // Incrementa el contador por cada tipo
          return acc;
        }, {});

        // Transforma el contador en un formato adecuado para ECharts
        const categoriasData = Object.keys(contadorCategorias).map(key => ({
          name: key,
          value: contadorCategorias[key]
        }));

        setDataCategorias(categoriasData);
        console.log("Categorías:", categoriasData);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    if (userId) {
      fetchGastos();
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



  return <div ref={chartRef} style={{ width: '600px', height: '400px' }}></div>;
};

export default PieChart;
