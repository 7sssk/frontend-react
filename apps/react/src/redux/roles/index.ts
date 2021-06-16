import { Action } from 'redux';
import { axiosInstance } from 'src/shared/axios-instance';
import { Role } from '../../models/role';
import { AppThunk } from '../store';

const set_selected_role = 'set_selected_role';
const set_roles = 'set_roles';

interface SelectedRoleSetType extends Action<typeof set_selected_role> {
  payload: { roleId: number };
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

type State = {
  roles: Role[];
  selectedRole: Role | null;
};

const initState: State = {
  selectedRole: null,
  roles: [],
};

export const roleReducer = (
  state = initState,
  action: SelectedRoleSetType | RolesSetType
): State => {
  switch (action.type) {
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

export const fetchRolesThunk = (): AppThunk<void> => async (dispatch) => {
  const { data } = await axiosInstance.get<Role[]>(`/dict/roles`);
  dispatch(setAllRoles(data));
};
