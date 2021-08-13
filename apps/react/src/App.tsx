import Div100vh from 'react-div-100vh';
import { Apply } from './features/apply/apply';
import { Loader } from './shared/styled/loader';
import { AppMap } from './features/map/app-map';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks';
import { fetchRolesThunk, fetchSolatsThunk } from './redux';
import { useRequest } from 'use-promise-request';

function App() {
  const dispatch = useAppDispatch();
  const { loading, request } = useRequest({ isLoading: true });
  const map = useAppSelector((s) => s.appMapReducer);

  useEffect(() => {
    request(
      Promise.all([dispatch(fetchRolesThunk()), dispatch(fetchSolatsThunk())])
    );
  }, [dispatch, request]);

  return (
    <Div100vh>
      <Loader loading={loading} />
      <Loader loading={map.loading} />
      <AppMap />
      <Apply />
    </Div100vh>
  );
}

export default App;
