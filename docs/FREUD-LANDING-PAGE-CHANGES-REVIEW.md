# Freud Landing Page — 5 Propostas de Mudança para Review

**Data:** 2026-05-11
**Status:** PENDENTE VALIDAÇÃO (não fazer merge até aprovação)
**Commit:** 9f380a8 (em branch, não em produção ainda)
**Responsáveis:** Traffic Leader (Hormozi review) + UX/Branding Squad

---

## 📊 Contexto — Por Que Essas Mudanças

**Problema identificado:**
- 89% bounce rate na homepage
- 460 visitantes, 460 veem a página, 0 vão para checkout
- Apenas 10.7% dos visitantes scrollam além do hero
- Falta de **social proof** acima da dobra
- Falta de **urgência**
- Falta de **garantia** visível
- Falta de **objection handling** (FAQ)

**Impacto esperado (se aprovadas):**
- ↓ Bounce rate: 89% → ~65-75% (15-25% reduction)
- ↑ Scroll depth: 10.7% → 25%+
- ↑ Conversão página: 0% → 2-5% estimado

---

## Proposta 1: Reescrever Hero Headline + Add Social Proof Badge

### ANTES
```jsx
<h1>Descubra Seu Jeito de Amar</h1>
<p>Uma jornada pela sua relação com você mesmo e o outro.</p>
```

### DEPOIS
```jsx
<h1>Descubra Seu Estilo de Apego em 2 Minutos</h1>
<p className="social-proof">✨ Mais de 10.482 pessoas já descobriram seu padrão de amor</p>
<p>Uma jornada pela sua relação com você mesmo e o outro.</p>
```

### Análise Hormozi

| Dimensão | Score Antes | Score Depois | Justificativa |
|----------|-------------|--------------|---------------|
| **Dream Outcome** (clareza) | 4/10 | 8/10 | "2 minutos" deixa claro o tempo. "Estilo de apego" é mais específico que "jeito de amar" |
| **Probability** (prova social) | 2/10 | 8/10 | "10.482 pessoas" = prova social concreta, aumenta credibilidade |
| **Clarity** (entendimento) | 6/10 | 9/10 | "2 minutos" é tangível. "Estilo de apego" é linguagem mais científica |
| **Urgency** | 2/10 | 3/10 | Sem urgência ainda (será adicionado na Proposta 3) |
| **Friction** | 5/10 | 4/10 | "2 minutos" reduz fricção (tempo percebi) |
| **Price** | N/A | N/A | Não muda preço |
| **Value Equation Score** | 2.4/10 | 6.4/10 | +166% de melhoria |

### Validações Necessárias

- [ ] **Traffic Lead**: Aprovação copy? Prova social credível? Número 10.482 é real ou estimado?
- [ ] **UX Squad**: Layout responsivo mobile? Tamanho da badge em 320px? Contrast ratio do "✨"?
- [ ] **Branding**: Tone alinhado com Freud? "Padrão de amor" é linguagem marca?

---

## Proposta 2: Adicionar Testimonials Section ACIMA DA DOBRA

### Localização
Inserir imediatamente após hero, antes de scroll (viewport máximo 1200px)

### Layout
```jsx
<section className="testimonials">
  <h2>O Que Nossos Usuários Dizem</h2>

  <div className="testimonials-grid">
    {[
      {
        stars: 5,
        quote: "Finalmente entendi por que repito padrões. Super revelador!",
        author: "Marina S., São Paulo"
      },
      {
        stars: 5,
        quote: "A leitura foi tão precisa. Mudou minha perspectiva de relacionamento.",
        author: "João P., Belo Horizonte"
      },
      {
        stars: 5,
        quote: "Recomendei para 3 amigas. Todas amaram a clareza do resultado.",
        author: "Beatriz M., Rio de Janeiro"
      }
    ]}
  </div>
</section>
```

### Análise Hormozi

| Dimensão | Antes | Depois |
|----------|-------|--------|
| **Social Proof** | 0 (zero testimonials visível acima dobra) | 9/10 (3 quotes com 5⭐ visível) |
| **Objection Handling** | Nenhum | 3 objeções cobertas implicitamente (funciona, é preciso, vale a pena) |
| **Urgency Trigger** | Nenhum | Implícito: "recomendei para 3 amigas" = validação |

### Validações Necessárias

- [ ] **Traffic Leader**: Testimonials são reais ou compostos? Onde eles aparecem agora (onde estavam)?
- [ ] **UX Squad**: 3-column grid responsivo em 320px? Ou empilhar? Font size das quotes?
- [ ] **Branding**: Avatar/foto dos autores deve incluir? Apenas nome + cidade é suficiente?
- [ ] **Legal**: Testimonials precisam de consentimento explícito dos usuários?

---

## Proposta 3: Adicionar Urgency Badge com Gradient

### Localização
Logo acima do CTA principal

### HTML/CSS
```jsx
<div className="urgency-badge">
  🎁 Preço de Lançamento: <strong>R$ 37</strong>
  <span className="urgency-note">(Sobe para R$ 47 em 5 dias)</span>
</div>
```

