💳 Stripe Checkout Integration (MERN Stack)
This section demonstrates how to integrate Stripe Checkout into a MERN stack project to handle one-time payments for digital products like ready-made websites.

🔧 Backend (Express + Stripe)
✅ Requirements
express

cors

dotenv

stripe

📂 server.js
js
Copy
Edit
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const Stripe = require("stripe");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/create-checkout-session", async (req, res) => {
  const { title, price, image } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              images: [image],
            },
            unit_amount: price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
💻 Frontend (React)
📦 Required: axios
bash
Copy
Edit
npm install axios
🧠 Purchase Button Logic
tsx
Copy
Edit
const handlePurchase = async (website: any) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/create-checkout-session",
      {
        image: website.image,
        title: website.title,
        price: website.price,
      }
    );
    window.location.href = res.data.url;
  } catch (err) {
    console.error(err);
    alert("Payment initiation failed.");
  }
};
📝 Notes
Set your .env file like:

ini
Copy
Edit
STRIPE_SECRET_KEY=your_secret_key_here
Replace http://localhost:8080/success and cancel with your actual frontend route when deploying.
