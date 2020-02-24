export const nodeMailer = email => {
  const mailer = require('mailer');

  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${dummy23ert}`,
      pass: `${dummy098}`,
    },
  });

  const mailOptions = {
    from: 'dummy23ert@gmail.com',
    to: `${email}`,
    subject: 'Link to Reset Password',
    text: 'You are receiving this email from TransportWise to reset your password. Click on the link below.\n\n' + '',
  };

  console.log('sending mail');

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log('there was an error: ', err);
    } else {
      console.log('here is the res: ', response);
      response.status(200).json('recover email sent');
    }
  });
};
