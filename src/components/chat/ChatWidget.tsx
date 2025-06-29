import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Brain
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatWidgetProps {
  className?: string
}

export default function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou o assistente de IA do ReconheceAI. Como posso ajudá-lo hoje? Posso responder perguntas sobre colaboradores, análises de performance, estratégias de retenção e muito mais!',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Simular resposta da IA (aqui você integraria com sua API da OpenAI)
      const response = await simulateAIResponse(userMessage.content)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAIResponse = async (userInput: string): Promise<string> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const input = userInput.toLowerCase()

    // Respostas baseadas em palavras-chave
    if (input.includes('colaborador') || input.includes('funcionário') || input.includes('employee')) {
      return 'Posso ajudá-lo com informações sobre colaboradores! Você pode me perguntar sobre:\n\n• Análise de performance de colaboradores específicos\n• Identificação de colaboradores de alto risco\n• Estratégias de retenção personalizadas\n• Métricas de engajamento\n\nQual colaborador ou métrica específica você gostaria de analisar?'
    }

    if (input.includes('risco') || input.includes('retenção') || input.includes('saída')) {
      return 'Sobre análise de risco e retenção:\n\n🔍 **Fatores de Risco Principais:**\n• Baixa performance recente\n• Tempo sem promoção (>3 anos)\n• Alto absenteísmo\n• Feedback negativo\n\n💡 **Estratégias de Retenção:**\n• Planos de desenvolvimento personalizados\n• Programas de reconhecimento\n• Revisão salarial\n• Novos desafios e responsabilidades\n\nPosso analisar um colaborador específico para você!'
    }

    if (input.includes('score') || input.includes('pontuação') || input.includes('avaliação')) {
      return 'O sistema de score do ReconheceAI considera múltiplos fatores:\n\n📊 **Componentes do Score:**\n• Performance (20%)\n• Tempo na empresa (10%)\n• Tempo no cargo (10%)\n• Risco de perda (15%)\n• Impacto da perda (15%)\n• Absenteísmo (10%)\n• Outros fatores (20%)\n\n🎯 **Interpretação:**\n• 400-500: Top Performer\n• 300-399: Performance Sólida\n• 200-299: Precisa Atenção\n• <200: Intervenção Urgente'
    }

    if (input.includes('dashboard') || input.includes('métricas') || input.includes('relatório')) {
      return 'No dashboard você encontra:\n\n📈 **Métricas Principais:**\n• Total de colaboradores\n• Taxa de retenção\n• Score médio da equipe\n• Colaboradores de alto risco\n\n📊 **Análises Disponíveis:**\n• Distribuição por departamento\n• Tendências de performance\n• Alertas críticos\n• Top performers\n\nQue métrica específica você gostaria de entender melhor?'
    }

    if (input.includes('diversidade') || input.includes('inclusão') || input.includes('d&i')) {
      return 'Sobre Diversidade & Inclusão:\n\n🌈 **Métricas de Diversidade:**\n• Distribuição por gênero\n• Representatividade racial\n• Diversidade de orientação\n• Níveis educacionais\n\n📋 **Ações Recomendadas:**\n• Programas de mentoria\n• Grupos de afinidade\n• Políticas inclusivas\n• Treinamentos de viés inconsciente\n\nPosso gerar um relatório de diversidade detalhado!'
    }

    if (input.includes('ajuda') || input.includes('help') || input.includes('como')) {
      return 'Estou aqui para ajudar! Posso auxiliar com:\n\n🎯 **Análises de Colaboradores:**\n• Performance individual\n• Planos de retenção\n• Estratégias de desenvolvimento\n\n📊 **Insights de Dados:**\n• Métricas de equipe\n• Tendências de RH\n• Alertas críticos\n\n💡 **Recomendações:**\n• Ações de melhoria\n• Estratégias de engajamento\n• Planos de carreira\n\nO que você gostaria de explorar?'
    }

    // Resposta padrão
    return 'Entendi sua pergunta! Como assistente de IA especializado em gestão de talentos, posso ajudá-lo com:\n\n• Análises detalhadas de colaboradores\n• Estratégias de retenção personalizadas\n• Interpretação de métricas de RH\n• Recomendações baseadas em dados\n\nPoderia ser mais específico sobre o que você gostaria de saber? Por exemplo, você pode perguntar sobre um colaborador específico ou uma métrica que te interessa!'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed bottom-6 right-6 z-50 ${className}`}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <MessageCircle className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full animate-pulse" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300 ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistente IA</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                    <span className="text-primary-100 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary-600' 
                            : 'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="text-sm whitespace-pre-line">{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <LoadingSpinner size="sm" />
                            <span className="text-sm text-gray-600">Pensando...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        disabled={isLoading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Sparkles className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-xs text-gray-500">
                      Powered by OpenAI • ReconheceAI
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}