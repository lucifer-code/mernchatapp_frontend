import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import MainContainer from "./pages/MainContainer";
import Welcome from "./pages/Welcome";
import ChatArea from "./pages/ChatArea";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import CreateGroups from "./pages/CreateGroups";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="app"
          element={<MainContainer />}>
          <Route
            path="welcome"
            element={<Welcome />}
          />
          <Route
            path="chat/:id"
            element={<ChatArea />}
          />
          <Route
            path="users"
            element={<Users />}
          />
          <Route
            path="groups"
            element={<Groups />}
          />
          <Route
            path="create-groups"
            element={<CreateGroups />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
