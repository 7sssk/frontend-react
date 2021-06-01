import { Role, SetApplyAction } from '../../redux/apply'
import { SpeedDials } from '../../shared/components/fab'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { Dialog } from '@material-ui/core'
import { Map } from '../map'
import styled from 'styled-components'
import { Header } from './components/header'

export const Apply = () => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector((s) => s.applyReducer)

  const onSelectRole = (role: Role) => {
    dispatch(SetApplyAction(role))
  }

  return (
    <>
      <SpeedDials selectRole={onSelectRole} />
      <Dialog open={!!role} onClose={onSelectRole.bind(null, null)} fullScreen>
        <Header role={role} onSelectRole={onSelectRole} />

        {/* <StyledMap>
          <Map container="role-map" />
        </StyledMap> */}
      </Dialog>
    </>
  )
}

const StyledMap = styled.div`
  height: 500px;
  width: 100%;
`
