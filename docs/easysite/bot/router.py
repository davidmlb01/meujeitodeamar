def get_journey_context(lead: dict) -> str:
    """
    Retorna contexto adicional de jornada para injetar no system prompt do Claude.
    """
    source = lead.get("source", "direct_ad")
    name = lead.get("name") or "o cliente"
    ramo = lead.get("ramo") or ""
    company = lead.get("company") or ""
    cidade = lead.get("cidade") or ""

    if source == "landing_page":
        context = (
            f"CONTEXTO DA JORNADA: Lead veio da Landing Page (já demonstrou interesse).\n"
            f"Nome: {name}"
        )
        if ramo:
            context += f" | Ramo: {ramo}"
        context += (
            "\nEste é o PRIMEIRO contato ou conversa em andamento via Jornada B. "
            "Siga as instruções da JORNADA B do seu guia operacional."
        )
        return context

    if source == "prospecting":
        context = (
            "CONTEXTO DA JORNADA: Lead da prospecção ativa (Google Maps — empresa sem site).\n"
        )
        if company:
            context += f"Empresa: {company}"
        if ramo:
            context += f" | Ramo: {ramo}"
        if cidade:
            context += f" | Cidade: {cidade}"
        context += (
            "\nEste é o PRIMEIRO contato ou conversa em andamento via Jornada C. "
            "Siga as instruções da JORNADA C do seu guia operacional."
        )
        return context

    # direct_ad (padrão)
    return (
        "CONTEXTO DA JORNADA: Lead chegou de anúncio no Meta (mensagem direta no WhatsApp). "
        "Provavelmente perguntou 'quanto custa?' ou 'como funciona?'. "
        "NÃO revele o preço imediatamente. "
        "Siga as instruções da JORNADA A do seu guia operacional."
    )
