import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserUpdate from './pages/UserUpdate';
import ListingSearch from './pages/ListingSearch';
import ListingCreate from './pages/ListingCreate';
//import ListingIndvidual from './pages/ListingIndividual';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
      <Header />
      <main className='flex-grow'>
        <Routes>
            <Route index element={<Home />} />
            <Route path='/About' element={<About/>} />
            <Route path='/userupdate' element={<UserUpdate />}/>
            <Route path='/listingsearch' element={<ListingSearch />}/>
            <Route path='/listingcreate' element={<ListingCreate />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/signin' element={<SignIn />}/>
        </Routes>
      </main>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

/*
<Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/userupdate' element={<UserUpdate />}/>
          <Route path='/listingsearch' element={<ListingSearch />}/>
          <Route path='/listingcreate' element={<ListingCreate />}/>
          */

//<Route path='/listingIndividual/*' element={<ListingIndvidual  />}/>