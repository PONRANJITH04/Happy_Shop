
import './App.css';
import Headers from './components/Header/Header'
import {Outlet} from 'react-router-dom'
function App() {
  
  return (
    <div className="App">
     <Headers />
     <Outlet />
    </div>
  );
}

export default App;
