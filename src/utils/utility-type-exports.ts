import { ToastOptions } from 'react-toastify';

export const toastOptions: Partial<ToastOptions> = {
  position: 'bottom-right',
  autoClose: 1200,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

export interface UserInputDto {
  username: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserDocument extends Tokens {
  user: {
    _id: string;
    username: string;
    password: string;
  };
}

export function refreshLocalStorageTokens(data: Tokens | UserDocument) {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('access_token', data.access_token);
}
