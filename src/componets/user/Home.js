import React, { useState,useEffect,useContext} from 'react';
import './home.css';
import { AuthContext } from '../LoginContext';
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../Urls';
import { FaFileDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { FetchData,Logout } = useContext(AuthContext)

  let itemsPerPage= 5
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    let isMounted = true;
    FetchData(BASE_URL)
      .then((response) => response.data)
      .then((data) => {
        if (isMounted) {
          setData(data);
          console.log(data)
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        // Logout();
      });
  
    return () => {
      isMounted = false;
    };
  }, [FetchData, Logout]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);
  const handleDownload = (fileUrl,filname) => {
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filname;
    link.click();
  };


  return (
    <div>
      <div className='header_div'>
       <Link to="/filupload" className='add_btn'>Upload File</Link>
       </div>
    { isLoading ? (
      <div className="loader"></div> // Show a loading indicator while data is fetching
    ) :(
    <>
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>File Name</th>
          <th>File Type</th>
          {/* <th>Upload Date</th> */}
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.file_name}</td>
            <td>{item.file_type}</td>
            {/* <td>{item.uploadtime}</td> */}
            <td>
            {item.files.map((subitem, index) => (
               <div>
                <p> Version - {subitem.file_version}</p>
               <a href={subitem.file} onClick={() => handleDownload(subitem.file,"testfile")}>
                <FaFileDownload /> </a>
                </div>
            ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={Math.ceil(data.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>          
  </>

  )}; 
  </div>    
  ); 
}

export default Home;
