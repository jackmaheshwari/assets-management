import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Hardware from "./pages/Hardware";
import Software from "./pages/Software";
import NonIT from "./pages/NonIT";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/software" element={<Software />} />
          <Route path="/non-it" element={<NonIT />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
