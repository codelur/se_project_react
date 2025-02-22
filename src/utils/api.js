const baseUrl = "http://localhost:3001";

function getFirstAvailableId() {
  return Math.random();
}

async function  checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const error = await res.json();
  return Promise.reject(`Error ${res.status} ${error.message}`);
}

function getItems() {
  return fetch(`${baseUrl}/items` /*,headers if necessary*/).then(
    checkResponse
  );
}

async function addItem(data, token) {
  try {
    const response = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, { 
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, 
      "Content-Type": "application/json" 
    }
  }).then(
    checkResponse
  );
}

function editProfile  ( {name, avatar},token) {
    return fetch(`${baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, avatar})
    })
    .then(
      checkResponse
    );
        
}

function addCardLike(id, token){
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
    }
  }).then(
    checkResponse
  );
}

function removeCardLike (id, token){
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
    }
  }).then(
    checkResponse
  );
}

export { getItems, addItem, deleteItem, getFirstAvailableId, editProfile, addCardLike, removeCardLike, checkResponse };
