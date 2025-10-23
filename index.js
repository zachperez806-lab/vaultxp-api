import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("VaultXP API is live!");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});
// Mock offers (replace with provider feed later)
const OFFERS = [
  {
    id: "ofr_1",
    title: "Install & reach level 5",
    payout_cents: 150, // $1.50 to user
    device: "android",
    provider: "mock"
  },
  {
    id: "ofr_2",
    title: "Complete intro survey",
    payout_cents: 100,
    device: "desktop",
    provider: "mock"
  }
];

app.get("/offers", (req, res) => {
  res.json({ offers: OFFERS });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
