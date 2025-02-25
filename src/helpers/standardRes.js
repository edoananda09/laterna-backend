exports.response = (
  res,
  status = 200,
  success = true,
  message = "",
  results,
  pageInfo
) => {
  const returnData = {
    success,
    message,
    pageInfo,
    results: {},
  };
  if (status >= 400) {
    returnData.success = false;
  }
  if (results !== null) {
    returnData.results = results;
  }
  return res.status(status).json(returnData);
};
