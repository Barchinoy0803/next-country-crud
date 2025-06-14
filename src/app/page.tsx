'use client'; 
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';
import Countries from './countries';
import { Provider } from 'react-redux';
import { store } from './store';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth/login');
    }
  }, []);

  return (
    <Provider store={store}>
      <Countries />
    </Provider>
  );
};

export default Home;
