import React, { useState } from 'react'
import { Settings as SettingsIcon, Save, RotateCcw, Sliders, Info } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import Tooltip from '../components/ui/Tooltip'

export default function Settings() {
  const { weightConfig, updateWeightConfig } = useStore()
  const [weights, setWeights] = useState(weightConfig)

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Validate that weights sum to 100
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    if (total !== 100) {
      toast.error('A soma dos pesos deve ser igual a 100%')
      return
    }

    updateWeightConfig(weights)
    toast.success('Configurações salvas com sucesso!')
  }

  const handleReset = () => {
    const defaultWeights = {
      desempenho: 20,
      tempoCargo: 10,
      tempoCasa: 10,
      riscoPerda: 15,
      impactoPerda: 15,
      absenteismo: 10,
      salario: 5,
      formacao: 5,
      diversidade: 5,
      experiencia: 5
    }
    setWeights(defaultWeights)
    toast.success('Configurações restauradas para o padrão')
  }

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  const weightConfigs = [
    {
      key: 'desempenho' as const,
      label: 'Desempenho',
      description: 'Peso do resultado da avaliação de desempenho',
      max: 40,
      color: 'success' as const
    },
    {
      key: 'tempoCargo' as const,
      label: 'Tempo no Cargo',
      description: 'Experiência na função atual',
      max: 20,
      color: 'primary' as const
    },
    {
      key: 'tempoCasa' as const,
      label: 'Tempo na Casa',
      description: 'Tempo total na empresa',
      max: 20,
      color: 'primary' as const
    },
    {
      key: 'riscoPerda' as const,
      label: 'Risco de Perda',
      description: 'Probabilidade de saída do colaborador',
      max: 30,
      color: 'warning' as const
    },
    {
      key: 'impactoPerda' as const,
      label: 'Impacto da Perda',
      description: 'Impacto da saída na organização',
      max: 30,
      color: 'danger' as const
    },
    {
      key: 'absenteismo' as const,
      label: 'Absenteísmo',
      description: 'Taxa de faltas injustificadas',
      max: 20,
      color: 'warning' as const
    },
    {
      key: 'salario' as const,
      label: 'Posição Salarial',
      description: 'Posição salarial dentro do cargo',
      max: 15,
      color: 'success' as const
    },
    {
      key: 'formacao' as const,
      label: 'Formação',
      description: 'Grau de escolaridade e certificações',
      max: 15,
      color: 'primary' as const
    },
    {
      key: 'diversidade' as const,
      label: 'Diversidade',
      description: 'Contribuição para diversidade organizacional',
      max: 15,
      color: 'primary' as const
    },
    {
      key: 'experiencia' as const,
      label: 'Experiência',
      description: 'Score combinado de experiência e estabilidade',
      max: 15,
      color: 'success' as const
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações Avançadas</h1>
        <p className="mt-2 text-gray-600">
          Configure os parâmetros do sistema de análise com base nos dados reais dos colaboradores
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Sliders className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pesos para Cálculo de Score</h3>
                <p className="text-sm text-gray-600">Ajuste a importância de cada fator baseado nos dados reais</p>
              </div>
            </div>

            <div className="space-y-6">
              {weightConfigs.map((config) => (
                <div key={config.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        {config.label}
                      </label>
                      <Tooltip content={config.description}>
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {weights[config.key]}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={config.max}
                      value={weights[config.key]}
                      onChange={(e) => handleWeightChange(config.key, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, 
                          ${config.color === 'success' ? '#22c55e' : 
                            config.color === 'primary' ? '#0ea5e9' :
                            config.color === 'warning' ? '#f59e0b' : '#ef4444'} 0%, 
                          ${config.color === 'success' ? '#22c55e' : 
                            config.color === 'primary' ? '#0ea5e9' :
                            config.color === 'warning' ? '#f59e0b' : '#ef4444'} ${(weights[config.key] / config.max) * 100}%, 
                          #e5e7eb ${(weights[config.key] / config.max) * 100}%, 
                          #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>{config.max}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary and Actions */}
        <div className="space-y-6">
          {/* Total Weight Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total dos Pesos:</span>
                  <span className={`text-lg font-bold ${
                    totalWeight === 100 ? 'text-success-600' : 
                    totalWeight > 100 ? 'text-danger-600' : 'text-warning-600'
                  }`}>
                    {totalWeight}%
                  </span>
                </div>
                <ProgressBar
                  value={totalWeight}
                  max={100}
                  color={
                    totalWeight === 100 ? 'success' : 
                    totalWeight > 100 ? 'danger' : 'warning'
                  }
                />
                {totalWeight !== 100 && (
                  <p className="text-xs text-gray-600 mt-2">
                    {totalWeight > 100 
                      ? `Reduza ${totalWeight - 100}% para atingir 100%`
                      : `Adicione ${100 - totalWeight}% para atingir 100%`
                    }
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Distribuição Atual:</h4>
                <div className="space-y-2">
                  {weightConfigs.map((config) => (
                    <div key={config.key} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{config.label}:</span>
                      <span className="font-medium">{weights[config.key]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card>
            <div className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={totalWeight !== 100}
                variant="primary"
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar Padrão
              </Button>
            </div>
            
            {totalWeight !== 100 && (
              <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <p className="text-sm text-warning-700">
                  ⚠️ A soma dos pesos deve ser exatamente 100% para salvar as configurações.
                </p>
              </div>
            )}
          </Card>

          {/* New Features Info */}
          <Card>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="h-5 w-5 text-primary-600" />
              <h4 className="text-sm font-medium text-gray-900">Novos Fatores</h4>
            </div>
            <div className="text-xs text-gray-600 space-y-2">
              <p>
                <strong>Salário:</strong> Posição salarial relativa dentro do cargo
              </p>
              <p>
                <strong>Formação:</strong> Escolaridade, cursos e certificações
              </p>
              <p>
                <strong>Diversidade:</strong> Contribuição para D&I organizacional
              </p>
              <p>
                <strong>Experiência:</strong> Combinação de tempo e estabilidade
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}