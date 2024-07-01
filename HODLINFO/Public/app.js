// Add an event listener to the document that fires when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the specified API endpoint
  fetch('/api/cryptos')
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      // Get the table body element where the data will be appended
      const tableBody = document.getElementById('cryptoData');
      
      // Iterate over each item in the data array
      data.forEach(crypto => {
        // Create a new table row element
        const row = document.createElement('tr');
        
        // Set the inner HTML of the row with the crypto data
        row.innerHTML = `
          <td>${crypto.index}</td>
          <td>${crypto.platform}</td>
          <td>${crypto.lastTradedPrice}</td>
          <td>${crypto.buyPrice} / ${crypto.sellPrice}</td>
          <td class="${parseFloat(crypto.difference) > 0 ? 'green' : 'red'}">${crypto.difference} %</td>
          <td>${crypto.savings}</td>
        `;
        
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));  // Log any errors to the console
});
