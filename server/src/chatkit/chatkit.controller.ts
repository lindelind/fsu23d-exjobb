import express from "express";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const createSession: express.RequestHandler = async (req, res) => {
  try {
    const body = req.body || {};

    if (!OPENAI_API_KEY) {
      res.status(500).json({ error: "OPENAI_API_KEY is not set on the server" });
      return;
    }

    // POST to OpenAI ChatKit sessions endpoint; include workflow when provided
    const resp = await axios.post(
      "https://api.openai.com/v1/chatkit/sessions",
      {
        user: body.user || "12345",
        workflow: { id: "wf_690307425c40819094505b96dbe66a810c4a38bb8dbc1384" },
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "chatkit_beta=v1",
        },
      }
    );

    const session = resp.data;
    res.json({ client_secret: session.client_secret });
    return;
  } catch (err: any) {
    console.error("Error creating ChatKit session:", err?.response?.data || err?.message || err);
    res.status(500).json({ error: err?.response?.data || err?.message || "failed to create session" });
    return;
  }
};
