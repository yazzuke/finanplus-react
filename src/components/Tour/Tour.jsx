// Tours.jsx
import React from 'react';
import { ShepherdTour } from 'react-shepherd';
import 'shepherd.js/dist/css/shepherd.css'; // Importar estilos si aún no lo has hecho en otro lugar

export const tourSteps = [
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

export const tourOptions = {
  useModalOverlay: true,
  classes: 'shadow-md bg-purple-dark',
  scrollTo: true
};

// Esta función es para envolver tu componente Home con ShepherdTour
export const withTour = Component => props => (
  <ShepherdTour steps={tourSteps} tourOptions={tourOptions}>
    <Component {...props} />
  </ShepherdTour>
);
