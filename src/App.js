import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <Routes>
       
        <Route path="/" element={<Create/>}/>
        <Route path="/all" element={<Read/>}/>
        <Route path="/:id" element={<Update/>}/>

      </Routes>
     </BrowserRouter>
   
    </div>
  );
}

export default App;
