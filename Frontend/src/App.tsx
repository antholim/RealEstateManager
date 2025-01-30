import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/Login/Login"
// import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import MyBuilding from "./pages/MyBuilding/MyBuilding";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {path : "/", element : undefined},
  {path : "/login", element : <Login />},
  {path : "/register", element : <Register />},
  {path : "/home", element : <Home />},
  {path : "/my-building", element : <MyBuilding />},

]);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
