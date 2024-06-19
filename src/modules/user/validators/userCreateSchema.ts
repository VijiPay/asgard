import * as yup from 'yup'

const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  type: yup.string().required('Type is required'),
})
const YupError = yup.ValidationError

export { YupError }

export default createUserSchema
