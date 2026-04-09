# Playbook — Prospecção Google Maps

## Visão Geral

Script automatizado que acessa o Google Maps, levanta empresas sem site em determinados nichos/regiões e salva em planilha para prospecção via bot WhatsApp.

---

## Colunas da Planilha de Leads

| Coluna | Descrição |
|--------|-----------|
| Nome da empresa | Nome no Google Maps |
| Categoria | Tipo de negócio (salão, restaurante, etc.) |
| Telefone | Número para WhatsApp |
| Endereço | Cidade / bairro |
| Tem site? | Sim / Não (filtra apenas "Não") |
| Status | Novo / Contatado / Respondeu / Vendido |
| Data do contato | |
| Observações | |

---

## Nichos Prioritários (a validar com squad)

- Salões de beleza
- Barbearias
- Restaurantes e lanchonetes
- Prestadores de serviço (encanadores, eletricistas, pintores)
- Lojas de bairro
- Clínicas estéticas
- Academias pequenas

---

## Processo de Prospecção Ativa

1. Script roda e popula planilha
2. Bot WhatsApp lê planilha e envia mensagem para leads "Novo"
3. Lead responde: bot qualifica e direciona para compra
4. Status atualizado para "Contatado" / "Respondeu" / "Vendido"

---

## Script

> Arquivo do script a ser referenciado aqui após integração.

---

*A completar com detalhes técnicos do script após definição da stack do bot.*
