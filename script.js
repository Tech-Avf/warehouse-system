const API_URL =
"https://script.google.com/macros/s/AKfycbxZRgbbC7sDSk6gSk0ubE9dDr4AQuWzd2kq-usOaqTjH9Ks9_c4Wtu9qf4chwhkeDxk_Q/exec";

async function searchHistory() {

  const productCode =
    document.getElementById("searchCode").value;

  const tbody =
    document.querySelector(
      "#historyTable tbody"
    );

  tbody.innerHTML = "";

  try {

    const response =
      await fetch(
        `${API_URL}?productCode=${productCode}`
      );

    const data =
      await response.json();

    data.forEach(item => {

      tbody.innerHTML += `

      <tr>

        <td>${item.dateTime}</td>

        <td>${item.productCode}</td>

        <td>${item.tool}</td>

        <td>${item.qty}</td>

        <td>${item.creator}</td>

        <td>${item.status}</td>

      </tr>

      `;

    });

  }

  catch(error) {

    console.error(error);

    alert("Search Failed");

  }

}
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

  const date =
    new Date(item.dateTime)
      .toLocaleDateString("vi-VN");

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