import React from "react";
import {Spin} from "antd";

const Loading = ({size}) => {
  return (
    <div>
      <Spin size={size} />
    </div>
  );
};

export default Loading;
