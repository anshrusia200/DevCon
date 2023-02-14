import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { add_post } from "../../actions/post";
import { connect } from "react-redux";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
import { handleImageUpload } from "../../utilities/imageUpload";
const Write = ({ add_post }) => {
  const [title, setTitle] = useState("");
  const [urlArray, setUrlArray] = useState([]);
  const onchange_text = (e) => {
    setTitle(e.target.value);
  };
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

  const [value, onChange] = useState(initialValue);

  const imageUpload = async () => {
    try {
      ref.current.value = "";
      // setTextData({ title: "", text: "" });
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
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      text: value,
      imageUrlArray: urlArray,
    };
    console.log(formData);
    add_post(formData);
  };

  return (
    <div>
      <div className="new-post">
        <h1>Make a new post</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onchange_text}
          />
          <RichTextEditor
            value={value}
            onImageUpload={handleImageUpload}
            onChange={onChange}
            id="rte"
          />
          ;<button type="submit">post</button>
        </form>
      </div>
    </div>
  );
};

Write.propTypes = {
  add_post: PropTypes.func.isRequired,
};

export default connect(null, { add_post })(Write);
