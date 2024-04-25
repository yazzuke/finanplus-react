import React, { useEffect } from 'react';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';

function App() {
  const tour = useContext(ShepherdTourContext);
  
  useEffect(() => {
    tour.start();
  }, [tour]);

  // ...resto de tu componente

  return (
    <div>
      {/* ...tu JSX aquí... */}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ShepherdTour steps={steps} tourOptions={{ defaultStepOptions: options }}>
      <App />
    </ShepherdTour>
  );
}

// Configuración de los pasos del tour y las opciones por defecto
const steps = [
  {
    id: 'example-step',
    text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
    attachTo: {
      element: '.example-css-selector',
      on: 'bottom'
    },
    classes: 'example-step-extra-class',
    buttons: [
      {
        text: 'Next',
        action: Shepherd.Tour.next
      }
    ]
  },
  // ...otros pasos...
];

const options = {
  useModalOverlay: true,
  classes: 'shadow-md bg-purple-dark',
  scrollTo: true
};
