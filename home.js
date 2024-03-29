document.addEventListener("DOMContentLoaded", function() {
    const totalFuncionarios = getTotalItems("dbfunc");
    const totalProdutos = getTotalItems("dbprod");
    
    document.getElementById("totalFuncionarios").textContent = totalFuncionarios;
    document.getElementById("totalProdutos").textContent = totalProdutos;
  });
  
  function getTotalItems(key) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData.length : 0;
      } catch (error) {
        console.error(`Erro ao analisar os dados ${key} do localStorage: ${error}`);
      }
    }
    return 0;
  }
  