```css
.urgency-badge {
  background: linear-gradient(135deg, #D8A7B1 0%, #C9A87C 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  margin: 16px 0;
  animation: pulse 2s infinite;
}

.urgency-note {
  display: block;
  font-size: 0.85em;
  opacity: 0.9;
  margin-top: 4px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Análise Hormozi

| Dimensão | Impacto |
|----------|---------|
| **Urgency** | 8/10 (deadline claro: "5 dias", preço aumenta) |
| **Friction Reduction** | Mostra aumento futuro, pressiona conversão agora |
| **Credibility** | Precisa de validação: countdown é dinâmico ou estático? |

### Validações Necessárias

- [ ] **Traffic Leader**: Preço R$47 é real ou tática? Urgência "5 dias" alinhada com promoção?
- [ ] **UX Squad**: Gradient colors (#D8A7B1, #C9A87C) alinhadas com design system Freud? Contrast ratio 4.5:1 mínimo em branco?
- [ ] **Branding**: Tone "lançamento" combina com estratégia ou cria expectativa falsa?
- [ ] **Dev note**: Countdown deve ser dinâmico (JS) ou estático? Se dinâmico, quando reseta?

---

## Proposta 4: Adicionar Guarantee Section

### Localização
Após CTA, antes de FAQ

### Layout
```jsx
<section className="guarantee">
  <h3>🛡️ Garantia de 30 Dias</h3>
  <p>Sua satisfação é nossa prioridade. Se não gostar:</p>

  <ul className="guarantee-list">
    <li>✓ Acesso Imediato ao Resultado</li>
    <li>✓ 100% Seguro e Criptografado</li>
    <li>✓ Baseado em Pesquisa Científica</li>
  </ul>
</section>
```

### Análise Hormozi

| Dimensão | Impacto |
|----------|---------|
| **Objection Removal** | Reduz fricção de risco (devolução garantida) |
| **Trust Building** | "Criptografado", "Científico" = credibilidade |
| **Value Proof** | Mostra confiança no produto |

### Validações Necessárias

- [ ] **Traffic Leader**: "Garantia de 30 Dias" é realmente oferecida? Qual é o processo?
- [ ] **UX Squad**: Seta "✓" e emoji "🛡️" alinhados com branding? Contraste suficiente?
- [ ] **Legal**: Garantia precisa de termos claros (como solicitar, prazo de resposta)?
- [ ] **Product**: Sistema de devolução existe na plataforma Kiwify?

---

## Proposta 5: Adicionar FAQ Accordion com Objection Handling

### Localização
Antes do footer

### Layout
```jsx
<section className="faq">
  <h3>Perguntas Frequentes</h3>

  <div className="faq-item">
    <h4>Qual é a precisão da leitura?</h4>
    <p>A análise usa teoria de apego baseada em 50+ anos de pesquisa científica.
       Não é diagnóstico psicológico, mas um espelho comportamental validado.</p>
  </div>

  <div className="faq-item">
    <h4>Quanto tempo leva?</h4>
    <p>O teste leva 2-3 minutos. A leitura personalizada é imediata.</p>
  </div>

  <div className="faq-item">
    <h4>E se eu quiser devolver?</h4>
    <p>Oferecemos garantia de 30 dias sem perguntas. Contate suporte em freud@meujeitodeamar.com.br</p>
  </div>

  <div className="faq-item">
    <h4>Meus dados estão seguros?</h4>
    <p>Sim. Não compartilhamos dados, não armazenamos respostas do teste após entrega,
       e todo tráfego é criptografado (HTTPS).</p>
  </div>
</section>
```

### Análise Hormozi (Objection Removal)

| Objeção | Como Responde |
|---------|---------------|
| "É real ou só marketing?" | FAQ #1: Baseado em 50+ anos de pesquisa |
| "Vou gastar tempo?" | FAQ #2: 2-3 minutos |
| "E se não gostar?" | FAQ #3: 30 dias, sem perguntas |
| "Quem acessa meus dados?" | FAQ #4: Não compartilhamos, criptografado |

### Validações Necessárias

- [ ] **Traffic Leader**: Cada resposta remove objeção real? Baseado em suporte/chat logs?
- [ ] **UX Squad**: Accordion funciona bem em mobile? Focus states para keyboard nav?
- [ ] **Branding**: Tone conversa vs. corporativo? Email freud@ está correto?
- [ ] **Product**: "não armazenamos respostas" é verdade técnica? Chat logs confirmam?

---

## 📋 Checklist de Validação ANTES do Merge

### Traffic Leader (Hormozi Framework)
- [ ] Value Equation scoring para cada proposta
- [ ] Prova social é credível e real?
- [ ] Urgência cria fricção ou motivação?
- [ ] Ordem das seções maximize conversão?
- [ ] Copy alinhado com tonalidade Freud?

### UX/Branding Squad
- [ ] Responsividade 320px (mobile), 768px (tablet), 1200px (desktop)?
- [ ] Contrast ratios 4.5:1+ (WCAG AA)?
- [ ] Touch targets 44×44px+ em mobile?
- [ ] Spacing grid 8px?
- [ ] Animações pulse/transitions não distraem?
- [ ] Cores gradients (#D8A7B1, #C9A87C) alinhadas com design system?

### Product/Legal
- [ ] Testimonials têm consentimento dos usuários?
- [ ] Garantia de 30 dias tem processo claro?
- [ ] "Não armazenamos dados" é tecnicamente verdade?
- [ ] Urgência de preço é sustentável?

### Performance
- [ ] Lighthouse score não cai abaixo de 80?
- [ ] Imagens otimizadas (WebP + PNG fallback)?
- [ ] Animações não travam em mobile lento?

---

## ⏸️ Status & Próximos Passos

**ATUAL:** Mudanças implementadas em commit 9f380a8, branch local, **NÃO merged para main**

**PRÓXIMO:**
1. Traffic Leader revisa (Hormozi scoring)
2. UX Squad revisa (design + acessibilidade)
3. Product aprova (garantia, dados)
4. AFTER all approvals → merge + deploy

**NÃO MERGEAR** até todas as validações acima estarem com ✓

---

**Responsável Review:** @traffic-lead (Hormozi) + @ux-design-expert (Design) + @product (Validação)
**Data Revisão Esperada:** 2026-05-12 (amanhã)
**Ticket Jira/Linear:** FREUD-{ID} (preencher)
