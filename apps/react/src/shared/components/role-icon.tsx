import { FaCar, FaWalking } from 'react-icons/fa';

export const RoleIcon: React.FC<{ roleId: number }> = ({ roleId }) => {
  if (!roleId) {
    return <div></div>;
  }

  return roleId === 1 ? (
    <FaCar size="1em" data-testid="car" />
  ) : (
    <FaWalking data-testid="walk" />
  );
};
