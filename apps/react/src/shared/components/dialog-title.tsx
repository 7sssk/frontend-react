import { DialogTitle, DialogTitleProps, Divider } from '@material-ui/core';
import { FC } from 'react';
import { GrClose } from 'react-icons/all';
import styled from 'styled-components';

interface Props extends DialogTitleProps {
  onClose: () => void;
}

export const TMSDialogTitle: FC<Props> = ({ onClose, children, ...res }) => {
  return (
    <>
      <DialogTitle {...res}>
        <C>
          <div style={{ flex: 1 }}>{children}</div>
          <GrClose onClick={onClose} style={{ cursor: 'pointer' }} />
        </C>
      </DialogTitle>
      <Divider />
    </>
  );
};

const C = styled.div`
  display: flex;
  align-items: center;
`;
