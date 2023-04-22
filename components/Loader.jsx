import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./CSSFiles/Loader.module.css";
import images from "../assets";

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt="loader" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loader;