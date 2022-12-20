import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Secret from './pages/Secret';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Secret />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
