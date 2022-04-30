import {
  FormGroup,
  Button,
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core';
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const useStyle = makeStyles((theme) => ({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '&>*': {
      marginTop: 20,
    },
  },
  inputField: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
  buttonMargin: {
    marginTop: '10px',
  },
}));

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyle();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await addUser(data);
    navigate('/');
  };
  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Add User</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Enter Your Name"
          variant="outlined"
          label="Name"
          fullWidth
          className={classes.inputField}
          name="name"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : null}
        />
        <TextField
          placeholder="Enter Your Username"
          label="Username"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          name="username"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : null}
        />
        <TextField
          placeholder="Enter Your Email"
          label="Email"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          name="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : null}
        />
        <TextField
          placeholder="Enter Your Phone Number"
          label="Phone Number"
          variant="outlined"
          fullWidth
          className={classes.inputField}
          name="phone"
          {...register('phone', {
            required: 'Phone Number is required',
            pattern: {
              value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
              message: 'Phone Number is invalid',
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone ? errors.phone.message : null}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.buttonMargin}
          type="submit"
        >
          Add User
        </Button>
      </form>
    </FormGroup>
  );
};
export default AddUser;
