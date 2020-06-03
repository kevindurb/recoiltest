import React from 'react';
import * as Recoil from 'recoil';
import * as swapi from './data/swapi';

function FocusedPerson() {
  const focusedPersonUrl = Recoil.useRecoilValue(swapi.focusedPersonSelector);
  const focusedPerson = Recoil.useRecoilValue(swapi.fullPersonSelector(focusedPersonUrl))

  if (!focusedPerson) {
    return (
      <>Please select a person...</>
    )
  }

  return (
    <pre>
      {JSON.stringify(focusedPerson, null, 2)}
    </pre>
  );
}

export default FocusedPerson;
