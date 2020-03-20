import nodemailer from 'nodemailer';

const Mailer = () => {
  //Object to bu used for sending mails
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'msend980@gmail.com',
      pass: 'SendMail098',
    },
  });

  var message = {
    from: 'TransportWise <msend980@gmail.com>',
    to: 'maserukganyago@gmail.com',
    subject: 'TransportWise test mail',
    text: 'Testing E-mail',
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      releaseEvents.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Succesfully');
    }
  });
};

export default Mailer;
