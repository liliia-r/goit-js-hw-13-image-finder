import imageTemplate from '../templates/image.hbs';
import apiService from './apiService';
import * as basicLightbox from 'basiclightbox';

const refs = {
  inputSearch: document.querySelector('input'),
  searchForm: document.querySelector('#search-form'),
  ul: document.querySelector('.gallery'),
  li: document.querySelector('.list-item'),
  body: document.querySelector('body'),
  loadMoreBtn: document.querySelector('#js-load-more'),
};

refs.searchForm.addEventListener('submit', searchImage);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.loadMoreBtn.addEventListener('click', scroll);

function renderImage(images) {
  refs.ul.insertAdjacentHTML('beforeend', imageTemplate(images));
}

function searchImage(e) {
  e.preventDefault();
  const input = e.currentTarget.elements.query;

  clearMarkup();
  apiService.resetPage();
  apiService.searchQuery = input.value;

  apiServices(input.value);
  input.value = '';
}

function scroll() {
  setTimeout(() => {
    window.scrollTo({
      top: +window.scrollY + 900,
      behavior: 'smooth',
    });
  }, 500);
}

function loadMore(input) {
  apiService
    .apiService(input)
    .then(images => renderImage(images))
    .catch(error => console.log(error));
}

function clearMarkup() {
  refs.ul.innerHTML = '';
}

function apiServices(input) {
  apiService
    .apiService(input)
    .then(images => {
      renderImage(images);
    })
    .catch(error => console.log(error));
}
