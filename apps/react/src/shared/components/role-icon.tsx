import { FaCar, FaWalking } from 'react-icons/all';

export const RoleIcon: React.FC<{ roleId: number }> = ({ roleId }) => {
  if (!roleId) {
    return <div></div>;
  }

  return roleId === 1 ? <FaCar size="28px" /> : <FaWalking size="28px" />;
};
