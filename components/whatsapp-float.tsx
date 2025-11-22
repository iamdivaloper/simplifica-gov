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
          <Card className="w-[340px] shadow-2xl border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src="/simplinho.png"
                      alt="Simplinho"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Simplinho</h3>
                    <p className="text-xs text-blue-100">Online agora • Responde rápido</p>
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
            <CardContent className="p-0">
              {/* Welcome Message */}
              <div className="p-4 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                    👋 <strong>Olá! Eu sou o Simplinho!</strong>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Estou aqui para te ajudar a entender as leis de forma simples. Como posso te ajudar hoje?
                  </p>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-3">💬 Mensagens rápidas:</p>
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg)}
                    className="w-full text-left p-3 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all text-sm font-medium text-gray-800 hover:shadow-md"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-xs font-semibold text-gray-600 mb-2">✍️ Ou escreva sua dúvida:</p>
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border-2 border-gray-300 focus:border-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 shadow-md disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Você será redirecionado para o WhatsApp 💚
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Float Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-2xl p-1 flex items-center justify-center transition-all hover:scale-110 border-4 border-white",
            isOpen && "scale-95"
          )}
        >
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Image
              src="/simplinho.png"
              alt="Simplinho"
              width={56}
              height={56}
              className="rounded-full"
            />
          )}
          <span className="sr-only">Fale com o Simplinho</span>
        </Button>

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
            1
          </div>
        )}
      </div>
    </>
  )
}
