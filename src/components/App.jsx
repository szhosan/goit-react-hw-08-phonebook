import Section from './Section/Section';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authOperations } from 'redux/auth';
import PhoneBookAppBar from './PhoneBookAppBar/PhoneBookAppBar';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import ContactsView from './ContactsView/ContactsView';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Section>
      {isFetchingCurrentUser ? (
        <>Loading...</>
      ) : (
        <>
          <PhoneBookAppBar />
          <Routes>
            <Route path="/" element={<h2>Main page</h2>} />
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
        </>
      )}
    </Section>
  );
}

export default App;
