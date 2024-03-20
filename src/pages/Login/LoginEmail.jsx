import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailSubmitted, setEmailSubmitted] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmitEmail = () => setEmailSubmitted(true);

  return (
    <div className="w-[990px] h-[400px] dark  bg-stone-950 px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24">
          <div class="text-center " style={{ position: 'relative', left: '-240px', top: '135px' }}>
                 <h1 className="text-3xl font-semibold  text-white whitespace-nowrap">Inicia Sesion</h1>
                 <p className="mt-2 text-gray-500">Analiza tus finanzas</p>
            </div>
          <div className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 " style={{ position: 'relative', top: '0px', left: '420px'}}>
          <Input type="email" label="Email" />
           </div>     
           <div className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 " style={{ position: 'relative', top: '50px', left: '420px'}}>
          <Input type="password" label="Contraseña" />
           </div>     
        
  <div className="m-1" style={{ position: 'relative', top: '50px', left: '150px' }}>  
               <a href="#" class="text-white">¿Olvidaste tu contraseña?</a>
                     </div>          
   <div className="m-1" style={{ position: 'relative', top: '95px', left: '200px' }}>  
             <a href="#" class="text-white">Crea una Cuenta</a>
                     </div>  
                     <div className="mt-20" style={{ position: 'relative', top:'-15px', left: '384px' }}>
               <Button color="primary" variant="faded">  Iniciar Sesion </Button>  
            </div>  
  </div>
  )
}
  

export default App