import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './pages/Home/index.tsx'
import User from './pages/User/index.tsx'
import Login from './pages/Login/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    // errorElement
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/user/:id',
        element: <User />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
