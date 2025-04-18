import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminChefs from "../pages/admin/AdminChefs";
import AdminMenus from "../pages/admin/AdminMenus";
import AdminLayout from "../layouts/AdminLayout";
import AdminReservation from "../pages/admin/AdminReservation";

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
        <AdminMenus />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/reservations",
    element: (
      <AdminLayout>
        <AdminReservation />
      </AdminLayout>
    ),
  },
];

export default adminRoutes;
