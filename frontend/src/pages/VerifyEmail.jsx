import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VerifyEmail = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.emailAddresses[0]?.verification?.status === 'verified') {
      navigate('/');
    }
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Please verify your email</h2>
      <p>Check your inbox and complete the OTP verification process.</p>
    </div>
  );
};

export default VerifyEmail;
