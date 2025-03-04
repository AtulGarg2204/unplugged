const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail service instead of custom SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookingConfirmation = async (booking, experience) => {
  const mailOptions = {
    from: '"Unplugged" <atulgarg220404@gmail.com>',
    to: booking.email,
    subject: `Booking Confirmed - ${experience.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6B46C1; text-align: center; padding: 20px;">Booking Confirmation</h1>
        
        <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1F2937; margin-bottom: 15px;">Hello ${booking.firstName} ${booking.lastName},</h2>
          <p style="color: #4B5563; line-height: 1.5;">
            Thank you for booking the "${experience.name}" experience. We're excited to have you join us!
          </p>
        </div>

        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1F2937; margin-bottom: 15px;">Booking Details:</h3>
          <ul style="color: #4B5563; line-height: 1.6;">
            <li>Experience: ${experience.name}</li>
            <li>Date: ${new Date(experience.date).toLocaleDateString()}</li>
            <li>Time: ${experience.time}</li>
            <li>Venue: ${experience.venue || 'To be announced'}</li>
            <li>Registration Fee: ₹${experience.registrationFee}</li>
          </ul>
        </div>

        <div style="color: #4B5563; line-height: 1.5; margin-top: 20px;">
          <p>
            We'll send you more details about the experience soon. If you have any questions, 
            feel free to reach out to us.
          </p>
          <p style="margin-top: 15px;">
            Best regards,<br>
            Team Unplugged
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

module.exports = {
  sendBookingConfirmation
}; 