import React from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { FaCar, FaWalking } from 'react-icons/all'
import styled from 'styled-components'
import { Role } from '../../redux/apply'
import { Backdrop } from '@material-ui/core'

type Action = {
  icon: any
  name: string
  role: Role
}

const actions: Action[] = [
  { icon: <FaCar />, name: 'Driver', role: 'driver' },
  { icon: <FaWalking />, name: 'Passenger', role: 'passanger' },
]

type Props = {
  selectRole: (role: Role) => void
}

export const SpeedDials: React.FC<Props> = ({ selectRole }) => {
  const [open, setOpen] = React.useState(false)

  const handleSelectRole = (role: Role) => {
    selectRole(role)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: 1 }} />
      <C
        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        onClose={setOpen.bind(null, false)}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={action.name}
            onClick={handleSelectRole.bind(null, action.role)}
          />
        ))}
      </C>
    </>
  )
}

const C = styled(SpeedDial)`
  position: absolute;
  bottom: 20%;
  right: 3px;
`
