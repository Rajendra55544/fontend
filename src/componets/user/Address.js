import React, { useState,useEffect,useContext} from 'react';
import './home.css';
import { AuthContext } from '../LoginContext';
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../Urls';
import { Link } from 'react-router-dom';


const Address = () => {
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
    let url = BASE_URL+'/user/address/'
    FetchData(url)
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
  console.log(data)
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <div>
      <div className='header_div'>
      <Link to="/addaddress" className='add_btn'>Add Address</Link>
       </div>
    { isLoading ? (
      <div className="loader"></div> // Show a loading indicator while data is fetching
    ) :(
    <>
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Contact_no</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.first_address}</td>
            <td>{item.city}</td>
            <td>{item.contact_no}</td>
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

export default Address;
