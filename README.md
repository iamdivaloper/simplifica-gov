<div align="center">
  <img src="public/placeholder-logo.svg" alt="Logo SimplificaGov" width="120" height="120" />
  <h1>SimplificaGov</h1>
  <p>
    <b>Democratizando o acesso à informação governamental através da simplificação com IA.</b>
  </p>
  <p>
    O SimplificaGov traduz documentos legislativos complexos e decisões governamentais para o português claro, entregando explicações acessíveis diretamente aos cidadãos via WhatsApp.
  </p>
</div>

<br />

> [!NOTE]
> Este projeto é construído com **Next.js 16** e **Tailwind CSS**, focando em acessibilidade (VLibras), performance e uma estética "GovTech" limpa usando **Public Sans**.

## ✨ Funcionalidades

- **🏛️ Simplificação Legislativa**: Tradução impulsionada por IA de Projetos de Lei para linguagem cotidiana.
- **📱 Integração com WhatsApp**: Projetado para entregar resumos em áudio e texto diretamente onde os cidadãos estão.
- **♿ Acessibilidade em Primeiro Lugar**: Widget **VLibras** integrado e modos de alto contraste para acesso inclusivo.
- **⚡ Performance**: Otimizado com **Vercel Speed Insights** e **Analytics**.
- **🎨 UI Moderna**: Construído com primitivos **Radix UI** e **Tailwind CSS**, apresentando um design responsivo e institucional.

## 🛠️ Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes de UI**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Tipografia**: [Public Sans](https://fontsource.org/fonts/public-sans) (Google Fonts)
- **Acessibilidade**: [VLibras](https://www.gov.br/governodigital/pt-br/vlibras)
- **Deploy**: [Vercel](https://vercel.com/)

## 🚀 Começando

### Pré-requisitos

- **Node.js** 18+ instalado
- **npm** instalado

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/iamdivaloper/simplifica-gov.git
   cd simplifica-gov
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📂 Estrutura do Projeto

```
simplifica-gov/
├── app/                 # Páginas e layouts do Next.js App Router
│   ├── layout.tsx       # Layout raiz com VLibras & Analytics
│   ├── page.tsx         # Página inicial (Landing page)
│   └── globals.css      # Estilos globais e tema Tailwind
├── components/          # Componentes de UI reutilizáveis
│   ├── ui/              # Primitivos Radix UI
│   ├── site-header.tsx  # Navegação principal
│   └── vlibras.tsx      # Widget de acessibilidade
├── public/              # Ativos estáticos (imagens, ícones)
└── package.json         # Dependências e scripts
```
