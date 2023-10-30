import React from 'react'
import Register from './Register/Register'

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