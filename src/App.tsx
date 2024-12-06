import './App.scss';
import { UserContextProvider } from './Context/UserContext';
import Home from './pages/Home/Home';
import Navbar from './ui/Navbar/Navbar';

function App() {
  return (
    <UserContextProvider>
      <div className="main-wrapper relative">
        <Navbar />
        <Home />
      </div>
    </UserContextProvider>
  );
}

export default App;
