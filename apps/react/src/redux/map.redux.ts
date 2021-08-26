import { Action } from 'redux';
import { Application, ApplicationRequest } from 'src/models/applications';

import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';
import { Map, Marker, Popup } from 'mapbox-gl';
import { theme } from 'src/theme/material-theme';

const set_map = 'set_map';

export const SET_USER_TELEGRAM = 'SET_USER_TELEGRAM';

interface AppMapSetType extends Action<typeof set_map> {
  payload: { map: Map };
}

export const setAppMapAction = (map: Map): AppMapSetType => ({
  type: set_map,
  payload: { map },
});

type State = {
  map: Map;
};

const initState: State = {
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

export const fetchApplicationsThunk = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axiosInstance.get<Application[]>('/applications');

    const map = getState().appMapReducer.map;

    data.forEach(({ location, role_id, solat_id, ...item }) => {
      const {
        coordinates: [lng, lat],
      } = location;

      const el = document.createElement('div');
      el.className =
        role_id === 1 ? 'fas fa-car fa-3x primary' : 'fas fa-walking fa-3x primary';

      const popup = new Popup({ offset: 25, focusAfterOpen: true, closeButton: false }).setHTML(
        `
        <div>
          <h4>${getState().sharedReducer.solats.find(({ id }) => id === solat_id)
          ?.name.toUpperCase()
        }</h4>
        </div>
        
        <div>
          <h4><a href="https://t.me/${item.telegram}" target="_blank">Telegram</a></h4>
        </div>
        
        <div>
          <a>Вернусь: ${item.return ? 'Да' : 'Нет'}</a>
        </div>
        `
      );

      new Marker({element: el}).setLngLat({ lat, lng }).setPopup(popup).addTo(map);
    });
  } catch (error) {
  }
};

export const fetchAddApplication = (
  newApplication: ApplicationRequest
): AppThunk<Promise<Application>> => async (dispatch) => {

  localStorage.setItem(SET_USER_TELEGRAM, newApplication.telegram);

  const { data } = await axiosInstance.post<Application>(
    '/applications',
    newApplication
  );
  dispatch(fetchApplicationsThunk());

  return data;
};
