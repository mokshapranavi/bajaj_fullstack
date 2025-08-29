module.exports = (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Full Stack API. Use POST /api/bfhl to process data.',
    operation_code: 1
  });
};
