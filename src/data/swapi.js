import * as Recoil from 'recoil';

const fetchJSON = (url) => (
  fetch(url)
  .then(r => r.json())
);

const fetchSWAPI = (uri) => fetchJSON(`https://swapi.dev/api${uri}`);

// swapi uses urls instead of ids...
// simple fn to get the id out of a url
const idFromUrl = url => url.split('/')[5];

// run a selector against an array
const makeMapSelector = (get) => (selector, items) => (
  get(Recoil.waitForAll(
    items.map((item) => selector(item))
  ))
)

export const personSearchTermSelector = Recoil.atom({
  key: 'personSearchTerm',
  default: '',
});

export const focusedPersonSelector = Recoil.atom({
  key: 'focusedPerson',
  default: '',
})

export const personSearchResultsSelector = Recoil.selector({
  key: 'personSearchResults',
  get: ({get}) => (
    fetchSWAPI(`/people/?search=${encodeURIComponent(get(personSearchTermSelector))}`)
  )
})

export const planetSelector = Recoil.selectorFamily({
  key: 'planets',
  get: (url) => () => (
    fetchSWAPI(`/planets/${idFromUrl(url)}`)
  )
})

export const personSelector = Recoil.selectorFamily({
  key: 'people',
  get: (url) => () => (
    fetchSWAPI(`/people/${idFromUrl(url)}`)
  )
})

export const vehicleSelector = Recoil.selectorFamily({
  key: 'people',
  get: (url) => () => (
    fetchSWAPI(`/vehicles/${idFromUrl(url)}`)
  )
})

export const filmSelector = Recoil.selectorFamily({
  key: 'films',
  get: (url) => () => (
    fetchSWAPI(`/films/${idFromUrl(url)}`)
  )
})

export const starshipSelector = Recoil.selectorFamily({
  key: 'starships',
  get: (url) => () => (
    fetchSWAPI(`/starships/${idFromUrl(url)}`)
  )
})

export const fullPersonSelector = Recoil.selectorFamily({
  key: 'fullPerson',
  get: (url) => ({get}) => {
    if (!url) return null;

    const mapSelector = makeMapSelector(get);
    const person = get(personSelector(url));
    const homeworld = get(planetSelector(person.homeworld));
    return {
      ...person,
      homeworld,
      vehicles: mapSelector(vehicleSelector, person.vehicles),
      films: mapSelector(filmSelector, person.films),
      starships: mapSelector(starshipSelector, person.starships),
    };
  }
})
