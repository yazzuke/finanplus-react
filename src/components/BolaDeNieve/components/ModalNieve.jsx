import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import snowballGif from "../../../assets/ModalSnowball.gif";
import { useState } from "react";

const ModalNieve = ({ isOpen, onClose, todosLosGastos }) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleToggleInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  console.log("todosLosGastos:", todosLosGastos);

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#0e294b]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#faefef] ",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-start items-center">
                <span>El método bola de nieve</span>
                <img
                  src={snowballGif} // Asegúrate de que la ruta al archivo es correcta
                  alt="Bola de nieve"
                  className="w-10 h-50 mt-1" // Ajusta el tamaño como necesites
                />
              </ModalHeader>
              <ModalBody>
                {!showAdditionalInfo ? (
                  <>
                    <span className="text-lg font-bold">
                      ¿Por qué se le llama “bola de nieve”?
                    </span>
                    <p className="text-sm">
                      Como una bola de nieve que crece al rodar cuesta abajo,
                      las deudas pueden aumentar al acumularse con más compras y
                      el agregado constante de intereses. Con el método de bola
                      de nieve, enfrentas este crecimiento pagando deudas de
                      menor a mayor, liberándote poco a poco de la presión
                      financiera. Este enfoque te motiva a continuar, creciendo
                      tu capacidad de pago a medida que reduces tus deudas, una
                      por una.
                    </p>
                    <Divider />
                    <span className="text-lg font-bold">
                      Implementando el método
                    </span>
                    <p className="text-sm">
                      Este método se enfoca en liquidar deudas empezando por la
                      más pequeña, independientemente de sus intereses, para
                      luego seguir en orden ascendente. Aquí te mostramos cómo
                      aplicarlo en 4 sencillos pasos:
                      <br />
                      <ul className="list-disc text-sm mt-1">
                        <li>
                          Presupuesta: Analiza tus ingresos y egresos para
                          determinar cuánto puedes pagar de tus deudas cada mes.
                        </li>
                        <li>
                          Ordena tus deudas: Enumera tus deudas desde la menor a
                          la mayor cantidad adeudada.
                        </li>
                        <li>
                          Comienza a pagar: Dedica lo más que puedas a saldar la
                          deuda menor mientras mantienes los pagos mínimos en
                          las demás.
                        </li>
                        <li>
                          Continúa el ciclo: Tras saldar una deuda, redirige
                          esos fondos a la siguiente, aumentando progresivamente
                          tu capacidad de pago.
                        </li>
                      </ul>
                    </p>
                  </>
                ) : (
                  <div>
                    {/* Cuerpo al pasar de contenido */}
                    <span>
                      Contenido adicional relacionado con el método bola de
                      nieve.
                    </span>
                 
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="foreground"
                  variant="light"
                  onPress={handleToggleInfo}
                >
                  {showAdditionalInfo ? "Volver" : "Más información"}
                </Button>
                <Button
                  color="foreground"
                  variant="light"
                  onPress={() => onClose(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalNieve;
