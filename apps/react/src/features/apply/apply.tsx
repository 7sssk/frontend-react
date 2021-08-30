import {
  fetchAddApplication,
  // saveSelectedRoleToStorage,
  setSelectedRoleAction,
} from 'src/redux';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { Button, Dialog, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { Form } from './components/form';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { ApplicationRequest } from 'src/models/applications';
import { useRequest } from 'use-promise-request';
import { Loader } from 'src/shared/styled/loader';
import styled from 'styled-components';
import { ApplicationMap } from './components/map';
import { LatLng } from 'src/models/map.model';
import { FaMapMarkedAlt, FaMinus } from 'react-icons/fa';
import { PropTypes } from '@material-ui/core';
import { IoReorderTwoOutline } from 'react-icons/io5';
import { DisabledContainer } from 'src/shared/components/disabled';

export const Apply = () => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedRole, roles } = useAppSelector((s) => s.sharedReducer);
  const { solats } = useAppSelector((s) => s.sharedReducer);

  const { request, loading } = useRequest();

  const onSelectRole = (roleId: number) => {
    // saveSelectedRoleToStorage(roleId);
    dispatch(setSelectedRoleAction(roleId));
  };

  const onSubmit = (v: ApplicationRequest) => {
    request(dispatch(fetchAddApplication(v))).then(() => {
      onToggleSheet();
    });
  };

  const [buttonColor, setButtonColor] = useState<PropTypes.Color>('primary');

  const [isOpen, setOpen] = useState(false);
  const onToggleSheet = () => {
    const root = document.getElementById('root');
    root.style.marginTop = !isOpen ? '13px' : '0px';
    setButtonColor(isOpen ? 'primary' : 'default');
    setOpen(!isOpen);
  };

  const [mapDilaogIsOpen, setMapDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<LatLng>();

  const onSelectPosition = (v: LatLng) => {
    setSelectedPosition(v);
    setMapDialogOpen(false);
  };

  return (
    <>
      <StyledSwipeableBottomSheet
        open={isOpen}
        overflowHeight={75}
        topShadow={false}
        shadowTip={false}
        scrollTopAtClose
        style={{ zIndex: 2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        onChange={onToggleSheet}
      >
        <Loader loading={loading} />
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
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-xs-12">
              <Button
                variant="contained"
                color={buttonColor}
                fullWidth
                disableElevation
                disableRipple
                onClick={onToggleSheet}
              >
                Намаз в Мечети?
              </Button>
            </div>
          </div>
          {!selectedRole && (
            <div className="row">
              <div className="col-xs-12">
                <small style={{ color: palette.secondary.main }}>
                  На машине или пешком?
                </small>
              </div>
            </div>
          )}
          <div className="row around-xs">
            {roles.map((role) => (
              <div className="col-xs-6" key={role.id.toString()}>
                <Button
                  variant={getRoleSelectBtnVariant(selectedRole?.id, role.id)}
                  disableElevation
                  disableRipple
                  fullWidth
                  color={selectedRole?.id === role.id ? 'primary' : 'default'}
                  onClick={onSelectRole.bind(null, role.id)}
                >
                  {role.name_ru}
                </Button>
              </div>
            ))}
          </div>

          <DisabledContainer disabled={!selectedRole}>
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-xs-8 col-sm-4">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  disableRipple
                  color={!selectedPosition ? 'primary' : 'default'}
                  endIcon={<FaMapMarkedAlt color="#FFF" />}
                  onClick={setMapDialogOpen.bind(null, true)}
                >
                  Укажите где вы
                </Button>
              </div>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-xs-12">
                <Form
                  solats={solats}
                  roleId={selectedRole?.id}
                  latlng={selectedPosition}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </DisabledContainer>
        </div>
      </StyledSwipeableBottomSheet>

      <Dialog
        open={mapDilaogIsOpen}
        onClose={setMapDialogOpen.bind(null, false)}
        fullScreen
      >
        <ApplicationMap
          onClose={setMapDialogOpen.bind(null, false)}
          onClick={onSelectPosition}
        />
      </Dialog>
    </>
  );
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

const getRoleSelectBtnVariant = (
  selectedRoleId: number,
  roleId: number
): 'text' | 'outlined' | 'contained' => {
  if (!selectedRoleId) {
    return 'outlined';
  }

  return selectedRoleId === roleId ? 'outlined' : 'text';
};
