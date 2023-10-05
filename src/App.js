import './App.css';
import { Routes, Route } from 'react-router-dom'
import { route } from './models/router.model';
import { Home } from './pages/Home/Home';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Layout } from './components';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={ route.root.path } element={<Home />} />
          <Route path={ route.dashboard.path } element={<Dashboard />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
