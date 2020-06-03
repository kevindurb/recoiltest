import React from 'react';
import * as Recoil from 'recoil';
import * as swapi from './data/swapi';

function Result({ result }) {
  const [, setFocusedPerson] = Recoil.useRecoilState(swapi.focusedPersonSelector);
  const onClick = React.useCallback(() => {
    setFocusedPerson(result.url);
  }, [result.url, setFocusedPerson])
  return (
    <button onClick={onClick}>{result.name}</button>
  )
}

function Results() {
  const searchResults = Recoil.useRecoilValue(swapi.personSearchResultsSelector);
  return (
    <div>
      {searchResults.results.map((result) => (
        <Result result={result}/>
      ))}
    </div>
  )
}

export default Results;
