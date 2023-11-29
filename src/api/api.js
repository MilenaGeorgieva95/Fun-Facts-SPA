import { clearUserData, getUserData } from "../views/utils.js";

const host = "http://localhost:3030";

async function request(method, url, body) {
  const options = {
    method,
    headers: {},
  };

  if (body != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const userData = getUserData()
  if (userData != null) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    const res = await fetch(`${host}${url}`, options);
    let data;
    if (res.status !== 204) {
      data = await res.json();
    }

    if (res.ok == false) {
      if (res.status === 403) {
        clearUserData();
      }
      const error = data;
      throw error;
    }
    return data;
  } catch (error) {
    alert(`Error: ${error.message}`)
    throw error;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
