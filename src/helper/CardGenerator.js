const { PKPass } = require('passkit-generator');
const vCard = require('vcf');
const fs = require("fs");

async function GenerateCard(
  fullName,
  email,
  company,
  position,
  address,
  phone,
  logo
) {

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
      serialNumber: "XD",
      foregroundColor: "rgb(0,0,0)",
      backgroundColor: "rgb(255,255,255)",
      labelColor: "rgb(0,0,0)",
      organizationName: company,
      description: company + "Business Digital Card",
      logoText: company
    }
  );

  DigitalPass.primaryFields.push({
    label: "Full Name",
    key: "FullName",
    value: fullName,
    textAlignment: "PKTextAlignmentLeft"
  })

  DigitalPass.secondaryFields.push({
    key: "Email",
    label: "Email",
    value: email,
    textAlignment: "PKTextAlignmentLeft"
  });

  DigitalPass.secondaryFields.push({
    key: "Position",
    label: "Position",
    value: position,
    textAlignment: "PKTextAlignmentRight"
  });

  DigitalPass.auxiliaryFields.push({
    key: "PhoneNumber",
    label: "Phone Number",
    value: phone,
    textAlignment: "PKTextAlignmentLeft"
  });

  DigitalPass.auxiliaryFields.push({
    key: "Address",
    label: "Address",
    value: address,
    textAlignment: "PKTextAlignmentRight"
  });

  DigitalPass.addBuffer("logo@2x.png", logo.buffer)

  const card = new vCard();

  card.add('FN', fullName);
  card.add('N', fullName);
  card.add('TEL', phone, { type: 'WORK' });
  card.add('EMAIL', email);
  card.add('ORG', company);
  card.add('TITLE', position);

  const vCardString = card.toString();

  DigitalPass.setBarcodes({
    message: vCardString,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1"
  });

  return DigitalPass;
}

module.exports = { GenerateCard }