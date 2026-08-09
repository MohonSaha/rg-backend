import status from "http-status";

const notFound = (req, res) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: "Your requested api is not found in rg server !!",
    error: "",
  });
};

export default notFound;
