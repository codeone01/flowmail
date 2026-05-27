export type Intent = "Urgente" | "Proposta" | "Suporte" | "Financeiro" | "Reunião" | "Follow-up" | "Geral";
export type Priority = "Alta" | "Média" | "Baixa";
export type Sentiment = "Positivo" | "Neutro" | "Crítico";

export type ClassifiedEmail = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  intent: Intent;
  priority: Priority;
  sentiment: Sentiment;
  confidence: number;
  summary: string;
  nextAction: string;
  notionTask: {
    title: string;
    status: "A fazer";
    owner: string;
    due: string;
    tags: string[];
  };
};

type Rule = {
  intent: Intent;
  keywords: string[];
  weight: number;
};

const rules: Rule[] = [
  { intent: "Urgente", keywords: ["urgente", "hoje", "imediato", "asap", "bloqueado", "crítico", "critico", "parado", "prazo final"], weight: 6 },
  { intent: "Proposta", keywords: ["proposta", "orçamento", "orcamento", "cotação", "cotacao", "contratar", "escopo", "valor", "preço", "preco"], weight: 5 },
  { intent: "Suporte", keywords: ["erro", "bug", "falha", "não funciona", "nao funciona", "problema", "suporte", "ajuda", "travando"], weight: 5 },
  { intent: "Financeiro", keywords: ["nota fiscal", "boleto", "pagamento", "fatura", "invoice", "cobrança", "cobranca", "reembolso"], weight: 5 },
  { intent: "Reunião", keywords: ["reunião", "reuniao", "call", "agenda", "calendário", "calendario", "horário", "horario", "meet"], weight: 4 },
  { intent: "Follow-up", keywords: ["retorno", "acompanhar", "follow", "status", "andamento", "novidade", "atualização", "atualizacao"], weight: 3 }
];

const positiveWords = ["obrigado", "excelente", "perfeito", "ótimo", "otimo", "gostei", "aprovado", "parabéns", "parabens"];
const criticalWords = ["insatisfeito", "atraso", "reclamação", "reclamacao", "grave", "crítico", "critico", "cancelar", "prejuízo", "prejuizo"];

export const sampleEmails = [
  {
    sender: "marina@northstar.co",
    subject: "Proposta para automação do atendimento",
    body:
      "Olá, gostaria de receber uma proposta para automatizar nosso atendimento com IA. Temos cerca de 2.000 tickets por mês e queremos reduzir o tempo de triagem. Você consegue enviar escopo e orçamento ainda esta semana?"
  },
  {
    sender: "financeiro@acme.com",
    subject: "Nota fiscal e pagamento pendente",
    body:
      "Bom dia. A nota fiscal do projeto de março ainda não chegou no nosso financeiro. Precisamos regularizar o pagamento até hoje para fechar o mês. Pode verificar com urgência?"
  },
  {
    sender: "joao@produto.io",
    subject: "Erro no dashboard em produção",
    body:
      "Estamos com um problema no dashboard. Os gráficos não carregam para parte dos usuários e o time comercial está bloqueado. Conseguimos priorizar isso agora?"
  }
];

function createId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalize(value: string): string {
  return value.toLowerCase();
}

function countMatches(text: string, keywords: string[]): number {
  return keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
}

function inferIntent(text: string): { intent: Intent; score: number } {
  const scores = rules.map((rule) => ({
    intent: rule.intent,
    score: countMatches(text, rule.keywords) * rule.weight
  }));

  const best = scores.sort((a, b) => b.score - a.score)[0];
  if (!best || best.score === 0) {
    return { intent: "Geral", score: 1 };
  }

  return best;
}

function inferPriority(text: string, intent: Intent, score: number): Priority {
  if (intent === "Urgente" || score >= 12 || countMatches(text, ["hoje", "agora", "bloqueado", "prazo final"]) > 0) {
    return "Alta";
  }

  if (intent === "Proposta" || intent === "Financeiro" || intent === "Suporte") {
    return "Média";
  }

  return "Baixa";
}

function inferSentiment(text: string): Sentiment {
  const positive = countMatches(text, positiveWords);
  const critical = countMatches(text, criticalWords);

  if (critical > positive) return "Crítico";
  if (positive > critical) return "Positivo";
  return "Neutro";
}

function summarize(subject: string, body: string, intent: Intent): string {
  const clean = body.replace(/\s+/g, " ").trim();
  const firstSentence = clean.split(/[.!?]/)[0]?.trim() ?? clean;
  return `${intent}: ${firstSentence || subject}.`;
}

function nextAction(intent: Intent): string {
  const actions: Record<Intent, string> = {
    Urgente: "Responder imediatamente e abrir tarefa de prioridade alta.",
    Proposta: "Preparar escopo, estimativa e próximos passos comerciais.",
    Suporte: "Criar ticket técnico com impacto, evidências e responsável.",
    Financeiro: "Encaminhar para financeiro e confirmar regularização.",
    Reunião: "Sugerir horários e enviar convite de calendário.",
    "Follow-up": "Responder com status atual e próxima atualização prevista.",
    Geral: "Responder com contexto e definir próximo passo."
  };

  return actions[intent];
}

function dueDate(priority: Priority): string {
  const date = new Date();
  date.setDate(date.getDate() + (priority === "Alta" ? 0 : priority === "Média" ? 2 : 5));
  return date.toISOString().slice(0, 10);
}

export function classifyEmail(input: { sender: string; subject: string; body: string }): ClassifiedEmail {
  const text = normalize(`${input.sender} ${input.subject} ${input.body}`);
  const { intent, score } = inferIntent(text);
  const priority = inferPriority(text, intent, score);
  const sentiment = inferSentiment(text);
  const confidence = Math.min(98, 62 + score * 4 + (priority === "Alta" ? 8 : 0));
  const action = nextAction(intent);

  return {
    id: createId(),
    sender: input.sender.trim() || "remetente@exemplo.com",
    subject: input.subject.trim() || "Sem assunto",
    body: input.body.trim(),
    intent,
    priority,
    sentiment,
    confidence,
    summary: summarize(input.subject, input.body, intent),
    nextAction: action,
    notionTask: {
      title: `[${intent}] ${input.subject.trim() || "E-mail sem assunto"}`,
      status: "A fazer",
      owner: priority === "Alta" ? "Operações" : intent === "Proposta" ? "Comercial" : "Atendimento",
      due: dueDate(priority),
      tags: [intent, priority, sentiment]
    }
  };
}
