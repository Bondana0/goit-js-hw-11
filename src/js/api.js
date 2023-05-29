import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36534768-9895174b062ef79544d81d3db';

export default async function searchImages(name, page) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
