import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  LandingPage,
  Root,
  SignPage,
  VerificationPage,
} from './pages';
import { ThemeProvider } from './hooks/useTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: '/sign',
      element: <SignPage />,
    },
    { path: '/sign/new-verification', element: <VerificationPage /> },
    { path: '/landing', element: <LandingPage /> },
  ]);

  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClinet}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              error: 'bg-red-400 text-white',
            },
          }}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
