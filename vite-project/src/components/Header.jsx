import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/AuthSlice ';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand text-primary fw-bold" to="/">
                    Jekirdek
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                        <Link className="nav-link" to="/contact">
                            Contact
                        </Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="/card" className="nav-link position-relative me-3 text-secondary">
                            <FaShoppingCart size={20} />
                        </Link>

                        {user ? (
                            <>
                                <Link to="/profile" className="btn btn-outline-primary me-2">
                                    Profile
                                </Link>
                                <button onClick={logout} className="btn btn-outline-danger">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-success me-2">
                                    Giriş Yap
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Üye Ol
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
