import React from "react";

function FormGastosFijos({ newTransaction, handleInputChange, handleSubmit }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Campos del formulario */}
        <input
          type="text"
          placeholder="Nombre del Gasto"
          name="nombreGasto"
          value={newTransaction.nombreGasto}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="date"
          name="fecha"
          value={newTransaction.fecha}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Valor del Gasto"
          name="valorGasto"
          value={newTransaction.valorGasto}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        />
        {/* Selector para el tipo de gasto */}
        <select
          name="tipo"
          value={newTransaction.tipo}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="NECESIDAD">Necesidad</option>
          <option value="DESEOS">Deseos</option>
          <option value="METAS">Metas</option>
        </select>

        {/* Botón para enviar el formulario */}
        <button
          type="button"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Agregar Gasto
        </button>
      </div>
    </div>
  );
}

export default FormGastosFijos;
