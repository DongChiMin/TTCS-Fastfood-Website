// Pages
import Home from "../pages/Home";
import Menus from "../pages/Menus";
import Blogs from "../pages/Blogs";
import Chefs from "../pages/Chefs";
import RegisterClass from "../pages/RegisterClass";
import Recruitment from "../pages/Recuitment";
import Shop from "../pages/Shop";
import Detail from "../pages/Detail";
import CheckOut from "../pages/CheckOut";
import Test from "../pages/test";
// Layout
import UserLayout from "../layouts/UserLayout";

const routes = [
  {
    path: "/",
    element: (
      <UserLayout>
        <Home />
      </UserLayout>
    ),
  },
  {
    path: "/menus",
    element: (
      <UserLayout>
        <Menus />
      </UserLayout>
    ),
  },
  {
    path: "/blogs",
    element: (
      <UserLayout>
        <Blogs />
      </UserLayout>
    ),
  },
  {
    path: "/chefs",
    element: (
      <UserLayout>
        <Chefs />
      </UserLayout>
    ),
  },
  {
    path: "/recruitment",
    element: (
      <UserLayout>
        <Recruitment />
      </UserLayout>
    ),
  },
  {
    path: "/shop",
    element: (
      <UserLayout>
        <Shop />
      </UserLayout>
    ),
  },
  {
    path: "/recuitment",
    element: (
      <UserLayout>
        <Recruitment />
      </UserLayout>
    ),
  },
  {
    path: "/register-class",
    element: (
      <UserLayout>
        <RegisterClass />
      </UserLayout>
    ),
  },
  {
    path: "/detail",
    element: (
      <UserLayout>
        <Detail />
      </UserLayout>
    ),
  },
  {
    path: "/detail/:id",
    element: (
      <UserLayout>
        <Detail />
      </UserLayout>
    ),
  },
  {
    path: "/check-out",
    element: (
      <UserLayout>
        <CheckOut />
      </UserLayout>
    ),
  },
  {
    path: "/test",
    element: (
      <UserLayout>
        <Test />
      </UserLayout>
    ),
  },
];

export default routes;
