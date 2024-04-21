import { UUID } from 'crypto';
import { Profile, ProfileLanguage, ProfileRole } from '@/types/schema';
import supabase from '../createClient';

export async function upsertProfile(profile: Profile) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select();

  if (error) throw new Error(`Error upserting profile data: ${error.message}`);

  return data[0];
}

export async function fetchProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) throw new Error(`Error reading profiles: ${error.message}`);

  return data;
}

export async function fetchProfileById(userId: UUID) {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', userId);
  if (error) throw new Error(`Error fetching profile by ID: ${error.message}`);

  return data[0];
}

export async function insertProfile(profileData: Profile) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select();
  if (error) {
    throw new Error(`Error inserting profile data: ${error.message}`);
  }

  return data[0];
}

export async function updateProfile(
  userId: UUID,
  updatedInfo: Partial<Profile>,
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updatedInfo)
    .eq('user_id', userId)
    .select();

  if (error) {
    throw new Error(`Error updating profile data: ${error.message}`);
  }

  return data[0];
}

// profiles-languages
export async function fetchLanguagesById(userId: UUID) {
  const { data, error } = await supabase
    .from('profiles-languages')
    .select()
    .eq('user_id', userId);

  if (error) throw new Error(`Error fetching languages: ${error.message}`);

  return data;
}

export async function deleteLanguages(
  userId: UUID,
  deleteInfo: ProfileLanguage[],
) {
  const { error } = await supabase
    .from('profiles-languages')
    .delete()
    .eq('user_id', userId)
    .in(
      'language_name',
      Array.from(new Set(deleteInfo.map(i => i.language_name))),
    );

  if (error)
    throw new Error(`Error deleting profiles-languages: ${error.message}`);
}

export async function insertLanguages(languages: ProfileLanguage[]) {
  const { data, error } = await supabase
    .from('profiles-languages')
    .insert(languages)
    .select();

  if (error)
    throw new Error(`Error inserting to profiles-languages: ${error.message}`);

  return data;
}

export async function upsertLanguages(updatedInfo: ProfileLanguage[]) {
  const { data, error } = await supabase
    .from('profiles-languages')
    .upsert(updatedInfo)
    .select();

  if (error)
    throw new Error(`Error updating profiles-languages: ${error.message}`);

  return data;
}

// profiles-roles
export async function fetchRolesById(userId: UUID) {
  const { data, error } = await supabase
    .from('profiles-roles')
    .select()
    .eq('user_id', userId);

  if (error) throw new Error(`Error fetching roles: ${error.message}`);

  return data;
}

export async function deleteRoles(userId: UUID, deleteInfo: ProfileRole[]) {
  const { error } = await supabase
    .from('profiles-roles')
    .delete()
    .eq('user_id', userId)
    .in('role', Array.from(new Set(deleteInfo.map(i => i.role))));

  if (error) throw new Error(`Error deleting profiles-roles: ${error.message}`);
}

export async function insertRoles(roles: ProfileRole[]) {
  const { data, error } = await supabase
    .from('profiles-roles')
    .insert(roles)
    .select();

  if (error) throw new Error(`Error updating profiles-roles: ${error.message}`);

  return data;
}

export async function upsertRoles(updatedInfo: ProfileRole[]) {
  const { data, error } = await supabase
    .from('profiles-roles')
    .upsert(updatedInfo)
    .select();

  if (error) throw new Error(`Error updating profiles-roles: ${error.message}`);

  return data;
}
