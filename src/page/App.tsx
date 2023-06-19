import { Routes, Route } from "react-router-dom";

import Login from './Login';
import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
