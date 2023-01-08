import React from "react";
import Register from "./Register";
import Login from "./Login";
import Todo from "./Todo";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./style/App.css"
import './style/Todo.css';

export const CredentialsContext = React.createContext()
function App() {
  const credentialsState = React.useState(null)
  return (
    <div className="center">
      <CredentialsContext.Provider value={credentialsState}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/todo" element={<Todo/>}/>
          </Routes>
        </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;

