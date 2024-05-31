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

import {
  DashboardBooks,
  DashboardOverview,
  DashboardUsers,
  DashboardSettings,
  DashboardMails,
} from "@/pages/dashboard/pages";
import { ThemeProvider } from "@/components/Theme-provider"

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
        <Route index element={<DashboardOverview />} />
        <Route path="mails" element={<DashboardMails />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="books" element={<DashboardBooks />} />
        <Route path="users" element={<DashboardUsers />} />
        <Route path="logout" element={"logout"} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<div>Not a Valid path</div>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeProvider>
     <PersistGate loading={null} persistor={persistor}>
        {() => <RouterProvider router={router} />}
      </PersistGate>
     </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
