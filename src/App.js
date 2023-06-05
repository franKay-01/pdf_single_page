import {Route, Routes} from 'react-router-dom';
import HomePage from "./pages/home";
import SignUpPage from './pages/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/sign' element={<SignUpPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
