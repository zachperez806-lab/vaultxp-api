import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Mock Data ---

const OFFERS = [
  {
    id: "ofr_1",
    title: "Install & reach level 5",
    payout_cents: 150,
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

const WALLET = {
  user: "demo_user",
  balance_cents: 1250,
  earnings: [
    { id: "txn_1", source: "Install & reach level 5", amount_cents: 150, date: "2025-10-22" },
    { id: "txn_2", source: "Complete intro survey", amount_cents: 100, date: "2025-10-21" },
  ],
};

// --- Routes ---

app.get("/", (req, res) => {
  res.send("VaultXP API is live!");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.get("/offers", (req, res) => {
  res.json({ offers: OFFERS });
});

app.get("/wallet", (req, res) => {
  res.json(WALLET);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
