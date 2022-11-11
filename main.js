function main() {
  document.getElementById('printPdf').addEventListener('click', () => {
    const inputDiv = document.getElementById('input');
    const logoDiv = document.getElementById('logo');
    const detailsDiv = document.getElementById('details');
    const customerName = document.getElementById('customer').value;
    document.getElementById('customerDetails').innerText = customerName;
    inputDiv.style.display = 'none';
    logoDiv.style.display = 'inline';
    detailsDiv.style.display = 'inline';
    document.getElementById('addItem').style.display = 'none';
    document.getElementById('printPdf').style.display = 'none';
    const table = document.getElementById('itemList');
    // eslint-disable-next-line max-len, no-shadow
    let sumVal = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < table.rows.length; i++) {
      // eslint-disable-next-line no-undef
      sumVal += parseFloat(table.rows[i].cells[3].innerHTML);
    }
    const tbody = document.querySelector('#itemList tbody');
    const row = `<td colspan="2"></td><td>Total</td><td>${sumVal.toFixed(2)}</td>`;
    const tr = document.createElement('tr');
    tr.innerHTML = row;
    tbody.appendChild(tr);
  });
  document.getElementById('addItem').addEventListener('click', () => {
    let rows = '';
    // const itemName = document.getElementById('itemName').value;
    const selector = document.querySelector('#items');
    const itemName = selector.options[selector.selectedIndex].text;
    const itemQty = document.getElementById('itemQty').value;
    const itemPrice = document.getElementById('itemPrice').value;
    // eslint-disable-next-line no-undef
    const cost = parseInt(itemQty, 10) * parseInt(itemPrice, 10);
    rows += `<td>${itemName}</td><td>${itemQty}</td><td>${itemPrice}</td><td>${cost}</td>`;
    const tbody = document.querySelector('#itemList tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = rows;
    tbody.appendChild(tr);
  });
}

main();
