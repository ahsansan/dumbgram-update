// Import CSS
import "../styles/components/createpost.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";

// config
import { API } from "../config/api";

// Oas
import Aos from "aos";
import "aos/dist/aos.css";

// Sweet alert
import Swal from "sweetalert2";

function CreatePost() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // useSate
  const [state, dispatch] = useContext(UserContext);
  parseInt(`${state.user.id}`);

  // form pertama kali di load
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    fileName: "",
    like: 0,
    idUser: `${state.user.id}`,
    caption: "",
  });

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
      formData.set("fileName", form.fileName[0], form.fileName[0].name);
      formData.set("like", form.like);
      formData.set("idUser", form.userFeed);
      formData.set("caption", form.caption);

      await API.post("/feed", formData, config);

      const response = await API.get("/check-auth");

      Swal.fire("Good job!", "Upload Success", "success");

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

  return (
    <div className="create-post-container" data-aos="fade-up">
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {preview && (
          <img src={preview} className="img-fluid rounded" width="40%" />
        )}
        <div>
          <label for="input-photo-video" className="post-upload-photo-button">
            <p>Upload Photos or Video</p>
          </label>
          <input
            type="file"
            id="input-photo-video"
            onChange={handleOnChange}
            name="fileName"
            hidden
          />
        </div>
        <div>
          <input
            type="hidden"
            onChange={handleOnChange}
            name="idUser"
            placeholder="userFeed"
          />
          <textarea
            name="caption"
            id="caption"
            className="caption-textarea"
            onChange={handleOnChange}
            placeholder="Caption"
          ></textarea>
        </div>
        <div className="upload-button-container">
          <button type="submit" className="upload-button">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
