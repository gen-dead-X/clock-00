import './App.scss';
import { UserContextProvider } from './Context/UserContext';
import Home from './pages/Home/Home';
import DefaultContextMenu from './ui/Global/DefaultContextMenu/DefaultContextMenu';

function App() {
  return (
    <UserContextProvider>
      <div className="main-wrapper relative">
        <DefaultContextMenu />

        <Home />
      </div>
    </UserContextProvider>
  );
}

export default App;
