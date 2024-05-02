import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";

const CombinedCharts = ({ userId, currentDate }) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [dataMeses, setDataMeses] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    const fetchResumenMensual = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const url = `http://localhost:8080/usuarios/${userId}/resumenmensual/fecha?year=${year}&month=${month}`;

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
      const gastosFijosUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos`;
      const tarjetasCreditoUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;
      const ahorrosUrl = `http://localhost:8080/usuarios/${userId}/ahorros`;
      const gastosDiariosUrl = `http://localhost:8080/usuarios/${userId}/gastosdiario`;
      const gastosVariablesUrl = `http://localhost:8080/usuarios/${userId}/gastosvariables`;

      try {
        const [
          gastosFijosResponse,
          tarjetasCreditoResponse,
          ahorrosResponse,
          gastosDiariosResponse,
          gastosVariablesResponse,
        ] = await Promise.all([
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

        const todosLosGastosYAhorros = [
          ...gastosFijosData.flatMap((gasto) => gasto.gastos),
          ...tarjetasCreditoData.flatMap((tarjeta) => tarjeta.gastos),
          ...ahorrosData,
          ...gastosDiariosData.flatMap((gasto) => gasto.gastos),
          ...gastosVariablesData.flatMap((gasto) => gasto.gastos),
        ];

        const contadorCategorias = todosLosGastosYAhorros.reduce(
          (acc, item) => {
            const tipo = item.tipo || item.categoria;
            acc[tipo] = (acc[tipo] || 0) + 1;
            return acc;
          },
          {}
        );

        const categoriasData = Object.keys(contadorCategorias).map((key) => ({
          name: key,
          value: contadorCategorias[key],
        }));

        setDataCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener los gastos y ahorros:", error);
      }
    };

    if (userId) {
      fetchResumenMensual();
      fetchGastosYAhorros();
    }
  }, [userId]);

  useEffect(() => {
    if (barChartRef.current && dataMeses.length > 0) {
      const myChart = echarts.init(barChartRef.current);
  
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
          data: ['Ingresos', 'Gastos', 'Balance']
        },
        xAxis: {
          type: 'category',
          data: ['Gráficas del mes'],
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
            data: [dataMeses[0].totalIngresos], // Solo se muestra el dato del mes actual
            color: '#B68736'
          },
          {
            name: 'Gastos',
            type: 'bar',
            data: [dataMeses[0].totalGastos], // Solo se muestra el dato del mes actual
            color: '#ff6b81' 
          },
          {
            name: 'Balance',
            type: 'bar',
            data: [dataMeses[0].balance], // Solo se muestra el dato del mes actual
            color: '#3498db' 
          }
        ]
      };
  
      myChart.setOption(option);
  
      return () => {
        myChart.dispose();
      };
    }
  }, [dataMeses]);
  

  useEffect(() => {
    if (pieChartRef.current && dataCategorias.length > 0) {
      const myChart = echarts.init(pieChartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "7%",
          left: "center",
          textStyle: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        series: [
          {
            name: "Gastos por Categoría",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: dataCategorias,
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [dataCategorias]);

  return (
    <div>
      <div
        className="flex items-center"
        ref={barChartRef}
        style={{ width: "640px", height: "400px", left: "200px", top: "15px" }}
      ></div>
      <div
        className=""
        ref={pieChartRef}
        style={{
          width: "600px",
          height: "400px",
          right: "400px",
          position: "absolute",
          top: "2px",
        }}
      ></div>
    </div>
  );
};

export default CombinedCharts;
