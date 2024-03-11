import React from "react";
import { Modal, Box } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  size: { width: number | string; height: number | string };
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  size,
  children,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: size.width,
    height: size.height,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto", // Optional: if you want the content to be scrollable
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
