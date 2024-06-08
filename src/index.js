import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selectors = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { breedSelect, catInfo, loader, error } = selectors;

export function showLoader() {
  loader.classList.add('active');
}

export function hideLoader() {
  loader.classList.remove('active');
}
export function showBreedSelect() {
  breedSelect.classList.remove('hidden');
}
function showError(message) {
  error.classList.remove('active');
  iziToast.error({
    title: '✖️ Error',
    message: message,
    position: 'topRight',
  });
  error.classList.add('active');
}

function hideError() {
  error.classList.remove('active');
}

function populateBreedSelect(cats) {
  const options = cats
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', options);
  new SlimSelect({
    select: '.breed-select',
  });
}

function showCatInfo(cat) {
  if (cat && cat.breeds && cat.breeds.length > 0) {
    const breed = cat.breeds[0];
    const { name, description, temperament } = breed;
    const url = cat.url;
    catInfo.innerHTML = `
      <img class="cat-img" src="${url}" alt="${name}" width="460px">
      <div class="cat-info-div">
        <h2 class="cat-title">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><span class="cat-temperament-span">Temperament:</span>${temperament}</p>
      </div>`;
  } else {
    showError('No information available for this cat.');
  }
}

breedSelect.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
  showLoader();
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
  hideError();

  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      breedSelect.classList.remove('hidden');
      showCatInfo(data);
      catInfo.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      hideLoader();
      breedSelect.classList.remove('hidden');
      showError(`Failed to get the cat's details`);
    });
}

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    breedSelect.disabled = true;
    showError(error.message);
  });
