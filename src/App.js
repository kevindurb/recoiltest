import React from 'react';
import * as Recoil from 'recoil';
import * as swapi from './data/swapi';

function App() {
  const person = Recoil.useRecoilValue(swapi.fullPersonSelector('https://swapi.dev/api/people/1/'));
  return (
    <pre>
      {JSON.stringify(person, null, 2)}
    </pre>
  );
}

export default App;
