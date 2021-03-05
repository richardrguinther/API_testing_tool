const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const buttons = document.querySelectorAll("button");
const responseDiv = document.querySelector("#response");

let data = {};

const fetchData = (data, options) => {
  let requestOptions;
  // Headers
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  if (!options)
    requestOptions = {
      method: data.method,
      headers: myHeaders,
    };
  else requestOptions = options;

  if (data.method === "post")
    requestOptions.body = JSON.stringify(data.inputData);

  return (fetchedData = fetch(data.url, requestOptions));
};

const handleClick = ({ target }) => {
  const method = target.innerText;
  const url = document.querySelector('[data-js="data-url"]').value;
  const inputData = document.querySelector('[data-js="data-input"]').value;

  data = { method, url, inputData };
};

const handleSubmit = async (event) => {
  responseDiv.innerHTML = "";

  event.preventDefault();

  const response = await fetchData(data);
  const jsonResponse = await response.json();

  const textedJson = JSON.stringify(jsonResponse, undefined, 5);
  responseDiv.value = textedJson;
};

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
form.addEventListener("submit", handleSubmit);
