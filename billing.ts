import stripePackage from 'stripe';
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = new stripePackage(process.env.stripeSecretKey,{
    apiVersion: '2020-08-27',
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "inr",
  });

  return { status: true };
});