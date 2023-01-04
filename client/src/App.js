import React from "react";
import Register from "./Register";
import Login from "./Login";
import Todo from "./Todo";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./style/App.css"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/todo" element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
