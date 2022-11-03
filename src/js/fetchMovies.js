export async function fetchPopularMovies(page) {
  const BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = `a4b64e934bd6b381798223a1d6191ff5`;
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  const getPopularMovies = await fetch(url);
  const popularMovies = await getPopularMovies.json();
  console.log({ ...popularMovies });
  return { ...popularMovies };
}
