import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createCabins } from '../../services/apiCabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import FormRow from './FormRow';

function CreateCabinForm({ cabin }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    values: cabin,
  });
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createMutation } = useMutation({
    mutationFn: (id) => createCabins(id),
    onSuccess: () => {
      toast.success('Cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = handleSubmit((formData) => {
    createMutation({ ...formData, image: formData.image[0] });
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is quired' })}
        />
      </FormRow>

      <FormRow
        label="Max Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is quired',
            min: {
              value: 1,
              message: 'Capacity should be less than 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular Price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is quired',
            min: {
              value: 1,
              message: 'Capacity should be less than 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is quired',
            validate: (value) => value < getValues('regularPrice') || 'Discount can not greater than Price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is quired' })}
        />
      </FormRow>

      <FormRow
        label="image"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: 'This field is quired' })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isCreating}
        >
          {cabin?.name ? 'Edit' : 'Add'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
