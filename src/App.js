import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Maps from "pages/Maps";
import Footer from "components/Footer";
import { useContext, useState } from "react";
import { AuthContext } from "context/AuthContext";
import Single from "components/single/Single";
import NewProperty from "components/newClaim/NewClaim";
import {
  userColumns,
  claimColumns,
  propertyTypesColumns,
  cityColumns,
} from "./utils/datatablesource";
import "./assets/styles/index.css";
import Login from "pages/login/Login";
import EditProfile from "components/editProfile/EditProfile";
import EditPropertyType from "components/editPropertyType/EditPropertyType";
import NewPropertyType from "components/newPropertyType/NewPropertyType";
import EditClaim from "components/editClaim/EditClaim";
import NewClaim from "components/newClaim/NewClaim";
import Claim from "components/Claim";
import ViewClaim from "components/viewClaim/ViewClaim";
import Home from "pages/Home";
import AddClaim from "components/addClaim/AddClaim";
import Register from "pages/Register";
import AllClaims from "components/AllClaims";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    console.log(user);

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <div className="md:ml-64">
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="home" element={<Home />} />

              <Route path="/tables" element={<Tables />} />

              <Route path="claims">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      {user.roleId === 3 ? (
                        <Claim columns={claimColumns} />
                      ) : (
                        <AllClaims columns={claimColumns} />
                      )}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path=":claimId"
                  element={
                    <ProtectedRoute>
                      <EditClaim />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewClaim />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="view/:claimId"
                  element={
                    <ProtectedRoute>
                      <ViewClaim />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="propertyTypes">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Single columns={propertyTypesColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":propertyTypeId"
                  element={
                    <ProtectedRoute>
                      <EditPropertyType />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewPropertyType />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Single columns={userColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewProperty />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
