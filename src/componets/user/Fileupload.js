import axios from 'axios';
import '.././singup.css';
import { useState ,useEffect} from 'react';
import { Oval } from  'react-loader-spinner'
import { BASE_URL } from '../Urls';

const Fileupload = () => {
  useEffect(() => {
    document.title = 'File Upload';
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    file:'',
  });
  const [errors, setErrors] = useState({
    // errors for each input field
    file:'',
  });

  const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword','application/pdf', 'text/plain'];

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const  handleSubmit = async (e) => {
    let isValid = true;
    e.preventDefault();
    
    if(formData.file){
       
      if (! allowedTypes.includes(formData.file.type)) {
        setErrors({ ...errors, file: 'Upload Vaild File Format' });
        isValid = false;
        return;
      } 
    }
    if(isValid){
      setIsLoading(true);
        // _______________________singup api__________________________________________________
        try {
              const form_Data = new FormData();
              form_Data.append('file',formData.file)
              const accessToken = localStorage.getItem('access_token');
              let url = BASE_URL+'/fileupload/'
            axios.post(url, form_Data,{
              headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data'
              }
                }).then(({ data, status, headers }) => {
                        if(status ===201){
                          alert("File Upload Scessful")
                          window.location.replace("/");
                        }
                      }).catch(error => {
                        console.log(error)
                        if(error.response.status === 400 && error.code ==="ERR_BAD_REQUEST"){
                         alert("Some Thing Went Wrong")
                          isValid = false;
                          return;
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



  return ( 
    <>
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>File Upload</h1>

      <div className="form-group">
        <label htmlFor="profile">User File <span style={{color:'gray',fontSize:"10px"}}> (Allowed File Pdf,Excel and text)*</span> </label>
        <input 
          type="file"
          name="file"
          autoComplete="on"
          placeholder="User File"
          onChange={handleFileChange}
          className={errors.file ? 'error' : ''}
        />
        {errors.file && <span className="error-message">{errors.file}</span>}
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
        strokeWidthSecondary={4} /> :''} Upload</button>
      </div>
      
    </form>
    </>
  );
};

export default Fileupload;
