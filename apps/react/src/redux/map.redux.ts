import { Action } from 'redux';
import { Application } from 'src/models/applications';
import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';

const set_map = 'set_map';

interface AppMapSetType extends Action<typeof set_map> {
  payload: { map: any };
}

export const setAppMapAction = (map: any): AppMapSetType => ({
  type: set_map,
  payload: { map },
});

type State = {
  map: any;
};

const initState = {
  map: null,
};

export const appMapReducer = (
  state = initState,
  action: AppMapSetType
): State => {
  switch (action.type) {
    case set_map:
      return {
        ...state,
        map: action.payload.map,
      };

    default:
      return state;
  }
};

export const fetchApplications = (): AppThunk<void> => async (
  dispatch,
  getState
) => {
  const { data } = await axiosInstance.get<Application[]>('/applications');

  const map = getState().appMapReducer.map;
};

export const fetchAddApplication = (
  newApplication: Application
): AppThunk<void> => async (dispatch, getState) => {
  const { data } = await axiosInstance.post<Application[]>(
    '/applications',
    newApplication
  );

  const map = getState().appMapReducer.map;
};
