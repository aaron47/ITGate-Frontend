import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/UserSlice';
import { useLoginMutation, useSignUpMutation } from '../services/auth';
import {
  refreshLocalStorageTokens,
  toastOptions,
  UserDocument,
  UserInputDto,
} from '../utils/utility-type-exports';

const SignUp = () => {
  const [values, setValues] = useState<UserInputDto>({
    username: '',
    password: '',
  });

  const [signUp] = useSignUpMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (access_token) {
      window.location.reload();
      navigate('/');
    }
  }, [access_token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Signed up sucessfully', toastOptions);
    const data = (await signUp(values)
      .unwrap()
      .then(async (res) => {
        await login(values);
        toast.success('Logged in sucessfully', toastOptions);
        navigate('/login');
        return res;
      })
      .catch((err: any) => {
        toast.error(err.data.message, toastOptions);
      })) as UserDocument;

    // refreshLocalStorageTokens(data);
    dispatch(setUser({ ...data.user }));
  };

  return (
    <div className="bg-white py-4 px-16 pb-8 rounded-[0.5rem] border-t-[#5062FF]">
      <h2 className="text-[#5062FF] text-3xl font-bold">Sign Up</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="text-[#5062FF]" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
        </div>

        <div>
          <label className="text-[#5062FF]" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>

        <button>Submit</button>

        <span>
          <Link to="/login">Already have an account? </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
