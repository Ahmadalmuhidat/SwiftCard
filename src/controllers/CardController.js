const CardGenerator = require("../helper/CardGenerator")
const mailer = require("../services/mailer/CardSender")

async function CardController(req, res, logo) {
  const {
    FullName,
    Email,
    Company,
    Position,
    Address,
    Phone
  } = req.body;

  const BusinessCard = CardGenerator.GenerateCard(
    FullName,
    Email,
    Company,
    Position,
    Address,
    Phone,
    logo
  )

  mailer.SendEmail(
    Email,
    FullName,
    (await BusinessCard).getAsBuffer()
  );

  res.send(true)
}

module.exports = { CardController }