import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signup } from '../../services/apiAuth';

export function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success('Create success');
    },
    onError: (err) => {
      toast.console.error('Create faild', err);
    },
  });

  return { mutate, isLoading };
}
