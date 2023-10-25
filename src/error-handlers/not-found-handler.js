export const notFoundHandler = (req, res, next) => {
  const err = new Error(`Can't find this page`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err)
}