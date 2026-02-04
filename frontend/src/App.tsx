import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import { ApplicationsPage } from './pages/ApplicationsPage';
import { NewApplicationPage } from './pages/NewApplicationPage';
import { EditApplicationPage } from './pages/EditApplicationPage';

// Components (skeletons - will throw until implemented)
import { Landing } from './components/Landing/Landing';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/new" element={<NewApplicationPage />} />
        <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
