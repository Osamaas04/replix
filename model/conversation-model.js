import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
  conversation_id: {
    required: true,
    type: String,
  },
  page_id: {
    required: true,
    type: String,
  },
  recipient_name: {
    required: true,
    type: String,
  },
  recipient_id: {
    required: true,
    type: String,
  },
});

export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
