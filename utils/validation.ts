import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Yêu cầu nhập email").email("Email không hợp lệ").label('Email'),
    password: Yup.string().required("Yêu cầu nhập mật khẩu").min(6, "Mật khẩu phải có ít nhất 6 ký tự.").label('Password')
});

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm Password must match password.')
        .required('Confirm Password is required.')
});