import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from 'styled-components';
import { client } from './constants/clientAPI';
import { store } from './app/store';
import theme from './styles/theme';
const AppPromise = import('./App');
const App = React.lazy(() => AppPromise);

ReactDOM.render(
  <React.Suspense fallback={
    <div className="loadingAppNotice">
      Bienvenue 😄 <br/>
      Librairies ... OK !<br/>
      Application ... CHARGEMENT <span className="animatedSpinningBarApp"></span>
    </div>
  }>
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </ApolloProvider>
  </React.Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
