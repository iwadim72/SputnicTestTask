import "./App.scss";
import { PrivateRoute } from "./widgets/PrivateRoute/PrivateRoute.tsx";
import Landing from "./components/Landing/Landing.tsx";

function App() {
  return (
    <PrivateRoute>
      <Landing />
    </PrivateRoute>
  );
}

export default App;
