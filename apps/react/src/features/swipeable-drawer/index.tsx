import {
  Button,
  Divider,
  IconButton,
  Link,
  SwipeableDrawer,
} from '@material-ui/core';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { FaHamburger, FaTelegramPlane } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import { InfoDialog } from './info-dialog';

export const SwipeDrawer = () => {
  const [open, setOpen] = useState(false);
  const [infoDialog, openInfoDialog] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onShare = () => {
    //  TODO
  };

  const toggleInfoDialog = () => {
    openInfoDialog(!infoDialog);
  };

  const openTelegram = () => {
    const el = document.createElement('a');
    el.href = 'https://t.me/masjidqa';
    el.target = '_blank';
    el.click();
  };

  return (
    <>
      <div
        style={{
          background: '#FFF',
          position: 'absolute',
          left: 20,
          top: 20,
          borderRadius: 50,
        }}
      >
        <IconButton color="primary" onClick={toggleDrawer}>
          <FaHamburger />
        </IconButton>
      </div>

      <SwipeableDrawer
        anchor="left"
        disableBackdropTransition
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: '100%',
              height: '100px',
              backgroundImage: 'url(/assets/logo.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <Divider />

          <Button fullWidth onClick={openTelegram}>
            <FaTelegramPlane size="1.5em">
              <Link href="tg://resolve?domain=masjidqa">QA</Link>
            </FaTelegramPlane>
          </Button>

          {/* <Button fullWidth onClick={onShare}>
            <IoMdShare size="1.5em" />
          </Button> */}

          <Button fullWidth onClick={toggleInfoDialog}>
            <BsInfoCircle size="1.5em" />
          </Button>
        </div>
      </SwipeableDrawer>

      <InfoDialog open={infoDialog} onClose={toggleInfoDialog} />
    </>
  );
};
