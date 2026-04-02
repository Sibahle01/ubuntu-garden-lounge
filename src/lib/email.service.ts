import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const ADMIN_EMAIL = 'admin@ubuntugarden.co.za';

export interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  total: number;
  orderType: 'dine-in' | 'pickup';
  specialRequests?: string;
}

export interface ReservationEmailData {
  customerName: string;
  customerEmail: string;
  reservationId: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
}

function generateOrderEmailHTML(data: OrderEmailData): string {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 8px 0;">${item.quantity}x ${item.name}</td>
      <td style="padding: 8px 0; text-align: right;">R${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f0e6d2; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a472a; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">🌍 UBUNTU GARDEN LOUNGE</h1>
          <p style="color: #f0e6d2; margin: 8px 0 0 0;">Modern African Dining Experience</p>
        </div>
        
        <div style="padding: 32px;">
          <h2 style="color: #1a472a; margin: 0 0 8px 0;">Thank you, ${data.customerName}! 🎉</h2>
          <p style="color: #333; margin: 0 0 24px 0;">Your order has been received and is being prepared.</p>
          
          <div style="background-color: #f0e6d2; padding: 16px; border-radius: 8px; margin-bottom: 32px; text-align: center;">
            <p style="margin: 0;"><strong>ORDER #${data.orderNumber}</strong></p>
            <p style="margin: 8px 0 0 0; color: #666;">${data.orderType === 'pickup' ? '📦 Takeaway' : '🍽️ Dine-in'}</p>
          </div>

          <h3 style="color: #1a472a; border-bottom: 2px solid #d4af37; padding-bottom: 8px; margin: 0 0 16px 0;">ORDER SUMMARY</h3>
          
          <table style="width: 100%; margin-bottom: 24px;">
            <tbody>
              ${itemsHtml}
              <tr style="border-top: 1px solid #ddd;">
                <td style="padding: 12px 0 0 0;"><strong>Subtotal</strong></td>
                <td style="padding: 12px 0 0 0; text-align: right;">R${data.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0;"><strong>Tax (15%)</strong></td>
                <td style="padding: 4px 0; text-align: right;">R${data.tax.toFixed(2)}</td>
              </tr>
              <tr style="border-top: 2px solid #d4af37;">
                <td style="padding: 12px 0 0 0;"><strong style="color: #1a472a;">TOTAL</strong></td>
                <td style="padding: 12px 0 0 0; text-align: right;"><strong style="color: #d4af37;">R${data.total.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          ${data.specialRequests ? `
            <div style="background-color: #f9f6f0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">📝 Special Requests:</p>
              <p style="margin: 0; font-style: italic;">"${data.specialRequests}"</p>
            </div>
          ` : ''}

          <div style="background-color: #f0e6d2; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0;"><strong>📍 Pickup Information</strong></p>
            <p style="margin: 0; font-size: 12px;">
              <strong>Location:</strong> Ubuntu Garden Lounge<br>
              <strong>Estimated Time:</strong> 20-30 minutes<br>
              <strong>Questions?</strong> Call us at (555) 123-4567
            </p>
          </div>
        </div>
        
        <div style="background-color: #f9f6f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 0;">📍 Ubuntu Garden Lounge | 📞 (555) 123-4567 | ✉️ hello@ubuntugarden.demo</p>
          <p style="margin: 8px 0 0 0; font-style: italic;">🧾 This is a demo receipt from a portfolio project. No actual payment has been processed.</p>
          <p style="margin: 8px 0 0 0;">© 2025 Ubuntu Garden Lounge • Demo System</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateReservationEmailHTML(data: ReservationEmailData): string {
  const formattedDate = data.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reservation Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f0e6d2; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a472a; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">🌍 UBUNTU GARDEN LOUNGE</h1>
          <p style="color: #f0e6d2; margin: 8px 0 0 0;">Modern African Dining Experience</p>
        </div>
        
        <div style="padding: 32px;">
          <h2 style="color: #1a472a; margin: 0 0 8px 0;">Dear ${data.customerName},</h2>
          <p style="color: #333; margin: 0 0 24px 0;">Your table has been reserved! We look forward to hosting you.</p>
          
          <div style="background-color: #f0e6d2; padding: 16px; border-radius: 8px; margin-bottom: 32px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #666;">Reservation #${data.reservationId.slice(-6)}</p>
            <p style="margin: 8px 0 0 0; color: #1a472a; font-weight: bold;">✅ CONFIRMED</p>
          </div>

          <h3 style="color: #1a472a; border-bottom: 2px solid #d4af37; padding-bottom: 8px; margin: 0 0 16px 0;">RESERVATION DETAILS</h3>
          
          <table style="width: 100%; margin-bottom: 24px;">
            <tbody>
              <tr>
                <td style="padding: 8px 0;"><strong>📅 Date</strong></td>
                <td style="padding: 8px 0;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>⏰ Time</strong></td>
                <td style="padding: 8px 0;">${data.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>👥 Guests</strong></td>
                <td style="padding: 8px 0;">${data.guests} ${data.guests === 1 ? 'person' : 'people'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>📍 Table</strong></td>
                <td style="padding: 8px 0;">Premium seating (window section)</td>
              </tr>
            </tbody>
          </table>

          ${data.specialRequests ? `
            <div style="background-color: #f9f6f0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">📝 Special Requests:</p>
              <p style="margin: 0; font-style: italic;">"${data.specialRequests}"</p>
              <p style="margin: 8px 0 0 0; font-size: 12px;">We'll do our best to accommodate your request.</p>
            </div>
          ` : ''}

          <div style="background-color: #f0e6d2; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0;"><strong>✨ Before You Arrive</strong></p>
            <p style="margin: 0; font-size: 12px;">
              • Free parking available at the back<br>
              • Dress code: Smart casual<br>
              • We hold tables for 15 minutes past reservation time<br>
              • Dietary restrictions? Let us know when you arrive
            </p>
          </div>
        </div>
        
        <div style="background-color: #f9f6f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 0;">📍 Ubuntu Garden Lounge | 📞 (555) 123-4567 | ✉️ hello@ubuntugarden.demo</p>
          <p style="margin: 8px 0 0 0; font-style: italic;">🧾 This is a demo confirmation from a portfolio project.</p>
          <p style="margin: 8px 0 0 0;">© 2025 Ubuntu Garden Lounge • Demo System</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  try {
    const html = generateOrderEmailHTML(data);

    // Send to customer
    const customerResult = await resend.emails.send({
      from: `Ubuntu Garden Lounge <${FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: `🎉 Order Confirmed #${data.orderNumber} - Ubuntu Garden Lounge`,
      html: html,
    });

    if (customerResult.error) {
      console.error('Error sending customer email:', customerResult.error);
    } else {
      console.log('✅ Customer email sent:', customerResult.data?.id);
    }

    // Send copy to admin
    const adminResult = await resend.emails.send({
      from: `Ubuntu Garden Lounge <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `📦 New Order #${data.orderNumber} - ${data.customerName}`,
      html: html,
    });

    if (adminResult.error) {
      console.error('Error sending admin email:', adminResult.error);
    } else {
      console.log('✅ Admin email sent:', adminResult.data?.id);
    }

    return { customerResult, adminResult };
  } catch (error) {
    console.error('Error sending order confirmation emails:', error);
    throw error;
  }
}

export async function sendReservationConfirmation(data: ReservationEmailData) {
  try {
    const html = generateReservationEmailHTML(data);

    // Send to customer
    const customerResult = await resend.emails.send({
      from: `Ubuntu Garden Lounge <${FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: `✅ Table Reserved - Ubuntu Garden Lounge`,
      html: html,
    });

    if (customerResult.error) {
      console.error('Error sending customer reservation email:', customerResult.error);
    } else {
      console.log('✅ Customer reservation email sent:', customerResult.data?.id);
    }

    // Send copy to admin
    const adminResult = await resend.emails.send({
      from: `Ubuntu Garden Lounge <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `📅 New Reservation - ${data.customerName} (${data.guests} guests)`,
      html: html,
    });

    if (adminResult.error) {
      console.error('Error sending admin reservation email:', adminResult.error);
    } else {
      console.log('✅ Admin reservation email sent:', adminResult.data?.id);
    }

    return { customerResult, adminResult };
  } catch (error) {
    console.error('Error sending reservation confirmation emails:', error);
    throw error;
  }
}