// ref: https://github.com/tryber/sd-013-c-live-lectures/blob/lecture/27.2/middlewares/errorMiddleware.js

const error = (err, req, res, _next) => {
  if (err.status) {
    const { status, code, message } = err;

    return res.status(status).json({ 
      err: {
        code,
        message,
      }, 
    });
  }
console.log('ERROR: ', err);
  return res.status(500).json({ message: 'Internal Error' });
};

module.exports = error;