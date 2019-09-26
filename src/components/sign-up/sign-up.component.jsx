import React from 'react'
import { connect } from 'react-redux';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert(`password don't match`);
      return;
    }

    signUpStart({displayName, email, password})
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            label='Display Name'
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            required
          />
          <FormInput
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            required
          />
          <FormInput
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            required
          />
          <FormInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />
          <CustomButton type='submit'> SIGN UP </CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);