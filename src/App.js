

import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/user/login";
import Dashboard from "./pages/user/Dashboard";
import MainLayout from "./pages/user/mainLayout";
import InstallationHistory from "./pages/user/installationHistory";
import InstallationSearch from "./pages/user/installationSearch";
import InstallationDetails from "./pages/user/installationDetails";
import RelocationHistory from "./pages/user/relocationHistory";
import RelocationSearch from "./pages/user/relocationSearch";
import RelocationDetails from "./pages/user/relocationDetails";
import RelocationBatch from "./pages/user/relocationBatch";
import DismantleHistory from "./pages/user/dismantleHistory";
import DismantleSearch from "./pages/user/dismantleSearch";
import DismantleBatch from "./pages/user/dismantleBatch";
import DismantleDetails from "./pages/user/dismantleDetails";
import InstallationRequest from "./pages/user/installationRequest";
import RelocationRequest from "./pages/user/relocationRequest";
import DismantleRequest from "./pages/user/dismantleRequest";
import AdminMainLayout from "./pages/admin/adminMainLayout";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminInstallationHistory from "./pages/admin/adminInstallationHistory";
import AdminInstallationSearch from "./pages/admin/adminInstallationSearch";
import AdminBatchDetails from "./pages/admin/adminInstallationDetails";
import AdminRelocationHistory from "./pages/admin/adminRelocationHistory";
import AdminRelocationBatch from "./pages/admin/adminRelocationBatch";
import AdminRelocationDetails from "./pages/admin/adminRelocationDetails";
import AdminRelocationSearch from "./pages/admin/adminRelocationSearch";
import AdminDismantleHistory from "./pages/admin/adminDismantleHistory";
import AdminDismantleSearch from "./pages/admin/adminDismantleSearch";
import AdminDismantleBatch from "./pages/admin/adminDismantleBatch";
import AdminDismantleDetails from "./pages/admin/adminDismantleDetails";
import AdminInstallationOverride from "./pages/admin/adminInstallationOverride";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "installationHistory",
        element: <InstallationHistory />,
        children: [
          {
            index: true,
            element: <InstallationSearch />,
          },
          {
            path: "installationDetails",
            element: <InstallationDetails />,
          },
          
        ],
      },
      {
        path: "relocationHistory",
        element: <RelocationHistory />,
        children: [
          {
            index: true,
            element: <RelocationSearch />,
          },
          {
            path: "relocationBatch",
            element: <RelocationBatch />,
          },
          {
            path: "relocationDetails",
            element: <RelocationDetails />,
          },
        ],
      },
      {
        path: "dismantleHistory",
        element: <DismantleHistory />,
        children: [
          {
            index: true,
            element: <DismantleSearch />,
          },
          {
            path: "dismantleBatch",
            element: <DismantleBatch />,
          },
          {
            path: "dismantleDetails",
            element: <DismantleDetails />,
          },
        ],
      },
      {
        path: "installationRequest",
        element: <InstallationRequest />,
      },
      {
        path: "relocationRequest",
        element: <RelocationRequest />,
      },
      {
        path: "dismantleRequest",
        element: <DismantleRequest />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMainLayout />,
    children:  [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "installationHistory",
        element: <InstallationHistory />,
        children: [
          {
            index: true,
            element: <AdminInstallationSearch />,
          },
          {
            path: "installationDetails",
            element: <AdminBatchDetails />,
          },
          {
            path: "installationOverride",
            element: <AdminInstallationOverride />,
          }
          
        ],
      },
      {
        path: "relocationHistory",
        element: <AdminRelocationHistory />,
        children: [
          {
            index: true,
            element: <AdminRelocationSearch />,
          },
          {
            path: "relocationBatch",
            element: <AdminRelocationBatch />,
          },
          {
            path: "relocationDetails",
            element: <AdminRelocationDetails />,
          },
        ],
      },
      {
        path: "dismantleHistory",
        element: <AdminDismantleHistory />,
        children: [
          {
            index: true,
            element: <AdminDismantleSearch />,
          },
          {
            path: "dismantleBatch",
            element: <AdminDismantleBatch />,
          },
          {
            path: "dismantleDetails",
            element: <AdminDismantleDetails />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;