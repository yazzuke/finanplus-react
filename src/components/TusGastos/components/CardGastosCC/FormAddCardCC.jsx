


{showForm && (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Nombre de la Tarjeta"
          name="nombreTarjeta"
          value={nuevaTarjeta.nombreTarjeta}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Fecha de Pago"
          name="fechaPago"
          value={nuevaTarjeta.fechaPago}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )}