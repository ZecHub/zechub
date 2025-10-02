export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};