import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Calendar</NavLink> |{" "}
        <NavLink to="/manage">Settings</NavLink>
      </nav>

      {/* where nested routes render */}
      <Outlet />
    </>
  );
}

export default App;
