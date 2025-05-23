import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/AuthSlice ';

const Register = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(store => store.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Password !== confirmPassword) {
            alert("Şifreler eşleşmiyor");
            return;
        }

        dispatch(registerUser({ Username, Password, Role: "User" })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert("Başarıyla Üye Oldunuz");
                navigate("/");
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Üye Ol</h2>

                    {status === 'failed' && (
                        <div className="alert alert-danger" role="alert">
                            {JSON.stringify(error)}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username girin"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Şifre"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Şifreyi Onayla"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Üye Ol
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
