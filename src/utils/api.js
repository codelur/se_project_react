const baseUrl = "http://localhost:3001";

function getFirstAvailableId() {
  return Math.random();
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items` /*,headers if necessary*/).then(
    checkResponse
  );
}

async function addItem(data) {
  try {
    const response = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE" }).then(
    checkResponse
  );
}

export { getItems, addItem, deleteItem, getFirstAvailableId };
