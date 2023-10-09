import './App.css';
import { Blogs, Comments, EditProfile, Home, Images, MyProfile, Places } from './pages/index';
import { Layout } from './components';
import { route } from './models/router.model';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={ route.root.path } element={<Home />} />
          <Route path={ route.blogs.path } element={<Blogs />} />
          <Route path={ route.places.path } element={<Places />} />
          <Route path={ route.comments.path } element={<Comments />} />
          <Route path={ route.images.path } element={<Images />} />
          <Route path={ route.user.editprofile.path } element={<EditProfile />} />
          <Route path={ route.user.myprofile.path } element={<MyProfile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
