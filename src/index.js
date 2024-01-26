import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
// const SALAD = "salad";
// const MEAL = "meal";
const element = document.getElementById('root');
let parsed = {};
for (let e in element.dataset) {
  parsed = { ...parsed, [e]: element.dataset[e] };
}
const props = Object.assign({}, parsed);
const root = createRoot(element);

root.render(
  <App
    // formType={
    //     new URLSearchParams(window.location.search).get("form") || MEAL
    // }
    // homeUrl={`http://fitaxx.test`}
    {...props}
  />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
