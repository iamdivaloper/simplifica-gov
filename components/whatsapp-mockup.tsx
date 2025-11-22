import { Play, MoreVertical, Phone, Video, ArrowLeft, Mic, Paperclip, Smile, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WhatsappMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-[320px] md:w-[360px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900",
        className,
      )}
    >
      {/* Status Bar Mock */}
      <div className="bg-primary h-8 w-full flex items-center justify-between px-6 pt-2">
        <div className="text-[10px] text-white font-medium">12:30</div>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
          <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-primary px-4 py-2 flex items-center gap-2 text-white">
        <ArrowLeft className="w-5 h-5" />
        <Avatar className="h-9 w-9 border border-white/20 bg-white">
          <AvatarImage src="/logo-icon.png" className="object-cover p-0.5" />
          <AvatarFallback className="bg-primary text-white font-bold">SG</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold text-sm">Simplinho 🇧🇷</div>
          <div className="text-[10px] opacity-90">Conta Oficial</div>
        </div>
        <div className="flex gap-3">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-[#E5DDD5] h-[450px] p-4 overflow-y-auto flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
        {/* Message Date */}
        <div className="flex justify-center my-2">
          <span className="bg-[#E1F3FB] text-gray-600 text-[10px] px-2 py-1 rounded shadow-sm uppercase font-medium">
            Hoje
          </span>
        </div>

        {/* User Message */}
        <div className="self-end bg-[#D9FDD3] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%] relative group">
          <p className="text-sm text-gray-800 leading-tight">O que é esse novo auxílio gás que falaram na TV?</p>
          <div className="flex justify-end items-end gap-1 mt-1">
            <span className="text-[10px] text-gray-500">10:42</span>
            <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
          </div>
        </div>

        {/* Bot Response - Text */}
        <div className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%]">
          <p className="text-sm text-gray-800 leading-tight mb-2">Olá, Ana! 👋 Encontrei a informação oficial.</p>
          <p className="text-sm text-gray-800 leading-tight">
            O <strong>Auxílio Gás</strong> é um benefício para famílias de baixa renda comprarem o botijão de 13kg.
          </p>
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 border-l-4 border-secondary">
            📝 <strong>Resumo:</strong> O valor cobre 100% do preço médio do botijão e é pago a cada dois meses.
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-500">10:42</span>
          </div>
        </div>

        {/* Bot Response - Audio */}
        <div className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm w-[240px]">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
              <Play className="w-5 h-5 fill-current ml-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>0:15</span>
                <span>1:30</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
            <Avatar className="w-4 h-4">
              <AvatarFallback className="bg-secondary text-[6px] text-black">IA</AvatarFallback>
            </Avatar>
            Explicação em áudio
          </div>
          <div className="flex justify-end">
            <span className="text-[10px] text-gray-500">10:43</span>
          </div>
        </div>

        {/* Local Alert */}
        <div className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%] mt-2">
          <div className="text-[10px] font-bold text-primary uppercase mb-1 flex items-center gap-1">
            📍 Alerta para seu bairro
          </div>
          <p className="text-sm text-gray-800 leading-tight">
            Foi aprovada uma reforma na praça central da sua cidade. Votação confirmada na Câmara Municipal ontem.
          </p>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-500">10:45</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#F0F2F5] px-2 py-2 flex items-center gap-2">
        <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
          <Smile className="w-6 h-6 text-gray-500" />
        </div>
        <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer hidden sm:block">
          <Paperclip className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm text-gray-500 shadow-sm">Mensagem</div>
        <div className="p-2 bg-[#008069] rounded-full text-white shadow-sm cursor-pointer hover:scale-105 transition-transform">
          <Mic className="w-5 h-5" />
        </div>
      </div>

      {/* Home Bar */}
      <div className="bg-white h-6 w-full flex justify-center items-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}
