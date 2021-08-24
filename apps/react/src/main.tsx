import 'flexboxgrid/css/flexboxgrid.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css/animate.min.css';

import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider as MAterialThemeProvider } from '@material-ui/core';
import { theme } from './theme/material-theme';
import { IconContext } from 'react-icons';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .primary {
    color: ${theme.palette.primary.main}
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <MAterialThemeProvider theme={theme}>
      <IconContext.Provider
        value={{ color: theme.palette.primary.main, size: '1em' }}
      >
        <GlobalStyle />
        <App />
      </IconContext.Provider>
    </MAterialThemeProvider>
  </Provider>,
  document.getElementById('root')
);
