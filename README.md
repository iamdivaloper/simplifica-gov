<div align="center">
  <img src="public/logo-full.png" alt="Logo SimplificaGov" width="200" />
  <h1>SimplificaGov</h1>
  <p>
    <b>Democratizando o acesso à informação governamental através da simplificação com IA.</b>
  </p>
</div>

---

## 📖 Descrição do Projeto

O **SimplificaGov** é uma plataforma inovadora que utiliza Inteligência Artificial para traduzir a complexidade dos documentos legislativos e governamentais para uma linguagem simples e acessível a todos os cidadãos.

Nossa missão é combater a desinformação e aumentar o engajamento cívico, permitindo que qualquer pessoa entenda o que está sendo votado e decidido em Brasília, sem precisar decifrar o "juridiquês".

### Principais Funcionalidades:
- **Tradução de Leis**: Resumos automáticos e simplificados de Projetos de Lei.
- **Resumo Diário**: Atualizações personalizadas via WhatsApp em texto e áudio.
- **Simplinho**: Um assistente virtual carismático que tira dúvidas sobre política.
- **Monitoramento**: Acompanhamento de parlamentares e temas de interesse.
- **Acessibilidade**: Foco total em UX inclusiva, contraste e navegação simplificada.

---

## � Membros da Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| **Maysa Santos** | Tech Lead & Fullstack Dev | [@Maysamkt](https://github.com/Maysamkt) |
| **Rafaela Rocha Feijó** | Product Manager | [@Rafaelafeijo](https://github.com/Rafaelafeijo) |
| **Maikon Icaro dos Santos** | AI Engineer | [@Maikon-sant](https://github.com/Maikon-sant) |
| **Jessica Lopes** | Frontend Developer | [@iamdivaloper](https://github.com/iamdivaloper) |

---

## ⚙️ Instruções de Configuração

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn ou pnpm

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/iamdivaloper/simplifica-gov.git
   cd simplifica-gov
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto (opcional para rodar o frontend básico):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra seu navegador em [http://localhost:3000](http://localhost:3000)

---

## 🚀 Instruções de Uso

1. **Explore a Home**: Entenda a proposta de valor e veja como o Simplinho funciona.
2. **Consulte Projetos de Lei**: Navegue pela página `/projetos-de-lei` para ver o ranking dos projetos mais populares e leia seus resumos simplificados.
3. **Conheça Parlamentares**: Acesse `/parlamentares` para buscar deputados e senadores, ver suas estatísticas e leis aprovadas.
4. **Crie uma Conta**: Vá em `/cadastro` para simular a criação de um perfil e personalizar seus interesses.
5. **Interaja com o Simplinho**: Clique no botão flutuante do WhatsApp para testar o chat interativo.

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.