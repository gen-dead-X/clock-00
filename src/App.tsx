import "./App.scss";
import HomeClock from "./pages/HomeClock/HomeClock";
import BackgroundClock from "./ui/BackgroundClock/BackgroundClock";

function App() {
  return (
    <div className="main-wrapper relative">
      <BackgroundClock />
      <HomeClock />
    </div>
  );
}

export default App;
