import { Controller, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { CmTextField } from './LoginForm';
import { useSignUp } from './useSignup';

// Email regex: /\S+@\S+\.\S+/
const initialValues = {
  fullName: '',
  email: '',
  password: '',
  repeatPw: '',
};

function SignupForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });

  const { mutate, isLoading } = useSignUp();

  const onSubmit = handleSubmit(({ fullName, email, password }) => {
    mutate(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  });

  return (
    <>
      <Controller
        name={'fullName'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Full Name"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name={'email'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Email Address"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name={'password'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Password"
            value={value}
            onChange={onChange}
            helperText={'lalaa'}
          />
        )}
      />

      <Controller
        name={'repeatPw'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Repeat Password"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button
        onClick={onSubmit}
        disabled={isLoading}
      >
        Create new user
      </Button>
    </>
  );
}

export default SignupForm;
