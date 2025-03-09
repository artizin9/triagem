import { createBrowserRouter } from 'react-router-dom';
import { Landpage } from './pages/LandPage/index.jsx';
import { Auth } from './pages/auth/auth.jsx';
import { HomePagePersonal } from './pages/homepagePersonal/index.jsx';
import { HomeAluno } from './pages/homepageAluno/index.jsx';
import { ProtectRouters } from './utils/protectRouters.jsx';
import { ErrorPage } from './pages/errorPage/error404.jsx';

export const routes = createBrowserRouter([{
  path: '/',
  children: [
    { path: '/', element: <Landpage /> },
    { path: 'auth', element: <Auth /> },
    { path: '*', element: <ErrorPage /> },

    {
      path: 'home',
      element: <ProtectRouters />, // Componente de proteção
      children: [
        { path: 'personal', element: <HomePagePersonal /> }, // Página para o Personal
        { path: 'aluno', element: <HomeAluno /> }, // Página para o Aluno
      ],
    },
  ],
}]);
