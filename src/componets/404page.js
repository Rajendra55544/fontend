import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 Page Not Found';
  }, []);


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.description}>The requested page could not be found.<Link to="/">HomePage</Link></p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
  },
};

export default NotFoundPage;
