"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function WhatsappFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const quickMessages = [
    "Como funciona o SimplificaGov?",
    "Quero saber sobre uma lei",
    "Como me cadastro?",
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Simulate sending to WhatsApp
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
      setMessage("")
      setIsOpen(false)
    }
  }

  const handleQuickMessage = (msg: string) => {
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="w-[340px] shadow-2xl border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src="/simplinho.png"
                      alt="Simplinho"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white shadow-md bg-white"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Simplinho</h3>
                    <p className="text-xs text-blue-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Online agora
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 bg-white">
              {/* Welcome Message */}
              <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                    👋 <strong>Olá! Eu sou o Simplinho!</strong>
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Estou aqui para traduzir o "juridiquês" para você. Qual sua dúvida hoje?
                  </p>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Sugestões:</p>
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg)}
                    className="w-full text-left p-3 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all text-sm font-medium text-blue-900 hover:shadow-sm active:scale-[0.98]"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border-gray-200 focus-visible:ring-blue-500 rounded-full px-4"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="icon"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md disabled:opacity-50 disabled:shadow-none h-10 w-10 shrink-0"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Respondemos rapidinho no WhatsApp 💚
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Float Button */}
      <div className="fixed bottom-6 left-6 z-50 group">
        {/* Notification Bubble */}
        {!isOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max animate-bounce">
            <div className="bg-white text-gray-800 text-sm font-bold py-1.5 px-3 rounded-full shadow-lg border border-gray-100 relative">
              Posso ajudar?
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl p-0 flex items-center justify-center transition-all duration-300 border-4 border-white",
            isOpen
              ? "bg-gray-200 hover:bg-gray-300 text-gray-600 rotate-90"
              : "bg-gradient-to-br from-green-400 to-green-600 hover:scale-110 hover:shadow-green-500/30"
          )}
        >
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/simplinho.png"
                alt="Simplinho"
                fill
                className="object-cover"
              />
            </div>
          )}
          <span className="sr-only">Fale com o Simplinho</span>
        </Button>
      </div>
    </>
  )
}

