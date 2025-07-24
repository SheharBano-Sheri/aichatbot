import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const users = db.collection("users");
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });
  return Response.json({ success: true, message: "Signup successful" });
}
