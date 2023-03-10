// реализация поэлементной загрузки планет
for (const planet of data.planets) {
  const planetItem = document.createElement('li');
  planetItem.classList.add('list-group-item');
  fetch(planet).then(res => res.json()).then((res) => {
    planetItem.textContent = res.name;
  });
  planetsList.append(planetItem);
}

// реализация поблочной загрузки планет и рас
let planetNames = [];
data.planets.forEach(planet => {
  fetch(planet).then(res => res.json()).then(res => {
    planetNames.push(res.name);
    if (planetNames.length === data.planets.length) {
      planetNames.forEach(planetName => {
        planetsTitle.textContent = 'Planets';
        const planetItem = document.createElement('li');
        planetItem.classList.add('list-group-item');
        planetItem.textContent = planetName;
        planetsList.append(planetItem);
      })
    }
  })
});

let specieNames = [];
data.species.forEach(specie => {
  fetch(specie).then(res => res.json()).then(res => {
    specieNames.push(res.name);
    if (specieNames.length === data.species.length) {
      specieNames.forEach(specieName => {
        speciesTitle.textContent = 'Species';
        const specieItem = document.createElement('li');
        specieItem.classList.add('list-group-item');
        specieItem.textContent = specieName;
        speciesList.append(specieItem);
      })
    }
  })
})


