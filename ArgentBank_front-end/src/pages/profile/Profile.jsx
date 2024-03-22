import 'src/BaseCSS.css';

import {/* React, */ useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {
 userRememberLogin,  
 selectUserInfo,
 selectUserToken, 
 userEdit
} from 'src/app/authSlice'


function Profile() {  

  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const userInfo = useSelector(selectUserInfo) 
  const userToken =  useSelector(selectUserToken) 
  const [modify, setModify] = useState(false);  

  useEffect(() => {  
    if(userToken && !userInfo){     
      //console.log('should not be null : '+ userToken)     
      dispatch(userRememberLogin((userToken)))
    }else if ( !userInfo ){   
      navigate('/')
      console.log('no token') 
    }   
    }, [userToken,userInfo ,navigate ,dispatch])    

function handleEditState(e){
    e.preventDefault()    
    if(modify){
      setModify(false)
    }else{
      setModify(true)
    }     
}
function handleEdit(e){
  e.preventDefault()  
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value  
  dispatch(userEdit(({firstName, lastName, userToken})))//ok
  console.log('test after dispatch')
  handleEditState(e)
}
if(userInfo){
  return (                    
    <>   
       <main className="main bg-dark">
<div className="header">
  {modify ? (
    <> <h1>Welcome back<br /></h1>
    <form >
      <div >
    <input className='name-edit_input' type="text" id="firstName" placeholder={userInfo.firstName} />
    <input className='name-edit_input' type="text" id="lastName" placeholder={userInfo.lastName}  />
    </div>
  <div >
  <button className="edit-button_2"  onClick={handleEdit}>Save</button>        
  <button className="edit-button_2"  onClick={ handleEditState} >Cancel</button>
  </div>
  
 </form>
 </>
    ) : (
     <><h1>Welcome back<br />{userInfo.firstName} {userInfo.lastName}</h1>
     <button className="edit-button" onClick={handleEditState}>Edit Name</button></>          
  )
  }      
</div>
<h2 className="sr-only">Accounts</h2>
<section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
    <p className="account-amount">$2,082.79</p>
    <p className="account-amount-description">Available Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <button className="transaction-button">View transactions</button>
  </div>
</section>
<section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
    <p className="account-amount">$10,928.42</p>
    <p className="account-amount-description">Available Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <button className="transaction-button">View transactions</button>
  </div>
</section>
<section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
    <p className="account-amount">$184.30</p>
    <p className="account-amount-description">Current Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <button className="transaction-button">View transactions</button>
  </div>
</section>
</main>
    </>        
  );
}
        
    }
export default Profile;