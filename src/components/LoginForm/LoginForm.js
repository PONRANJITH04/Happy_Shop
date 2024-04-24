import React, {useState} from 'react';
import Cookies from 'js-cookie'
import Button from '../Button/Button';
import './index.css';



const InputField = ({type, value, onChange }) =>{
    return (
        <div className="input-container">
            <label className="input-label" htmlFor={type}>
               {type}
            </label>
            <input
              type={type}
              id={type}
              className={`${type}-input-field`}
              value={value}
              onChange={onChange}
              placeholder={type} />
        </div>
    )
}

const LoginForm = () => {
    const [userName , setUserName] = useState("");
    const [passWord , setPassWord] = useState("");
    const [showSubmitError , setShowSubmitError] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");


    const onChangeUsername = event => {
        setUserName(event.target.value)
      }
    
    const onChangePassword = event => {
        setPassWord(event.target.value)
      }
    

    const submitForm = async event => {
        event.preventDefault();
        const userDetails = {userName, passWord}
        const url = 'https://apis.ccbp.in/login'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            onSubmitSuccess(data.jwt_token)
        } else {
            onSubmitFailure(data.error_msg)
        }
      } 
      
   const hi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"   
    const onSubmitSuccess = hi=> {
        const {history} = this.props
    
        Cookies.set('jwt_token', hi, {
          expires: 30,
        })
        history.replace('/')
      }
    
    const onSubmitFailure = errorMsg => {
        setShowSubmitError(!showSubmitError);
        const {history} = this.props
    
        Cookies.set('jwt_token', hi, {
          expires: 30,
        })
        history.replace('/')
        setErrorMsg(errorMsg);
        
        
      }
    
    return (
    <>
        <form className="form-container" onSubmit={submitForm}>
          <InputField type="username"  value={userName} onChange={onChangeUsername}  />
          <InputField  type="password"  value={passWord} onChange={onChangePassword} />
          <Button type="submit" className="login-button">
            Login
          </Button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
    </>
  );
}

export default LoginForm;
