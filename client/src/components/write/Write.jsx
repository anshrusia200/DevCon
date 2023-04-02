import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { add_post, loadingPosts } from "../../actions/post";
import { postDraft } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
import { handleImageUpload } from "../../utilities/imageUpload";
import Spinner from "../layout/Spinner/Spinner";
import _, { map } from "underscore";

const Write = ({
  add_post,
  postDraft,
  loadingPosts,
  post: { loading },
  user: { draft },
  setAlert,
}) => {
  const [title, setTitle] = useState(draft.title);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const ref = useRef("");

  const onchange_title = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    console.log(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const [textValue, setTextValue] = useState(draft.text);
  const canPublish = Boolean(textValue) && Boolean(title);
  const imageUpload = async () => {
    if (image !== "") {
      try {
        ref.current.reset();
        const instance = axios.create();
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blogappuploads");
        data.append("cloud_name", "appcloudansh");
        console.log(data);
        delete instance.defaults.headers.common["x-auth-token"];

        const res = await instance.post(
          "https://api.cloudinary.com/v1_1/appcloudansh/image/upload/",
          data
        );
        console.log(res);
        const formData = {
          title: title,
          text: textValue,
          imageUrl: res.data.url,
        };
        console.log(formData);
        add_post(formData);
      } catch (e) {
        console.log(e);
      }
    } else {
      const formData = {
        title: title,
        text: textValue,
        imageUrl: "",
      };
      ref.current.reset();
      add_post(formData);
      setTextValue("");
      setTitle("");
    }
  };
  const onChange = (textValue) => {
    setTextValue(textValue);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (canPublish) {
      loadingPosts();
      imageUpload();
    } else {
      if (title === "") setAlert("Title not provided", "danger");
      if (textValue === "") setAlert("Content not provided", "danger");
    }
  };

  const sendDraft = async () => {
    await postDraft(title, textValue);
    console.log("draft sent");
  };
  const valueChange = _.debounce(() => sendDraft(), 300);

  const clearDraft = async () => {
    setTitle("");
    setTextValue("");
    await postDraft("", "");
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={onSubmit} ref={ref}>
        <div className="right">
          <input
            className="writeTitle"
            placeholder="Title"
            type="text"
            value={title}
            autoFocus={true}
            onChange={onchange_title}
            onKeyUp={valueChange}
          />
          <RichTextEditor
            sx={{
              width: "100%",
              height: "68vh",
              overflow: "scroll",
              overflowX: "hidden",
              marginBottom: "20px",
            }}
            value={textValue}
            onChange={onChange}
            onKeyUp={valueChange}
            id="rte"
            onImageUpload={handleImageUpload}
          />
          <div>
            <button onClick={clearDraft} type="button" className="clr-draft">
              <i class="fa fa-trash" aria-hidden="true"></i> &nbsp; Clear draft
            </button>
          </div>
        </div>
        <div className="form-section left">
          <div className="writeFormGroup img-wrapper">
            <img
              className="writeImg"
              src={
                preview ||
                "https://res.cloudinary.com/appcloudansh/image/upload/v1675093107/blogapp/Group_1_l70ltw.png"
              }
              alt=""
            />
          </div>
          <div className="writeFormGroup publish-buttons">
            <label htmlFor="fileInput" className="glow-btn btn2" id="poster">
              <i className="fas fa-plus"></i> Poster
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              className="glow-btn"
              id="publish"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <i className="fas fa-upload" aria-hidden="true"></i> Publish
                </>
              )}{" "}
            </button>
          </div>
          <div className="draft-note">
            <ol>
              <li>
                {" "}
                All your content is saved as draft in real time. You can leave
                the content as is, and continue later hassle free.{" "}
              </li>
              <li>
                <b>
                  Embedded videos and some large images might not be saved as
                  draft
                </b>
              </li>
            </ol>
          </div>
        </div>
      </form>
    </div>
  );
};

Write.propTypes = {
  add_post: PropTypes.func.isRequired,
  postDraft: PropTypes.func.isRequired,
  loadingPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  add_post,
  setAlert,
  postDraft,
  loadingPosts,
})(Write);
