import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/AuthSlice ';

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((store) => store.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ Email, Password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert("Başarıyla Giriş Yaptınız");
                window.location.reload();
                navigate("/");
            }
        });
    };

    return (
        <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Giriş Yap</h2>
                    {status === 'failed' && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {JSON.stringify(error)}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">
                        <div className="mb-4">
                            <label htmlFor="formBasicEmail" className="block text-gray-700 font-bold mb-2">Email adresi</label>
                            <input
                                id="formBasicEmail"
                                type="email"
                                placeholder="Email girin"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="formBasicPassword" className="block text-gray-700 font-bold mb-2">Şifre</label>
                            <input
                                id="formBasicPassword"
                                type="password"
                                placeholder="Şifre"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Giriş Yap
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;