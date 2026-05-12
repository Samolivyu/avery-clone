// src/pages/SignUp.jsx
import SignUp from '../components/auth/SignUp';

const SignUp = () => {
  const handleRegisterSuccess = () => {
    // Registration successful – the SignUp component already navigates to /login,
    // so no further action is needed here.
  };

  return <SignUp onRegisterSuccess={handleRegisterSuccess} />;
};

export default SignUp;