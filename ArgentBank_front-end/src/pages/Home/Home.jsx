import 'src/BaseCSS.css';

import { useEffect/* , useState */} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { userRememberLogin,
  selectUserInfo,
  selectUserToken
 } from 'src/app/authSlice'

function Home() { 

  const userInfo = useSelector(selectUserInfo) 
  const userToken =  useSelector(selectUserToken) 
  const dispatch = useDispatch()     
  useEffect(() => {  
    if(userToken && !userInfo){     
      //console.log('should not be null : '+ userToken)     
      dispatch(userRememberLogin((userToken)))
    }else {
      console.log('no token')
    }     
    }, [userToken, userInfo ,dispatch])  
  /* useEffect(() => {  // a fair uniquement en reload
    //console.log('userToken store : '+userToken)
    //console.log('userInfoe store : '+userInfo)
    //console.log('userToken local: '+ localStorage.getItem('userToken'))
    if(userToken  && !userInfo){//if not null nor undifined
      //console.log('should not be null but maybe its local storrage : '+localStorage.getItem('userToken'))
      console.log('should not be null : '+ userToken)        
      //dispatch(userRememberLogin((localStorage.getItem('userToken'))))
      dispatch(userRememberLogin((userToken)))
    }else if ( userInfo ){   
      console.log('not a reload, just normal nav')   
    } else{
      console.log('no token')
    }   
    }, [userToken,userInfo ,dispatch]) */

        return (  
          <>             
<main>
            <div className="hero">
              <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
              </section>
            </div>
            <section className="features">
              <h2 className="sr-only">Features</h2>
              <div className="feature-item">
                <img src="src/assets/img/icon-chat.png" alt="Chat Icon" className="feature-icon" />
                <h3 className="feature-item-title">You are our #1 priority</h3>
                <p>
                  Need to talk to a representative? You can get in touch through our
                  24/7 chat or through a phone call in less than 5 minutes.
                </p>
              </div>
              <div className="feature-item">
                <img
                  src="src/assets/img/icon-money.png"
                  alt="Chat Icon"
                  className="feature-icon"
                />
                <h3 className="feature-item-title">More savings means higher rates</h3>
                <p>
                  The more you save with us, the higher your interest rate will be!
                </p>
              </div>
              <div className="feature-item">
                <img
                  src="src/assets/img/icon-security.png"
                  alt="Chat Icon"
                  className="feature-icon"
                />
                <h3 className="feature-item-title">Security you can trust</h3>
                <p>
                  We use top of the line encryption to make sure your data and money
                  is always safe.
                </p>
              </div>
            </section>
          </main>
          </>
    );
}
export default Home;