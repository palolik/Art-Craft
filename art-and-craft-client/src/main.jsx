import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Layout/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/providers/AuthProvider';
import HomePage from './components/Homepage/homepage';
import Aboutus from './components/Layout/Aboutus';
import Updatepro from './components/updateprofile/updateprofile';
import AddCraft from './components/Craft/AddCraft';
import MyList from './components/Craft/MyList';
import UpdateCraft from './components/Craft/UpdateCraft';
import ItemDetails from './Shared/ItemCard/ItemDetails';
import ItemDetailsCategory from "./Shared/ItemCard/ItemDetailsCategory";
import AllCraft from './components/Craft/AllCraft';
import ErrorPage from './components/Error/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
        loader: ()=> fetch('http://localhost:5000/allData'),
      }, 
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },{
        path: '/aboutus',
        element: <Aboutus></Aboutus>
      },
      {
        path: '/updateprofile',
        element: <Updatepro></Updatepro>
      },
    {
      path:'/addcraft',
      element:<AddCraft></AddCraft>
    },
  {
    path: '/myartslist/:email',
    element: <MyList></MyList>,
    loader: ({params})=> fetch(`http://localhost:5000/myCraft/${params.email}`),
},
{
  path: '/update/:id',
  element: <UpdateCraft></UpdateCraft>,
  loader: ({params}) => fetch(`http://localhost:5000/craft/${params.id}`),
},
{
  path: '/craft/:id',
  element:<ItemDetails></ItemDetails>,
  loader: ({params}) => fetch(`http://localhost:5000/craft/${params.id}`),
},
{
  path: '/category/:subcategory_name',
  element: <ItemDetailsCategory></ItemDetailsCategory>,
  loader: ({params})=> fetch(`http://localhost:5000/catagory/${params.subcategory_name}`),
},
{
  path: '/crafts',
  element: <AllCraft></AllCraft>,
  loader: ()=> fetch('http://localhost:5000/allCrafts'),
},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} > </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)


