import { Employee, WeightConfig } from '../types'
import { supabaseService } from './supabaseService'

export class AIService {
  
  async generateAnalysis(
    employee: Employee, 
    analysisType: string, 
    weights: WeightConfig
  ): Promise<string> {
    try {
      // Salvar a análise no histórico
      await supabaseService.saveAnalysis(
        employee.id,
        analysisType,
        '', // Será preenchido após a geração
        weights,
        employee.score
      )

      // Gerar análise baseada no tipo
      const analysis = this.generateAnalysisContent(employee, analysisType)
      
      // Atualizar o histórico com o conteúdo gerado
      await supabaseService.saveAnalysis(
        employee.id,
        analysisType,
        analysis,
        weights,
        employee.score
      )

      return analysis
    } catch (error) {
      console.error('Error generating analysis:', error)
      throw new Error('Failed to generate analysis')
    }
  }

  private generateAnalysisContent(employee: Employee, analysisType: string): string {
    switch (analysisType.toLowerCase()) {
      case 'risk':
        return this.generateRiskAnalysis(employee)
      case 'impact':
        return this.generateImpactAnalysis(employee)
      case 'recognition':
        return this.generateRecognitionPlan(employee)
      case 'development':
        return this.generateDevelopmentPlan(employee)
      case 'diversity':
        return this.generateDiversityAnalysis(employee)
      default:
        return this.generateRecognitionPlan(employee)
    }
  }

  private generateRiskAnalysis(employee: Employee): string {
    const risco = employee.riscoPerdaTexto?.toLowerCase()
    let diagnostico = ''
    let plano = ''

    if (risco === 'alto') {
      diagnostico = `O colaborador ${employee.nome} apresenta alto risco de perda devido a uma combinação de fatores críticos. Com score de ${employee.score.toFixed(1)}, observamos sinais que requerem atenção imediata. O desempenho ${employee.desempenhoTexto?.toLowerCase()} aliado ao tempo de ${employee.tempoNoCargo.toFixed(1)} anos no cargo atual pode indicar necessidade de novos desafios.`
      
      plano = `<ul>
        <li><strong>Conversa individual imediata:</strong> Agendar reunião one-on-one para entender preocupações e expectativas</li>
        <li><strong>Plano de desenvolvimento:</strong> Criar trilha de crescimento com novos desafios técnicos e de liderança</li>
        <li><strong>Revisão salarial:</strong> Avaliar adequação da remuneração ao mercado e contribuição</li>
        <li><strong>Projeto especial:</strong> Designar para liderar iniciativa estratégica que utilize suas competências</li>
      </ul>`
    } else if (risco === 'médio') {
      diagnostico = `${employee.nome} está classificado como médio risco devido a alguns fatores de atenção. Com score de ${employee.score.toFixed(1)}, há oportunidades de melhoria na retenção. O desempenho ${employee.desempenhoTexto?.toLowerCase()} indica potencial, mas alguns aspectos precisam de atenção.`
      
      plano = `<ul>
        <li><strong>Feedback regular:</strong> Estabelecer ciclo de feedback mensal para acompanhar satisfação</li>
        <li><strong>Capacitação:</strong> Oferecer treinamentos alinhados aos interesses de carreira</li>
        <li><strong>Reconhecimento:</strong> Implementar programa de reconhecimento por conquistas</li>
        <li><strong>Mentoria:</strong> Conectar com mentor sênior para desenvolvimento profissional</li>
      </ul>`
    } else {
      diagnostico = `${employee.nome} apresenta baixo risco de perda, demonstrando boa estabilidade e satisfação. Com score de ${employee.score.toFixed(1)} e desempenho ${employee.desempenhoTexto?.toLowerCase()}, o colaborador está bem alinhado com a empresa.`
      
      plano = `<ul>
        <li><strong>Manutenção:</strong> Continuar práticas atuais de gestão e reconhecimento</li>
        <li><strong>Mentoria:</strong> Considerar como mentor para novos colaboradores</li>
        <li><strong>Crescimento:</strong> Explorar oportunidades de crescimento horizontal</li>
        <li><strong>Projetos especiais:</strong> Incluir em projetos estratégicos da empresa</li>
      </ul>`
    }

    return `<p><strong>Diagnóstico do Risco</strong></p>
            <p>${diagnostico}</p>
            <p><strong>Plano de Retenção Sugerido</strong></p>
            ${plano}`
  }

