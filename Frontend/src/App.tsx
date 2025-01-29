import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/Login/Login"
// import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import MyBuilding from "./pages/MyBuilding/MyBuilding";
import CreateBuilding from "./pages/CreateBuilding/CreateBuilding";

const router = createBrowserRouter([
  {path : "/", element : undefined},
  {path : "/login", element : <Login />},
  {path : "/register", element : <Register />},
  // {path : "/home", element : <Home />},
  {path : "/my-building", element : <MyBuilding />},
  {path : "/create-building", element : <CreateBuilding />}

]);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
