// utils function to send a response in a consistent format
const sendResponse = (res, data) => {
  return res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
