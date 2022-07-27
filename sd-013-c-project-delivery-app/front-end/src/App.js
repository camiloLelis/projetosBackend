import React from 'react';
import './App.css';
import UserProvider from './context/UserProvider';
import AppRoutes from './AppRoutes';
import 'moment/locale/pt-br';

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
