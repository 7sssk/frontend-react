import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import { MapProvider } from './map/app-map';
import { IconContext } from 'react-icons';
import {
  Theme,
  ThemeProvider as MAterialThemeProvider,
} from '@material-ui/core';
import { theme } from './theme/material-theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <Provider store={store}>
    {/* <MapProvider> */}
    <MAterialThemeProvider theme={theme}>
      <IconContext.Provider
        value={{ style: { color: theme.palette.primary.main }, size: '20px' }}
      >
        <App />
      </IconContext.Provider>
    </MAterialThemeProvider>
    {/* </MapProvider> */}
  </Provider>,
  document.getElementById('root')
);
