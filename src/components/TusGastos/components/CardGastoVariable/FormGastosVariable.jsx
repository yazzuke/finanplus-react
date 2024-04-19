import React from "react";

function FormGastosVariable({ newTransaction, handleInputChange, handleSubmit }) {
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
          placeholder="Fecha"
          name="fecha"
          value={newTransaction.installments}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Valor del Gasto"
          name="valorGasto"
          value={newTransaction.installmentValue}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <select
          name="tipo"
          value={newTransaction.tipo}
          onChange={handleInputChange}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="">Seleccionar Tipo</option>
          <option value="Necesidad">Necesidad</option>
          <option value="Deseos">Deseos</option>
          <option value="Metas">Metas</option>
        </select>

        {/* Botón para enviar el formulario */}
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Agregar Gasto
        </button>
      </div>
    </div>
  );
}

export default FormGastosVariable;
