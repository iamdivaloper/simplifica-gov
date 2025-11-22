import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, MapPin, Bell, LogOut, Settings, Save } from "lucide-react"

export default function PerfilPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="font-bold text-xl text-gray-900">Maria da Silva</h2>
                <p className="text-gray-500 text-sm">Cidadã Ativa</p>
              </div>

              <nav className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-1">
                <Button variant="ghost" className="w-full justify-start font-medium bg-gray-50 text-primary">
                  <User className="w-4 h-4 mr-3" /> Dados Pessoais
                </Button>
                <Button variant="ghost" className="w-full justify-start font-medium text-gray-600 hover:text-primary">
                  <Bell className="w-4 h-4 mr-3" /> Notificações
                </Button>
                <Button variant="ghost" className="w-full justify-start font-medium text-gray-600 hover:text-primary">
                  <Settings className="w-4 h-4 mr-3" /> Configurações
                </Button>
                <div className="pt-4 mt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" /> Sair
                  </Button>
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Data */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Dados Pessoais
                </h3>
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input defaultValue="Maria da Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp</Label>
                      <Input defaultValue="(11) 99999-9999" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input defaultValue="maria.silva@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>CEP</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input className="pl-10" defaultValue="01001-000" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                  </Button>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" /> Preferências de Alerta
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Resumo Diário</Label>
                      <p className="text-sm text-gray-500">Receber resumo das principais notícias às 18h</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Alertas de Votação</Label>
                      <p className="text-sm text-gray-500">Quando um projeto de seu interesse for votado</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Áudio Automático</Label>
                      <p className="text-sm text-gray-500">Receber sempre a versão em áudio</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
