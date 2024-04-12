const BASE_URL = "http://localhost:8080";

export const fetchGastos = async (userId, tarjetaCreditoID) => {
  const apiUrl = `${BASE_URL}/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("La respuesta del servidor no fue OK al obtener los gastos");
  }
  const data = await response.json();
  return data;
};

export const addGasto = async (userId, tarjetaCreditoID, gastoData) => {
  const apiUrl = `${BASE_URL}/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gastoData),
  });
  if (!response.ok) {
    throw new Error("La respuesta del servidor no fue OK al agregar el gasto");
  }
  const data = await response.json();
  return data;
};
