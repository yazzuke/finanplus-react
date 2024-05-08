  import React, { useState, useEffect } from "react";
  import { Card, CardHeader, useDisclosure } from "@nextui-org/react";
  import ModalNieve from "./components/ModalNieve";
  import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
  import { useTheme } from 'next-themes';

  function BolaDeNieve({ userId }) {
    // console.log("userId:", userId);

    const [gastoMenor, setGastoMenor] = useState(null);
    const [todosLosGastos, setTodosLosGastos] = useState([]); 
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { theme } = useTheme(); 

    useEffect(() => {
      const fetchGastosMenores = async () => {
        // URL de los endpoints
        const gastosFijosUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos`;
        const tarjetasCreditoUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;

        try {
          // Obtiene los datos de ambos endpoints
          const [gastosFijosResponse, tarjetasCreditoResponse] =
            await Promise.all([fetch(gastosFijosUrl), fetch(tarjetasCreditoUrl)]);
      
          const gastosFijosData = await gastosFijosResponse.json();
          const tarjetasCreditoData = await tarjetasCreditoResponse.json();
      
          // Filtra los gastos fijos que no están pagados
          const gastosFijosNoPagados = gastosFijosData.flatMap((gasto) => gasto.gastos).filter(gasto => !gasto.pagado);
      
          // Combina los arrays de gastos en un solo array
          const todosLosGastos = [
            ...gastosFijosNoPagados,
            ...tarjetasCreditoData.flatMap((tarjeta) => tarjeta.gastos),
          ];
      
          // Encuentra el gasto con el valor más bajo
          if (todosLosGastos.length > 0) {
            const menor = todosLosGastos.reduce((min, gasto) =>
              gasto.valorTotalGasto < min.valorTotalGasto ? gasto : min
            );
            todosLosGastos.sort((a, b) => a.valorTotalGasto - b.valorTotalGasto);
            setGastoMenor(menor);
            setTodosLosGastos(todosLosGastos);
      
            //  console.log("Gasto menor:", menor);
          }
        } catch (error) {
          console.error("Error al obtener los gastos:", error);
        }
      };

      if (userId) {
        fetchGastosMenores();
      }
    }, [userId]);


    
    return (
      
      <Card className={`bg-${theme === 'light' ? 'white' : '23272f'} text-${theme === 'light' ? 'black' : 'white'} shadow-none dark w-[1000px] h-[55px] ml-32 `} style={{ backgroundColor: theme === 'light' ? '#E8E2E2' : '#23272F' }}>
        <CardHeader className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
              Método Bola de Nieve
            </span>
            <InfoOutlinedIcon
              className="ml-1 mt-[3px] cursor-pointer"
              onClick={onOpen}
            />
            {gastoMenor && (
              <span className="ml-4">
                Gasto Menor: {gastoMenor.nombreGasto} - $
                {gastoMenor.valorTotalGasto}
              </span>
            )}
          </div>
        </CardHeader>

        <ModalNieve
          isOpen={isOpen}
          onClose={() => onOpenChange(false)}
          todosLosGastos={todosLosGastos} 
        />
      </Card>
    );
  }

  export default BolaDeNieve;
