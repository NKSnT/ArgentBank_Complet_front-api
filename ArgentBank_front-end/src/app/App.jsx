import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from 'src/components/header/Header';
import Footer from '@components/footer/Footer'; //alias

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
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}
export default App;
