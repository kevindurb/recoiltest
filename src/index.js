import React from 'react';
import ReactDOM from 'react-dom';
import * as Recoil from 'recoil';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Recoil.RecoilRoot>
      <React.Suspense fallback={<div>loading</div>}>
        <App />
      </React.Suspense>
    </Recoil.RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
