const sendSuccess = (res, statusCode, payload = {}) => {
  return res.status(statusCode).json({ success: true, ...payload });
};

const parsePagination = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

module.exports = {
  sendSuccess,
  parsePagination,
  buildPaginationMeta,
};
