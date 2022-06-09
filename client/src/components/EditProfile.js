// Import CSS
import "../styles/components/editprofile.css";
// Hooks
import { useContext, useState, useEffect } from "react";
// Sweet alert
import Swal from "sweetalert2";
// Oas
import Aos from "aos";
import "aos/dist/aos.css";
// useContext
import { UserContext } from "../context/userContext";
// config
import { API } from "../config/api";

function EditProfile() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // id user login
  const [state, dispatch] = useContext(UserContext);

  // form awal
  const [form, setForm] = useState({
    image: "",
    fullName: "",
    username: "",
    bio: "",
  });

  const [preview, setPreview] = useState("");

  const { image, fullName, username, bio } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("fullName", form.fullName);
      formData.set("username", form.username);
      formData.set("bio", form.bio);

      await API.patch(`/user/${state.user.id}`, formData, config);

      const response = await API.get("/check-auth");

      Swal.fire("Good job!", "Update Success", "success");

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await API.get(`user/${state.user.id}`);
      const user = response.data.data.user;

      // form isi data
      setForm({
        image: user.image,
        fullName: user.fullName,
        username: user.username,
        bio: user.bio,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [state.user.id]);

  return (
    <div className="edit-profile-container" data-aos="fade-up">
      <h1>Edit Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {preview ? (
          <img src={preview} className="img-fluid rounded" width="20%" />
        ) : (
          <img src={image} className="img-fluid rounded" width="15%" />
        )}
        <div>
          <label htmlFor="input-photo" className="profile-upload-photo-button">
            <p>Upload Photos</p>
          </label>
          <input
            type="file"
            id="input-photo"
            onChange={handleOnChange}
            name="image"
            hidden
          />
        </div>
        <div>
          <input
            type="text"
            name="fullName"
            id="fullName"
            onChange={handleOnChange}
            value={fullName}
            className="normal-input"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleOnChange}
            value={username}
            className="normal-input"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="Bio"
            className="normal-input"
            onChange={handleOnChange}
            value={bio}
          />
        </div>
        <div className="save-button-container">
          <button type="submit" className="save-button">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
