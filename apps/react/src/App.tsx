import Div100vh from 'react-div-100vh';
import { Apply } from './features/apply/apply';
import { Loader } from './shared/styled/loader';
import { AppMap } from './features/map/app-map';
import { useEffect } from 'react';
import { useAppDispatch } from './shared/hooks';
import {
  fetchApplicationsThunk,
  fetchRolesThunk,
  fetchSolatsThunk,
} from './redux';
import { useRequest } from 'use-promise-request';

function App() {
  const dispatch = useAppDispatch();
  const { loading, request } = useRequest({ isLoading: true });

  useEffect(() => {
    request(
      Promise.all([
        dispatch(fetchApplicationsThunk),
        dispatch(fetchSolatsThunk()),
        dispatch(fetchRolesThunk()),
      ])
    );
  }, [request, dispatch]);

  return (
    <Div100vh>
      <Loader loading={loading} />
      <AppMap />

      {!loading && (
        <>
          <Apply />
        </>
      )}
    </Div100vh>
  );
}

export default App;
