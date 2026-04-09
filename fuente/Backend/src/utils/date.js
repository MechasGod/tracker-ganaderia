const isFutureDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  return date > new Date();
};

const normalizeDayRange = (value) => {
  const d = new Date(value);
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

module.exports = {
  isFutureDate,
  normalizeDayRange,
};
