
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginEmail from './pages/Login/LoginEmail';


function App() {

  
  return <BrowserRouter>
    <Routes>
      <Route index path="/" />
      <Route path="/login" element={<LoginEmail/>} />

       </Routes>
  </BrowserRouter>

}


    

export default App

