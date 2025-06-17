import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcve3dspz',
  api_key: process.env.CLOUDINARY_API_KEY || '198543939348254',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'CK2bgI6YjhM8rtmAMp_P1KwxN5Q',
  secure: true
});

// Upload file to Cloudinary using promises
export const uploadFileToCloudinary = async (file) => {
  try {
    // If we have a buffer, convert it to base64
    if (file.buffer) {
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      // Determine resource_type based on mimetype
      let resourceType = 'auto'; // default
      
      // Set resource_type explicitly for PDFs and documents
      if (file.mimetype === 'application/pdf') {
        resourceType = 'raw'; // Use 'raw' for PDFs to prevent Cloudinary from treating it as an image
      } else if (file.mimetype.includes('msword') || 
                 file.mimetype.includes('officedocument') || 
                 file.mimetype.includes('application/vnd.')) {
        resourceType = 'raw'; // Use 'raw' for office documents
      }
      
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          base64String,
          {
            folder: 'balitech-uploads',
            resource_type: resourceType,
            format: file.mimetype === 'application/pdf' ? 'pdf' : undefined,
            flags: 'attachment' // This ensures the file is downloadable
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
      
      return {
        success: true,
        fileUrl: result.secure_url,
        publicId: result.public_id
      };
    } else {
      throw new Error('File buffer not available');
    }
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete file from Cloudinary
export const deleteFileFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result
    };
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default cloudinary; 