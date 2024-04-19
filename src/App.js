import { Routes, Route } from 'react-router-dom';
import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path='/src/Home.jsx' element={<Home />} />
    </Routes>
  );
};

export default App;
