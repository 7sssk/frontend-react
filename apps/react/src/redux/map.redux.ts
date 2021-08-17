import { Action } from 'redux';
import { Application, ApplicationRequest } from 'src/models/applications';

import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';
import { Map, Marker, Popup } from 'mapbox-gl';

const set_map = 'set_map';

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
        role_id === 1 ? 'fas fa-car fa-3x' : 'fas fa-walking fa-3x';

      const popup = new Popup({ offset: 25 }).setHTML(
        `
        <div>
          <h4>${getState().sharedReducer.solats.find(({ id }) => id === solat_id)
          ?.name
        }</h4>
        </div>
        
        <div>
          <a href="tg://resolve?domain=${item.telegram}">Telegram</a>
        </div>
        
        <div>
          <a>Return: ${item.return ? 'Yes' : 'No'}</a>
        </div>
        `
      );

      new Marker(el).setLngLat({ lat, lng }).setPopup(popup).addTo(map);
    });
  } catch (error) {
  }
};

export const fetchAddApplication = (
  newApplication: ApplicationRequest
): AppThunk<Promise<Application>> => async (dispatch) => {
  const { data } = await axiosInstance.post<Application>(
    '/applications',
    newApplication
  );
  dispatch(fetchApplicationsThunk());

  return data;
};
