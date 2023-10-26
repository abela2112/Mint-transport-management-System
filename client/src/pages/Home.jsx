import React from 'react'
import Register from './Register/Register'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
const Home = () => {
    return (
           <BrowserRouter>
                  <Routes>

                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login"/>
                             
                  </Routes>
           </BrowserRouter>
    )
}

export default Home