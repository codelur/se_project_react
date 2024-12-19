const baseUrl = "http://localhost:3001";

//get the next available id by selecting the MAX id +1
//instead of doing a server call to see the least available id
function getFirstAvailableId(clothingItems) {
  const maxId = Math.max(...clothingItems.map((item) => item._id));
  return maxId + 1;
}

function getItems() {
  return fetch(`${baseUrl}/items` /*,headers if necessary*/).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem(data) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.ok
        ? response.json()
        : Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE" }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem, getFirstAvailableId };
