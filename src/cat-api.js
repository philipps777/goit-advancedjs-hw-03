// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_0SWyH0vISoIqEXgbFIimybzOqi5XaiNoAteDK3SHbq3BMjgBZjbA1wtWtajzWKL3';

// export function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => {
//       if (!response.data || !Array.isArray(response.data)) {
//         throw new Error('Invalid response');
//       }
//       return response.data;
//     })
//     .catch(error => {
//       console.error('Error fetching breeds:', error);
//       throw error;
//     });
// }

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//     .then(response => {
//       if (!response.data || !Array.isArray(response.data)) {
//         throw new Error('Invalid response');
//       }
//       return response.data[0];
//     })
//     .catch(error => {
//       console.error('Error fetching cat:', error);
//       throw error;
//     });
// }

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0SWyH0vISoIqEXgbFIimybzOqi5XaiNoAteDK3SHbq3BMjgBZjbA1wtWtajzWKL3';

import { showLoader, hideLoader, showBreedSelect } from './index.js';
export function fetchBreeds() {
  showLoader();

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      hideLoader();

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      showBreedSelect();
      return response.data;
    })
    .catch(error => {
      hideLoader();

      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  showLoader();

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader();

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response');
      }
      return response.data[0];
    })
    .catch(error => {
      hideLoader();

      console.error('Error fetching cat:', error);
      throw error;
    });
}
