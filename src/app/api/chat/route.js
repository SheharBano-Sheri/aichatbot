import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get('userEmail');
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const chats = db.collection("chats");
  
  const allChats = await chats.find({ userEmail }).sort({ createdAt: -1 }).toArray();
  return Response.json(allChats);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const chats = db.collection("chats");

  const { title, userEmail } = await request.json();

  const newChat = {
    title,
    userEmail,
    createdAt: new Date(),
    isActive: true
  };

  await chats.updateMany({ userEmail }, { $set: { isActive: false } });
  const result = await chats.insertOne(newChat);

  return Response.json({ 
    _id: result.insertedId,
    ...newChat
  });
}

export async function PUT(request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const chats = db.collection("chats");
  const conversations = db.collection("conversations");
  
  const { id, userEmail } = await request.json();
  
  await chats.updateMany({ userEmail }, { $set: { isActive: false } });
  await chats.updateOne(
    { _id: new ObjectId(id), userEmail },
    { $set: { isActive: true } }
  );
    const activeChatMessages = await conversations.find({ chatId: id, userEmail }).sort({ timestamp: 1 }).toArray();
  
  const processedMessages = activeChatMessages.map(msg => ({
    content: msg.content,
    isUser: msg.role === "user"
  }));
  
  return Response.json({ success: true, messages: processedMessages });
}

export async function PATCH(request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const chats = db.collection("chats");
  
  const { id, title, userEmail } = await request.json();
  
  await chats.updateOne(
    { _id: new ObjectId(id), userEmail },
    { $set: { title } }
  );
  
  return Response.json({ success: true });
}

export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const chats = db.collection("chats");
  const conversations = db.collection("conversations");
  
  const { id, userEmail } = await request.json();
  
  const chat = await chats.findOne({ _id: new ObjectId(id), userEmail });
  await chats.deleteOne({ _id: new ObjectId(id), userEmail });
  
  await conversations.deleteMany({ chatId: id, userEmail });
  
  if (chat && chat.isActive) {
    const firstChat = await chats.findOne({ userEmail }, { sort: { createdAt: -1 } });
    if (firstChat) {
      await chats.updateOne(
        { _id: firstChat._id },
        { $set: { isActive: true } }
      );
    }
  }
  
  return Response.json({ success: true });
}