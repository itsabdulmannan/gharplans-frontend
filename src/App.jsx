import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Containers/LoginPage/LoginPage";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import AdminLayout from "./Components/Layout/AdminLayout";
import routes from "./Utils/routes";

function App() {
  // const isLoggedIn = !!localStorage.getItem("authToken");
  const isLoggedIn = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminLayout>
                <Routes>
                  {routes.map(({ path, element: Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                  ))}
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
