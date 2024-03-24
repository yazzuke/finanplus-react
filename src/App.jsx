
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';

function App() {

        
  
  return  <AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route index path="/" />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
       </Routes>
  </BrowserRouter>
  </AuthProvider>
}


    

export default App

