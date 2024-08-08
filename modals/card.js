const { PKPass } = require('passkit-generator');
const mailer = require("../helper/mailer/CardSender")
const vCard = require('vcf');
const fs = require("fs");

async function generateCard(req, res, file) {
  const {
    FullName,
    Email,
    Company,
    Position,
    Address,
    Phone
  } = req.body;

  const DigitalPass = await PKPass.from({
    model: "./Business-Card",
    certificates: {
      wwdr: fs.readFileSync('./keys/wwdr.pem'),
      signerCert: fs.readFileSync('./keys/signerCert.pem'),
      signerKey: fs.readFileSync('./keys/signerKey.pem'),
      signerKeyPassphrase: "1234"
    },
  },
    {
      organizationName: Company,
      description: Company + "Business Digital Card",
      logoText: Company
    }
  );

  DigitalPass.primaryFields.push({
    label: "Full Name",
    key: "FullName",
    value: FullName,
    textAlignment: "PKTextAlignmentLeft"
  })

  DigitalPass.secondaryFields.push({
    key: "Email",
    label: "Email",
    value: Email,
    textAlignment: "PKTextAlignmentLeft"
  });

  DigitalPass.secondaryFields.push({
    key: "Position",
    label: "Position",
    value: Position,
    textAlignment: "PKTextAlignmentRight"
  });

  DigitalPass.auxiliaryFields.push({
    key: "PhoneNumber",
    label: "Phone Number",
    value: Phone,
    textAlignment: "PKTextAlignmentLeft"
  });

  DigitalPass.auxiliaryFields.push({
    key: "Address",
    label: "Address",
    value: Address,
    textAlignment: "PKTextAlignmentRight"
  });

  DigitalPass.addBuffer("logo.png", file)

  const card = new vCard();

  card.add('FN', FullName);
  card.add('N', FullName);
  card.add('TEL', Phone, { type: 'WORK' });
  card.add('EMAIL', Email);
  card.add('ORG', Company);
  card.add('TITLE', Position);

  const vCardString = card.toString();

  DigitalPass.setBarcodes({
    message: vCardString,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1"
  });

  const buffer = DigitalPass.getAsBuffer();

  mailer.sendEmail(Email, FullName, buffer);
  res.send(true)
}

module.exports = { generateCard }