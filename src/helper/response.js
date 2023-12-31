const moment = require('moment')

module.exports = (res, status, message = null, error = null, data = null) => {
   const timestamps = new Date().toISOString();
   res.status(status).json({
      status,
      message,
      error,
      data,
      timestamps: moment(timestamps).format('DD-MM-YYYY'),
   });
};
