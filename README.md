# ReconheceAI - Plataforma Inteligente de Gestão de Talentos

Uma plataforma avançada de gestão de talentos e recursos humanos, powered by IA generativa, desenvolvida para o Hackathon.

## 🚀 Funcionalidades Principais

### 📊 Dashboard Executivo
- Métricas em tempo real de colaboradores
- Insights automáticos gerados por IA
- Visualizações interativas e responsivas
- Alertas críticos e notificações

### 👥 Gestão de Colaboradores
- Perfis detalhados com scores de reconhecimento
- Análise de risco de perda e retenção
- Histórico de performance e avaliações
- Identificação de top performers

### 🧠 Análises com IA Generativa
- **Análise de Risco**: Estratégias personalizadas de retenção
- **Análise de Impacto**: Avaliação do impacto da perda de colaboradores
- **Planos de Reconhecimento**: Estratégias de valorização personalizadas
- **Planos de Desenvolvimento**: Trilhas de crescimento individualizadas
- **Análise de Diversidade**: Métricas e oportunidades de D&I

### 💬 Chat com IA
- Assistente inteligente especializado em RH
- Respostas contextuais sobre colaboradores
- Sugestões de ações baseadas em dados
- Interface conversacional intuitiva

### 📈 Analytics Avançado
- Tendências preditivas de performance
- Análise de correlações entre fatores
- Métricas departamentais comparativas
- Distribuição de riscos e oportunidades

### 🔔 Sistema de Alertas
- Alertas automáticos baseados em IA
- Notificações de alto risco e anomalias
- Central de notificações em tempo real
- Ações recomendadas para cada alerta

### 📋 Relatórios Personalizados
- Templates pré-configurados
- Exportação em múltiplos formatos
- Relatórios executivos e departamentais
- Agendamento automático

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **Recharts** para visualizações
- **Zustand** para gerenciamento de estado
- **React Router** para navegação
- **Lucide React** para ícones

### Backend & Banco de Dados
- **Supabase** (PostgreSQL + Auth + Real-time)
- **Row Level Security (RLS)** para segurança
- **Triggers e Functions** para automação
- **Índices otimizados** para performance

### IA e Análises
- **Integração com OpenAI** (preparada)
- **Análise de sentimento** simulada
- **Detecção de anomalias** em absenteísmo
- **Algoritmos de scoring** personalizáveis

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd reconheceai

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase
```

### Configuração do Banco de Dados
O projeto já está configurado com um banco Supabase funcional. As migrações incluem:
- Estrutura completa das tabelas
- Dados de exemplo (30 colaboradores)
- Políticas de segurança (RLS)
- Índices otimizados
- Triggers automáticos

### Executar em Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📊 Estrutura dos Dados

### Colaboradores
- Informações pessoais e profissionais
- Métricas de performance e engajamento
- Scores calculados automaticamente
- Histórico de avaliações

### Sistema de Scoring
O sistema calcula scores baseado em:
- **Performance** (20%): Resultado das avaliações
- **Experiência** (20%): Tempo na empresa e no cargo
- **Risco/Impacto** (30%): Probabilidade e impacto da perda
- **Comportamento** (10%): Absenteísmo e disciplina
- **Qualificação** (10%): Formação e certificações
- **Diversidade** (5%): Contribuição para D&I
- **Outros fatores** (5%): Salário e benefícios

### Alertas Automáticos
- **Alto Risco**: Colaboradores com probabilidade alta de saída
- **Performance**: Scores abaixo do esperado
- **Anomalias**: Padrões irregulares de comportamento
- **Sentimento**: Indicadores de insatisfação
- **Departamentais**: Métricas agregadas por área

## 🎯 Funcionalidades de IA

### Chat Inteligente
- Respostas contextuais sobre RH
- Análises de colaboradores específicos
- Sugestões de ações baseadas em dados
- Interface conversacional natural

### Análises Generativas
- **Análise de Risco**: Diagnóstico + Plano de retenção
- **Análise de Impacto**: Avaliação do impacto organizacional
- **Reconhecimento**: Estratégias personalizadas de valorização
- **Desenvolvimento**: Trilhas de crescimento individuais
- **Diversidade**: Oportunidades de inclusão

### Insights Automáticos
- Identificação de padrões nos dados
- Previsões baseadas em tendências
- Recomendações de ações preventivas
- Alertas preditivos

## 🔒 Segurança

- **Row Level Security (RLS)** no Supabase
- **Autenticação** integrada
- **Políticas de acesso** granulares
- **Validação** de dados no frontend e backend
- **Sanitização** de inputs

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Componentes adaptativos
- Navegação touch-friendly

## 🎨 Design System

- **Cores**: Sistema de cores semânticas
- **Tipografia**: Hierarquia clara e legível
- **Espaçamento**: Grid de 8px consistente
- **Componentes**: Biblioteca reutilizável
- **Animações**: Micro-interações fluidas

## 🚀 Deploy

O projeto está preparado para deploy em:
- **Vercel** (recomendado para frontend)
- **Netlify**
- **Supabase** (backend já hospedado)

## 📈 Métricas e KPIs

### Dashboard Principal
- Total de colaboradores
- Taxa de retenção
- Score médio da equipe
- Colaboradores de alto risco

### Analytics Avançado
- Tendências temporais
- Correlações entre fatores
- Distribuição por departamentos
- Métricas de diversidade

## 🤝 Contribuição

Este projeto foi desenvolvido para o Hackathon com foco em:
- **Inovação**: Uso de IA generativa para RH
- **Usabilidade**: Interface intuitiva e responsiva
- **Escalabilidade**: Arquitetura robusta e performática
- **Impacto**: Soluções práticas para gestão de talentos

## 📄 Licença

Projeto desenvolvido para fins educacionais e de demonstração.

---

**ReconheceAI** - Transformando a gestão de talentos com inteligência artificial 🚀