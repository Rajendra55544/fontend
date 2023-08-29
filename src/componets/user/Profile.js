import axios from 'axios';
import '.././singup.css';
import { useState ,useEffect,useContext} from 'react';
import { Oval } from  'react-loader-spinner'
import { AuthContext } from '../LoginContext';
import { BASE_URL } from '../Urls';

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { FetchData,Logout } = useContext(AuthContext)
    const [Data, setData] = useState(null);

    useEffect(() => {
      document.title = 'User Profile';
      async function fetchData() {
        try {
          let url = BASE_URL+'/profile/'
          const response = await FetchData(url);
          const data = await response.data;
          setData(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
          // Logout();
        }
      }
      fetchData();

    }, [FetchData,Logout]);

 console.log(Data)
  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    
  
  });
  const [errors, setErrors] = useState({
    // errors for each input field
    name:'',
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

    if(formData.phone === ''){
      setErrors({ ...errors, phone: 'phone is required' });
      isValid = false;
      return;
    }
    else if(formData.phone.length === 10){
      setErrors({ ...errors, phone: 'Enter Vaild Phone Number' });
      isValid = false;
      return;
    }
    if(isValid){
      setIsLoading(true);
        // _______________________singup api__________________________________________________
        try {
              const json_data = {
                "name": formData.name,
                "phone": formData.phone,
                }   
            const accessToken = localStorage.getItem('access_token');
            let url = BASE_URL+'/profile/'
            axios.post(url,JSON.stringify(json_data),
                   { 
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                    }
                    
                    }).then(({ data, status, }) => {
                        if(status === 200){
                          alert("Profile Updated Scessfully ")
                          window.location.replace("/");
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
      <h1>Profile Update</h1>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          // value={Data.name}
          onChange={handleInputChange}
          autoComplete="off"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input 
          type="phone"
          name="phone"
          autoComplete="on"
          placeholder="phone"
          // value={Data.phone_number}
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
        strokeWidthSecondary={4} /> :''} Update</button>
      </div>
    </form>
    </>
  );
};

export default Profile;
