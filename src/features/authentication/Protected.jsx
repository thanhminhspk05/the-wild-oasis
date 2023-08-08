import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useUser } from './useUser';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Protected({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. If NO auth, return login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3.While loading, show a spinner
  if (isLoading) return;
  <FullPage>
    <Spinner />
  </FullPage>;

  // 4. If auth, render th e app
  if (isAuthenticated) return children;
}

export default Protected;
