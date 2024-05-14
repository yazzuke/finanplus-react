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
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics",
 ,
    ],
  },
  {
    title: "Donancion",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
 
    ],
  },
  {
    title: "Premium",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
 
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
 
];

export const platformLinks = [
  { href: "#", text: "Features" },
  
];

export const communityLinks = [
  { href: "#", text: "Events" },

];
