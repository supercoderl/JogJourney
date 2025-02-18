import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
    // password will not be initially visible
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
        useState(true);

    // function that toggles password visibility on a TextInput component on a password field


    // function that toggles password visibility on a TextInput component on a confirm password field


    return {
        passwordVisibility,
        confirmPasswordVisibility,
    };
};