import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import { getAccessToken } from "./lib/token";
import { Login, Register } from "./pages";
import { Layout } from "./components";

function App() {
  return (
    <main className="antialiased">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
