const fetchData = async () => {
  const response = await fetch('http://localhost:8000/getdata.php');
  const data = await response.json();
  return data;
};

const selected = { product, country, state };

const render = async () => {
  const { states, countries, products } = await fetchData();
  const form = document.querySelector('form');
  const productSelect = document.querySelector('#product-select');
  products.forEach((product) => {
    productSelect.innerHTML += `<option value=${product.product_id}>${product.product_name}</option>`;
  });
  const countrySelect = document.querySelector('#country-select');
  countries.forEach((country) => {
    countrySelect.innerHTML += `<option value=${country.country_id}>${country.name}</option>`;
  });
  countrySelect.addEventListener('change', (evt) =>
    onCountryChange(evt, form, states)
  );
};

function onCountryChange(evt, form, states) {
  const countryId = evt.target.value;
  selected.country = evt.target.value.length ?
  if (evt.target.value.length) {
    const stateOptions = states.filter(
      (state) => state.country_id === evt.target.value
    );
    let stateSelect = document.querySelector('#state-select');
    if (!stateSelect) {
      stateSelect = document.createElement('select');
      stateSelect.setAttribute('id', 'state-select');
      form.appendChild(stateSelect);
    }
    stateSelect.innerHTML = stateOptions.reduce((options, state) => {
      return options + `<option value=${state.state_id}>${state.name}</option>`;
    }, '<option value="">--Please Select Your State--</option>');
  }
}

function checkShippable(productId, countryId, stateId){
  const productStatus = productId ? products.find((product) => product.product_Id === productId).status : undefined;
  const countryStatus = countryId ? countries.find((country) => country.country_Id === countryId).status : undefined;
  const stateStatus = stateId ? states.find((state) => state.state_Id === stateId).status : undefined;

  if(productStatus){
    if(countryStatus && countryStatus !== productStatus) return false;
    if(stateStatus && stateStatus !== productStatus) return false;
  }
  return true;
}

render();
