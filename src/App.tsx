import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default App;
