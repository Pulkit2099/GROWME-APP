
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecondPage from './SecondPage'; 
import UserForm from './UserForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserForm/>} />
                <Route path="/second-page" element={<SecondPage />} />
            </Routes>
        </Router>
    );
}

export default App;
