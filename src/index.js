import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Progress from './components/Progress/Progress';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Progress />} persistor={persistor}>
        <HashRouter>
          <BrowserRouter basename="/goit-react-hw-08-phonebook/">
            <App />
          </BrowserRouter>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
