import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserUpdate from './pages/UserUpdate';
import ListingSearch from './pages/ListingSearch';
import ListingCreate from './pages/ListingCreate';

import Header from './Header';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
          <Route index element={<SignIn />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/userupdate' element={<UserUpdate />}/>
          <Route path='/listingsearch' element={<ListingSearch />}/>
          <Route path='/listingcreate' element={<ListingCreate />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
