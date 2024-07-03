import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/LoginForm.jsx'
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/auth', formData);

    if (res.data.success) {
      navigate('/me');
    }
  };


  return (
    <>
      <h1>Log In</h1>
      <LogInForm onLogin={handleLogin} />
    </>
  );
}
