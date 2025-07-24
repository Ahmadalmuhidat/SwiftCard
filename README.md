# SwiftCard Business Digital Card Generator
This project is a **Node.js MVC (Model-View-Controller)** application that allows users to create, customize, and generate **digital business cards** that can be saved directly into **Apple Wallet**. The application provides a user-friendly interface for designing business cards, and the backend processes these cards into the `.pkpass` format required by Apple Wallet.

## Features
- **Card Customization**: Allows users to input their name, company details, logo, and contact information.
- **Apple Wallet Support**: Generates cards in the `.pkpass` format, compatible with Apple Wallet.
- **Responsive Design**: Works on both desktop and mobile devices.
- **API Integration**: Exposes a RESTful API to generate business cards programmatically.
- **QR Code Scanning**: Contact information will be stored directly in mobile contacts by scanning the QR code on the generated business card.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **EJS (Embedded JavaScript)**: Templating engine for rendering dynamic views.
- **PassKit**: Node.js package to create and manage Apple Wallet passes.

## Installation
1. Clone the repository:

  ```bash
  git clone https://github.com/Ahmadalmuhidat/Digital-Business-Card-Generator.git
  cd Digital-Business-Card-Generator
  ```
2. Install dependencies:

  ```bash
  npm install
  ```
3. Run the app:
  ```bash
  npm start
  ```
4. Fill the required fields in CardSender controller to activate the mailer service.
5. Add the required files that will be used in the generating process (wwdr, signcert, signkey).
6. Open your browser and visit http://localhost:5000.

## Usage
1. Fill out your personal and business details in the form.
3. Upload your company logo and make sure the background is white.
4. Generate your digital business card and click on the .pkpass file.
5. Add it to your Apple Wallet.
