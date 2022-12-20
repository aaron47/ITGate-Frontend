import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTokens } from '../features/UserSlice';
import { useLogoutMutation, useRefreshTokenMutation } from '../services/auth';
import {
  refreshLocalStorageTokens,
  toastOptions,
  Tokens,
} from '../utils/utility-type-exports';

const Secret = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!access_token) {
      navigate('/login');
    }
  }, [access_token]);

  if (!access_token) {
    return (
      <p className="text-4xl text-pink-600 font-bold">You are not logged in!</p>
    );
  }
  const handleRefreshToken = async () => {
    const data = (await refreshToken(user.username)
      .unwrap()
      .then((res) => {
        toast.success('Token refreshed!', toastOptions);
        return res;
      })
      .catch((err) => {
        toast.error('Failed to refresh token', toastOptions);
      })) as Tokens;

    refreshLocalStorageTokens(data);
    dispatch(
      setTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })
    );
  };

  const handleLogout = async () => {
    await logout(access_token!)
      .then((res) => {
        toast.success('Logged out successfully', toastOptions);
        return res;
      })
      .catch((err: any) => {
        toast.error(err.data.message, toastOptions);
      });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch(
      setTokens({
        access_token: '',
        refresh_token: '',
      })
    );
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl text-pink-600 font-bold">
        Welcome {user.username}!
      </p>
      <div className="flex space-x-5">
        <button onClick={handleRefreshToken}>Refresh your token!</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Secret;
