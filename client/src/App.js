import React, {   useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './Components/PageLayout/PageLayout.jsx';
import { RouteSuspense } from './Components/RouteSuspence/RouteSuspence';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import {ReactComponent as logo} from './Components/Logo/logo.svg';

const Form = React.lazy(() => import('./Pages/Form/Form'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));



function App() {
  const [currentForm, setCurrentForm] = useState ('login');
 
  const toggleForm = (forName) => {
    setCurrentForm (forName);

  };
  
  return (
  
    <div className="App">
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={
            <RouteSuspense>
              <Form />
            </RouteSuspense>
          } />
        </Route>
        <Route path='/login' element={
          <RouteSuspense>
            <Login />
          </RouteSuspense>
        } />
        <Route path='/register' element={
          <RouteSuspense>
            <Register />
          </RouteSuspense>
        } />
        <Route path='*' element={
          <RouteSuspense>
            <PageNotFound />
          </RouteSuspense>
        } />
      </Routes>
      
         <><img src={logo} className='logo' alt = "logo"  /> </>
        
      {
        currentForm === "login" ?    <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
   
    </div>
  
    
  );
}

export default App;
