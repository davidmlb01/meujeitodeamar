# Relatorio: Free Tier do Destaka esta Morto
**Data:** 2026-10-03
**Squad:** Hormozi (oferta) + CMO (posicionamento) + Copy (linguagem)
**Problema:** Dashboard gratuito nao gera desejo de assinatura. Tudo parece morto e sem graca.

---

## Diagnostico: Por que nao converte

### 1. O Score nao gera urgencia (Hormozi)

**Atual:** "45 de 100. Tem espaco para melhorar. Em progresso."
**Problema:** Tom neutro, passivo. "Em progresso" soa como se estivesse tudo bem. Ninguem paga para melhorar algo que "esta em progresso".

**Fix:** O score precisa doer. O cliente precisa sentir que esta perdendo dinheiro agora.

| Atual | Proposta |
|---|---|
| "Tem espaco para melhorar" | "Seus concorrentes estao na frente" |
| "Em progresso" | "Voce esta invisivel para 54% dos clientes" |
| "Ativar Destaka" | "Comecar a aparecer agora" |

### 2. O impactText e fraco (Copy)

**Atual:** "Seu perfil aparece em apenas 46% das buscas na sua regiao. Isso pode representar ate 3 pacientes perdidos por semana."

**Problemas:**
- "pode representar" e hedge. Ninguem age sobre "pode".
- "ate 3" e teto. Parece pouco.
- "pacientes perdidos" e abstrato. Quanto vale cada paciente?

**Fix:**
| Atual | Proposta |
|---|---|
| "pode representar ate 3" | "voce esta perdendo no minimo 3" |
| "pacientes perdidos por semana" | "clientes que vao para o concorrente toda semana" |
| (nao tem) | Adicionar valor monetario: "Isso significa R$X mil por mes indo para o concorrente" |

### 3. Os blocos com blur sao genericos (CMO)

**Atual:** Lock generico com texto passivo:
- "Seus numeros reais. Assine para acompanhar."
- "3 melhorias prontas para o seu perfil."
- "Coletando dados da primeira semana..."

**Problema:** Nenhuma dessas frases mostra o que o cliente GANHA. Mostram o que esta bloqueado, nao o que esta perdendo.

**Fix:** Cada bloco bloqueado precisa mostrar o beneficio concreto, nao o recurso generico.

| Bloco | Atual | Proposta |
|---|---|---|
| Performance | "Seus numeros reais. Assine para acompanhar." | "X pessoas procuraram voce e nao te encontraram. Veja quem sao." |
| Mapa | "Assine para ver seu alcance completo" | "Descubra em quais bairros voce esta invisivel" |
| Keywords | "Coletando dados da primeira semana..." | "Saiba exatamente o que seus clientes buscam no Google" |
| Acoes | "3 melhorias prontas para o seu perfil." | "3 ajustes que fariam voce aparecer para mais X clientes" |

### 4. O botao "Ativar Destaka" nao comunica valor (Hormozi)

**Atual:** "Ativar Destaka" (o que e Destaka? O cliente acabou de chegar)

**Fix:** O botao precisa ser a promessa, nao o nome do produto.

| Atual | Proposta |
|---|---|
| "Ativar Destaka" (card score) | "Comecar a aparecer agora" |
| "Ativar Destaka" (sticky bar) | "Quero mais clientes" |
| "Ver meu alcance" (mapa) | "Descobrir onde estou invisivel" |
| "Ver minhas buscas" (keywords) | "Ver o que meus clientes buscam" |

### 5. O sticky bar e fraco (Hormozi + Copy)

**Atual:** "Ate 3 pacientes novos por semana. R$197/mes. Ativar Destaka"

**Problemas:**
- "Ate 3" e teto, parece pouco
- "R$197/mes" sem contexto de valor
- "Ativar Destaka" e feature, nao beneficio

**Fix:**
```
"No minimo 3 clientes novos por semana. Menos de R$7 por dia. [Quero mais clientes]"
```

Alternativa com ancoragem:
```
"Cada cliente vale em media R$500. Destaka traz no minimo 3 por semana. [Comecar por R$6,50/dia]"
```

### 6. Falta escassez e prova social (Hormozi)

**Atual:** Nenhum elemento de urgencia ou prova social.

**Fix:**
- Adicionar: "X negocios na sua regiao ja usam Destaka" (mesmo que seja poucos, mostra traction)
- Ou: "Vagas limitadas na sua regiao" (escassez geografica faz sentido para negocio local)
- Ou: "Seu concorrente [nome] ja aparece em X bairros" (se temos dados de concorrentes)

### 7. O score contextual nao ancora (CMO)

**Atual:** Score 45 com "Tem espaco para melhorar"

**Fix:** Ancorar contra concorrentes ou contra o ideal:
```
"Seu score: 45/100
Concorrentes na sua regiao: 72 em media
Voce esta 27 pontos atras."
```

---

## Proposta de Implementacao (ordenada por impacto)

### P0: Copy que doi (30min)

1. **impactText**: "Voce esta perdendo no minimo {lostMax} clientes por semana para seus concorrentes. Sao R${lostMax * 300}/mes saindo do seu bolso."
2. **Score label**: trocar "Tem espaco para melhorar" / "Em progresso" para linguagem de urgencia
3. **Botoes**: trocar todos "Ativar Destaka" para copy de beneficio
4. **Sticky bar**: "No minimo {lostMax} clientes novos por semana. Menos de R$7/dia."

### P1: Blocos com blur que vendem (30min)

5. Cada LockedOverlay com copy de beneficio concreto, nao recurso
6. Mapa: "Descubra em quais bairros voce esta invisivel"
7. Keywords: "Saiba exatamente o que seus clientes buscam"
8. Performance: "X pessoas te procuraram. Veja quantas te encontraram."
9. Acoes: "3 ajustes que aumentariam seu score em Y pontos"

### P2: Ancoragem e urgencia (20min)

10. Score ancorado contra media de concorrentes (dados ja existem no banco)
11. Mencion do nome do concorrente principal no impactText

---

## Decisoes que dependem do David

1. **Valor medio por cliente**: precisamos de um numero para o calculo monetario. R$300? R$500? Depende do vertical
2. **Prova social**: podemos mostrar "X negocios ja usam" mesmo com poucos? Ou prefere nao?
3. **Escassez**: "Vagas limitadas na sua regiao" e real ou marketing?
4. **Tom**: agressivo (Hormozi puro) ou senior-direto (tom atual do Destaka)?
