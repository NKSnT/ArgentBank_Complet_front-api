import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Home from 'src/pages/Home/Home';
import Header from 'src/components/header/Header';
import Footer from '@components/footer/Footer'; //alias
//import SignIn from 'src/pages/Sign-In/SignIn';
import SignIn from 'src/pages/Sign-In/SignIn';
import Profile from 'src/pages/profile/Profile';

import Home from '@pages/Home/Home';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    {/* <Route path="/profile" element={<Profile />} />     */}
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}
export default App;

//utiliser state globaux pour :
// état conecte ( display du header qui change et accet au info user)
//a metre a j lors de la deconexion

/* 
- The React app contains an implementation of Redux for state management that:

 a store to manage all of the data
 action(s) for sending information
 reducer(s) for handling application state changes 
 
- A user should be able to:

 Navigate to the home page (/)
 See all placeholder data from mockup

- A user should be able to:

 Navigate to the login page (/login)
 Fill out credentials
 Login to the back-end API with JWT tokens for authentication
 Successfully navigate to a profile page (/profile)

- A user should be able to:

 See the logout button when logged in
 Click the logout button
 Be returned to the home page (/)


- After successfully logging in, a user should be able to:

 See their profile page
 See their first name on the profile page
 See placeholder bank account information

- A user should be able to:

 Edit their profile (first name and last name). - [ ] This data should be persisted to the database.
For more information on accessing the design assets, see the Design Assets section in the README.
 */
