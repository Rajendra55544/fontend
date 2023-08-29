import React, { useState,useEffect,useContext} from 'react';
import './deshboard.css';
import {BiPackage } from 'react-icons/bi';
import { AuthContext } from '.././LoginContext';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Urls';
import Users from './Users';
import Filetype from './Filetype';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('deshboard');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { FetchData,Logout } = useContext(AuthContext)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = BASE_URL + '/deshboard/';
        let response = await FetchData(url);
        let data = response.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        Logout();
      }
    };
    fetchData();
  }, [FetchData, Logout]);
  return (
    <div>
    { isLoading ? (
      <div className="loader"></div> // Show a loading indicator while data is fetching
    ) :(
    <div className="dashboard-container">
      <div className="navigation">
        <h2 className={activeTab === 'deshboard' ? 'active' : ''} 
        onClick={() => handleTabChange('deshboard')} > Dashboard</h2>
        <ul>
          <li
            className={activeTab === 'deshboard' ? 'active' : ''}
            onClick={() => handleTabChange('deshboard')}
          >
            Deshboard
          </li>
          <li
            className={activeTab === 'Filetype' ? 'active' : ''}
            onClick={() => handleTabChange('Filetype')}
          >
            Filetype
          </li>
          <li
            className={activeTab === 'Users' ? 'active' : ''}
            onClick={() => handleTabChange('Users')}
          >
            Users
          </li>
        </ul>
      </div>

      <div className="content">
      {activeTab === 'deshboard' && (
          <div className="tab-content">
            <h3>Deshboard</h3>
            <div className='states'>
            {/* Display Users statistics */}
            {
                Object.entries(data).map(([key, value]) => {
                  return (
                    <div className="card" key={key}>
                      <BiPackage  className='icon_cl'/>
                      <Link to={key} style={{textDecoration:"none",color:"black"}}>
                      <div className="card-info">
                        <h4>{key}</h4>
                        <p style={{color:"red"}}>{value}</p>
                      </div>
                      </Link>
                    </div>
                    
                  );
                })
              }
              
          </div>
          </div>
        )}

        {activeTab === 'deshboard' && (
          <div className="tab-content">
            {/* <Filetype /> */}
          </div>
        )}

        {activeTab === 'Filetype' && (
          <div className="tab-content">
            <h3>Filetype</h3>
           <Filetype />
            
          </div>
        )}

        {activeTab === 'Users' && (
          <div className="tab-content">
            <h3>Users</h3>
            <Users />
          </div>
        )}
      </div>
    </div>
    )}
  </div>
  );      
};

export default Dashboard;
