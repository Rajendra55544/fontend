import { Link } from 'react-router-dom';
import React, { useState,useContext,useEffect  } from 'react';
import './login.css';
import { AuthContext } from './LoginContext';



const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  let LOGIN_URL = '/login/'
  if (window.location.host.split(".")[0] === "admin") {
    LOGIN_URL = '/admin_user/'
    }
  const {Login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });
  const [errors, setErrors] = useState({
    // errors for each input field
    email: '',
    password: '',

  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const  handleSubmit = (e) => {
    let isValid = true;
    e.preventDefault();
    if (formData.email === ''){
        setErrors({ ...errors, email: 'Email is required' });
        isValid = false;
        return;
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){
          setErrors({ ...errors, email: 'Invaild Email Id' });
          isValid = false;
          return;

    }
    if(formData.password === ''){
      setErrors({ ...errors, password: 'Password is required' });
      isValid = false;
      return;
    }
    if(isValid){
          
          let response = Login(LOGIN_URL,formData.email,formData.password);
          response.then((data)=>{
            window.location.replace("/");

          }).catch((error)=>{
            if(error.code !== "ERR_NETWORK"){
              if (error.response.status === 400){
                  if(error.response.data.non_field_errors){
                      setErrors({ ...errors, password:error.response.data.non_field_errors[0]  })
                  }
              }
              else{
                alert("Something Went Wrong Try Again");
              }
            }
            else{
              alert("Unable To Connect Try Again")
            }

          })
      
       
      }
    }
  
    // do something with the form data


  return ( 
    <>
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="off"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          name="password"
          autoComplete="on"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <div className="form-group" style={{position: "relative",left: "3%"}}>
      <button type="submit">Login</button>
      </div>
      {window.location.host.split(".")[0] !== "admin" &&
      <div className="form-group" style={{position: "relative",left: "3%"}}>
      <Link to="../signup/" className='register-button'>Register</Link>
      </div>
    }   
    </form>
    </>
  );
 
};

export default LoginPage;
