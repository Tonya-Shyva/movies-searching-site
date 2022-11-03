import cardFilmTpl from '../templates/cardFilmTpl.hbs';
import { fetchPopularMovies } from './fetchMovies';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

const moviesDiv = document.querySelector('.movies');
// -------------------pagination refs---------------------------
const paginationArrows = document.querySelectorAll('.pagination__arrow');
const paginationList = document.querySelector('.pagination__pages');
let items = [...paginationList.children];
// --------------------------------------------------------------

let pageNumber = 1;

fetchPopularMovies(pageNumber).then(popularMovies => {
  console.log(popularMovies.total_pages);
  // popularMovies.results.release_date = popularMovies.results.release_date.split(
  //   '-'[0]
  // );
  renderPopularMovies(popularMovies.results);
  renderPagination(popularMovies.total_pages);
  hideOverPages();
  gallerySimpleLightbox.refresh();
});

function renderPopularMovies(movies) {
  moviesDiv.innerHTML = cardFilmTpl(movies);
}

// -----pagination---------------------
function renderPagination(pages) {
  console.log(pages);
  for (let i = 1; i <= pages; i += 1) {
    // console.log(i);
    const li = renderPaginationBtn(i);
    li.textContent = i;

    if (Number(i) === pageNumber) {
      li.classList.add('pagination__page--active');
    }
    paginationList.append(li);

    li.addEventListener('click', onLiItemPaginationClick);

    function onLiItemPaginationClick() {
      scrollToTop();
      // const trimmedValue = inputRef.value.trim();
      let paginationPageNumber = Number(li.textContent);
      fetchPopularMovies(paginationPageNumber).then(data => {
        showPage(document.querySelector('.pagination__page--active'));
        hideOverPages();

        // console.log(data);
        // console.log(paginationPageNumber, pages);
        renderPopularMovies(data.results);
        paginationArrows[0].disabled = false;
        ifPageNum(paginationPageNumber, pages);
        gallerySimpleLightbox.refresh();
      });

      const currentItemLi = document.querySelector(
        'li.pagination__page--active'
      );
      currentItemLi.classList.remove('pagination__page--active');
      li.classList.add('pagination__page--active');
    }
  }
}

function renderPaginationBtn() {
  const liEl = document.createElement('li');
  liEl.classList.add('pagination__page');
  return liEl;
}

paginationArrows[0].addEventListener('click', onPaginationArrowLeftClick);
paginationArrows[1].addEventListener('click', onPaginationArrowRightClick);

// функція для кліку на ліву стрілку
function onPaginationArrowLeftClick(ev) {
  const currentPage = document.querySelector('.pagination__page--active');
  // console.dir(currentPage);
  let pageForArrowleft = Number(currentPage.innerHTML);
  if (ev.target === paginationArrows[0]) {
    fetchPopularMovies((pageForArrowleft -= 1)).then(data => {
      renderPopularMovies(data.results);
      showPage(currentPage.previousSibling);
      hideOverPages();
      currentPage.previousSibling.classList.add('pagination__page--active');
      currentPage.classList.remove('pagination__page--active');
      ifPageNum(pageForArrowleft, data.total_pages);

      showItemByArrowPagination(currentPage.previousSibling.previousSibling);

      // gallerySimpleLightbox.refresh();
    });
  }
}

// функція для кліку на праву стрілку
function onPaginationArrowRightClick(ev) {
  const currentPage = document.querySelector('.pagination__page--active');
  // console.dir(currentPage);
  let pageForArrowRight = Number(currentPage.innerHTML);
  if (ev.target === paginationArrows[1]) {
    fetchPopularMovies((pageForArrowRight += 1)).then(data => {
      // console.dir(currentPage.nextSibling);
      renderPopularMovies(data.results);
      showPage(currentPage.nextSibling);
      hideOverPages();
      currentPage.nextSibling.classList.add('pagination__page--active');
      currentPage.classList.remove('pagination__page--active');
      ifPageNum(pageForArrowRight, data.total_pages);

      showItemByArrowPagination(currentPage.nextSibling.nextSibling);
    });
  }
}

//------------------ колбек ф-ція для arrowListener------------------
function showItemByArrowPagination(itemToShow) {
  if (itemToShow !== null) {
    itemToShow.classList.remove('hidden');
  }
  scrollToTop();
  gallerySimpleLightbox.refresh();
}

// колбек функція для умов номерів сторінок, щоб робити кнопки-стрілки неактивними
function ifPageNum(page, pages) {
  paginationArrowsEnable();
  if (page === pages) {
    paginationArrows[1].disabled = true;
  }
  if (page === 1) {
    paginationArrows[0].disabled = true;
  }
}

// ховає кнопки-стрілки пагінації
function paginationArrowsHide() {
  paginationArrows[0].classList.add('visually-hidden');
  paginationArrows[1].classList.add('visually-hidden');
}

// показує кнопки-стрілки пагінації, при умові, що сторінок контенту від 5 і більше
function paginationArrowsShow(pages, trimmedValue, pageNumber) {
  paginationArrows[0].classList.remove('visually-hidden');
  paginationArrows[1].classList.remove('visually-hidden');

  if (pages < 5) {
    paginationArrows[0].classList.add('visually-hidden');
    paginationArrows[1].classList.add('visually-hidden');
  }
}

// ---------------робить кнопки-стрілки пагінації неактивними -----------------
function paginationArrowsEnable() {
  paginationArrows[0].disabled = false;
  paginationArrows[1].disabled = false;
}

// -------------callback-функція для створення прихованих сторінок ... -------------------
let active;
function showPage(item) {
  if (active) {
    active.classList.remove('pagination__page--active');
    active = item;
    item.classList.add('pagination__page--active');

    let showPage = 2;
    let pageNum = +active.innerHTML;

    let start = (pageNum - 1) * showPage;
    let end = start + showPage;
    let notes = items.slice(start, end);

    for (let note of notes) {
      hideOverPages();
    }
  }
}

// -----приховані сторінки на пагінації (...) та навпаки.
function hideOverPages() {
  let active = document.querySelector('.pagination__page--active');
  let items = [...paginationList.children];

  if (items.length > 6) {
    items.forEach(item => item.classList.add('hidden'));
    items[0].classList.remove('hidden');

    if (active.previousSibling) {
      active.previousSibling.classList.remove('hidden');
    }
    active.classList.remove('hidden');
    if (active.nextSibling) {
      active.nextSibling.classList.remove('hidden');
    }
    items[items.length - 1].classList.remove('hidden');
  }
}

//  функція для автоматичного скролу вгору (на початок) нової поточної сторінки
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
