const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.json()); // Middleware to parse JSON bodies

// Endpoint to send email
app.post("/send-email", (req, res) => {
  const { message } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "adityakh7503@gmail.com", // Updated recipient email
    subject: "Valentine's Response",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.toString());
    }
    res.send("Email sent: " + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
