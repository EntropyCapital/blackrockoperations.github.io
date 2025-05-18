import { buffer } from 'micro';
import Stripe from 'stripe';
import { google } from 'googleapis';

// Disable default body parsing so we can verify the raw payload
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

// Set up Google Calendar client
const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/calendar']
);
const calendar = google.calendar({ version: 'v3', auth });

export default async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const start = session.metadata.slot;
    const end = new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString();

    try {
      await calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: '1-Hour Strategy Call',
          description: `Paid by ${session.metadata.customer_email}`,
          start: { dateTime: start },
          end: { dateTime: end },
          attendees: [{ email: session.metadata.customer_email }],
        },
      });
    } catch (err) {
      console.error('Google Calendar insert error:', err);
      // continue to respond 200 to Stripe
    }
  }

  res.status(200).json({ received: true });
}