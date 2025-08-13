import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTPEmail = async (email: string, otp: string, orderNumber: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation OTP - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Confirmation Required</h2>
          <p>Dear Customer,</p>
          <p>Your order <strong>${orderNumber}</strong> has been received and requires verification.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: #007bff;">Your OTP Code:</h3>
            <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 10px 0; letter-spacing: 3px;">${otp}</p>
          </div>
          <p>Please enter this OTP to confirm your order. This code is valid for 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't place this order, please contact our support team immediately.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export const sendOrderStatusEmail = async (email: string, orderNumber: string, status: string, trackingInfo?: any) => {
  try {
    const statusMessages = {
      confirmed: 'Your order has been confirmed and is being processed.',
      shipped: 'Your order has been shipped and is on its way to you.',
      delivered: 'Your order has been delivered successfully.',
      cancelled: 'Your order has been cancelled.'
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Update - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Status Update</h2>
          <p>Dear Customer,</p>
          <p>Your order <strong>${orderNumber}</strong> status has been updated.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: #28a745;">Status: ${status.toUpperCase()}</h3>
            <p style="margin: 10px 0;">${statusMessages[status as keyof typeof statusMessages]}</p>
            ${trackingInfo ? `
              <div style="margin-top: 15px;">
                <strong>Location:</strong> ${trackingInfo.location}<br>
                <strong>Updated:</strong> ${new Date(trackingInfo.timestamp).toLocaleString()}
              </div>
            ` : ''}
          </div>
          <p>You can track your order status anytime from your account dashboard.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order status email sent to ${email}`);
  } catch (error) {
    console.error('Error sending order status email:', error);
    throw new Error('Failed to send order status email');
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Our Store!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Our Store!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for creating an account with us. We're excited to have you as part of our community!</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: #007bff;">What's Next?</h3>
            <ul style="margin: 10px 0;">
              <li>Browse our featured products</li>
              <li>Set up your preferences</li>
              <li>Check out our latest deals</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to contact our support team.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error for welcome email as it's not critical
  }
};