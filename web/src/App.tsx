import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage, Root, SignPage } from './pages';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [{ index: true, element: <HomePage /> }],
    },
    { path: '/sign', element: <SignPage /> },
  ]);

  return <RouterProvider router={router} />;
}
