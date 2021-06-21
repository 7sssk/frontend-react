import { fetchAddApplication, setSelectedRoleAction } from 'src/redux';
import { SpeedDials, SpeedDialsAction } from 'src/shared/components/fab';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import {
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { RoleIcon } from 'src/shared/components/role-icon';
import { Solat } from 'src/models/solat';
import { axiosInstance } from 'src/shared/axios-instance';
import { useRequest } from 'use-promise-request';
import { Form } from './components/form';
import { ApplicationRequest } from 'src/models/applications';
import { TMSDialogTitle } from 'src/shared/components/dialog-title';

export const Apply = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const dispatch = useAppDispatch();
  const { selectedRole, roles } = useAppSelector((s) => s.roleReducer);

  const { request, loading } = useRequest();
  const [solats, setSolats] = useState<Solat[]>([]);

  const actions = useMemo<SpeedDialsAction[]>(() => {
    return roles.map(({ id, name }) => ({
      icon: <RoleIcon roleId={id} />,
      name,
      roleId: id,
    }));
  }, [roles]);

  useEffect(() => {
    request(getSolats()).then(setSolats);
  }, [request]);

  const onSelectRole = (roleId: number) => {
    dispatch(setSelectedRoleAction(roleId));
  };

  const onSubmit = (v: ApplicationRequest) => {
    dispatch(fetchAddApplication(v));
  };

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
          <TMSDialogTitle onClose={onSelectRole.bind(null, null)}>
            <RoleIcon roleId={selectedRole.id} />
          </TMSDialogTitle>

          <DialogContent>
            {loading ? (
              'loading solats...'
            ) : (
              <Form
                solats={solats}
                roleId={selectedRole.id}
                onSubmit={onSubmit}
              />
            )}
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
    </>
  );
};

const StyledMap = styled.div`
  height: 500px;
  width: 100%;
`;

const getSolats = (): Promise<Solat[]> =>
  axiosInstance.get(`/dict/solats`).then((v) => v.data);
