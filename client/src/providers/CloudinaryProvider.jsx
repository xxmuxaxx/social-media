import { Cloudinary } from "@cloudinary/url-gen";
import React, { createContext, useContext } from "react";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  },
});

const cldContext = createContext(null);
const { Provider } = cldContext;

const CloudinaryProvider = ({ children }) => {
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

    const response = await fetch(process.env.REACT_APP_CLOUDINARY_API_URL, {
      method: "post",
      body: data,
    });
    return await response.json();
  };

  return <Provider value={{ cld, uploadImage }}>{children}</Provider>;
};

export const useCloudinary = () => {
  const context = useContext(cldContext);

  if (!context) throw new Error();

  return context;
};

export default CloudinaryProvider;
