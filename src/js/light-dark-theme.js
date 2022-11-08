//   const moviesTitles = response.map(movie => movie.title);

export function toggleLightTheme() {
  const themeContainer = document.querySelector('.themetoggle__container');
  const darkIcon = document.querySelector('#dark');

  themeContainer.addEventListener('click', toggleThemeClick);

  function toggleThemeClick(e) {
    e.preventDefault();
    console.log(e);
    if (
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'use' ||
      e.target.nodeName === 'BUTTON'
    ) {
      darkIcon.classList.toggle('is-shown');
      document.body.classList.toggle('js-dark-theme');
    }
  }
}
