import { Routes, Route } from "react-router-dom";
import "./App.scss";
import BaseProtectedRoute from "./hoc/BaseProtectedRoute";
import ArticlesContextProvider from "./context/ArticlesContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import CategoryContextProvider from "./context/CategoryContextProvider";
import PopupContextProvider from "./context/PopupContextProvider";
import BaseLayout from "./hoc/BaseLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BasePopup from "./components/BasePopup";

function App() {
  return (
    <div className="app">
      <PopupContextProvider>
        <BasePopup />
        <AuthContextProvider>
          <ArticlesContextProvider>
            <CategoryContextProvider>
              <Routes>
                <Route path="/" element={<BaseLayout />}>
                  <Route index element={<Home />} />
                  <Route path="article">
                    <Route path=":id" element={<Article />} />
                  </Route>
                  <Route
                    path="admin-dashboard"
                    element={
                      <BaseProtectedRoute>
                        <AdminDashboard />
                      </BaseProtectedRoute>
                    }
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<div>404</div>} />
                </Route>
              </Routes>
            </CategoryContextProvider>
          </ArticlesContextProvider>
        </AuthContextProvider>
      </PopupContextProvider>
    </div>
  );
}

export default App;
