const fetchData = async () => {
  const response = await fetch('http://localhost:8000/getdata.php');
  const data = await response.json();
  return data;
};

const selected = { product: undefined, country: undefined, state: undefined };
const fetchedData = {
  products: [],
  countries: [],
  states: [],
};

const render = async () => {
  await fetchData()
    .then((data) => {
      (fetchedData.products = data.products),
        (fetchedData.countries = data.countries),
        (fetchedData.states = data.states);
    })
    .catch((e) => console.error(e));
  const { products, countries } = fetchedData;
  const form = document.querySelector('form');
  const productSelect = document.querySelector('#product-select');
  productSelect.addEventListener('change', onProductChange);
  products.forEach((product) => {
    productSelect.innerHTML += `<option value=${product.product_id}>${product.product_name}</option>`;
  });
  const countrySelect = document.querySelector('#country-select');
  countries.forEach((country) => {
    countrySelect.innerHTML += `<option value=${country.country_id}>${country.name}</option>`;
  });
  countrySelect.addEventListener('change', (evt) => onCountryChange(evt, form));
  stateSelect = document.querySelector('#state-select');
  stateSelect.addEventListener('change', onStateChange);
  form.appendChild(stateSelect);
  stateSelect.innerHTML =
    '<option value="">--Please Select Your State--</option>';
};

function onCountryChange(evt) {
  selected.country = fetchedData.countries.find(
    (country) => country.country_id === evt.target.value
  );
  const stateOptions = fetchedData.states.filter(
    (state) => state.country_id === evt.target.value
  );
  let stateSelect = document.querySelector('#state-select');
  selected.state = undefined;
  stateSelect.innerHTML = stateOptions.reduce((options, state) => {
    return options + `<option value=${state.state_id}>${state.name}</option>`;
  }, '<option value="">--Please Select Your State--</option>');

  checkShippable();
}

function onStateChange(evt) {
  selected.state = fetchedData.states.find(
    (state) => state.state_id === evt.target.value
  );
  checkShippable();
}

function onProductChange(evt) {
  selected.product = fetchedData.products.find(
    (product) => product.product_id === evt.target.value
  );
  checkShippable();
}

function checkShippable() {
  const { country, state, product } = selected;
  const errorSpan = document.querySelector('#error');
  if (product) {
    if (country && country.country_status !== product.product_status) {
      errorSpan.setAttribute('style', 'display:inline; background-color: red;');
      return false;
    }
    if (state && state.state_status !== product.product_status) {
      errorSpan.setAttribute('style', 'display:inline; background-color: red;');
      return false;
    }
  }
  errorSpan.setAttribute('style', 'display:none; background-color: red;');
  return true;
}

render();
