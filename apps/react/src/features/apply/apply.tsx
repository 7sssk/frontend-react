import {
  fetchAddApplication,
  saveSelectedRoleToStorage,
  setSelectedRoleAction,
} from 'src/redux';
import { SpeedDials, SpeedDialsAction } from 'src/shared/components/fab';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import {
  Button,
  Dialog,
  Divider,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useMemo, useRef, useState, useEffect } from 'react';
import { RoleIcon } from 'src/shared/components/role-icon';
import { Form } from './components/form';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { ApplicationRequest } from 'src/models/applications';
import { TMSDialogTitle } from 'src/shared/components/dialog-title';
import { useRequest } from 'use-promise-request';
import { Loader } from 'src/shared/styled/loader';
import styled from 'styled-components';
import { ApplicationMap } from './components/map';
import { LatLng } from 'src/models/map.model';

export const Apply = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const dispatch = useAppDispatch();
  const { selectedRole, roles } = useAppSelector((s) => s.sharedReducer);
  const { solats } = useAppSelector((s) => s.sharedReducer);

  const { request, loading } = useRequest();

  const actions = useMemo<SpeedDialsAction[]>(() => {
    return roles.map(({ id, name }) => ({
      icon: <RoleIcon roleId={id} />,
      name,
      roleId: id,
    }));
  }, [roles]);

  const onSelectRole = (roleId: number) => {
    saveSelectedRoleToStorage(roles.find((roles) => roles.id === roleId));
    dispatch(setSelectedRoleAction(roleId));
  };

  const onSubmit = (v: ApplicationRequest) => {
    request(dispatch(fetchAddApplication(v))).then(() => onSelectRole(null));
  };

  const [isOpen, setOpen] = useState(false);
  const onToggleSheet = () => {
    setOpen(!isOpen);
  };

  const [mapDilaogIsOpen, setMapDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<LatLng>();

  const onSelectPosition = (v: LatLng) => {
    console.log('🚀 ~ file: apply.tsx ~ line 64 ~ onSelectPosition ~ v', v);
    setSelectedPosition(v);
    setMapDialogOpen(false);
  };

  return (
    <>
      <StyledSwipeableBottomSheet
        open={isOpen}
        overflowHeight={65}
        topShadow={false}
        shadowTip={false}
        scrollTopAtClose
        style={{ zIndex: 2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        onChange={onToggleSheet}
      >
        <div
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            maxHeight: '80vh',
            overflowX: 'hidden',
          }}
        >
          <div className="row center-xs top-xs">
            <div className="col-xs-12">
              <i
                className="fas fa-grip-lines fa-lg"
                style={{ color: '#777777bc' }}
              ></i>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                disableRipple
                onClick={onToggleSheet}
              >
                To Masjid?
              </Button>
            </div>
          </div>
          <div className="row around-xs" style={{ marginTop: 10 }}>
            {roles.map((role) => (
              <div className="col-xs-6" key={role.id.toString()}>
                <Button
                  variant="outlined"
                  disableElevation
                  disableRipple
                  fullWidth
                  color="primary"
                  onClick={onSelectRole.bind(null, role.id)}
                >
                  <RoleIcon roleId={role.id} />
                </Button>
              </div>
            ))}
          </div>

          {selectedRole?.id && (
            <div>
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-xs-8 col-sm-4">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={setMapDialogOpen.bind(null, true)}
                  >
                    Select your position
                  </Button>
                </div>
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-xs-12">
                  <Form
                    solats={solats}
                    roleId={selectedRole.id}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </StyledSwipeableBottomSheet>

      <Dialog
        open={mapDilaogIsOpen}
        onClose={setMapDialogOpen.bind(null, false)}
        fullScreen
      >
        <ApplicationMap onClick={onSelectPosition} />
      </Dialog>
    </>
  );

  // return (
  //   <>
  //     <SpeedDials actions={actions} onSelectRole={onSelectRole} />
  //     {selectedRole && (
  //       <Dialog
  //         open={!!selectedRole}
  //         onClose={onSelectRole.bind(null, null)}
  //         fullWidth
  //         fullScreen={!matches}
  //       >
  //         <Loader loading={loading} />
  //         <TMSDialogTitle onClose={onSelectRole.bind(null, null)}>
  //           <RoleIcon roleId={selectedRole.id} />
  //         </TMSDialogTitle>

  //         <Form solats={solats} roleId={selectedRole.id} onSubmit={onSubmit} />
  //       </Dialog>
  //     )}
  //   </>
  // );
};

const StyledSwipeableBottomSheet = styled(SwipeableBottomSheet)`
  .ReactSwipeableBottomSheet--closed,
  .react-swipeable-view-container {
    border-radius: 20px !important;
  }
  .react-swipeable-view-container {
    box-shadow: none !important;
  }
`;
