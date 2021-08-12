import { createGlobalStyle } from 'styled-components';
import Div100vh from 'react-div-100vh';
import { Apply } from './features/apply/apply';
import { Spinner } from './shared/styled/spinner';
import { AppMap } from './features/map/app-map';
import { useEffect } from 'react';
import { useAppDispatch } from './shared/hooks';
import { fetchRolesThunk, fetchSolatsThunk } from './redux';
import { useRequest } from 'use-promise-request';
import { theme } from './theme/material-theme';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
  html, body {
    margin: 0;
  }
  i {
    color: ${theme.palette.primary.main}
  }
`;
function App() {
  const dispatch = useAppDispatch();
  const { loading, request } = useRequest({ isLoading: true });

  useEffect(() => {
    request(
      Promise.all([dispatch(fetchRolesThunk()), dispatch(fetchSolatsThunk())])
    );
  }, [dispatch, request]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <GlobalStyle />

      <Div100vh>
        <AppMap />
        <Apply />
      </Div100vh>
    </>
  );
}

export default App;
