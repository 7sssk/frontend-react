import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Button,
  TextField,
} from '@material-ui/core';
import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ApplicationRequest } from 'src/models/applications';
import { LatLng } from 'src/models/map.model';
import { Solat } from 'src/models/solat';
import { SET_USER_TELEGRAM } from 'src/redux';
import styled from 'styled-components';

type Props = {
  solats: Solat[];
  roleId: number;
  onSubmit: (v: ApplicationRequest) => void;
  latlng: LatLng;
};

export const Form: FC<Props> = ({ solats, roleId, latlng, onSubmit }) => {
  const { handleSubmit, control, formState } = useForm<ApplicationRequest>({
    defaultValues: {
      location: [],
      comment: '',
      return: false,
      solat_id: 1,
      telegram: localStorage.getItem(SET_USER_TELEGRAM) || '',
      role_id: roleId,
    },
  });

  return (
    <>
      <StyledForm
        onSubmit={handleSubmit((data) => {
          onSubmit({ ...data, location: [latlng.lng, latlng.lat] });
        })}
      >
        <div>
          <FormControl variant="outlined" required fullWidth>
            <InputLabel>Намаз</InputLabel>
            <Controller
              name="solat_id"
              control={control}
              render={({ field }) => {
                return (
                  <Select native {...field} label="Solat">
                    {solats.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </Select>
                );
              }}
            />
          </FormControl>
        </div>

        <div>
          <Controller
            name="telegram"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                id="outlined-basic"
                label="Telegram для связи с вами"
                variant="outlined"
                required
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                id="outlined-basic"
                label="Коментарии"
                variant="outlined"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="return"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Checkbox color="primary" {...field} />}
                  label="Вернетесь назад?"
                />
              );
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disableElevation
            disableRipple
            type="submit"
            disabled={!latlng || !roleId || !formState.isValid}
          >
            В Мечеть
          </Button>
        </div>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 10px !important;
  }
  overflow-y: auto;
`;
