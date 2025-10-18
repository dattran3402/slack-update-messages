import { WebClient } from "@slack/web-api";
import fs from "fs";

// Usage: node updateMessages.js
// Make sure you have Node 18+ or add "type": "module" in package.json

// -------------------------
// Get config from config.json
// -------------------------

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const channelIds = config.channelIds;
const message = config.message;
const userToken = config.userToken;

console.log("Loaded config", config);

const client = new WebClient(userToken);

// -------------------------
// MAIN LOGIC
// -------------------------

const getConversationHistory = async ({ channelId }) => {
  try {
    // loop to get all limit messages from the channel
    let messages = [];
    let cursor = null;
    const MAX_LIMIT_PER_REQUEST = 999;

    do {
      const history = await client.conversations.history({
        channel: channelId,
        limit: MAX_LIMIT_PER_REQUEST,
        cursor: cursor,
      });
      messages.push(...history.messages);
      cursor = history.response_metadata?.next_cursor;
    } while (cursor);

    return messages;
  } catch (error) {
    console.error("Error getting conversation history for channel", channelId, error);
    return [];
  }
};

const updateMessage = async ({ channelId, ts, text }) => {
  try {
    await client.chat.update({
      channel: channelId,
      ts: ts,
      text: text,
    });
  }
  catch (error) {
    console.error("Error updating message for channel", channelId, ts, error);
  }
};

const main = async () => {
  for (const channelId of channelIds) {
    const messages = await getConversationHistory({ channelId });
    for (const msg of messages) {
      await updateMessage({ channelId, ts: msg.ts, text: message });
    }
  }
};

main();