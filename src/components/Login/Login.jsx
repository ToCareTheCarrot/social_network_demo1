import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { Input } from '../common/formsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux';
import { loginMeThunkCreator } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import style from '../common/formsControls/FormsControls.module.css';


const Login = (props) => {

  const onSubmit = (formData) => {
    const {email, password, rememberMe} = formData;
    props.loginMeThunkCreator(email, password, rememberMe);
  }
  if(props.isAuth){
    return <Redirect to='/profile'/>
  }
  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}

const LoginForm = ({handleSubmit, error}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>
    </div>
    <div>
      <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]} type={'password'}/>
    </div>
    <div>
      <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> Remember me
    </div>
    {error && <div className={style.formSymmaryError}>
      {error}
    </div>}
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginMeThunkCreator })(Login);