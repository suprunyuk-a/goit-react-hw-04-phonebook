import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import './index.css';
import { App } from './components/App';
import { theme } from './constants';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);