
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { AuthProvider } from './context/AuthContext';
import ContextProvider from './context/FinalContex';
import { ToastContainer } from 'react-toastify';


function App() {


  

  
  return   <AuthProvider>
   <ContextProvider>
    <ToastContainer />
  <BrowserRouter>
    <Routes>
      <Route index path="/" />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<Home/>} />
       </Routes>
  </BrowserRouter>
  </ContextProvider>
  </AuthProvider>
 
}


    

export default App

