import mongoose from 'mongoose';

export interface ChatMessage {
    username: string;
    text: string;
    datetimestamp: string;
}

export type MessageDocument = mongoose.Document & {
    username: string;
    text: string;
    datetimestamp: string;
};


const messageSchema = new mongoose.Schema({
    username: String,
    text: String,
    datetimestamp: String,
});

export const Message = mongoose.model<MessageDocument>('Message', messageSchema);
