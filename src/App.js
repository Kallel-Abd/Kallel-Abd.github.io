import './App.css';
import Minter from './pages/Minter'
import Navbar from './components/Navbar';
import PorjectCreate from './pages/PorjectCreate';
import Projects from './pages/Projects';
import Usetoken from './pages/Usetoken';
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>

      <Route path="/" element={<Home/>} ></Route>
      <Route path="/minter" element={<Minter></Minter>} ></Route>
      <Route path="/projectcreate" element={<PorjectCreate/>} ></Route>
      <Route path="/projects" element={<Projects/>} ></Route>
      <Route path="/usetoken" element={<Usetoken/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
