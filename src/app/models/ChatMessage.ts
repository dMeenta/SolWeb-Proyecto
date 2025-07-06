export default interface ChatMessage {
  id: string;
  chatId: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: number;
}
