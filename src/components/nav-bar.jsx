"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useChat } from "@/components/chat-provider";

export function NavBar() {
  const [user, setUser] = useState(null);
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const { currentChatId, userEmail, refreshChats } = useChat();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser({ email: userEmail });
    } else {
      window.location.href = "/login";
    }
  }, []);
  useEffect(() => {
    if (currentChatId && userEmail) {
      fetchCurrentChatTitle();
    } else {
      setCurrentChatTitle("");
    }
  }, [currentChatId, userEmail, refreshChats]);

  const fetchCurrentChatTitle = async () => {
    try {
      const response = await fetch(`/api/chat?userEmail=${encodeURIComponent(userEmail)}`);
      const chats = await response.json();
      const currentChat = chats.find(chat => chat._id === currentChatId);
      if (currentChat) {
        setCurrentChatTitle(currentChat.title);
      }
    } catch (error) {
      console.error("Error fetching chat title:", error);
      setCurrentChatTitle("");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
    window.location.href = "/login";
  };

  const getInitials = (email) => {
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background gap-2">      <div className="flex items-center gap-4 flex-1 justify-center">
        <h1 className="text-lg">{currentChatTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.email)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex-col items-start">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/signup">
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </>
        )}
      </div>
      <ModeToggle />
    </nav>
  );
}