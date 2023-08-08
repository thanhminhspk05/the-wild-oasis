import { Button, Stack, TextField, styled } from '@mui/material';
import { useState } from 'react';
import Form from '../../ui/Form';
import { useLogin } from './useLogin';
// import FormRowVertical from "../../ui/FormRowVertical";

const CmTextField = styled(TextField)(() => ({
  width: '100%',
  marginBottom: '20px',
}));

function LoginForm() {
  const [email, setEmail] = useState('minh@gmail.com');
  const [password, setPassword] = useState('123456');

  const { mutate, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    mutate({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CmTextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <CmTextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <Stack>
        <Button type="submit">Login</Button>
      </Stack>
    </Form>
  );
}

export default LoginForm;
