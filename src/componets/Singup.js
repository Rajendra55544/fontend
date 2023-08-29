import axios from 'axios';
import './singup.css';
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Oval } from  'react-loader-spinner'


const Signup = () => {
  useEffect(() => {
    document.title = 'User Register';
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password: '',
  
  });
  const [errors, setErrors] = useState({
    // errors for each input field
    name:'',
    email:'',
    password: '',

  });


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const  handleSubmit = async (e) => {
    let isValid = true;
    e.preventDefault();
    
    if (formData.name === ''){
      setErrors({ ...errors, name: 'Name is required' });
      isValid = false;
      return;
  } else if(formData.name.length < 5){
        setErrors({ ...errors, name: 'Enter Vaild Name' });
        isValid = false;
        return;
  }

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
    else if(formData.password.length < 8){
      setErrors({ ...errors, password: 'Password Length Should be more 8 chars' });
      isValid = false;
      return;
    }
    if(isValid){
      setIsLoading(true);
        // _______________________singup api__________________________________________________
        try {
              const json_data = {
                "name": formData.name,
                "email": formData.email,
                "password": formData.password,
                }   
               
            axios.post("http://localhost:8000/register/",JSON.stringify(json_data),
                   { 
                    headers: {
                        'Content-Type': 'application/json'
                        }
                    
                    }).then(({ data, status, }) => {
                        if(status ===201){
                          alert("Register Scessfully Please Login")
                          window.location.replace("/login");
                        }
                      }).catch(error => {
                        if(error.response.status === 400 && error.code ==="ERR_BAD_REQUEST"){
                          let data = error.response.data
                          for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                              setErrors(prevErrors => ({
                                ...prevErrors,
                                [key]: data[key][0]
                              }));
                            }
                          }
                          isValid = false;
                          return;
                        }
                        else{
                              console.error(error);
                        }
                      });
                    }
                    catch(err) {
                        // if any error, Code throws the error
                        console.log(err)
                      }
                    finally {
                        setIsLoading(false);
                      }

        // ______________________________________end ____________________________________________________

       
      }
    }
  
    // do something with the form data


  return ( 
    <>
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Signup</h1>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="off"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email Id"
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
      <button type="submit"> {isLoading ? <Oval 
        height={35}
        width={35}
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="white"
        strokeWidth={5}
        style={{display:"inlineBlock"}}
        strokeWidthSecondary={4} /> :''} Signup</button>
      </div>
      <div className="form-group" style={{position: "relative",left: "3%"}}>
      <p>Already Have Account ?<Link to="../login/" className='login-button'>Login</Link></p>
      </div>
    </form>
    </>
  );
};

export default Signup;
