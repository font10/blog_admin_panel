import './App.css';
import { Auth, Blogs, EditProfileForm, Home, MyProfile, Places } from './pages/index';
import { Layout, ProtectedRoute } from './components';
import { route } from './models/router.model';
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.auth)

  return (
    <div>
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />} >
            <Route path={ route.root.path } element={<Home />} />
            <Route path={ route.blogs.path } element={<Blogs />} />
            <Route path={ route.places.path } element={<Places />} />
            <Route path={ route.user.editprofile.path } element={<EditProfileForm />} />
            <Route path={ route.user.myprofile.path } element={<MyProfile />} />
          </Route>
          <Route path={ route.auth.path } element={<Auth />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
