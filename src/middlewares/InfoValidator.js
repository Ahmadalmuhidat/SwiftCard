async function InfoValidator(req, res, file, next) {
  const {
    FullName,
    Email,
    Company,
    Position,
    Address,
    Phone
  } = req.body;

  if (
    FullName &&
    Email &&
    Company &&
    Position &&
    Address &&
    Phone &&
    file
  ) {
    next();
  } else {
    res.status(400).send(false);
  }
}

module.exports = InfoValidator;