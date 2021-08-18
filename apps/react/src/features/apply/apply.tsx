import { fetchAddApplication, setSelectedRoleAction } from 'src/redux';
import { SpeedDials, SpeedDialsAction } from 'src/shared/components/fab';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import { useMemo } from 'react';
import { RoleIcon } from 'src/shared/components/role-icon';
import { Form } from './components/form';

import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import { ApplicationRequest } from 'src/models/applications';
import { TMSDialogTitle } from 'src/shared/components/dialog-title';
import { useRequest } from 'use-promise-request';
import { Loader } from 'src/shared/styled/loader';
import styled from 'styled-components';

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
    dispatch(setSelectedRoleAction(roleId));
  };

  const onSubmit = (v: ApplicationRequest) => {
    request(dispatch(fetchAddApplication(v))).then(() => onSelectRole(null));
  };

  // if (!matches) {
  //   return (
  //     <StyledSwipeableBottomSheet
  //       overflowHeight={64}
  //       topShadow={false}
  //       shadowTip={false}
  //       scrollTopAtClose
  //       style={{ zIndex: 2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
  //       bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
  //     >
  //       <div
  //         style={{
  //           height: '80vh',
  //           borderTopLeftRadius: 20,
  //           borderTopRightRadius: 20,
  //           padding: 10,
  //         }}
  //       >
  //         Here goes the content of your bottom sheet
  //       </div>
  //     </StyledSwipeableBottomSheet>
  //   );
  // }

  return (
    <>
      <SpeedDials actions={actions} onSelectRole={onSelectRole} />
      {selectedRole && (
        <Dialog
          open={!!selectedRole}
          onClose={onSelectRole.bind(null, null)}
          fullWidth
          fullScreen={!matches}
        >
          <Loader loading={loading} />
          <TMSDialogTitle onClose={onSelectRole.bind(null, null)}>
            <RoleIcon roleId={selectedRole.id} />
          </TMSDialogTitle>

          <Form solats={solats} roleId={selectedRole.id} onSubmit={onSubmit} />
        </Dialog>
      )}
    </>
  );
};

// const StyledSwipeableBottomSheet = styled(SwipeableBottomSheet)`
//   .ReactSwipeableBottomSheet--closed,
//   .react-swipeable-view-container {
//     border-radius: 20px !important;
//   }
//   .react-swipeable-view-container {
//     box-shadow: none !important;
//   }
// `;
