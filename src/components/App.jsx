import Section from './Section/Section';
import { useDispatch } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { authOperations } from 'redux/auth';
import PhoneBookAppBar from './PhoneBookAppBar/PhoneBookAppBar';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Navigate } from 'react-router-dom';
import Progress from './Progress/Progress';
const RegisterForm = lazy(() => import('./RegisterForm/RegisterForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const ContactsView = lazy(() => import('./ContactsView/ContactsView'));

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Section>
      {isFetchingCurrentUser ? (
        <Progress />
      ) : (
        <>
          <PhoneBookAppBar />
          <Suspense fallback={<Progress />}>
            <Routes>
              <Route path="*" element={<Navigate to="/contacts" />} />
              <Route
                path="/login"
                element={
                  <PublicRoute restricted>
                    <LoginForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute restricted>
                    <RegisterForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/login">
                    <ContactsView />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </>
      )}
    </Section>
  );
}

export default App;
