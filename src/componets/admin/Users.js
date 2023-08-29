import React, { useState,useEffect,useContext} from 'react';
import '../user/home.css';
import { AuthContext } from '../LoginContext';
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../Urls';

const Users = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { FetchData,Logout } = useContext(AuthContext)
  
  let itemsPerPage= 10
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

 



  useEffect(() => {
    let isMounted = true;
    let url = BASE_URL+'/byusers/'
    FetchData(url)
      .then((response) => response.data)
      .then((data) => {
        if (isMounted) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        Logout();
      });
  
    return () => {
      isMounted = false;
    };
  }, [FetchData, Logout]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <div>
      
    { isLoading ? (
      <div className="loader"></div> // Show a loading indicator while data is fetching
    ) :(
            <>
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Total Upload File</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index+1}>
            <td>{index + 1}</td>
            <td>{item.user__name}</td>
            <td>{item.file_count}</td> 
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

export default Users;
