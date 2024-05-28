import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import SigninPage from "./pages/auth/SigninPage";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import UnAuthorized from "./pages/auth/UnAuthorized";
import { PersistGate } from "redux-persist/integration/react";
// import Dashboard from "./pages/dashboard/Dashboard";
import Books from "./pages/books/Books";
import DashboardLayout from "./layouts/DashboardLayout";
import Mails from "./pages/dashboard/pages/Mails";
import DashboardHome from "./pages/dashboard/pages/DashboardHome";
import DashboardSettings from "./pages/dashboard/pages/DashboardSettings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Layout */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} />
        <Route path="refresh" element={<div>refresh</div>} />
      </Route>
      
      {/* Accessible for all Authenticated users */}
      <Route
        path="/"
        element={<ProtectedLayout allowRoles={["admin", "member", "user"]} />}
      >
        <Route index element={<div>Home page</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Route>

      {/* Only admin accessible */}
      <Route path="/" element={<ProtectedLayout allowRoles={["admin"]} />}>
        <Route path="user" element={<div>User</div>} />
        <Route path="books" element={<Books />} />
      </Route>

      {/* Unauthorized Route */}
      <Route path="unAuthorized" element={<UnAuthorized />} />

      {/* All Dashboard Routes */}
      <Route
        path="/dashboard"
        element={<DashboardLayout allowRoles={["admin"]} />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="mails" element={<Mails />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<div>Not a Valid path</div>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => <RouterProvider router={router} />}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
