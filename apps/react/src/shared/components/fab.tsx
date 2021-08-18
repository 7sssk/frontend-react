import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import styled from 'styled-components';
import { Backdrop } from '@material-ui/core';

export type SpeedDialsAction = {
  icon: any;
  name: string;
  roleId: number;
};

type Props = {
  onSelectRole: (roleId: number) => void;
  actions: SpeedDialsAction[];
};

export const SpeedDials: React.FC<Props> = ({ onSelectRole, actions }) => {
  const [open, setOpen] = React.useState(false);

  const handleSelectRole = (roleId: number) => {
    setOpen(false);
    onSelectRole(roleId);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Backdrop open={open} style={{ zIndex: 1 }} />
      <C
        ariaLabel="apply"
        icon={<SpeedDialIcon />}
        onClose={setOpen.bind(null, false)}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
        color="primary"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name.toUpperCase()}
            onClick={handleSelectRole.bind(null, action.roleId)}
          />
        ))}
      </C>
    </>
  );
};

const C = styled(SpeedDial)`
  position: absolute;
  bottom: 20%;
  right: 3px;
`;
