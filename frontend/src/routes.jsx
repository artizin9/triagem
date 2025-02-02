import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthCliente } from './pages/auth/AuthCliente'
import { AuthPersonal } from './pages/auth/AuthPersonal';
import { Homepage_Personal } from './pages/homepagePersonal/index'
import { Homepage_Aluno } from './pages/homepageAluno';

export const routes = createBrowserRouter([{
    path: '/',
    element:  <Outlet />, 
    children: [
      {
        path: '/auth/cliente',
        element: <AuthCliente />
      },
      {
        path: '/auth/personal',
        element: <AuthPersonal />
      },
      {
        path: '/homepage/personal',
        element: <Homepage_Personal />
      },
      {
        path: '/homepage/cliente',
        element: <Homepage_Aluno />
      }
    ]
}])
