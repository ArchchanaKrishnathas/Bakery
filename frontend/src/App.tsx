import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import PrivateRoute from "./context/PrivateRoute";

const App = () => {
  const { token, role, logout } = React.useContext(AuthContext);

  return (
    <Router>
      <nav>
        <Link to="/">Products</Link>{" | "}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {(role === "admin" || role === "staff") && <Link to="/create-product">Create Product</Link>}
        {token && <button onClick={logout}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-product"
          element={
            <PrivateRoute allowedRoles={["admin", "staff"]}>
              <CreateProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;








// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
