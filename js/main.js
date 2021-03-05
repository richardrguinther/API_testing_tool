const form = document.querySelector("form");
const buttons = document.querySelectorAll("button");
const responseDiv = document.querySelector("#response");

const url = document.querySelector('[data-js="data-url"]');
const inputData = document.querySelector('[data-js="data-input"]');

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

  if (data.method === "POST") {
    requestOptions.body = JSON.stringify(JSON.parse(inputData.value));
  }

  return (fetchedData = window.fetch(data.url, requestOptions));
};

const handleClick = ({ target }) => {
  const method = target.innerText;
  const urlVal = url.value;
  const inputVal = inputData.value;

  data = { method, url: urlVal, inputData: inputVal };
};

const handleSubmit = async (event) => {
  responseDiv.innerHTML = "";

  event.preventDefault();

  const response = await fetchData(data);
  const jsonResponse = await response.json();

  const textedJson = JSON.stringify(jsonResponse, undefined, 5);
  responseDiv.value = textedJson;
  console.log(data);
};

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
form.addEventListener("submit", handleSubmit);
