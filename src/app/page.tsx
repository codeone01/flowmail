"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, ClipboardList, Clock, DollarSign, Inbox, Loader2, MailPlus, Send, Sparkles, Tag, Wand2, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { classifyEmail, sampleEmails, type ClassifiedEmail, type Priority } from "@/lib/classifier";
import { cn } from "@/lib/cn";

const priorityClasses: Record<Priority, string> = {
  Alta: "border-coral/35 bg-coral/10 text-coral",
  Média: "border-amber/35 bg-amber/10 text-amber",
  Baixa: "border-mint-400/30 bg-mint-500/10 text-mint-300"
};

function initialEmails(): ClassifiedEmail[] {
  return sampleEmails.map((email) => classifyEmail(email));
}

export default function Home() {
  const [emails, setEmails] = useState<ClassifiedEmail[]>(initialEmails);
  const [selectedId, setSelectedId] = useState<string>(emails[0]?.id ?? "");
  const [sender, setSender] = useState("cliente@empresa.com");
  const [subject, setSubject] = useState("Preciso de ajuda com uma proposta");
  const [body, setBody] = useState("Olá, gostaria de entender valores, prazo e escopo para automatizar nossa triagem de e-mails com IA ainda este mês.");
  const [isClassifying, setIsClassifying] = useState(false);

  const selected = emails.find((email) => email.id === selectedId) ?? emails[0];
  const metrics = useMemo(() => {
    const highPriority = emails.filter((email) => email.priority === "Alta").length;
    const tasks = emails.length;
    const savedMinutes = tasks * 14;

    return [
      { label: "E-mails triados", value: String(tasks), icon: Inbox },
      { label: "Prioridade alta", value: String(highPriority), icon: Clock },
      { label: "Min. economizados", value: String(savedMinutes), icon: Sparkles },
      { label: "Tarefas criadas", value: String(tasks), icon: ClipboardList }
    ];
  }, [emails]);

  const classifyCurrentEmail = () => {
    if (!body.trim() && !subject.trim()) return;
    setIsClassifying(true);

    window.setTimeout(() => {
      const result = classifyEmail({ sender, subject, body });
      setEmails((current) => [result, ...current]);
      setSelectedId(result.id);
      setIsClassifying(false);
    }, 650);
  };

  const exportTask = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(JSON.stringify(selected.notionTask, null, 2));
  };

  return (
    <main className="flow-grid min-h-screen overflow-hidden bg-graphite text-ink">
      <a
        href="https://eduardoazevedo.tech/"
        className="fixed bottom-3 right-3 z-50 inline-flex items-center gap-2 rounded-full border border-line bg-black/60 px-4 py-2 text-sm text-ink backdrop-blur-xl transition hover:border-mint-300 hover:text-mint-300 sm:bottom-5 sm:right-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Portfolio
      </a>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(124,255,178,.2),transparent_30rem),radial-gradient(circle_at_88%_0%,rgba(142,124,255,.18),transparent_28rem)]" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1720px] gap-5 p-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(760px,1fr)_310px] 2xl:grid-cols-[300px_minmax(900px,1fr)_330px] xl:p-6">
        <aside className="panel min-w-0 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint-500/15 text-mint-300 shadow-glow">
              <Bot aria-hidden className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">FlowMail</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Agente de triagem</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="min-w-0 rounded-2xl border border-line bg-elevated/55 p-4">
                  <Icon aria-hidden className="h-4 w-4 text-mint-300" />
                  <div className="mt-4 font-display text-3xl font-semibold">{metric.value}</div>
                  <p className="mt-1 break-words text-xs leading-5 text-muted">{metric.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <Inbox aria-hidden className="h-4 w-4" />
              Caixa inteligente
            </div>

            <div className="space-y-2">
              {emails.map((email) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedId(email.id)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition",
                    selected?.id === email.id ? "border-mint-400/45 bg-mint-500/10" : "border-line bg-elevated/45 hover:border-mint-400/35"
                  )}
                >
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-sm font-medium">{email.subject}</p>
                    <span className={cn("shrink-0 rounded-full border px-2 py-1 text-[0.62rem] uppercase", priorityClasses[email.priority])}>{email.priority}</span>
                  </div>
                  <p className="mt-2 truncate text-xs text-muted">{email.sender}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full border border-line px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-mint-300">{email.intent}</span>
                    <span className="text-xs text-muted">{email.confidence}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="panel flex min-h-[calc(100vh-2rem)] min-w-0 flex-col rounded-2xl xl:min-h-[calc(100vh-3rem)]">
          <header className="border-b border-line p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint-300">Email → IA → Tarefa</p>
            <h1 className="mt-2 max-w-4xl font-display text-4xl font-semibold leading-tight md:text-6xl">Classifique e-mails e gere tarefas em segundos.</h1>
          </header>

          <div className="grid flex-1 gap-5 p-5 2xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-line bg-graphite/60 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl font-semibold">Novo e-mail</h2>
                    <p className="mt-1 text-sm text-muted">Cole um e-mail real ou use o exemplo para testar o classificador.</p>
                  </div>
                  <MailPlus aria-hidden className="h-6 w-6 text-mint-300" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm text-muted">
                    Remetente
                    <input value={sender} onChange={(event) => setSender(event.target.value)} className="min-w-0 rounded-xl border border-line bg-panel px-4 py-3 text-ink focus:outline-none" />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm text-muted">
                    Assunto
                    <input value={subject} onChange={(event) => setSubject(event.target.value)} className="min-w-0 rounded-xl border border-line bg-panel px-4 py-3 text-ink focus:outline-none" />
                  </label>
                </div>

                <label className="mt-4 grid min-w-0 gap-2 text-sm text-muted">
                  Corpo do e-mail
                  <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    className="min-h-44 min-w-0 resize-y rounded-xl border border-line bg-panel px-4 py-3 text-ink focus:outline-none"
                  />
                </label>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={classifyCurrentEmail}
                    disabled={isClassifying}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-graphite disabled:opacity-60"
                  >
                    {isClassifying ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Wand2 aria-hidden className="h-4 w-4" />}
                    Classificar e criar tarefa
                  </button>

                  {sampleEmails.map((sample, index) => (
                    <button
                      key={sample.subject}
                      type="button"
                      onClick={() => {
                        setSender(sample.sender);
                        setSubject(sample.subject);
                        setBody(sample.body);
                      }}
                      className="rounded-full border border-line px-4 py-3 text-xs text-muted hover:text-ink"
                    >
                      Exemplo {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {selected ? (
                <motion.div layout className="rounded-2xl border border-line bg-elevated/45 p-5">
                  <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint-300">Análise da IA</p>
                      <h2 className="mt-2 break-words font-display text-3xl font-semibold">{selected.subject}</h2>
                      <p className="mt-2 break-all text-sm text-muted">{selected.sender}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-line px-3 py-1.5 text-sm text-mint-300">{selected.intent}</span>
                      <span className={cn("rounded-full border px-3 py-1.5 text-sm", priorityClasses[selected.priority])}>{selected.priority}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                    <Insight label="Confiança" value={`${selected.confidence}%`} />
                    <Insight label="Sentimento" value={selected.sentiment} />
                    <Insight label="Intenção" value={selected.intent} />
                  </div>

                  <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-panel/75 p-4">
                      <h3 className="mb-2 flex items-center gap-2 font-display text-xl font-semibold">
                        <Sparkles aria-hidden className="h-5 w-5 text-mint-300" />
                        Resumo
                      </h3>
                      <p className="leading-7 text-muted">{selected.summary}</p>
                    </div>
                    <div className="rounded-2xl border border-line bg-panel/75 p-4">
                      <h3 className="mb-2 flex items-center gap-2 font-display text-xl font-semibold">
                        <Send aria-hidden className="h-5 w-5 text-mint-300" />
                        Próxima ação
                      </h3>
                      <p className="leading-7 text-muted">{selected.nextAction}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </div>

            <aside className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-line bg-panel/80 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint-300">Fluxo automático</p>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "E-mail recebido", icon: Inbox },
                    { label: "Classificação por intenção", icon: Bot },
                    { label: "Tarefa criada", icon: ClipboardList }
                  ].map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex items-center gap-3 rounded-2xl border border-line bg-elevated/45 p-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-mint-500/10 text-mint-300">
                          <Icon aria-hidden className="h-4 w-4" />
                        </div>
                        <span className="min-w-0 break-words text-sm">{step.label}</span>
                        {index < 2 ? <ArrowRight aria-hidden className="ml-auto h-4 w-4 text-muted" /> : <CheckCircle2 aria-hidden className="ml-auto h-4 w-4 text-mint-300" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {selected ? (
                <div className="rounded-2xl border border-line bg-panel/80 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint-300">Tarefa estilo Notion</p>
                  <h3 className="mt-3 break-words font-display text-2xl font-semibold">{selected.notionTask.title}</h3>
                  <div className="mt-5 space-y-3 text-sm">
                    <TaskRow icon={ClipboardList} label="Status" value={selected.notionTask.status} />
                    <TaskRow icon={Tag} label="Responsável" value={selected.notionTask.owner} />
                    <TaskRow icon={Clock} label="Prazo" value={selected.notionTask.due} />
                    <TaskRow icon={DollarSign} label="Tags" value={selected.notionTask.tags.join(" · ")} />
                  </div>
                  <button type="button" onClick={exportTask} className="mt-5 w-full rounded-full border border-line px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink">
                    Copiar JSON da tarefa
                  </button>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function Insight({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-panel/75 p-4">
      <p className="break-words font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-3 whitespace-nowrap font-display text-[clamp(1.75rem,2.1vw,2.25rem)] font-semibold">{value}</p>
    </div>
  );
}

function TaskRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-elevated/45 p-3">
      <Icon aria-hidden className="h-4 w-4 shrink-0 text-mint-300" />
      <span className="shrink-0 text-muted">{label}</span>
      <span className="ml-auto min-w-0 break-words text-right text-ink">{value}</span>
    </div>
  );
}
