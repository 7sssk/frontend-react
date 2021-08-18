import 'flexboxgrid/css/flexboxgrid.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css/animate.min.css';

import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider as MAterialThemeProvider } from '@material-ui/core';
import { theme } from './theme/material-theme';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .fas, .fab {
    color: ${theme.palette.primary.main} !important;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <MAterialThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <App />
      </>
    </MAterialThemeProvider>
  </Provider>,
  document.getElementById('root')
);
