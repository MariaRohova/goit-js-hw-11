import { getImage } from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MarkupService from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');
const gallery = new MarkupService(galleryRef);

let simpleLightbox = new SimpleLightbox('.gallery a');
let page = 1;
let inputSearch = '';
let totalImages = 0;
const markUpServise = new MarkupService(galleryRef);
let searchName = '';

loadMoreRef.classList.add('is-hidden');

formRef.addEventListener('submit', e => {
  e.preventDefault();
  loadMoreRef.classList.add('is-hidden');
  gallery.page = 1;
  async function search() {
    searchName = e.currentTarget.searchQuery.value.trim();
    if (searchName === '') {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
      gallery.resetMarkup();

    try {
      const imgList = await getImage(searchName);
    //   console.log(markup);
      if (!imgList.hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${imgList.totalHits} images.`);
      }
      markUpServise.makeCardMarkup(imgList.hits);
      simpleLightbox.refresh();
      totalImages = imgList.hits.length;
      if (totalImages === imgList.totalHits) {
        loadMoreRef.classList.add('is-hidden');
      }
      if (imgList.totalHits > 40) {
        loadMoreRef.classList.remove('is-hidden');
      }
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
  search();
});

loadMoreRef.addEventListener('click', loadMore);

async function loadMore() {
  page += 1;
  loadMoreRef.classList.add('is-hidden');
  try {
    const imgList = await getImage(searchName);
    // console.log(imgList);
    markUpServise.makeCardMarkup(imgList.hits);
    loadMoreRef.classList.remove('is-hidden');
    simpleLightbox.refresh();
      totalImages += imgList.hits.length;
      console.log('totalImages', totalImages);
      console.log('imgList.totalHits', imgList.totalHits);
    if (totalImages >= imgList.totalHits) {
      Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreRef.classList.add('is-hidden');
    }
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}