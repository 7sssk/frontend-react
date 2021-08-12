import { Action } from 'redux';
import { Application, ApplicationRequest } from 'src/models/applications';

import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';
import { Map, Marker, Popup } from 'mapbox-gl';
import { theme } from 'src/theme/material-theme';

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
          <h4>${
            getState().sharedReducer.solats.find(({ id }) => id === solat_id)
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
    dispatch(setAppMapLoadingAction(false));
  }
};

export const fetchAddApplication = (
  newApplication: ApplicationRequest
): AppThunk<void> => async (dispatch) => {
  await axiosInstance.post<Application>('/applications', newApplication);
  dispatch(fetchApplications());
};
