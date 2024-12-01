import "./App.scss";
import { UserContextProvider } from "./Context/UserContext";
import HomeClock from "./pages/HomeClock/HomeClock";
import BackgroundClock from "./ui/BackgroundClock/BackgroundClock";
import Navbar from "./ui/Navbar/Navbar";

function App() {
  return (
    <UserContextProvider>
      <div className="main-wrapper relative">
        <Navbar />
        <BackgroundClock />
        <HomeClock />
      </div>
    </UserContextProvider>
  );
}

export default App;
