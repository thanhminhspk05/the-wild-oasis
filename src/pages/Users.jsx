import { Stack } from '@mui/material';
import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>

      <Stack width="50%">
        <SignupForm />
      </Stack>
    </>
  );
}

export default NewUsers;
