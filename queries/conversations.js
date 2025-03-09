import { Conversation } from "@/model/conversation-model";

export async function createConversation(conversation) {
  try {
    await Conversation.create(conversation);
  } catch (error) {
    throw new Error(error);
  }
}
