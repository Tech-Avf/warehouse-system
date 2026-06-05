const API_URL =
"https://script.google.com/macros/s/AKfycbxZRgbbC7sDSk6gSk0ubE9dDr4AQuWzd2kq-usOaqTjH9Ks9_c4Wtu9qf4chwhkeDxk_Q/exec";


window.onload = function () {

  const now = new Date();

  document.getElementById("dateTime").value =
    now.toLocaleString();

};


async function saveData() {

  const data = {

    productCode:
      document.getElementById("productCode").value,

    machineNo:
      document.getElementById("machineNo").value,

    tool:
      document.getElementById("tool").value,

    qty:
      document.getElementById("qty").value,

    creator:
      document.getElementById("creator").value,

    receiver:
      document.getElementById("receiver").value,

    note:
      document.getElementById("note").value,

    dateTime:
      document.getElementById("dateTime").value

  };

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify(data)

    });

    const result =
      await response.json();

    console.log(result);

    alert("Saved To Google Sheet");

  }

  catch (error) {

    console.error(error);

    alert("Save Failed");

  }

}