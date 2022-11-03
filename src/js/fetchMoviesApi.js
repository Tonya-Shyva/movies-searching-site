export async function fetchPopularMovies(page) {
  const BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = `a4b64e934bd6b381798223a1d6191ff5`;
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&year=year`;
  const getPopularMovies = await fetch(url);
  const popularMovies = await getPopularMovies.json();
  console.log(popularMovies);
  return popularMovies;
}

export async function fetchSearchingMovies(inputValue, page) {
  const BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = `a4b64e934bd6b381798223a1d6191ff5`;
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&query=${inputValue}`;
  const getSearchingMovies = await fetch(url);
  const searchingMovies = await getSearchingMovies.json();
  console.log(searchingMovies);
  return searchingMovies;
}

export async function fetchGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.genres;
    });
}