  private generateImpactAnalysis(employee: Employee): string {
    const impacto = employee.impactoPerdaTexto?.toLowerCase()
    let analise = ''

    if (impacto === 'estratégico' || impacto === 'crítico' || impacto === 'alto') {
      analise = `A saída de ${employee.nome} teria impacto significativo na organização. Como ${employee.area}, sua experiência de ${employee.tempoDeCasa.toFixed(1)} anos na empresa e conhecimento especializado são difíceis de substituir. O desempenho ${employee.desempenhoTexto?.toLowerCase()} e score de ${employee.score.toFixed(1)} indicam alta contribuição para resultados estratégicos. A perda resultaria em interrupção de projetos críticos, necessidade de redistribuição de responsabilidades e tempo considerável para encontrar e treinar substituto qualificado.`
    } else if (impacto === 'médio' || impacto === 'moderado') {
      analise = `A perda de ${employee.nome} geraria impacto moderado nas operações. Embora seja um colaborador valioso com ${employee.tempoDeCasa.toFixed(1)} anos de experiência, sua saída seria gerenciável com planejamento adequado. O conhecimento pode ser transferido e a posição preenchida em prazo razoável, mas ainda assim causaria alguma interrupção temporária nos processos.`
    } else {
      analise = `O impacto da saída de ${employee.nome} seria relativamente baixo para a organização. Embora todo colaborador seja importante, a posição pode ser preenchida sem grandes disruções operacionais. O conhecimento é mais facilmente transferível e a curva de aprendizado para um substituto seria menor.`
    }

    return `<p><strong>Análise de Impacto:</strong> ${analise}</p>`
  }

  private generateRecognitionPlan(employee: Employee): string {
    const score = employee.score
    let reconhecimento = ''
    let justificativa = ''
    let incentivo = ''

    if (score >= 400) {
      reconhecimento = `${employee.nome} é um colaborador excepcional que merece reconhecimento especial. Seu desempenho ${employee.desempenhoTexto?.toLowerCase()} e dedicação de ${employee.tempoDeCasa.toFixed(1)} anos demonstram comprometimento exemplar com nossa organização.`
      
      justificativa = `Com score de ${score.toFixed(1)}, ${employee.nome} está entre nossos top performers. Sua contribuição como ${employee.area} tem sido fundamental para o sucesso da equipe, combinando excelência técnica com liderança natural.`
      
      incentivo = `Continue sendo a referência que você é! Sua trajetória inspira outros colaboradores e seu futuro na empresa é promissor. Estamos preparando oportunidades de crescimento que reconhecem seu potencial de liderança.`
    } else if (score >= 300) {
      reconhecimento = `${employee.nome} é um colaborador valioso que contribui significativamente para nossos resultados. Seu desempenho ${employee.desempenhoTexto?.toLowerCase()} e experiência são importantes para a equipe.`
      
      justificativa = `O score de ${score.toFixed(1)} reflete uma performance sólida e consistente. Como ${employee.area}, você demonstra competência técnica e colaboração efetiva com a equipe.`
      
      incentivo = `Seu trabalho é reconhecido e valorizado. Continue desenvolvendo suas habilidades - há oportunidades de crescimento que podem elevar ainda mais sua contribuição para a empresa.`
    } else {
      reconhecimento = `${employee.nome} é um membro importante da nossa equipe e reconhecemos seu potencial de crescimento. Valorizamos sua dedicação e estamos comprometidos em apoiar seu desenvolvimento.`
      
      justificativa = `Embora o score atual seja de ${score.toFixed(1)}, vemos oportunidades claras de melhoria e crescimento. Seu tempo de ${employee.tempoDeCasa.toFixed(1)} anos na empresa mostra comprometimento.`
      
      incentivo = `Acreditamos no seu potencial! Com o suporte adequado e foco no desenvolvimento, você pode alcançar resultados ainda melhores. Estamos aqui para apoiar sua jornada de crescimento profissional.`
    }

    return `<p><strong>Parágrafo de Reconhecimento:</strong> ${reconhecimento}</p>
            <p><strong>Justificativa Técnica:</strong> ${justificativa}</p>
            <p><strong>Mensagem de Incentivo:</strong> ${incentivo}</p>`
  }

