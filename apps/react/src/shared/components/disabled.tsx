import styled from 'styled-components';

export const DisabledContainer = ({ disabled, children }) => {
  if (disabled) {
    return <C>{children}</C>;
  }
  return <div>{children}</div>;
};

const C = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #e6e6e6;
  opacity: 0.5;
  pointer-events: none;
`;
