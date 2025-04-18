import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminChefs from "../pages/admin/AdminChefs";
import AdminMenus from "../pages/admin/AdminMenu/AdminMenus";
import AdminLayout from "../layouts/AdminLayout";
import { ListMenuPage } from "../pages/admin/AdminMenu/ListMenuPage";

import { UpdateMenusPage } from "../pages/admin/AdminMenu/UpdateMenusPage";
import { CreateMenusPage } from "../pages/admin/AdminMenu/CreateMenuPage";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/chefs",
    element: (
      <AdminLayout>
        <AdminChefs />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/menus",
    element: (
      <AdminLayout>
        <ListMenuPage />
      </AdminLayout>
    ),
  },

  {
    path: "/admin/menus/:id/edit",
    element: (
      <AdminLayout>
        <UpdateMenusPage />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/menus/create",
    element: (
      <AdminLayout>
        <CreateMenusPage />
      </AdminLayout>
    ),
  },
];

export default adminRoutes;
