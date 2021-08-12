import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Button,
  TextField,
  Divider,
} from '@material-ui/core';
import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ApplicationRequest } from 'src/models/applications';
import { LatLng } from 'src/models/map.model';
import { Solat } from 'src/models/solat';
import styled from 'styled-components';
import { ApplicationMap } from './map';

type Props = {
  solats: Solat[];
  roleId: number;
  onSubmit: (v: ApplicationRequest) => void;
};

export const Form: FC<Props> = ({ solats, roleId, onSubmit }) => {
  const { handleSubmit, control, formState } = useForm<ApplicationRequest>({
    defaultValues: {
      location: [],
      comment: '',
      return: false,
      solat_id: 1,
      telegram: '',
      role_id: roleId,
      huruj_date: '',
    },
  });

  const [latlng, setLatlng] = useState<LatLng>({ lat: null, lng: null });

  return (
    <>
      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <ApplicationMap onClick={setLatlng} />
      </div>

      <Divider />

      <StyledForm
        onSubmit={handleSubmit((data) => {
          onSubmit({ ...data, location: [latlng.lng, latlng.lat] });
        })}
      >
        <FormControl variant="outlined" required>
          <InputLabel>Solat</InputLabel>
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

        <Controller
          name="huruj_date"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                label="Date"
                type="date"
                required
              />
            );
          }}
        />

        <Controller
          name="telegram"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Telegram"
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Comment"
              variant="outlined"
            />
          )}
        />

        <Controller
          name="return"
          control={control}
          render={({ field }) => {
            return (
              <FormControlLabel
                control={<Checkbox color="primary" {...field} />}
                label="Return"
              />
            );
          }}
        />

        <Button
          color="primary"
          variant="contained"
          disableElevation
          disableRipple
          type="submit"
          disabled={!latlng.lat || !latlng.lng}
        >
          send
        </Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  > * {
    margin-bottom: 10px !important;
  }
  overflow-y: auto;
`;
