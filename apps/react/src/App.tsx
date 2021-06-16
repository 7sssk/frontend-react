import { createGlobalStyle } from 'styled-components';
import Div100vh from 'react-div-100vh';
import { Apply } from './features/apply/apply';
import { Spinner } from './shared/styled/spinner';
import { AppMap } from './features/map/app-map';
import { useEffect } from 'react';
import { useAppDispatch } from './shared/hooks';
import { fetchApplications, fetchRolesThunk } from './redux';
import { useRequest } from 'use-promise-request';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
  html, body {
    margin: 0;
  }
`;
function App() {
  const dispatch = useAppDispatch();
  const { loading, request } = useRequest();

  useEffect(() => {
    request(
      Promise.all([dispatch(fetchRolesThunk()), dispatch(fetchApplications())])
    );
  }, [dispatch, request]);

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