  private generateDevelopmentPlan(employee: Employee): string {
    const areas = []
    const acoes = []

    // Análise baseada no score e características
    if (employee.scoreFormacao < 70) {
      areas.push('Qualificação técnica e certificações')
      acoes.push('<li><strong>Capacitação técnica:</strong> Investir em cursos e certificações relevantes para o cargo</li>')
    }

    if (employee.scoreExperiencia < 60) {
      areas.push('Desenvolvimento de experiência prática')
      acoes.push('<li><strong>Projetos desafiadores:</strong> Incluir em projetos que ampliem a experiência prática</li>')
    }

    if (employee.tempoNoCargo > 3 && employee.desempenhoTexto?.toLowerCase().includes('excede')) {
      areas.push('Preparação para liderança')
      acoes.push('<li><strong>Trilha de liderança:</strong> Programa de desenvolvimento de habilidades de gestão</li>')
    }

    if (employee.scoreSentimento > 0.5) {
      areas.push('Engajamento e motivação')
      acoes.push('<li><strong>Coaching individual:</strong> Sessões para melhorar engajamento e satisfação</li>')
    }

    // Ações padrão
    acoes.push('<li><strong>Mentoria:</strong> Conectar com mentor experiente na área</li>')
    acoes.push('<li><strong>Feedback contínuo:</strong> Estabelecer ciclo regular de feedback e acompanhamento</li>')

    return `<p><strong>Áreas de Desenvolvimento Identificadas:</strong></p>
            <p>${areas.join(', ')}</p>
            <p><strong>Plano de Ação Sugerido:</strong></p>
            <ul>${acoes.join('')}</ul>`
  }

  private generateDiversityAnalysis(employee: Employee): string {
    const contribuicoes = []
    const oportunidades = []

    // Análise de contribuição para diversidade
    if (employee.genero !== 'Masculino') {
      contribuicoes.push('diversidade de gênero')
    }

    if (employee.racaCor !== 'Branca') {
      contribuicoes.push('diversidade racial')
    }

    if (employee.orientacaoSexual !== 'Heterosexual') {
      contribuicoes.push('diversidade de orientação sexual')
    }

    if (employee.grauEscolaridade.includes('Superior') || employee.grauEscolaridade.includes('Pós')) {
      contribuicoes.push('diversidade educacional')
    }

    // Oportunidades de inclusão
    oportunidades.push('Participação em grupos de afinidade')
    oportunidades.push('Mentoria para outros colaboradores diversos')
    oportunidades.push('Representação em comitês de diversidade')

    const scoreDiv = employee.scoreDiversidade || 0

    return `<p><strong>Análise de Diversidade:</strong></p>
            <p>${employee.nome} contribui para a diversidade organizacional através de: ${contribuicoes.join(', ')}. 
            Com score de diversidade de ${scoreDiv.toFixed(1)}, representa um ativo importante para nossa estratégia de D&I.</p>
            <p><strong>Oportunidades de Inclusão:</strong></p>
            <ul>${oportunidades.map(op => `<li>${op}</li>`).join('')}</ul>`
  }
}

export const aiService = new AIService()