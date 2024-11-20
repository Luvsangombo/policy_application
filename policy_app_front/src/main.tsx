import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Global } from './Global.tsx';
import Login from './components/login.tsx';
import { Policies } from './components/policies.tsx';
import Signup from './components/signup.tsx';
import NewPolicy from './components/policy.tsx';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Policies /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'create', element: <NewPolicy /> }
    ],
  },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global>
      <RouterProvider router={routes} />
    </Global>
  </React.StrictMode>,
);