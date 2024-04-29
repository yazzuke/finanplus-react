  import React, { useRef, useEffect, useState } from 'react';
  import * as echarts from 'echarts';

  const BarChart = ({ userId }) => {
    const chartRef = useRef(null);
    const [dataMeses, setDataMeses] = useState([]);

    useEffect(() => {
      const fetchResumenMensual = async () => {
        const url = `http://localhost:8080/usuarios/${userId}/resumenmensual/totales`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          setDataMeses(data);
        } catch (error) {
          console.error("Error al obtener resumen mensual:", error);
        }
      };

      if (userId) {
        fetchResumenMensual();
      }
    }, [userId]);

    useEffect(() => {
      if (chartRef.current && dataMeses.length > 0) {
        const myChart = echarts.init(chartRef.current);

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            top: '2%',
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold'
            },
            
            data: ['Ingresos', 'Gastos']
          },
          
          xAxis: {
            type: 'category',
            data: dataMeses.map(item => `${item.year}-${item.month}`),
            axisLabel: {
              rotate: 0
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Ingresos',
              type: 'bar',
              data: dataMeses.map(item => item.totalIngresos)
            },
            {
              name: 'Gastos',
              type: 'bar',
              data: dataMeses.map(item => item.totalGastos)
            }
          ]
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose(); // Asegura la limpieza al desmontar el componente
        };
      }
    }, [dataMeses]);

    return <div className="flex items-center " ref={chartRef} style={{ width: '1500px', height: '430px' }}></div>;
  };

  export default BarChart;
