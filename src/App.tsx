import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/imovel/:id" element={<PropertyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
