import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  const history = await conversations.find().sort({ timestamp: 1 }).toArray();
  
  const messages = history.map(msg => ({
    content: msg.content,
    isUser: msg.role === "user"
  }));
  
  return Response.json(messages);
}

export async function PUT(request) {
  const { userMessage, aiMessage } = await request.json();
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  await conversations.insertOne({
    timestamp: new Date(),
    role: "user",
    content: userMessage
  });
  
  await conversations.insertOne({
    timestamp: new Date(),
    role: "model",
    content: aiMessage
  });
  
  return Response.json({ success: true });
}

export async function DELETE() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const conversations = db.collection("conversations");
  
  await conversations.deleteMany({});
  
  return Response.json({ success: true });
}
