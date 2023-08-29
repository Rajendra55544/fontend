import axios from 'axios';
import '.././singup.css';
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Oval } from  'react-loader-spinner'


const AddAddress = () => {
  useEffect(() => {
    document.title = 'Add Address';
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name:'',
    address:'',
    city: '',
    phone:'',
  
  });
  const [errors, setErrors] = useState({
    // errors for each input field
    name:'',
    address:'',
    city: '',
    phone:'',

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

    if (formData.address === ''){
        setErrors({ ...errors, address: 'address is required' });
        isValid = false;
        return;
    } else if(formData.address.length < 10){
          setErrors({ ...errors, address: 'Invaild address' });
          isValid = false;
          return;

    }
    if(formData.city === ''){
      setErrors({ ...errors, city: 'city is required' });
      isValid = false;
      return;
    }
    if(formData.phone === ''){
        setErrors({ ...errors, phone: 'Phone is required' });
        isValid = false;
        return;
      }
      else if(formData.phone.length === 10){
        setErrors({ ...errors, phone: 'Invaild Phone' });
        isValid = false;
        return;
      }
    if(isValid){
      setIsLoading(true);
        // _______________________singup api__________________________________________________
        try {
              const json_data = {
                "name": formData.name,
                "first_address": formData.address,
                "city": formData.city,
                "contact_no":formData.phone
                }   
                const accessToken = localStorage.getItem('access_token');
            axios.post("http://localhost:8000/user/address/",JSON.stringify(json_data),
                   { 
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                        }
                    
                    }).then(({ data, status, }) => {
                        if(status ===201){
                          alert("Address Scessfully Added")
                          window.location.replace("/address");
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
      <h1>Add Address</h1>

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
        <label htmlFor="username">Address</label>
        <input
          type="text"
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleInputChange}
          autoComplete="off"
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>


      <div className="form-group">
        <label htmlFor="city">city</label>
        <input 
          type="text"
          name="city"
          autoComplete="on"
          placeholder="city"
          value={formData.city}
          onChange={handleInputChange}
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input 
          type="mobile"
          name="phone"
          autoComplete="on"
          placeholder="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
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
      
    </form>
    </>
  );
};

export default AddAddress;
