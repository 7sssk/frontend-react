import { IconButton, Toolbar, Typography } from '@material-ui/core'
import { FaCar, FaWalking, GrClose } from 'react-icons/all'
import { Role } from '../../../redux'

type Props = {
  role: Role
  onSelectRole: (role: Role) => void
}

export const Header: React.FC<Props> = ({ role, onSelectRole }) => {
  return (
    <Toolbar variant="dense">
      <Typography variant="h6" style={{ flex: 1 }}>
        <RoleIcon role={role} />
      </Typography>
      <IconButton edge="start" onClick={onSelectRole.bind(null, null)}>
        <GrClose />
      </IconButton>
    </Toolbar>
  )
}

const RoleIcon: React.FC<{ role: Role }> = ({ role }) => {
  if (!role) {
    return <div></div>
  }

  return role === 'driver' ? <FaCar size="28px" /> : <FaWalking size="28px" />
}
