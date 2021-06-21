import { createGlobalStyle } from 'styled-components';
import Div100vh from 'react-div-100vh';
import { Apply } from './features/apply/apply';
import { Spinner } from './shared/styled/spinner';
import { AppMap } from './features/map/app-map';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks';
import { fetchApplications, fetchRolesThunk } from './redux';
import { useRequest } from 'use-promise-request';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
  html, body {
    margin: 0;
  }

  .car {
    background-image: url('./assets/driver.png');
    width: 50px;
    height: 50px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .passenger {
    background-image: url('./assets/passenger.png');
    width: 50px;
    height: 50px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

`;
function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.appMapReducer);

  useEffect(() => {
    dispatch(fetchRolesThunk());
    dispatch(fetchApplications());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />

      <Div100vh>
        {loading && <Spinner />}
        <AppMap />
        <Apply />
      </Div100vh>
    </>
  );
}

export default App;
