import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const InfoDialog: FC<Props> = ({ open, onClose }) => {
  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <DialogTitle>
          <IconButton onClick={onClose}>
            <IoMdClose size="1.4em" />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <Typography component="h5" variant="h5">
            Бесплатное приложение с открытым исходным{' '}
            <Typography
              component="a"
              variant="h5"
              href="https://github.com/toMasjid"
            >
              кодом
            </Typography>{' '}
            и всегда без рекламы
          </Typography>
          <Typography component="h1">
            made in <b>Qazaqstan</b>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
