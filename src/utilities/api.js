
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

const api = (action, resource, props, callback) => {
  fetch(`${process.env.REACT_APP_API_URL}/${resource}`, {
    method: action,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: localStorage.token
    },
    ...props,
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(callback);
}

export const get = (resource, callback) => {
  api("GET", resource, {}, callback);
}

export const post = (resource, body, callback) => {
  api("POST", resource, {body: JSON.stringify(body)}, callback);
}