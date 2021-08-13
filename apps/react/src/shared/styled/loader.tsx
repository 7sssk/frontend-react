import { useTheme, LinearProgress } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

export const Loader: FC<{ loading: boolean }> = ({ loading }) => {
  const {
    palette: { primary },
  } = useTheme();
  return (
    <C
      loading={loading}
      className="animate__animated animate__fadeOut animate__fadeIn"
    >
      <div className="row">
        <div
          className="col-3"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 200,
            background: '#fff',
            height: 50,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <LinearProgress
            style={{ width: '100%', height: 6 }}
            color="primary"
          />
        </div>
      </div>
    </C>
  );
};

const C = styled.div<{ loading: boolean }>`
  display: ${(p) => (p.loading ? 'flex' : 'none')};
  background: #c4c4c4b1;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 10000;
  width: 100%;
`;
