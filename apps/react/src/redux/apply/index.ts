const set_apply_role = 'set_apply_type'

export type Role = 'driver' | 'passanger'

type ApplyActionType = {
  type: typeof set_apply_role
  payload: { role: Role }
}

export const SetApplyAction = (role: Role): ApplyActionType => ({
  type: set_apply_role,
  payload: { role },
})

type State = {
  role: Role | null
}

const initState: State = {
  role: null,
}

export const applyReducer = (state = initState, action: ApplyActionType): State => {
  switch (action.type) {
    case set_apply_role:
      return {
        ...state,
        role: action.payload.role,
      }

    default:
      return state
  }
}
