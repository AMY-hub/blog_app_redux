import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, ProtectedRoute } from '../components';
import { selectAccessToken } from '../features/user/user.slice';
import { useAppSelector } from './hooks';
import { ThemeSwitcher } from '../features/theme/ThemeSwitcher';
import { AddPostPage } from '../pages/AddPostPage';
import { EditPostPage } from '../pages/EditPostPage';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';
import { PostDetailsPage } from '../pages/PostDetailsPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  const token = useAppSelector(selectAccessToken);

  return (
    <div className='App'>
      <div className='wrapper'>
        <ThemeSwitcher />
        <Header />
        <ToastContainer toastClassName='success-alert' />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/posts/:id' element={<PostDetailsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/newpost' element={
            <ProtectedRoute token={token}>
              <AddPostPage />
            </ProtectedRoute>
          } />
          <Route path='/editpost/:id' element={
            <ProtectedRoute token={token}>
              <EditPostPage />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
