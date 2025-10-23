import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json()); // <= needed for POST JSON bodies

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

// --- Helpers ---
function creditWallet({ source, amount_cents }) {
  const id = "txn_" + Math.random().toString(36).slice(2, 8);
  const date = new Date().toISOString().slice(0, 10);
  WALLET.earnings.unshift({ id, source, amount_cents, date });
  WALLET.balance_cents += amount_cents;
  return { id, source, amount_cents, date, new_balance_cents: WALLET.balance_cents };
}

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

// Start an offer and immediately credit (demo)
app.post("/offers/:id/start", (req, res) => {
  const offer = OFFERS.find(o => o.id === req.params.id);
  if (!offer) return res.status(404).json({ error: "Offer not found" });

  const result = creditWallet({ source: offer.title, amount_cents: offer.payout_cents });
  res.json({ ok: true, credited: result });
});

// General credit endpoint (optional; used if you want a custom demo button)
app.post("/wallet/earn", (req, res) => {
  const { source, amount_cents } = req.body || {};
  if (!source || !amount_cents) return res.status(400).json({ error: "Missing source or amount_cents" });
  const result = creditWallet({ source, amount_cents: Number(amount_cents) });
  res.json({ ok: true, credited: result });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
