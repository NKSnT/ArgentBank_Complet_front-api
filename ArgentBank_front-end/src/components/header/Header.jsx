import { Link } from 'react-router-dom';
import Logo from '@img/argentBankLogo.png';
import 'src/BaseCSS.css';

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

  import {    
    LOG_OUT,
    selectUserAuthStatut ,
    selectUserInfo 
  } from 'src/app/authSlice'

function Header() {
    const navigate = useNavigate()    
    const logedState = useSelector(selectUserAuthStatut )    
    const dispatch = useDispatch() 
    const userInfo = useSelector(selectUserInfo) 

    function handleLogOut(e){
        e.preventDefault()
        navigate('/')  
        dispatch(LOG_OUT())               
    }
    /* useEffect(() => {
        if (!userInfo ) {            
          navigate('/')
        }
        }, [navigate, userInfo]) */

    return (
        <nav className="main-nav">
            <Link to="/" className='main-nav-logo'>
                <img
                className="main-nav-logo-image"
                src={Logo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>       
        <div>                            
                   {/* (logedState ==='succeeded') */logedState ? (
                <>  
                <Link to="/profile" className='main-nav-item'>
                    <i className="fa fa-user-circle"></i>
                    {/* Tony */}
                    {userInfo.firstName}
                </Link>          
                <Link to="/" className='main-nav-item' onClick={handleLogOut}> 
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link> 
                </> 
            ):(
                <Link to="/sign-in" className='main-nav-item'>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>  
            )} 
        </div>
      </nav>
      
    );
}
export default Header;


