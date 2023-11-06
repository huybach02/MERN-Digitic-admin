import React from "react";
import {Modal} from "antd";

const CustomModal = ({title, desc, open, hideModal, performAction}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Confirm"
      cancelText="Cancel"
    >
      <p>{desc}</p>
    </Modal>
  );
};

export default CustomModal;
