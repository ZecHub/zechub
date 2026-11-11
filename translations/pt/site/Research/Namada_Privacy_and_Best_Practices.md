---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

![Logotipo da Namada](/content-images/nam-078c7b6883.webp)

# Melhores práticas de privacidade da Namada

> Orientações práticas e acionáveis para alcançar o máximo de privacidade na Namada — e entender exatamente onde suas proteções terminam.

**A privacidade é um direito fundamental.** A Namada foi criada especificamente para protegê-la por meio de criptografia avançada de conhecimento zero. Este guia reúne as práticas mais eficazes usadas por usuários e desenvolvedores preocupados com a privacidade.

---

## Como a Namada protege sua privacidade

A Namada é uma blockchain soberana, focada em privacidade, que oculta endereços de carteira, valores de transações e saldos usando **provas de conhecimento zero (zk-SNARKs)**.

### Recursos principais de privacidade

- **Transações blindadas** - Ocultam completamente remetente, destinatário e valores.
- **Multi-Asset Shielded Pool (MASP)** - Transferências privadas, conversões e uso de pontes entre quaisquer ativos.
- **Privacidade cross-chain** - Uso de pontes blindadas via IBC (suporte para Ethereum e Solana em breve).
- **Recompensas de rendimento blindadas** - Ganhe tokens NAM simplesmente ao blindar transações.
- **Taxas baixas** - Privacidade forte sem sacrificar a usabilidade.

---

## Limitações importantes

Mesmo a privacidade on-chain mais forte pode ser comprometida pelo comportamento do usuário ou por fatores off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**A Namada NÃO protege contra:**

- Conectar-se sem uma VPN ou Tor (seu endereço IP fica exposto)
- Reutilizar endereços blindados repetidamente
- Realizar transações transparentes (não blindadas)
- Associar seu endereço da Namada às redes sociais ou à sua identidade no mundo real
- Usar corretoras centralizadas com KYC para depósitos ou saques

</div>

---

## Melhores práticas para máxima privacidade

### 1. Princípios gerais
- Use por padrão **transações blindadas** em todas as ações.
- Nunca reutilize endereços blindados para finalidades diferentes.
- Evite misturar atividade blindada e transparente na mesma sessão.

### 2. Uso de pontes para ativos
- Use um endereço transparente dedicado **apenas** para pontes de entrada.
- Blinde imediatamente os ativos após transferi-los para dentro por uma ponte.
- Minimize o uso de pontes para retirar ativos da Namada sempre que possível.

### 3. MASP (Multi-Asset Shielded Pool)
- Mantenha todos os ativos dentro da MASP por padrão.
- Trate seu saldo na MASP como sua carteira privada principal.

### 4. Chaves de visualização
- Compartilhe chaves de visualização **apenas** com pessoas em quem você confia plenamente.
- Nunca publique nem divulgue chaves de visualização publicamente.

### 5. Higiene de transações
- Varie o timing e os valores entre transações.
- Agrupe várias transações quando possível.
- Evite enviar valores redondos ou altamente identificáveis.

### 6. Segurança operacional
- Use sempre uma **VPN** (idealmente Tor) ao interagir com carteiras ou dApps.
- Nunca compartilhe capturas de tela que contenham endereços ou saldos.
- Use carteiras separadas para diferentes atividades (trading, doações, uso pessoal).

---

## Checklist estendido de privacidade

1. **Blinde sempre primeiro** - mova os ativos para a MASP antes de realizar transações.
2. **Alterne endereços blindados** regularmente para diferentes casos de uso.
3. **Retire diretamente para endereços blindados** de corretoras quando possível.
4. **Varie o timing das transações** para quebrar padrões identificáveis.
5. **Use carteiras de hardware** para saldos maiores.
6. **Mantenha o software atualizado** - execute sempre o cliente Namada mais recente.
7. **Proteja seu dispositivo** com criptografia forte e gerenciadores de senhas.
8. **Seja extremamente cauteloso** com vazamentos de metadados em conversas ou registros públicos.

---

## Contribuir

Tem práticas adicionais ou feedback?  
[Participe da discussão no Discord](https://discord.gg/srC76aE6)

---
*Última atualização: março de 2026*
