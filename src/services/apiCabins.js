import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabins(formData, id) {
  const hasImagePath = formData.image?.startWith?.(supabase);

  const imageName = `${Math.random()}-${formData.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath ? formData.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) {
    query.insert([{ ...formData, image: imagePath }]);
  }

  // B) EDIT
  if (id) {
    query.update({ ...formData, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, formData.image);

  // 3.Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
