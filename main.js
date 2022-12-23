function main() {
  let discount = 0;
  let deliveryCharges = 0;
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
    // eslint-disable-next-line no-use-before-define
    if (!isNullOrEmpty(document.getElementById('discount').value)) {
      discount = document.getElementById('discount').value;
    }
    // eslint-disable-next-line no-use-before-define
    if (!isNullOrEmpty(document.getElementById('deliveryCharges').value)) {
      deliveryCharges = document.getElementById('deliveryCharges').value;
    }
    // eslint-disable-next-line max-len, no-shadow
    let totalCost = 0;
    let totalQty = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < table.rows.length; i++) {
      // eslint-disable-next-line no-undef
      totalQty += parseFloat(table.rows[i].cells[1].innerHTML);
      totalCost += parseFloat(table.rows[i].cells[3].innerHTML);
    }
    // eslint-disable-next-line max-len
    const discountedTotal = parseFloat((totalCost / 100) * parseFloat(discount)).toFixed(2);

    const gstTotal = parseFloat(((totalCost - discountedTotal) / 100) * 18).toFixed(2);

    // eslint-disable-next-line max-len
    const grandTotal = parseFloat((parseFloat(totalCost) + parseFloat(gstTotal) + parseFloat(deliveryCharges)) - parseFloat(discountedTotal)).toFixed(2);
    console.log(grandTotal);
    // eslint-disable-next-line no-plusplus
    const tbody = document.querySelector('#itemList tbody');
    // append prices row
    const row = `
    <td>Total</td>
    <td>${totalQty}</td>
    <td></td>
    <td>${totalCost}</td>
    `;
    const tr = document.createElement('tr');
    tr.innerHTML = row;
    tbody.appendChild(tr);
    // display discount row only if discount is applicable
    if (discount > 0) {
      // append discount row
      const discountRow = `
      <td colspan="2"></td>
      <td>Discount(-)</td>
      <td>${discountedTotal}</td>
      `;
      const discountR = document.createElement('tr');
      discountR.innerHTML = discountRow;
      tbody.appendChild(discountR);
    }
    const gstRow = `
    <td colspan="2"></td>
    <td>Taxes(+)</td>
    <td>${gstTotal}</td>
    `;
    const deliverChargesRow = `
    <td colspan="2"></td>
    <td>Delivery Charges</td>
    <td>${deliveryCharges}</td>
    `;
    const gstR = document.createElement('tr');
    gstR.innerHTML = gstRow;
    tbody.appendChild(gstR);

    const dcR = document.createElement('tr');
    dcR.innerHTML = deliverChargesRow;
    tbody.appendChild(dcR);

    // append grand total row
    const grandTotalRow = `
      <td colspan="2"></td>
      <td>Grand Total</td>
      <td>${grandTotal}</td>
      `;
    const grandTotalR = document.createElement('tr');
    grandTotalR.innerHTML = grandTotalRow;
    tbody.appendChild(grandTotalR);
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

    rows += `
    <td>${itemName}</td>
    <td>${itemQty}</td>
    <td>${itemPrice}</td>
    <td>${cost}</td>
    `;
    const tbody = document.querySelector('#itemList tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = rows;
    tbody.appendChild(tr);
  });
}
function isNullOrEmpty(val) {
  // eslint-disable-next-line eqeqeq
  if (val == null || typeof val === 'undefined' || val == [] || val == {} || val == '' || val == 'NaN') {
    return true;
  }
  return false;
}
main();
