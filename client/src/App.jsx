import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import TaskFormPage from "./pages/TaskFormPage";
import TaskPage from "./pages/TaskPage";
import AdminPage from "./pages/AdminPage";
import StockPage from "./pages/StockPage";
import StockFormPage from "./pages/StockFormPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavBar from "./components/AdminNavBar";

import { TaskProvider } from "./context/TasksContext";
import { ProductProvider } from "./context/ProductContext";
import ProtectedRoute from "./ProtectedRoute";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <TaskProvider>
          <CarritoProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/carta"
                  element={
                    <>
                      <div className="container mx-auto px-10 py-10">
                        <StockPage />
                      </div>
                    </>
                  }
                />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/admin/*"
                    element={
                      <>
                        <AdminNavBar />
                        <div className="container mx-auto px-10">
                          <Routes>
                            <Route path="/" element={<AdminPage />} />
                            <Route path="/products" element={<StockPage />} />
                            <Route
                              path="/add-product"
                              element={<StockFormPage />}
                            />
                            <Route
                              path="/products/:id"
                              element={<StockFormPage />}
                            />
                          </Routes>
                        </div>
                      </>
                    }
                  />
                </Route>
              </Routes>
              <Footer />
            </BrowserRouter>
          </CarritoProvider>

        </TaskProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
