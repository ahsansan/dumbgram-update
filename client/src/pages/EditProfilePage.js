import LeftMenu from "../components/LeftMenu";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";
import { useEffect } from "react";

function EditProfilePage() {
  useEffect(() => {
    document.title = "Edit Profile | Dumbgram";
  });
  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <LeftMenu />
        </div>
        <div className="home-right">
          <div>
            <div className="d-flex justify-content-center">
              <EditProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
