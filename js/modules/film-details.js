export function render(data, planetsNames = null, speciesNames = null) {
  const container = document.createElement('div');
  const backBtn = document.createElement('a');
  const pageTitle = document.createElement('h1');
  const descr = document.createElement('p');
  const planetsTitle = document.createElement('h2');
  const planetsList = document.createElement('ul');
  const speciesTitle = document.createElement('h2');
  const speciesList = document.createElement('ul');

  container.classList.add(
    'container',
    'py-4',
  );
  backBtn.classList.add('btn', 'btn-primary', 'mb-3', 'back-btn');
  pageTitle.classList.add('display-1', 'mb-3');
  descr.classList.add('mb-3');
  planetsTitle.classList.add('display-3');
  planetsList.classList.add('list-group');
  speciesTitle.classList.add('display-3');
  speciesList.classList.add('list-group');

  backBtn.textContent = 'Back to episodes';
  backBtn.href = '/';
  pageTitle.innerHTML = `Episode ${data.episode_id}: ${data.title}`;
  descr.textContent = data.opening_crawl;

  const backBtns = [];
  backBtns.push(backBtn);

  planetsTitle.textContent = 'Planets';
  planetsNames.forEach(planetName => {
    const planetItem = document.createElement('li');
    planetItem.classList.add('list-group-item');
    planetItem.textContent = planetName;
    planetsList.append(planetItem);
  })

  speciesTitle.textContent = 'Species';
  speciesNames.forEach(specieName => {
    const specieItem = document.createElement('li');
    specieItem.classList.add('list-group-item');
    specieItem.textContent = specieName;
    speciesList.append(specieItem);
  })

  container.append(backBtn);
  container.append(pageTitle);
  container.append(descr);
  container.append(planetsTitle);
  container.append(planetsList);
  container.append(speciesTitle);
  container.append(speciesList);

  return {
    container,
    backBtns
  };
}
