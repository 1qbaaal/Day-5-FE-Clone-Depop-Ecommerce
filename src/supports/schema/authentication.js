import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required!"),
  lastName: Yup.string().required("Last Name is Required!"),
  email: Yup.string()
    .email("Email Must be Valid!")
    .required("Email is Required!"),
  username: Yup.string()
    .min(6, "Username Must Have Minimum 6 Characters")
    .required("Username is Required!"),
  password: Yup.string()
    .min(6, "Password Must Have Minimum 6 Characters")
    .required("Password is Required!"),
});

export const schemaValidated = Yup.object().shape({
  emailOrUsername: Yup.string().required('Email Or Username is Required!'),
  password: Yup.string().min(6, 'Password Must Have Minimum 6 Characters!').required('Password is Required!')
})