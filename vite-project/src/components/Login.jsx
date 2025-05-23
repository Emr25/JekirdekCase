import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/AuthSlice ';

const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(store => store.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ Username, Password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert("Başarıyla Giriş Yaptınız");
                navigate("/");
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Giriş Yap</h2>

                    {status === 'failed' && (
                        <div className="alert alert-danger" role="alert">
                            {JSON.stringify(error)}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
                        <div className="mb-3">
                            <label htmlFor="formBasicUsername" className="form-label">Username</label>
                            <input
                                id="formBasicUsername"
                                type="text"
                                placeholder="Kullanıcı adı girin"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formBasicPassword" className="form-label">Password</label>
                            <input
                                id="formBasicPassword"
                                type="password"
                                placeholder="Şifre"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Giriş Yap
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
