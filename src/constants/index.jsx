import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { DollarSign  } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import {Handshake } from "lucide-react";
import {PiggyBank } from "lucide-react";
import {Wallet} from "lucide-react";


export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
];


export const features = [
  {
    icon: <DollarSign />,
    text: "Control Total de Finanzas",
    description:
      "Gestiona tus ingresos, gastos y ahorros de manera eficiente y organizada.",
  },
  {
    icon: <PiggyBank /> ,
    text: "Metodologías de Ahorro",
    description:
      "Aplica metodologías reconocidas como el método 50/30/20 y bola de nieve para alcanzar tus objetivos financieros.",
  },
  {
    icon: <ShieldHalf />,
    text: "Seguridad y Privacidad",
    description:
      "Protege tus datos financieros con nuestras medidas de seguridad y privacidad.",
  },
  {
    icon: <Handshake  />,
    text: "Análisis Personalizado",
    description:
      "Obtén análisis detallados de tus finanzas para tomar decisiones informadas.",
  },
  {
    icon: <Wallet />,
    text: "Facilidad de Uso",
    description:
      "Navega y utiliza nuestra plataforma de manera sencilla e intuitiva.",
  },
  {
    icon: <GlobeLock />,
    text: "Acceso desde cualquier lugar",
    description:
      "Accede a tus datos financieros desde cualquier dispositivo, en cualquier momento y lugar.",
  },
];


export const pricingOptions = [
  {
    title: "Gratuito",
    price: "$0",
    features: [ 
      "5 Gb de Almacenamiento",
      "Analisis y estadisticas basicas",
      "Tendras tu cuenta para siempre",
 ,
    ],
  },
  {
    title: "Donacion",
    price: "$1",
    features: [
      "Al querer ser una app gratuita ",
      "se aceptan donaciones para mantener el servicio",
      "Al donar tendras soporte y actualizaciones",
      "10 GB de Almacenamiento" 
    ],
  },
  {
    title: "Premium",
    price: "$20",
    features: [
      "Almacenamiento Ilimitado",
      "Acceso a nuevos metodos de ahorro",
      "Prioridad en soporte",
      "Analisis y estadisticas avanzadas",
      "Acceso a nuevas funcionalidades",
      
 
    ],
  },
];

export const resourcesLinks = [
  { href: "https://github.com/yazzuke", text: "Desarrollado por Felipe Avila y Miguel Paez" },
 
];

export const platformLinks = [
  { href: "#", text: "Features" },
  
];

export const communityLinks = [
  { href: "#", text: "Events" },

];
