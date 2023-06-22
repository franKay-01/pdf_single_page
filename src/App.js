import {Route, Routes} from 'react-router-dom';
import HomePage from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/:subscriber_id' element={<HomePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
