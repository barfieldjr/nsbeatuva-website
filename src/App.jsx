import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import TopNav from "./components/TopNav/TopNav";
import ExecPage from "./components/ExecPage/ExecPage";
import EventsPage from "./components/EventsPage/EventsPage";
import JoinPage from "./components/JoinPage/JoinPage";
import Staging from "./components/Staging/Staging";
import { Login } from "./components/Login/Login";
import { InternalDashboard } from "./components/InternalDashboard/InternalDashboard";
import { Scheduling } from "./components/Scheduling/Scheduling";

function App() {
  return (
    <div className=" bg-gray-900 snap-y snap-mandatory h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exec" element={<ExecPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/internal/staging" element={<Staging />} />
          <Route path="internal" element={<Login />} />
          <Route path="internal/dashboard" element={<InternalDashboard />} />
          <Route path="internal/scheduling" element={<Scheduling />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
