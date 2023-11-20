import './App.css';
import Nav from './componenets/Nav';
import Search from './componenets/Search';
import Home from './componenets/Home';
import { Route, Routes } from 'react-router-dom';


// defining my App
function App() {
  return (
      <div className="App">
          <Nav />
          <Routes>
            {/* 2 routes Home and Search  */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />}  />
          </Routes>
      </div>
  );
}

export default App;
