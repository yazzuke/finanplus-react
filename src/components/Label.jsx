import { Input } from "@nextui-org/react";

export default function Label() {
  return (
    <div className="w-full md:w-1/2">
      <Input 
        type="email" 
        label="Email" 
        width="100%" // El input llenará el ancho de su contenedor
      />
    </div>
  )
}