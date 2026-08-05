const API = "https://script.google.com/macros/s/AKfycbziRJr00wL7L1ClaJz92zx1dlHOp_0nS_wUic_rhEtrWJnA-If4ivIpXmJo5AgtF7dOIg/exec";
// ===== Pagination =====
let allHistory = [];
let currentPage = 1;
const rowsPerPage = 10;

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

    allHistory = data;
    currentPage = 1;

    renderHistory();

})
  .catch(err => {

    console.error(err);
    alert("Error loading history");

  });

}
function searchMachineHistory() {

  const machine =
    document.getElementById("searchMachine")
    .value
    .trim()
    .toLowerCase();

  if (!machine) {
    alert("Please enter Machine No");
    return;
  }

  fetch(API + "?machineNo=" + encodeURIComponent(machine))
  .then(res => res.json())
  .then(data => {

    console.log(data);

    allHistory = data;
    currentPage = 1;

    renderHistory();

  })
  .catch(err => {

    console.error(err);
    alert("Error loading history");

  });

}
function renderHistory(data) {

  let html = "";
  document.getElementById("resultCount").innerHTML =
    `Found ${allHistory.length} record(s)
    <br>
    <span style="font-size:14px;color:#666;">
      (Tìm thấy ${allHistory.length} phiếu)
    </span>`;
  <br>
  <span style="font-size:14px;color:#666;">
    (Tìm thấy ${data.length} phiếu)
  </span>`;
  if (allHistory.length === 0)

  html = `
    <tr>
      <td colspan="7"
          style="
            padding:30px;
            color:#777;
            font-size:18px;
            font-style:italic;
          ">
        No matching records found.
        <br>
        <span style="font-size:15px;">
        (Không tìm thấy dữ liệu)
        </span>
      </td>
    </tr>
  `;

  document.querySelector("#historyTable tbody").innerHTML = html;
  return;

}

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = allHistory.slice(start, end);

  pageData.forEach(item => {

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
// Enter để tìm theo Product
document.getElementById("searchCode").addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    searchHistory();
  }

});

// Enter để tìm theo Machine
document.getElementById("searchMachine").addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    searchMachineHistory();
  }

});
// Khi nhập Product thì xóa Machine
document.getElementById("searchCode").addEventListener("input", function () {

  document.getElementById("searchMachine").value = "";

});

// Khi nhập Machine thì xóa Product
document.getElementById("searchMachine").addEventListener("input", function () {

  document.getElementById("searchCode").value = "";

});
