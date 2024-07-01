// app.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cryptos')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('cryptoData');
        data.forEach(crypto => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${crypto.name}</td>
            <td>${crypto.last}</td>
            <td>${crypto.buy}</td>
            <td>${crypto.sell}</td>
            <td>${crypto.volume}</td>
            <td>${crypto.base_unit}</td>
          `;
          tableBody.appendChild(row);
        });
      });
  });
  