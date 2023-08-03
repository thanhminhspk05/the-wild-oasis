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

function CreateCabinForm({ cabin, id }) {
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
    mutationFn: (newData) => createCabins(newData),
    onSuccess: () => {
      toast.success('Cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  // const { isLoading: isEditing, mutate: editMutation } = useMutation({
  //   mutationFn: (newData, id) => createEditCabins(newData, id),
  //   onSuccess: () => {
  //     toast.success('Cabin successfully edited');
  //     queryClient.invalidateQueries({
  //       queryKey: ['cabins'],
  //     });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const isWorking = isCreating;

  const onSubmit = handleSubmit((formData) => {
    console.log(formData.id);
    const image = typeof formData.image === 'string' ? formData.image : formData.image[0];
    if (formData.id) {
      // editMutation({ ...formData, image }, formData.id);
    } else {
      createMutation({ ...formData, image: image });
    }
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="image"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: cabin?.id ? false : 'This field is quired' })}
          disabled={isWorking}
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
          disabled={isWorking}
        >
          {cabin?.id ? 'Edit' : 'Add'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
