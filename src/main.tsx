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
import Dashboard from "./pages/dashboard/Dashboard";
import Books from "./pages/books/Books";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<ProtectedLayout allowRoles={["admin", "member", "user"]} />}
      >
        <Route path="" element={<div>Home page</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Route>
      <Route
        path="/"
        element={<ProtectedLayout allowRoles={["admin", "user"]} />}
      >
        <Route path="user" element={<div>User</div>} />
        <Route path="books" element={<Books/>} />
      </Route>
      <Route path="/" element={<ProtectedLayout allowRoles={["admin"]} />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="unAuthorized" element={<UnAuthorized />} />

      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} />
        <Route path="refresh" element={<div>refresh</div>} />
      </Route>
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
