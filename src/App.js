// import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // Import your components
// import Login from "./pages/user/login";
// import InstallationReq from "./pages/user/installationRequest";
// import InstallationBatch from "./pages/user/installationBatch";
// import Main from "./pages/user/main";
// import AdminInstallationReq from "./pages/admin/adminInstallationBatch";
// import BatchDetails from "./pages/user/installationDetails";
// import AdminBatchDetails from "./pages/admin/adminInstallationDetails";
// import InstallationOverride from "./pages/admin/adminInstallationOverride";
// import AdminRelocationHistory from "./pages/admin/adminRelocationHistory";
// import AdminRelocationBatch from "./pages/admin/adminRelocationBatch";
// import AdminDismantleBatch from "./pages/admin/adminDismantleBatch";
// import RelocationHistory from "./pages/user/relocationHistory";
// import RelocationBatch from "./pages/user/relocationBatch";
// import DismantleBatch from "./pages/user/dismantleBatch";
// import AdminMain from "./pages/admin/adminMain";
// import RelocationReq from "./pages/user/relocationRequest";
// import AdminRelocationDetails from "./pages/admin/adminRelocationDetails";
// import RelocationDetails from "./pages/user/relocationDetails";
// import DismantleRequest from "./pages/user/dismantleRequest";
// import DismantleHistory from "./pages/user/dismantleHistory";
// import AdminDismantleHistory from "./pages/admin/adminDismantleHistory";
// import DismantleDetails from "./pages/user/dismantleDetails";
// import AdminDismantleDetails from "./pages/admin/adminDismantleDetails";

// class App extends Component {
//   render() {
//     // Check if the user is authorized (logged in) and isAdmin by inspecting localStorage
//     const isAuthorized = localStorage.getItem("token") !== null;
//     const isAdmin = localStorage.getItem("isAdmin") === "true";

//     if (!isAuthorized) {
//       return (
//         <Router>
//           <Navigate to='/login' />
//           <Routes>
//             <Route path='' element={<Login />} />
//             <Route path='/login' element={<Login />} />
//           </Routes>
//         </Router>
//       );
//     }

//     // If user is not an admin, restrict access to admin routes
//     if (!isAdmin) {
//       return (
//         <Router>
//           <Routes>
//             <Route path='/login' element={<Login />} />
//             <Route path='/main' element={<Main />} />
//             <Route path='' element={<Main />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='/main' element={<Main />} />
//             <Route path='/installationRequest' element={<InstallationReq />} />
//             <Route path='/installationBatch' element={<InstallationBatch />} />
//             <Route path='/dismantleBatch' element={<DismantleBatch />} />
//             <Route path='/relocationHistory' element={<RelocationHistory />} />
//             <Route path='/installationDetails' element={<BatchDetails />} />
//             <Route path='/relocationBatch' element={<RelocationBatch />} />
//             <Route path='/relocationDetails' element={<RelocationDetails />} />
//             <Route path='/relocationRequest' element={<RelocationReq />} />
//             <Route path='/dismantleRequest' element={<DismantleRequest />} />
//             <Route path='/dismantleHistory' element={<DismantleHistory />} />
//             <Route path='/dismantleDetails' element={<DismantleDetails />} />
//           </Routes>
//         </Router>
//       );
//     }

//     // If user is an admin, allow access to all routes
//     return (
//       <Router>
//         <Routes>
//           <Route
//             path='/admin/installationBatch'
//             element={<AdminInstallationReq />}
//           />
//           <Route path='/admin/main' element={<AdminMain />} />
//           <Route path='login' element={<Login />} />
//           <Route path='' element={<AdminMain />} />
//           <Route
//             path='/admin/installationDetails'
//             element={<AdminBatchDetails />}
//           />
//           <Route
//             path='/admin/installationOverride'
//             element={<InstallationOverride />}
//           />
//           <Route
//             path='/admin/relocationHistory'
//             element={<AdminRelocationHistory />}
//           />
//           <Route
//             path='/admin/relocationBatch'
//             element={<AdminRelocationBatch />}
//           />
//           <Route
//             path='/admin/dismantleBatch'
//             element={<AdminDismantleBatch />}
//           />
//           <Route
//             path='/admin/dismantleHistory'
//             element={<AdminDismantleHistory />}
//           />
//           <Route
//             path='/admin/dismantleDetails'
//             element={<AdminDismantleDetails />}
//           />
//           <Route
//             path='/admin/relocationDetails'
//             element={<AdminRelocationDetails />}
//           />
//         </Routes>
//       </Router>
//     );
//   }
// }

// export default App;

import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/user/login";
import Main from "./pages/user/main";
import MainLayout from "./pages/user/mainLayout";
import InstallationHistory from "./pages/user/installationHistory";
import InstallationSearch from "./pages/user/installationSearch";
import InstallationDetails from "./pages/user/installationDetails";

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
        element: <Main />,
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
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;