
import React from 'react';
import { useRoutes } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/Store';
import ProtectedRoute from './pages/privateRoutes'; 
import Login from './pages/Login'; 
import Admin from './pages/Admin'; 
import Register from './pages/Register'; 
import Update from './pages/Update'; 
const routes = [
  {
    path: '/',
    element: <ProtectedRoute element={<Admin />} />,
    children: [
      { path: 'admin', element: <Admin /> }
    ]
  },
  { path: 'login', element: <Login /> },
  { path: 'Register', element: <Register /> },
  { path: 'Update/:id', element: <Update /> }

];

const Router = () => {
  const routing = useRoutes(routes);

  return routing;
};
const AppRouter =()=>{
  return(
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default AppRouter;
