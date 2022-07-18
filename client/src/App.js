import React from "react";
import { Login, Register } from "./components/signup";
import Dashboar from "./components/dashboard";
import Chat from "./components/chat/Chat";
import NavbarHeader from "./components/navbar/Navbar";
import Inbox from "./components/Inbox";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Vote from "./components/vote/Vote";
import Bags from "./components/bags/window";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <NavbarHeader />
            <Routes>
              <Route path="/" element={<Bags />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboar />} />
              <Route path="/chat/:id/:name" element={<Chat />} />
              <Route path="/inbox/:id/:name" element={<Inbox />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/nike" element={<Bags />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
