import { Action } from 'redux';
import { Application, ApplicationRequest } from 'src/models/applications';
import { RoleIcon } from 'src/shared/components/role-icon';

import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';
import { Map, Marker, Popup } from 'mapbox-gl';
import styled from 'styled-components';

const set_map = 'set_map';
const set_loading = 'set_loading';

interface AppMapSetType extends Action<typeof set_map> {
  payload: { map: Map };
}

interface AppMapLoadingType extends Action<typeof set_loading> {
  payload: { loading: boolean };
}

export const setAppMapAction = (map: Map): AppMapSetType => ({
  type: set_map,
  payload: { map },
});

export const setAppMapLoadingAction = (
  loading: boolean
): AppMapLoadingType => ({
  type: set_loading,
  payload: { loading },
});

type State = {
  loading: boolean;
  map: Map;
};

const initState: State = {
  loading: false,
  map: null,
};

export const appMapReducer = (
  state = initState,
  action: AppMapSetType | AppMapLoadingType
): State => {
  switch (action.type) {
    case set_map:
      return {
        ...state,
        map: action.payload.map,
      };

    case set_loading:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export const fetchApplications = (): AppThunk<void> => async (
  dispatch,
  getState
) => {
  dispatch(setAppMapLoadingAction(true));

  try {
    const { data } = await axiosInstance.get<Application[]>('/applications');
    dispatch(setAppMapLoadingAction(false));

    const map = getState().appMapReducer.map;

    data.forEach(({ location, ...item }) => {
      const {
        coordinates: [lng, lat],
      } = location;

      const el = document.createElement('div');
      el.className = item.role_id === 1 ? 'car' : 'passenger';

      var popup = new Popup({ offset: 25 }).setHTML(
        `<a href="tg://resolve?domain=${item.telegram}">Telegram</a>`
      );

      new Marker(el).setLngLat({ lat, lng }).setPopup(popup).addTo(map);
    });
  } catch (error) {
    dispatch(setAppMapLoadingAction(false));
  }
};

export const fetchAddApplication = (
  newApplication: ApplicationRequest
): AppThunk<void> => async (dispatch) => {
  try {
    await axiosInstance.post<Application>('/applications', newApplication);
    dispatch(fetchApplications());
  } catch (error) {}
};
