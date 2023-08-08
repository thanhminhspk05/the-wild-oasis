import React from 'react';
import Button from '../../ui/Button';
import { useLogout } from './useLogout';

function Logout() {
  const { mutate, isLoading } = useLogout();

  return (
    <Button
      onClick={mutate}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}

export default Logout;
