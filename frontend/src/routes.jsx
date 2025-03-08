import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Landpage } from './pages/LandPage/index.jsx';
import { Auth } from './pages/auth/auth.jsx';
import { HomePagePersonal } from './pages/homepagePersonal/index.jsx';
import { HomeAluno } from './pages/homepageAluno/index.jsx';
import { ProtectRouters } from './utils/protectRouters.jsx';

export const routes = createBrowserRouter([{
  path: '/',
  children: [
    { path: '/', element: <Landpage /> },
    { path: 'auth', element: <Auth /> },

    {
      path: 'home',
      element: <ProtectRouters />,
      children: [
        { path: 'personal', element: <HomePagePersonal /> },
        { path: 'aluno', element: <HomeAluno /> },
      ],
    },
  ],
},
])
