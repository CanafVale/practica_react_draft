import { Navigate, Outlet, Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login-page";
import RequireAuth from "./pages/auth/components/require-auth";
import Layout from "./components/layout/layout";
import AdvertsPage from "./pages/adverts/adverts-page";
import AdvertPage from "./pages/adverts/advert-page";
import NewAdvertPage from "./pages/adverts/new-advert-page";
import NotFoundPage from "./pages/error/not-found-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/adverts" />}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />}></Route>
        <Route path=":advertId" element={<AdvertPage />}></Route>
        <Route path="new" element={<NewAdvertPage />}></Route>
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
