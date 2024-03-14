import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import HomePage from './Pages/Home/index.jsx'
import LoginPage from './Pages/Login/index.jsx'
import SignUp from './Pages/SignUp/index.jsx'
import SellNow from './Pages/SellNow/index.jsx'
import Register from './Pages/register/index.jsx'
import Products from './Pages/menswear/index.jsx'
import ProductDetail from './Pages/detailproducts/index.jsx'

const router = createBrowserRouter([{
  element: <App />,
  children:[
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/SignUp',
      element: <SignUp />
    },
    {
      path: '/SellNow',
      element: <SellNow />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/product',
      element: <Products />
    },
    {
      path: '/detailproduct/:productsId',
      element: <ProductDetail />
    }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
