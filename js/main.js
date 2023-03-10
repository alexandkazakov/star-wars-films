// функция для загрузки ресурсов: js модулей, css файлов или данных с сервера
const cssPromises = {}; // объект, в котором содержатся все css промисы, чтобы исключить повторения
function loadResourse(src) {
  // js module
  if (src.endsWith('.js')) {
    return import(src);
  };
  // css file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      document.head.append(link);
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
    }
    return cssPromises[src];
  }
  // data from server
  return fetch(src).then(res => res.json());
}

// находим контейнер для нашего приложения в DOM
const appContainer = document.getElementById('app');

// функция отрисовки нужной страницы и отрисовки спиннера, пока загружаются данные с сервера

function renderPage(jsModule, apiUrl, cssFile, mode = 'main') {
  loadResourse('../css/loading.css');
  appContainer.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

  // если главная страница, то прогружает страницу без получения доп информации
  if (mode === 'main') {
    Promise.all([jsModule, apiUrl, cssFile].map(src => loadResourse(src)))
    .then(([pageModule, data]) => {
      const filmsList = pageModule.render(data);
      appContainer.innerHTML = '';
      appContainer.append(filmsList.container);
      goToLink(filmsList.filmLinks);
    })
    return;
  };

  // если не главная страница, то подгружаются список планет и рас
  Promise.all([jsModule, apiUrl, cssFile].map(src => loadResourse(src)))
    .then(([pageModule, data]) => {

      const planetsList = data.planets.map(planetLink => loadResourse(planetLink));
      const speciesList = data.species.map(specieLink => loadResourse(specieLink));

      const planetsPromise = Promise.all(planetsList)
        .then(planets => planets.map(planet => planet.name));

      const speciesPromise = Promise.all(speciesList)
        .then(species => species.map(specie => specie.name));

      return [pageModule, data, planetsPromise, speciesPromise];

    })
    .then( ([pageModule, data, planetsPromise, speciesPromise]) => {
      Promise.all([planetsPromise, speciesPromise])
        .then(([planetsNames, speciesNames]) => {
          const filmDetails = pageModule.render(data, planetsNames, speciesNames);
          appContainer.innerHTML = '';
          appContainer.append(filmDetails.container);
          goToLink(filmDetails.backBtns);
        })
    });
}

function loadPage() {
  // получим id из адресной строки
  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('filmId');

  if (filmId) {
    // загружаем страницу с выбранным фильмом
    renderPage(
      './modules/film-details.js',
      `https://swapi.dev/api/films/${filmId}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
      'detail-page'
    );
  } else {
    // загрузим главную страницу - список фильмов
    renderPage(
      './modules/films-list.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
      'main'
    );
  }
}

function goToLink(elems) {
  elems.forEach(elem => {
    elem.addEventListener('click', event => {
      event.preventDefault();
      history.pushState(null, '', elem.href);
      loadPage();
    });
  })
}

loadPage();

window.addEventListener('popstate', () => {
  loadPage();
})

