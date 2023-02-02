import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';



function App() {
  const [currentForm, setCurrentForm] = useState ('login');

  const toggleForm = (forName) => {
    setCurrentForm (forName);
  }
  
  return (
  <>
     {/* <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Cats />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
  
    <div className="App">
      
         <><img className="logo" src={logo}  /> </>
        
      {
        currentForm === "login" ?    <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
   
    </div>
    </>
    
  );
}

export default App;
