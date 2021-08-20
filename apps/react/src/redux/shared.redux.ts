import { Action } from 'redux';
import { Role } from 'src/models';
import { Solat } from 'src/models/solat';
import { axiosInstance } from 'src/shared/axios-instance';
import { AppThunk } from './store';

const set_solats = 'set_solats';
const set_selected_role = 'set_selected_role';
const set_roles = 'set_roles';

export const SELECTED_ROLE_ID = 'SELECTED_ROLE_ID';

interface SelectedRoleSetType extends Action<typeof set_selected_role> {
  payload: { roleId: number | null };
}
interface RolesSetType extends Action<typeof set_roles> {
  payload: { roles: Role[] };
}

export const setSelectedRoleAction = (
  roleId: number | null
): SelectedRoleSetType => ({
  type: set_selected_role,
  payload: { roleId },
});

export const setAllRoles = (roles: Role[]): RolesSetType => ({
  type: set_roles,
  payload: { roles },
});
interface SolatsType extends Action<typeof set_solats> {
  payload: { solats: Solat[] };
}

const setSolatsAction = (solats: Solat[]): SolatsType => ({
  type: set_solats,
  payload: { solats },
});

type State = {
  solats: Solat[];
  roles: Role[];
  selectedRole: Role | null;
};

const initState: State = {
  solats: [],
  roles: [],
  selectedRole: null
};

export const sharedReducer = (
  state = initState,
  action: SolatsType | SelectedRoleSetType | RolesSetType
): State => {
  switch (action.type) {
    case set_solats:
      return {
        ...state,
        solats: action.payload.solats,
      };

    case set_roles:
      return {
        ...state,
        roles: action.payload.roles,
      };

    case set_selected_role: {
      const role = state.roles.find((v) => v.id === action.payload.roleId);
      return {
        ...state,
        selectedRole: role,
      };
    }
    default:
      return state;
  }
};

export const fetchSolatsThunk = (): AppThunk<Promise<void>> => async (dispatch) => {
  const { data } = await axiosInstance.get(`/dict/solats`);
  dispatch(setSolatsAction(data));
};

export const fetchRolesThunk = (): AppThunk<Promise<void>> => async (dispatch) => {
  const { data } = await axiosInstance.get<Role[]>(`/dict/roles`);
  dispatch(setAllRoles(data));
  dispatch(setSelectedRoleAction(Number(localStorage.getItem(SELECTED_ROLE_ID))));
};

export const saveSelectedRoleToStorage = (roleId: number) => {
  localStorage.setItem(SELECTED_ROLE_ID, String(roleId));
}