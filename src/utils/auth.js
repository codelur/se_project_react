//Specify the BASE_URL for the API.
const BASE_URL = "http://localhost:3001";

export const register = (email, password, name, avatar) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, avatar, email, password})
    })
    .then((res)=>{
        return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
    })
        
}

export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password})
    })
    .then((res)=>{
        return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
    })
        
}