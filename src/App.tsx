import { Outlet,  } from "react-router-dom";
import Navbar from "./components/DayPicker/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>

      {/* where nested routes render */}
      <Outlet />
    </>
  );
}

export default App;
