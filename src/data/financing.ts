// Financing page data (Kyle, email 2026-11-13: "We need go add Page on our
// Home page with these options."). Every word below is from Kyle's PDF
// "Logo_ 6 Payment options-Price Gurarantee-Same Day Discount.pdf", read by
// the desk on 11-13. The sheet's "pmt. factor" figures are internal sales
// numbers and stay OFF the page; only "$X per $1,000" is shown.

export type PaymentOption = {
  n: number;
  title: string;
  body: string;
  lender?: string;
  sale: boolean; // "Eligible for Sale Price" tag on the sheet
};

export const paymentOptions: PaymentOption[] = [
  { n: 1, title: "Pay with Check or ACH", body: "", sale: true },
  {
    n: 2,
    title: "9 Months Same as Cash",
    body: "No payments, no interest when you pay it off in full within 9 months.",
    lender: "GreenSky or Regions",
    sale: false,
  },
  {
    n: 3,
    title: "5 Years",
    body: "Make easy monthly payments at 7.99% APR for 5 years. Pay off anytime without penalty. $20.27 per $1,000.",
    lender: "Regions only",
    sale: false,
  },
  {
    n: 4,
    title: "10 Years",
    body: "And make easy monthly payments at 9.99% APR for 10 years. Pay off anytime without penalty. $13.20 per $1,000.",
    lender: "GreenSky or Regions",
    sale: true,
  },
  {
    n: 5,
    title: "15 Years",
    body: "And make easy monthly payments at 11.99% APR for 15 years. Pay off anytime without penalty. $11.99 per $1,000.",
    lender: "GreenSky",
    sale: true,
  },
  { n: 6, title: "Pay with Credit Card", body: "Pay it off at your leisure.", sale: false },
];

export const sameDayDiscount = {
  title: "Same Day Discount: 5% Off",
  body: "Our company has resolved that homeowners who know what they want, and decide to move forward the day a proposal is presented to them, are deemed preferred customers, and as such, will be eligible for a 5% discount.",
  fine: "The Same Day Discount is not available at any other time and cannot be combined with any other offer.",
};

export const priceGuarantee = {
  title: "Price Assurance Guarantee",
  body: "We guarantee that our price is the lowest available for the work specified in your project. If you find a lower price for the same work, before or after our installation, we will match the price, even if it means we have to write you a refund check. We stand by every aspect of our work, including the price!",
};
