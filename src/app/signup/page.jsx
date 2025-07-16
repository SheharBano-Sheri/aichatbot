"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form className="flex flex-col space-y-4">
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Password" type="password" required />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
