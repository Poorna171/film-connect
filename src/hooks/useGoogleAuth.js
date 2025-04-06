import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useGoogleAuth = (userType) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        
        const userInfo = await userInfoResponse.json();
        
        // Here you would typically:
        // 1. Check if the user exists in your database
        // 2. If not, create a new user
        // 3. Generate a JWT token for your application
        // 4. Store the token in localStorage or a secure cookie
        
        console.log('Google user info:', userInfo);
        
        // For now, we'll just log the user info and redirect
        // In a real application, you would handle the user data properly
        localStorage.setItem('user', JSON.stringify({
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          type: userType // 'actor' or 'director'
        }));
        
        // Redirect to the appropriate dashboard
        navigate(`/${userType}/dashboard`);
      } catch (error) {
        console.error('Error during Google authentication:', error);
      }
    },
    onError: () => {
      console.error('Google login failed');
    },
  });

  return { login };
};

export default useGoogleAuth; 