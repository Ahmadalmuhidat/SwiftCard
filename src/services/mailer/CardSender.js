const nodemailer = require('nodemailer');
const fs = require("fs")
const path = require("path")

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: ""
  }
});

module.exports = {
  SendEmail: (EmailAddress, StudentName, CardBuffer) => {
    const htmlFilePath = path.join(
      __dirname,
      "html",
      "CardSender.html"
    );
    const htmlContent = fs.readFileSync(
      htmlFilePath,
      'utf8'
    )
    .replace("[Full Name]", StudentName)

    const subject = "You Digital Business Card is Ready";

    let mailOptions = {
      from: "",
      to: EmailAddress,
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'card.pkpass',
          content: CardBuffer
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}