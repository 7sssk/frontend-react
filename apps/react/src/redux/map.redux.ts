import { Action } from 'redux';
import { Application, ApplicationRequest } from 'src/models/applications';
import DG from '2gis-maps';
import { RoleIcon } from 'src/shared/components/role-icon';

import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';

const set_map = 'set_map';
const set_loading = 'set_loading';

interface AppMapSetType extends Action<typeof set_map> {
  payload: { map: any };
}

interface AppMapLoadingType extends Action<typeof set_loading> {
  payload: { loading: boolean };
}

export const setAppMapAction = (map: any): AppMapSetType => ({
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
  map: any;
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
      var myIcon = DG.icon({
        iconUrl: '../assets/driver.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94],
      });

      DG.marker([...location.coordinates.reverse()], { icon: myIcon }).addTo(
        map
      );
    });

    DG.marker([]);
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
