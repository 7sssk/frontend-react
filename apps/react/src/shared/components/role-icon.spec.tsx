import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RoleIcon } from './role-icon';

describe('RoleIconCoomponent', () => {
  test('CarIcon', () => {
    const { getByText, queryByText, asFragment, getByTestId } = render(
      <RoleIcon roleId={2} />
    );

    const walkIcon = getByTestId('walk');

    expect(walkIcon).toBeInTheDocument();
  });

  test('WalkIcon', () => {
    const { getByText, queryByText, asFragment, getByTestId } = render(
      <RoleIcon roleId={1} />
    );

    const carIcon = getByTestId('car');

    expect(carIcon).toBeInTheDocument();
  });
});
