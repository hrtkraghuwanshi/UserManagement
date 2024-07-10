import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/users/Users";
import Homepage from "./components/homepage/Homepage";
import Protected from "./components/protectedroute/Protected";
import UserList from "./components/userlist/UserList";
import UserlistDetail from "./components/userslistdetail/UserlistDetail";

import NotFound from "./components/errorpage/NotFound";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Protected />}>
              <Route path="/homepage" element={<Homepage />} />
            </Route>
            <Route path="/dashboard" element={<Protected />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/users" element={<Protected />}>
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/userlist" element={<Protected />}>
              <Route path="/userlist" element={<UserList />} />
            </Route>
            <Route path="/userlist/detail" element={<Protected />}>
              <Route path="/userlist/detail" element={<UserlistDetail />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
            {/* <Route path="/users/detailed" element={<Detailed/>} /> */}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
