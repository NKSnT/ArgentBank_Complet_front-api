//import Header from 'src/components/header/Header';
import 'src/BaseCSS.css';

import { useEffect /* , useState */ } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { userLogin, selectUserInfo, selectStatut } from 'src/app/authSlice';

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const loadingState = useSelector(selectStatut);
    function handleClick(e) {
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let rememberMe = false;
        if (document.getElementById('remember-me').checked) {
            rememberMe = true;
        }
        dispatch(userLogin({ email, password, rememberMe }));
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/profile');
        }
    }, [navigate, userInfo]);

    return (
        <>
            {loadingState === 'failed' && <div>Error</div>}
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" onClick={handleClick}>
                            {loadingState === 'pending' ? 'In Loading' : 'Sign In'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
export default SignIn;
