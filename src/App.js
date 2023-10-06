import './App.css';
import { Routes, Route } from 'react-router-dom'
import { route } from './models/router.model';
import { Blogs, Comments, Dashboard, Home, Places } from './pages/index';
import { Layout } from './components';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={ route.root.path } element={<Home />} />
          <Route path={ route.blogs.path } element={<Blogs />} />
          <Route path={ route.places.path } element={<Places />} />
          <Route path={ route.comments.path } element={<Comments />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
