export default function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);

  res.status(500).json({
    error: "An error occurred on the server!",
  });
}
