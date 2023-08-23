const success = (res, data) => {
  return res.status(200).json({ success: true, data });
};

const created = (res, data) => {
  return res.status(201).json({ success: true, data });
};

const badRequest = (res, error) => {
  return res.status(400).json({ success: false, error });
};

const unauthorized = (res, error) => {
  return res.status(401).json({ success: false, error });
};

const notFound = (res, error) => {
  return res.status(404).json({ success: false, error });
};

const serverError = (res, error) => {
  return res.status(500).json({ success: false, error });
};

module.exports = {
  success,
  created,
  badRequest,
  unauthorized,
  notFound,
  serverError
};
