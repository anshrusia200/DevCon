import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { add_post } from "../../actions/post";
import { connect } from "react-redux";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
import { handleImageUpload } from "../../utilities/imageUpload";
import Spinner from "../layout/Spinner/Spinner";

const Write = ({ add_post, post: { loading } }) => {
  const [title, setTitle] = useState("");
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

  const [textValue, setTextValue] = useState("");

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
    imageUpload();
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
          />
          <RichTextEditor
            sx={{
              width: "100%",
              height: "68vh",
              overflow: "scroll",
              marginBottom: "20px",
            }}
            value={textValue}
            onChange={onChange}
            id="rte"
            onImageUpload={handleImageUpload}
          />
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
            <label htmlFor="fileInput" className="glow-btn btn2">
              <i className="fas fa-plus"></i> Poster
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="glow-btn" type="submit">
              <i className="fas fa-upload" aria-hidden="true"></i> Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Write.propTypes = {
  add_post: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { add_post })(Write);
