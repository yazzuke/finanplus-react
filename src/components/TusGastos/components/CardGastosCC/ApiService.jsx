    
class ApiService {
    constructor(baseUrl = 'http://localhost:8080') {
      this.baseUrl = baseUrl;
    }
  
    // Métodos para obtener y agregar tarjetas de crédito
    async fetchGastos(userId, tarjetaCreditoID) {
      const apiUrl = `${this.baseUrl}/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue OK al obtener los gastos');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener los gastos:', error);
        throw error;
      }
    }
  
    // Método para agregar un gasto
    async agregarGasto(userId, tarjetaCreditoID, gastoData) {
      const apiUrl = `${this.baseUrl}/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gastoData),
        });
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue OK');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al agregar el gasto:', error);
        throw error;
      }
    }
  }
  
  export default new ApiService();
  