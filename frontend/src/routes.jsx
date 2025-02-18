import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Landpage } from './pages/LandPage/index.jsx';
import { Auth } from './pages/auth/auth.jsx';
import { HomePagePersonal } from './pages/homepagePersonal/index.jsx';

export const routes = createBrowserRouter([{
    path: '/',
    element:  <Outlet />, 
    children: [
      {
        path: '/',
        element: <Landpage />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'home/personal',
        element: <HomePagePersonal />
      }
    ]
}])
