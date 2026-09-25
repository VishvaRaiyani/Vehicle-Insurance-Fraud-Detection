import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import FraudAnalysis from './pages/FraudAnalysis';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="fraud-analysis" element={<FraudAnalysis />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
