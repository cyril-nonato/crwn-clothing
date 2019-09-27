import React, { useState } from 'react'
import { connect } from 'react-redux';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(`password don't match`);
      return;
    }

    signUpStart({ displayName, email, password })
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value
    })
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <CustomButton type='submit'> SIGN UP </CustomButton>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);