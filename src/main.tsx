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
import RootLayout from "./layouts/RootLayout";
import SigninPage from "./pages/auth/SigninPage";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<RootLayout allowRoles={["admin", "member", "user"]} />}
      >
        <Route path="" element={<div>Home page</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Route>
      <Route path="/" element={<RootLayout allowRoles={["admin", "user"]} />}>
        <Route path="user" element={<div>User</div>} />
      </Route>

      <Route path="unAuthorized" element={<div>unAuthorized</div>} />

      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} />
        {/* <Route path="logout" action={logoutUser} /> */}
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
