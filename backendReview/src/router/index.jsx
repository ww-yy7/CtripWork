//路由配置
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Authorization from "../pages/Authorization";
import { Suspense } from "react";
import { AuthRoute } from "../components/AuthRoute";
import { LoginRoute } from "../components/LoginRoute";

//路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path:"authorization",
        element:(
          <Authorization/>
        )
      }
    ],
  },
  {
    path: "/login",
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
]);

export default router;
