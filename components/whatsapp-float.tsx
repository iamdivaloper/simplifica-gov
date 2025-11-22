import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsappFloat() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl p-0 flex items-center justify-center transition-transform hover:scale-110"
      >
        <MessageCircle className="h-8 w-8" fill="currentColor" />
        <span className="sr-only">Fale no WhatsApp</span>
      </Button>
    </div>
  )
}
