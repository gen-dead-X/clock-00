import "./App.scss";
import { UserContextProvider } from "./Context/UserContext";
import HomeClock from "./pages/HomeClock/HomeClock";
import Navbar from "./ui/Navbar/Navbar";

function App() {
  return (
    <UserContextProvider>
      <div className="main-wrapper relative">
        <Navbar />
        <HomeClock />
      </div>
    </UserContextProvider>
  );
}

export default App;
