import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { MapProvider } from './map/app-map';
import { IconContext } from 'react-icons';
import { ThemeProvider as MAterialThemeProvider } from '@material-ui/core';
import { theme } from './theme/material-theme';

ReactDOM.render(
  <Provider store={store}>
    <MapProvider>
      <IconContext.Provider value={{ style: {}, size: '20px' }}>
        <MAterialThemeProvider theme={theme}>
          <App />
        </MAterialThemeProvider>
      </IconContext.Provider>
    </MapProvider>
  </Provider>,
  document.getElementById('root')
);
