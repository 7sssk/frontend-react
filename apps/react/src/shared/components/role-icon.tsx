import { FaCar, FaWalking } from 'react-icons/all';

export const RoleIcon: React.FC<{ roleId: number }> = ({ roleId }) => {
  if (!roleId) {
    return <div></div>;
  }

  return roleId === 1 ? (
    <i className="fas fa-car fa-2x"></i>
  ) : (
    <i className="fas fa-walking fa-2x"></i>
  );
};
