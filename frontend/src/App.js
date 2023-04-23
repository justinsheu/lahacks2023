import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Selections from './pages/Selections';
import Recommendations from './pages/Recommendations';
import './App.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/selections' element={<Selections />} />
            <Route path='/recommendations' element={<Recommendations />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
