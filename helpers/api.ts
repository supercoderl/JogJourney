import axios from "axios";

export const uploadImage = async (imageUri: string) => {
    let apiUrl = `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/image/upload`;

    let formData = new FormData();
    formData.append('file', imageUri); // imageUri là base64 hoặc URL ảnh
    formData.append('upload_preset', 'jogjourney');

    return await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};