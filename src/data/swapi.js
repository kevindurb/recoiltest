import * as Recoil from 'recoil';
import memoize from 'fast-memoize';

const fetchJSON = (url) => (
  fetch(url)
  .then(r => r.json())
);

const fetchSWAPI = (uri) => fetchJSON(`https://swapi.dev/api${uri}`);

const idFromUrl = url => url.split('/')[5];

const selectorFamily = ({ key, get }) =>
  memoize((...args) => Recoil.selector({
    key: `${key}/${JSON.stringify(args)}`,
    get: get(...args),
  }))

export const planetSelector = selectorFamily({
  key: 'planets',
  get: (url) => () => (
    fetchSWAPI(`/planets/${idFromUrl(url)}`)
  )
})

export const personSelector = selectorFamily({
  key: 'people',
  get: (url) => () => (
    fetchSWAPI(`/people/${idFromUrl(url)}`)
  )
})

export const vehicleSelector = selectorFamily({
  key: 'people',
  get: (url) => () => (
    fetchSWAPI(`/vehicles/${idFromUrl(url)}`)
  )
})

export const filmSelector = selectorFamily({
  key: 'films',
  get: (url) => () => (
    fetchSWAPI(`/films/${idFromUrl(url)}`)
  )
})

export const starshipSelector = selectorFamily({
  key: 'starships',
  get: (url) => () => (
    fetchSWAPI(`/starships/${idFromUrl(url)}`)
  )
})

const makeMapSelector = (get) => (selector, items) => (
  items.map((item) => get(selector(item)))
)

export const fullPersonSelector = selectorFamily({
  key: 'fullPerson',
  get: (url) => ({get}) => {
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
