export function render(data) {
  const container = document.createElement('div');
  const pageTitle = document.createElement('h1');
  const filmsList = document.createElement('div');
  container.classList.add(
    'container',
    'py-4',
  );
  pageTitle.classList.add('display-1', 'mb-5');
  filmsList.classList.add('list-group');
  pageTitle.textContent = 'Star Wars films';

  // сортируем фильмы по эпизодам
  let films = data.results.slice();
  films.sort((a, b) => (a.episode_id > b.episode_id) ? 1 : -1);

  const filmLinks = [];
  for (const film of films) {
    const filmLink = document.createElement('a');
    filmLink.classList.add('list-group-item', 'list-group-item-action', 'film-link');

    filmLinks.push(filmLink);

    filmLink.innerHTML = `Episode ${film.episode_id}: ${film.title}`;

    // находим id в url
    let idFromUrl = film.url.split('/');
    idFromUrl = idFromUrl[idFromUrl.length - 2];

    filmLink.href = `?filmId=${idFromUrl}`;

    filmsList.append(filmLink);
  }

  container.append(pageTitle);
  container.append(filmsList);

  return {
    container,
    filmLinks
  };
}
