export const RoleIcon1: React.FC<{ roleId: number }> = ({ roleId }) => {
  if (!roleId) {
    return <div></div>;
  }

  return roleId === 1 ? <div>1</div> : <div>3</div>;
};
