import {
  Button,
  Divider,
  IconButton,
  Link,
  SwipeableDrawer,
} from '@material-ui/core';
import { useState } from 'react';
import { FaHamburger, FaTelegramPlane } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

// import Logo from '/assets/pwa/ios_splash/iphone5_splash.png';

export const SwipeDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onShare = () => {
    //  TODO
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

          <Button fullWidth startIcon={<FaTelegramPlane />}>
            <Link href="tg://resolve?domain=masjidqa"></Link>
          </Button>

          <Button
            fullWidth
            startIcon={<IoMdShare />}
            onClick={onShare}
          ></Button>
        </div>
      </SwipeableDrawer>
    </>
  );
};
