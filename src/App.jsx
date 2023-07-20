import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';


import Finish from "./components/Finish"
import One from "./components/One"
import Two from "./components/Two"
import TwoFee from "./components/TwoFee"
import FinishFee from './components/FinishFee';



const routes = createBrowserRouter([
  { path: '/', element: <One /> },
  { path: '/two', element: <Two /> },
  { path: '/twofee', element: <TwoFee /> },
  { path: '/finish', element: <Finish /> },
  { path: '/finishfee', element: <FinishFee /> },
]);

function App() {

  return <RouterProvider router={routes} />;
}

export default App;