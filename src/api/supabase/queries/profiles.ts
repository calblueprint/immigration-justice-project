import { UUID } from 'crypto';
import supabase from '../createClient';
import { Profile } from '../../../types/schema';

export async function fetchProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    throw new Error(`An error occured when trying to read profiles: ${error}`);
  } else {
    // console.log('Profiles Data:', data);
    return data;
  }
}

export async function insertProfile(profileData: Profile) {
  const { error } = await supabase.from('profiles').insert(profileData);
  if (error) {
    throw new Error(`Error inserting profile data: ${error.message}`);
  }
}

export async function updateProfile(id: UUID, updatedInfo: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updatedInfo)
    .eq('user_id', id);

  if (error) {
    throw new Error(`Error updating profile data: ${error.message}`);
  }
}
