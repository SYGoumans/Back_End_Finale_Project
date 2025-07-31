export default function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();

    console.log(
      `Logging - ${req.method} - ${req.originalUrl} - Duration: ${duration}ms - Timestamp ${timestamp}`
    );
  });

  next();
}
