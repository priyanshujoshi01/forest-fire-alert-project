// src/hooks/useFileUpload.js
import { supabase } from '../services/supabase'; // Make sure supabase is correctly imported

export const useFileUpload = () => {
  const uploadFile = async (file, filePath) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('fire-alert-images') // Your bucket name
        .upload(filePath, file);

      if (error) throw error;

      // Return the public URL of the uploaded file
      const { publicURL, error: urlError } = supabase
        .storage
        .from('fire-alert-images')
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      return publicURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return { uploadFile };
};
