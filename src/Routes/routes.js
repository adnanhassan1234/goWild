import LandingPage from "Pages/LandingPage";
import Home from "Pages/Home/loadable";
import NotFound from "Pages/NotFound/loadable";

import MainLayout from "Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/login";
import SubAdmin from "../Pages/SubAdmin";
import CardsPage from "../Pages/Cards";
import RouteList from "../Pages/RoutelistPage";
import CreateRoute from "../Pages/RoutelistPage/CreateRoute";
// import CreateRoute from "../Pages/RoutelistPage/CreateRoute";
import TreasureChestList from "../Pages/TreasureChest";
import Users from "../Pages/User";
import UserRoute from "../Pages/UserRoute";
import ViewRoute from "../Pages/UserRoute/viewRoute";
import TreasureHuntRegistration from "../Pages/treasureHuntRegistration";
import Approved from "../Pages/treasureHuntRegistration/approved";
import Support from "../Pages/Support";
import Guidlines from "../Pages/Guidlines";
import TreasureHuntEWaiver from "../Pages/TreasureHuntEWaiver";
import CreateTreasure from "Pages/TreasureChest/CreateRoute";
import ForgetPassword from "Pages/Auth/Forget/ForgetPassword";
import RegisterEmail from "Pages/Auth/Forget/RegisterEmail";
// import EditTreasure from "Pages/TreasureChest/EditRoute";

const routes = [
  {
    path: "/",
    layout: AuthLayout,
    component: Login,
  },
  {
    path: "/forget-Password",
    layout: AuthLayout,
    component: ForgetPassword,
  },
  {
    path: "/rigister-email",
    layout: AuthLayout,
    component: RegisterEmail,
  },
  {
    path: "/dashboard",
    component: LandingPage,
    layout: MainLayout,
  },
  {
    path: "/home",
    component: Home,
    layout: MainLayout
  },
  {
    path: "/sub-admin",
    component: SubAdmin,
    layout: MainLayout
  },
  {
    path: "/cards",
    component: CardsPage,
    layout: MainLayout
  },
  {
    path: "/treasure-chests-list",
    component: TreasureChestList,
    layout: MainLayout
  },
  {
    path: "/route-list",
    component: RouteList,
    layout: MainLayout,
  },
  {
    path: "/route-list/create",
    component: CreateRoute,
    layout: MainLayout,
  },
  {
    path: "/treasure-list/create",
    component: CreateTreasure,
    layout: MainLayout,
  },
  // {
  //   path: "/treasure-list/edit",
  //   component: EditTreasure,
  //   layout: MainLayout,
  // },

  {
    path: "/login",
    layout: AuthLayout,
    component: Login,
  },

  {
    path: "/support",
    layout: MainLayout,
    component: Support,
  },

  {
    path: "/guidelines",
    layout: MainLayout,
    component: Guidlines,
  },
  {
    path: "/treasure-hunt-e-waiver",
    layout: MainLayout,
    component: TreasureHuntEWaiver,
  },



  {
    path: "/users",
    layout: MainLayout,
    component: Users,
    /*subRoutes: [
      {
        path: "/",
        component: User,
      },
      {
        path: "/profile",
        component: Profile,
      },
    ],*/
  },
  {
    path: "/users-route",
    layout: MainLayout,
    component: UserRoute,
    subRoutes: [
      {
        path: "/",
        component: UserRoute,
      },
      {
        path: "/view-route/:id",
        component: ViewRoute,
      },
    ],
  },
  {
    path: "/treasure-hunt",
    layout: MainLayout,
    component: TreasureHuntRegistration,
    subRoutes: [
      {
        path: "/",
        component: TreasureHuntRegistration,
      },
      {
        path: "/approved",
        component: Approved,
      },
    ],
  },
  { path: "*", component: NotFound, layout: MainLayout },
];

export default routes;
