import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import { ApplicationsPage } from './pages/ApplicationsPage';
import { NewApplicationPage } from './pages/NewApplicationPage';
import { EditApplicationPage } from './pages/EditApplicationPage';

// Components
import { Landing } from './components/Landing/Landing';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Navbar } from './components/ui/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-light">
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<NewApplicationPage />} />
          <Route path="/applications/:id" element={<ApplicationsPage />} />
          <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
