export const getHealthCheck = (req, res) => {
  res.status(200).json({data: 'Server works'})
} 