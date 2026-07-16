const API = "https://script.google.com/macros/s/AKfycbziRJr00wL7L1ClaJz92zx1dlHOp_0nS_wUic_rhEtrWJnA-If4ivIpXmJo5AgtF7dOIg/exec";

function searchHistory() {

  const code =
    document.getElementById("searchCode")
    .value
    .trim()
    .toLowerCase();

  if (!code) {
    alert("Please enter product code");
    return;
  }

  fetch(API + "?productCode=" + encodeURIComponent(code))
  .then(res => res.json())
  .then(data => {

    console.log(data);

    renderHistory(data);

  })
  .catch(err => {

    console.error(err);
    alert("Error loading history");

  });

}
function renderHistory(data) {

  let html = "";

  data.forEach(item => {

  const date = item.date;

  html += `
    <tr>

      <td>${date}</td>

      <td>${item.slipNo}</td>

      <td>${item.productCode}</td>

      <td>${item.machineNo}</td>

      <td>${item.creator}</td>

      <td>${item.returner || ""}</td>

      <td>
        <button onclick="viewSlip('${item.slipNo}')">
          View
        </button>
      </td>

    </tr>
  `;

});

  document.querySelector("#historyTable tbody").innerHTML = html;
}
function viewSlip(slipNo) {
  window.open("print.html?slipNo=" + slipNo, "_blank");
}
