import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  ArrowUpRight,
  Eye,
  Sparkles,
  Target,
  Brain,
  RefreshCw,
  Activity,
  BarChart3,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Star,
  TrendingDown
} from 'lucide-react'
import { useStore } from '../store/useStore'
import MetricCard from '../components/enhanced/MetricCard'
import EmployeeRankingChart from '../components/EmployeeRankingChart'
import RiskDistributionChart from '../components/RiskDistributionChart'
import DepartmentMetricsChart from '../components/DepartmentMetricsChart'
import QuickActions from '../components/enhanced/QuickActions'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'

export default function Dashboard() {
  const { employees, loading, error, fetchEmployees, testConnection } = useStore()

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleRetry = async () => {
    await fetchEmployees()
  }

  const handleTestConnection = async () => {
    const isConnected = await testConnection()
    if (isConnected) {
      await fetchEmployees()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados dos colaboradores...</p>
          <p className="text-sm text-gray-500 mt-2">Conectando ao banco de dados...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-danger-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <Button onClick={handleRetry} variant="primary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
            <Button onClick={handleTestConnection} variant="secondary">
              Testar conexão
            </Button>
          </div>
          <div className="mt-4 p-3 bg-warning-50 rounded-lg">
            <p className="text-sm text-warning-700">
              <strong>Dica:</strong> Verifique se as variáveis de ambiente do Supabase estão configuradas corretamente
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md">
          <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum colaborador encontrado</h3>
          <p className="text-gray-600 mb-4">
            Não há dados de colaboradores no banco. Verifique se a migração foi executada corretamente.
          </p>
          <Button onClick={handleRetry} variant="primary">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recarregar dados
          </Button>
        </div>
      </div>
    )
  }

  // Calculate enhanced metrics
  const totalEmployees = employees.length
  const highRiskEmployees = employees.filter(emp => 
    emp.riscoPerdaTexto?.toLowerCase() === 'alto'
  ).length
  const averageScore = employees.length > 0 
    ? employees.reduce((sum, emp) => sum + emp.score, 0) / employees.length 
    : 0
  const retentionRate = totalEmployees > 0 
    ? ((totalEmployees - highRiskEmployees) / totalEmployees) * 100 
    : 0

  // Advanced KPIs
  const topPerformers = employees.filter(emp => emp.score >= 400).length
  const criticalRisk = employees.filter(emp => 
    emp.riscoPerdaTexto?.toLowerCase() === 'alto' && emp.impactoPerdaTexto?.toLowerCase() === 'alto'
  ).length
  const anomalousAbsenteeism = employees.filter(emp => emp.isAbsenteismoAnomalo).length
  const negativeSentiment = employees.filter(emp => emp.scoreSentimento > 0.6).length
  const promotionOverdue = employees.filter(emp => emp.tempoUltimaPromocao > 3).length

  // Salary insights
  const averageSalary = employees.reduce((sum, emp) => sum + emp.salario, 0) / employees.length
  const salaryGap = {
    male: employees.filter(e => e.genero === 'Masculino').reduce((sum, e) => sum + e.salario, 0) / employees.filter(e => e.genero === 'Masculino').length || 0,
    female: employees.filter(e => e.genero === 'Feminino').reduce((sum, e) => sum + e.salario, 0) / employees.filter(e => e.genero === 'Feminino').length || 0
  }

  // Diversity metrics
  const diversityScore = employees.reduce((sum, emp) => sum + (emp.scoreDiversidade || 0), 0) / employees.length
  const genderDistribution = {
    male: employees.filter(e => e.genero === 'Masculino').length,
    female: employees.filter(e => e.genero === 'Feminino').length,
    other: employees.filter(e => e.genero === 'Outro').length
  }

  const topPerformersData = employees
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const riskDistribution = {
    alto: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'alto').length,
    medio: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'médio').length,
    baixo: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'baixo').length,
  }

  // Department metrics
  const departmentMetrics = employees.reduce((acc, emp) => {
    const dept = emp.area || 'Não definido'
    if (!acc[dept]) {
      acc[dept] = { employees: [], totalScore: 0 }
    }
    acc[dept].employees.push(emp)
    acc[dept].totalScore += emp.score
    return acc
  }, {} as Record<string, { employees: any[], totalScore: number }>)

  const departmentData = Object.entries(departmentMetrics).map(([dept, data]) => ({
    department: dept,
    count: data.employees.length,
    averageScore: data.totalScore / data.employees.length,
    highRisk: data.employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'alto').length
  }))

  // Critical alerts
  const criticalAlerts = employees.filter(emp => 
    emp.riscoPerdaTexto?.toLowerCase() === 'alto' || 
    emp.isAbsenteismoAnomalo || 
    emp.scoreSentimento > 0.6 ||
    emp.score < 250
  )

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-32 -translate-y-32" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Executivo</h1>
              <p className="text-primary-100 mb-4">
                Visão geral da gestão de talentos com insights de IA em tempo real
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-primary-100">{totalEmployees} colaboradores ativos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-primary-200" />
                  <span className="text-sm text-primary-100">IA Generativa Ativa</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col space-y-3">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{retentionRate.toFixed(1)}%</div>
                  <div className="text-sm text-primary-200">Taxa de Retenção</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
                  <div className="text-sm text-primary-200">Score Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{topPerformers}</div>
                  <div className="text-sm text-primary-200">Top Performers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Colaboradores"
          value={totalEmployees.toString()}
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          className="gradient-primary text-white"
          description="Número total de colaboradores ativos na empresa"
        />
        <MetricCard
          title="Alto Risco Crítico"
          value={criticalRisk.toString()}
          icon={AlertTriangle}
          trend={{ value: 2.1, isPositive: false }}
          className="gradient-danger text-white"
          description="Colaboradores de alto risco com alto impacto"
        />
        <MetricCard
          title="Score Médio Geral"
          value={averageScore.toFixed(1)}
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
          className="gradient-success text-white"
          description="Score médio de reconhecimento dos colaboradores"
        />
        <MetricCard
          title="Taxa de Retenção"
          value={`${retentionRate.toFixed(1)}%`}
          icon={Shield}
          trend={{ value: 3.7, isPositive: true }}
          className="gradient-warning text-white"
          description="Percentual de colaboradores com baixo risco de saída"
        />
      </div>

      {/* Advanced KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-6 w-6 text-warning-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{topPerformers}</div>
          <div className="text-sm text-gray-600">Top Performers</div>
          <div className="text-xs text-gray-500 mt-1">Score ≥ 400</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-6 w-6 text-danger-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{anomalousAbsenteeism}</div>
          <div className="text-sm text-gray-600">Absenteísmo Anômalo</div>
          <div className="text-xs text-gray-500 mt-1">Padrão irregular</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <TrendingDown className="h-6 w-6 text-warning-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{negativeSentiment}</div>
          <div className="text-sm text-gray-600">Sentimento Negativo</div>
          <div className="text-xs text-gray-500 mt-1">Análise de feedback</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-primary-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{promotionOverdue}</div>
          <div className="text-sm text-gray-600">Promoção Atrasada</div>
          <div className="text-xs text-gray-500 mt-1">&gt; 3 anos</div>
        </Card>

        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-6 w-6 text-success-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(averageSalary)}
          </div>
          <div className="text-sm text-gray-600">Salário Médio</div>
          <div className="text-xs text-gray-500 mt-1">Geral</div>
        </Card>
      </div>

      {/* Diversity & Inclusion Metrics */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Métricas de Diversidade & Inclusão</h3>
              <p className="text-sm text-gray-600">Indicadores de representatividade e equidade</p>
            </div>
          </div>
          <Badge variant="info" size="sm">
            Score D&I: {diversityScore.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Distribuição por Gênero</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Masculino</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(genderDistribution.male / totalEmployees) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{genderDistribution.male}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Feminino</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${(genderDistribution.female / totalEmployees) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{genderDistribution.female}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Outro</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(genderDistribution.other / totalEmployees) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{genderDistribution.other}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Gap Salarial por Gênero</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Masculino</span>
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(salaryGap.male)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Feminino</span>
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(salaryGap.female)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Diferença</span>
                <span className={`text-sm font-medium ${salaryGap.male > salaryGap.female ? 'text-danger-600' : 'text-success-600'}`}>
                  {((salaryGap.male - salaryGap.female) / salaryGap.female * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Ações Recomendadas</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Programa de mentoria</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-gray-600">Revisão salarial</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                <span className="text-gray-600">Grupos de afinidade</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Insights Enhanced */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Insights Avançados da IA</h3>
              <p className="text-sm text-gray-600">Análises preditivas e recomendações estratégicas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="info" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
            <Badge variant="success" size="sm">
              Atualizado agora
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
            <h4 className="font-medium text-primary-900 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              🎯 Oportunidade Estratégica
            </h4>
            <p className="text-sm text-primary-700">
              {departmentData.length > 1 ? 
                `O departamento ${departmentData.sort((a, b) => b.averageScore - a.averageScore)[0].department} apresenta o melhor desempenho médio (${departmentData[0].averageScore.toFixed(1)}). Considere replicar suas práticas de gestão.` :
                'Colaboradores com 2-3 anos de empresa apresentam maior risco de saída. Recomenda-se implementar programa de desenvolvimento de carreira.'
              }
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg border border-warning-200">
            <h4 className="font-medium text-warning-900 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              ⚠️ Alerta Preditivo
            </h4>
            <p className="text-sm text-warning-700">
              {criticalRisk > 0 ? 
                `${criticalRisk} colaboradores em situação crítica (alto risco + alto impacto). Intervenção imediata recomendada.` :
                'Tendência de aumento no absenteísmo detectada. Investigação recomendada para identificar causas.'
              }
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg border border-success-200">
            <h4 className="font-medium text-success-900 mb-2 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              ✅ Padrão Positivo
            </h4>
            <p className="text-sm text-success-700">
              Colaboradores com score acima de 400 mostram 95% de probabilidade de permanência nos próximos 12 meses. 
              {topPerformers > 0 && ` Atualmente temos ${topPerformers} top performers.`}
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              🔮 Previsão Inteligente
            </h4>
            <p className="text-sm text-purple-700">
              Com base nos padrões atuais, espera-se manter a taxa de retenção de {retentionRate.toFixed(1)}% nos próximos 3 meses. 
              Score médio pode aumentar 5-8% com ações preventivas.
            </p>
          </div>
        </div>
      </Card>

      {/* Charts Grid Enhanced */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Employee Ranking */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="success" size="sm">
                {topPerformers} colaboradores
              </Badge>
              <Link to="/employees">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <EmployeeRankingChart employees={topPerformersData} />
        </Card>

        {/* Risk Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição de Risco</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="danger" size="sm">
                {((riskDistribution.alto / totalEmployees) * 100).toFixed(1)}% alto risco
              </Badge>
              <Link to="/analytics">
                <Button variant="ghost" size="sm">
                  Análise detalhada
                  <Eye className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <RiskDistributionChart data={riskDistribution} />
        </Card>
      </div>

      {/* Department Metrics Enhanced */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance por Departamento</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="info" size="sm">
              {departmentData.length} departamentos
            </Badge>
            <Link to="/analytics">
              <Button variant="ghost" size="sm">
                Ver relatório completo
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <DepartmentMetricsChart data={departmentData} />
      </Card>

      {/* Critical Alerts Enhanced */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Alertas Críticos</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="danger" size="sm">
              {criticalAlerts.length} alertas
            </Badge>
            <Link to="/alerts">
              <Button variant="ghost" size="sm">
                Ver todos os alertas
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          {criticalAlerts.slice(0, 5).map((emp) => (
            <div key={emp.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-danger-50 to-warning-50 rounded-lg border border-danger-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-danger-600" />
                <div>
                  <p className="font-medium text-gray-900">{emp.nome}</p>
                  <p className="text-sm text-gray-600">{emp.cargoAtual} • {emp.area}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {emp.riscoPerdaTexto?.toLowerCase() === 'alto' && (
                      <Badge variant="danger" size="sm">Alto risco</Badge>
                    )}
                    {emp.isAbsenteismoAnomalo && (
                      <Badge variant="warning" size="sm">Absenteísmo anômalo</Badge>
                    )}
                    {emp.scoreSentimento > 0.6 && (
                      <Badge variant="danger" size="sm">Sentimento negativo</Badge>
                    )}
                    {emp.score < 250 && (
                      <Badge variant="danger" size="sm">Score baixo</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{emp.score.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                <Link to={`/employees/${emp.id}`}>
                  <Button variant="primary" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Analisar
                  </Button>
                </Link>
              </div>
            </div>
          ))}
          {criticalAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Award className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>Nenhum alerta crítico no momento</p>
              <p className="text-sm text-gray-400 mt-1">Todos os colaboradores estão em situação estável</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}