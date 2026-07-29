---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

![Logotipo da Namada](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Melhores Práticas de Privacidade da Namada

> Orientações práticas e acionáveis para alcançar o máximo de privacidade na Namada — e entender exatamente onde suas proteções terminam.

**A privacidade é um direito fundamental.** A Namada foi criada especificamente para protegê-la por meio de criptografia avançada de conhecimento zero. Este guia reúne as práticas mais eficazes usadas por utilizadores e programadores preocupados com a privacidade.

---

## Como a Namada Protege a Sua Privacidade

A Namada é uma blockchain soberana, focada em privacidade, que oculta endereços de carteira, montantes de transações e saldos usando **provas de conhecimento zero (zk-SNARKs)**.

### Funcionalidades Principais de Privacidade

- **Transações Blindadas** - Ocultam completamente remetente, destinatário e montantes.
- **Multi-Asset Shielded Pool (MASP)** - Transferências privadas, swaps e bridging entre quaisquer ativos.
- **Privacidade Entre Cadeias** - Bridging blindado via IBC (suporte para Ethereum e Solana em breve).
- **Recompensas de Rendimento Blindadas** - Ganhe tokens NAM simplesmente ao blindar transações.
- **Taxas Baixas** - Privacidade forte sem sacrificar a usabilidade.

---

## Limitações Importantes

Mesmo a privacidade on-chain mais forte pode ser comprometida pelo comportamento do utilizador ou por fatores off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**A Namada NÃO protege contra:**

- Conectar-se sem uma VPN ou Tor (o seu endereço IP fica exposto)
- Reutilizar endereços blindados repetidamente
- Realizar transações transparentes (não blindadas)
- Associar o seu endereço Namada às redes sociais ou à sua identidade no mundo real
- Usar exchanges centralizadas com KYC para depósitos ou levantamentos

</div>

---

## Melhores Práticas para Máxima Privacidade

### 1. Princípios Gerais
- Use por padrão **transações blindadas** em todas as ações.
- Nunca reutilize endereços blindados para finalidades diferentes.
- Evite misturar atividade blindada e transparente na mesma sessão.

### 2. Bridging de Ativos
- Use um endereço transparente dedicado **apenas** para bridges de entrada.
- Proteja imediatamente os ativos após fazer o bridging para dentro.
- Minimize o bridging para fora da Namada sempre que possível.

### 3. MASP (Multi-Asset Shielded Pool)
- Mantenha todos os ativos dentro da MASP por padrão.
- Trate o seu saldo na MASP como a sua carteira privada principal.

### 4. View Keys
- Partilhe viewing keys **apenas** com partes em quem confia plenamente.
- Nunca publique nem divulgue viewing keys publicamente.

### 5. Higiene de Transações
- Randomize o timing e os montantes entre transações.
- Agrupe várias transações quando possível.
- Evite enviar montantes redondos ou altamente identificáveis.

### 6. Segurança Operacional
- Use sempre uma **VPN** (idealmente Tor) ao interagir com carteiras ou dApps.
- Nunca partilhe capturas de ecrã que contenham endereços ou saldos.
- Use carteiras separadas para diferentes atividades (trading, doações, uso pessoal).

---

## Checklist de Privacidade Estendida

1. **Proteja sempre primeiro** - mova os ativos para a MASP antes de transacionar.
2. **Rode endereços blindados** regularmente para diferentes casos de uso.
3. **Levante diretamente para endereços blindados** a partir de exchanges quando possível.
4. **Varie o timing das transações** para quebrar padrões identificáveis.
5. **Use hardware wallets** para saldos maiores.
6. **Mantenha o software atualizado** - execute sempre o cliente Namada mais recente.
7. **Proteja o seu dispositivo** com encriptação forte e gestores de palavras-passe.
8. **Seja extremamente cauteloso** com fugas de metadados em conversas ou registos públicos.

---

## Contribuir

Tem práticas adicionais ou feedback?  
[Participe da discussão no Discord](https://discord.gg/srC76aE6)

---
*Última atualização: março de 2026*
