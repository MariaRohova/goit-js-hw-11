import axios from 'axios';

// fetch('https://pixabay.com/api/').then(res => res.json()).then(console.log);

axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = '31037310-19e6bbc5f2d6061f6c8861bbf';

export async function getImage(searchQuery, page = 1) {
  try {
    const response = await axios.get('', {
      params: {
        key,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });
    return response.data;

  } catch (error) {
    console.error(error);
    throw new Error(error.massage)
  }
}
