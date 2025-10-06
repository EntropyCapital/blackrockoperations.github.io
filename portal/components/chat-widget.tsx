"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  sender_id: string
  message: string
  created_at: string
  sender_name?: string
  is_admin?: boolean
}

interface ChatWidgetProps {
  clientId: string
  currentUserId: string
  isAdmin: boolean
}

export function ChatWidget({ clientId, currentUserId, isAdmin }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Fetch messages
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:sender_id (
          id,
          profiles (full_name, role)
        )
      `)
      .eq("client_id", clientId)
      .order("created_at", { ascending: true })

    if (!error && data) {
      const formattedMessages = data.map((msg: any) => ({
        id: msg.id,
        sender_id: msg.sender_id,
        message: msg.message,
        created_at: msg.created_at,
        sender_name: msg.sender?.profiles?.full_name || "Unknown",
        is_admin: msg.sender?.profiles?.role === "admin",
      }))
      setMessages(formattedMessages)

      // Count unread messages (messages from others)
      if (!isOpen) {
        const unread = formattedMessages.filter((msg: Message) => msg.sender_id !== currentUserId).length
        setUnreadCount(unread)
      }
    }
  }

  // Send message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || loading) return

    setLoading(true)

    const { error } = await supabase.from("messages").insert({
      client_id: clientId,
      sender_id: currentUserId,
      message: newMessage.trim(),
    })

    if (!error) {
      setNewMessage("")
      fetchMessages()
    } else {
      console.error("Error sending message:", error)
    }

    setLoading(false)
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Fetch messages on mount and set up polling
  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000) // Poll every 3 seconds
    return () => clearInterval(interval)
  }, [clientId])

  // Reset unread count when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 shadow-2xl z-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg">{isAdmin ? "Client Messages" : "Support Chat"}</CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No messages yet. Start a conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender_id === currentUserId ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.sender_id === currentUserId ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {msg.sender_name} •{" "}
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  )
}
