
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

const get = (resource, callback) => {
  fetch(`${process.env.REACT_APP_API_URL}/${resource}`, {
    accept: 'application/json',
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(callback);
}