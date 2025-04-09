import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Profile helpers
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

// Portfolio helpers
export const getPortfolio = async (userId) => {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const addPortfolioItem = async (userId, item) => {
  const { data, error } = await supabase
    .from('portfolio')
    .insert([{ ...item, user_id: userId }]);
  return { data, error };
};

// Media helpers
export const getMedia = async (userId) => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const uploadMedia = async (file, userId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (uploadError) {
    return { error: uploadError };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from('media')
    .insert([{
      user_id: userId,
      url: publicUrl,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      caption: file.name
    }]);

  return { data, error };
};

// Followers helpers
export const getFollowers = async (userId) => {
  const { data, error } = await supabase
    .from('followers')
    .select(`
      follower:profiles!followers_follower_id_fkey (
        id,
        name,
        role,
        avatar
      )
    `)
    .eq('following_id', userId);
  return { data, error };
};

export const getFollowing = async (userId) => {
  const { data, error } = await supabase
    .from('followers')
    .select(`
      following:profiles!followers_following_id_fkey (
        id,
        name,
        role,
        avatar
      )
    `)
    .eq('follower_id', userId);
  return { data, error };
};

export const followUser = async (followerId, followingId) => {
  const { data, error } = await supabase
    .from('followers')
    .insert([{ follower_id: followerId, following_id: followingId }]);
  return { data, error };
};

export const unfollowUser = async (followerId, followingId) => {
  const { error } = await supabase
    .from('followers')
    .delete()
    .match({ follower_id: followerId, following_id: followingId });
  return { error };
}; 