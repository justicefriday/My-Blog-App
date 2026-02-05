import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store.js";
import { Provider } from "react-redux";

import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import CreateBlogScreen from "./screens/CreateBlogScreen.jsx";
import DashBoardScreen from "./screens/DashBoardScreen.jsx";
import UpdateBlogScreen from "./screens/UpdateBlogScreen.jsx";
import BlogDetailScreen from "./screens/BlogDetailScreen.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={< HomeScreen/>} />
      <Route path={'login'} element={<LoginScreen />} />
      <Route path={'/register'} element={<RegisterScreen />} />
      <Route path={'/postBlog' }element={<CreateBlogScreen />} />
      <Route path={'/dashboard'} element={<DashBoardScreen />} />
      <Route path={'/blogs'} element={<HomeScreen />} />
      <Route path={'/blog/edit/:id'} element={<UpdateBlogScreen />} />
      <Route path={'/blog/:id'} element={<BlogDetailScreen />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
