import mongoose, { Schema } from "mongoose";

const pageSchema = new Schema({
  page_name: {
    required: true,
    type: String,
  },
  page_id: {
    required: true,
    type: String,
  },
  access_token: {
    required: true,
    type: String,
  },
});

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);
