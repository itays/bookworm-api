import nodemailer from 'nodemailer';

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transporter = setup();
  const mailOptions = {
    from,
    to: user.email,
    subject: 'Welcome to bookworm',
    text: `Welcome to bookworm, please confirm your email
    ${user.generateConfirmationUrl()}
    `,
    html: `
      <h1>Welcome to bookworm</h1><br/>
      <p>please confirm your email</p><br/>
      <a href="${user.generateConfirmationUrl()}">Verify my Email</a>
    `
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}