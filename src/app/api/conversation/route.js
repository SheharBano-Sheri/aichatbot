import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get('userEmail');
  const chatId = url.searchParams.get('chatId');
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  const query = { userEmail };
  if (chatId) {
    query.chatId = chatId;
  }
  
  const history = await conversations.find(query).sort({ timestamp: 1 }).toArray();
  
  const messages = history.map(msg => ({
    content: msg.content,
    isUser: msg.role === "user"
  }));
  
  return Response.json(messages);
}

export async function POST(request) {
  const { userMessage, aiMessage, userEmail, chatId } = await request.json();
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  await conversations.insertOne({
    timestamp: new Date(),
    role: "user",
    content: userMessage,
    userEmail,
    chatId
  });
  
  await conversations.insertOne({
    timestamp: new Date(),
    role: "model",
    content: aiMessage,
    userEmail,
    chatId
  });
  
  return Response.json({ success: true });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get('userEmail');
  const chatId = url.searchParams.get('chatId');
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  const query = { userEmail };
  if (chatId) {
    query.chatId = chatId;
  }
  
  await conversations.deleteMany(query);
  
  return Response.json({ success: true });
}
