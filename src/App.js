import React from 'react';
import * as Recoil from 'recoil';
import * as swapi from './data/swapi';
import Results from './Results';
import FocusedPerson from './FocusedPerson';

function App() {
  const [searchTerm, setSearchTerm] = Recoil.useRecoilState(swapi.personSearchTermSelector);
  const onSearch = React.useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [setSearchTerm])

  return (
    <>
      <label>Search:</label>
      <input type="text" value={searchTerm} onChange={onSearch} />
      <React.Suspense fallback={<div>...Searching...</div>}>
        <Results />
      </React.Suspense>
      <React.Suspense fallback={<div>...Loading...</div>}>
        <FocusedPerson />
      </React.Suspense>
    </>
  );
}

export default App;
