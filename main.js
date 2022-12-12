function main() {
  document.getElementById('printPdf').addEventListener('click', () => {
    const inputDiv = document.getElementById('input');
    const logoDiv = document.getElementById('logo');
    const detailsDiv = document.getElementById('details');
    const customerName = document.getElementById('customer').value;
    document.getElementById('customerDetails').innerText = `${customerName},`;
    inputDiv.style.display = 'none';
    logoDiv.style.display = 'inline';
    detailsDiv.style.display = 'inline';
    document.getElementById('addItem').style.display = 'none';
    document.getElementById('printPdf').style.display = 'none';
    const table = document.getElementById('itemList');
    // eslint-disable-next-line max-len, no-shadow
    let sumDiscount = 0;
    let sumCost = 0;
    let cgstTotal = 0;
    let sgstTotal = 0;
    let sumTotal = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < table.rows.length; i++) {
      // eslint-disable-next-line no-undef
      sumDiscount += parseFloat(table.rows[i].cells[3].innerHTML);
      sumCost += parseFloat(table.rows[i].cells[4].innerHTML);
      cgstTotal += parseFloat(table.rows[i].cells[5].innerHTML);
      sgstTotal += parseFloat(table.rows[i].cells[6].innerHTML);
      sumTotal += parseFloat(table.rows[i].cells[7].innerHTML);
    }
    // eslint-disable-next-line no-plusplus
    const tbody = document.querySelector('#itemList tbody');
    const row = `<td colspan="2"></td><td>Total</td><td>${sumDiscount.toFixed(2)}</td><td>${sumCost.toFixed(2)}</td><td>${cgstTotal.toFixed(2)}</td>
    <td>${sgstTotal.toFixed(2)}</td><td>${sumTotal.toFixed(2)}</td>`;
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
    const discount = document.getElementById('discount').value;
    // eslint-disable-next-line no-undef
    const cost = parseInt(itemQty, 10) * parseInt(itemPrice, 10);
    const discountPrice = parseFloat((cost / 100) * discount).toFixed(2);
    const cgst = parseFloat((cost / 100) * 9).toFixed(2);
    const sgst = parseFloat((cost / 100) * 9).toFixed(2);
    const itemCost = parseFloat(cost - discountPrice).toFixed(2);
    const totalCost = parseFloat(itemCost + cgst + sgst).toFixed(2);
    rows += `<td>${itemName}</td><td>${itemQty}</td><td>${itemPrice}</td><td>${discountPrice}</td><td>${itemCost}</td><td>${cgst}</td><td>${sgst}</td><td>${totalCost}</td>`;
    const tbody = document.querySelector('#itemList tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = rows;
    tbody.appendChild(tr);
  });
}

main();
