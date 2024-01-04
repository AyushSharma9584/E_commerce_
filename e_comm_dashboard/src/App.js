import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Addproduct from './Components/Addproduct';
import Updateproduct from './Components/Updateproduct';
import Login from './Components/Login';
import Register from './Components/Register';
import Protected from './Components/Protected';
import Productlist from './Components/Productlist';
import Header from './Components/Header'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      
      <Routes>
         <Route path='/' element={<Register/>}/>
        <Route path='/add' element={<Protected cmp={Addproduct}/>}/>
        <Route path='/update/:id' element={<Protected cmp={Updateproduct}/>}/>
        <Route path='/productlist' element={<Protected cmp={Productlist}/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
