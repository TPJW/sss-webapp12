import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import SiteSystem from './pages/SiteSystem';
import Review from './pages/Review';
import Snapshot from './pages/Snapshot';
import { SelectionProvider } from './context/SelectionContext';

function App() {
  return (
    <SelectionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="system/:id" element={<SiteSystem />} />
            <Route path="review" element={<Review />} />
            <Route path="snapshot" element={<Snapshot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SelectionProvider>
  );
}

export default App;
