import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserAuthenticationForm from './Component/UserAuthenticationForm';
import UserRegistrationForm from './Component/UserRegistrationForm';
import FilterableArticleList from './Component/FilterableArticleList';
import News from './Component/News';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuthenticationForm />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/article" element={<FilterableArticleList />} />         
          <Route path="/news" element={<News/>} />         
          
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
