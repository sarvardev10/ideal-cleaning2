import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  Main,
  // SignUp,
  // Profile,
  Service,
  Home,
  Clients,
  Marketing,
  Orders,
  Settings,
} from "@pages";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
