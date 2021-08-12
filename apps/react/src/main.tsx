import 'flexboxgrid/css/flexboxgrid.min.css';

import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { IconContext } from 'react-icons';
import { ThemeProvider as MAterialThemeProvider } from '@material-ui/core';
import { theme } from './theme/material-theme';

ReactDOM.render(
  <Provider store={store}>
    <MAterialThemeProvider theme={theme}>
      <IconContext.Provider
        value={{ style: { color: theme.palette.primary.main }, size: '20px' }}
      >
        <App />
      </IconContext.Provider>
    </MAterialThemeProvider>
  </Provider>,
  document.getElementById('root')
);
