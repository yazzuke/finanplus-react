import { useState } from 'react'
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import { BrowserRouter, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {

  
  return (
<div className="w-[789px] h-[290px] light  bg-stone-950 px-20 py-6 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-24">
   <div className="w-full flex justify-between ">
         <div class="text-center " style={{ position: 'relative', right: '78px', top: '60px' }}>
                <h1 className="text-3xl font-semibold  text-white whitespace-nowrap">Inicia Sesion</h1>
                <p className="mt-2 text-gray-500">Analiza tus finanzas</p>
           </div>
         <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mx-6 " style={{ position: 'relative', top: '70px', left: '160px'}}>
         <Input type="email" label="Email" />
          </div>     
          <div className="mt-20" style={{ position: 'relative', top: '128.5px', left: '50px' }}>
              <Button color="primary" variant="faded">  Siguiente </Button>  
           </div>  
  </div>   
  <div className="m-1" style={{ position: 'relative', top: '56px', left: '160px' }}>  
                <p className="mt-10 text-gray-500">Crea una <a href="#" class="text-blue-500">Cuenta</a></p>
                    </div>  
          <div className="m-1" style={{ position: 'relative', top: '-60px', left: '145px' }}>  
              <a href="#" class="text-blue-500">¿Olvidaste tu contraseña?</a>
                    </div>
                    
 </div>



    
  )
}

export default App

