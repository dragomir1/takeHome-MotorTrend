import axios from 'axios';

export default {
  configure: () => {
    return (axios.defaults.headers.common['x-api-key'] =
      '4f2a2955-4e9e-4e07-980a-926d628d188b');
  },
  getBreeds: () => {
    return axios.get('https://api.thecatapi.com/v1/breeds');
  },
  getCatsImagesByBreed: (breed_id, amount) => {
    return axios.get(
      'https://api.thecatapi.com/v1/images/search?breed_ids=' +
        breed_id +
        '&limit=' +
        amount
    );
  }
};
