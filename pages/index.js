import React, { useEffect, useState, useContext } from "react";

// import { BlockTalkContect } from "../Context/BlockTalkContext";
import Filter from "../Components/Filter";
import Friend from "../Components/Friend";

// Define the BlockTalk functional component
const BlockTalk = () => {
  // const {} = useContext(BlockTalkContect); // This line of code is commented out
  return (
    // Render the Filter and Friend components
    <div>
      <Filter />
      <Friend />
    </div>
  );
};

export default BlockTalk;