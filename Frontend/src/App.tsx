import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import MyBuilding from "./pages/MyBuilding/MyBuilding";
import Home from "./pages/Home/Home";
import DashboardPage from "./pages/Dashboard/Dashboard";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import RentTracking from "./pages/RentTracking/RentTracking";
import Expenses from "./pages/Expenses/Expenses";
import Reports from "./pages/Reports/Reports";

const router = createBrowserRouter([
  {path : "/", element : undefined},
  {path : "/login", element : <Login />},
  {path : "/register", element : <Register />},
  {path : "/home", element : <Home />},
  {path : "/my-building", element : <MyBuilding />},
  {path : "/dashboard", element : <DashboardPage />},
  {path : "/property", element : <PropertyPage />},
  {path : "/rent-tracking", element : <RentTracking />},
  {path : "/expenses", element : <Expenses />},
  {path : "/reports", element : <Reports />},
]);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
