import './css/gallery.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import searchImages from './js/api.js';
import templateBox from './order/template-box.js';

const { searchForm, gallery, loadMoreBtn, textEndGallery } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  textEndGallery: document.querySelector('.text-end-gallery'),
};

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value.trim();
  currentPage = 1;

  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'The search field cannot be empty, please try again.'
    );
    return;
  }

  const response = await searchImages(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      updatingMarkup(response.hits);
      lightbox.refresh();
      textEndGallery.classList.add('is-hidden');
    }

     if (response.totalHits === 0) {
     gallery.innerHTML = '';
       Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
       );
     loadMoreBtn.classList.add('is-hidden');
       textEndGallery.classList.add('is-hidden');
     }
  } catch (error) {
    console.log(error);
  }
}

function updatingMarkup(arr) {
  const markup = arr.map(item => templateBox(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', buttonLoadMore);

async function buttonLoadMore() {
  currentPage += 1;
  const response = await searchImages(searchQuery, currentPage);
  updatingMarkup(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    textEndGallery.classList.remove('is-hidden');
  }
}
