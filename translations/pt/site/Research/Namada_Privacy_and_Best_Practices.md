---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Boas práticas de privacidade no Namada

> Orientações práticas e aplicáveis para alcançar o máximo de privacidade no Namada e entender exatamente onde suas proteções terminam.

**A privacidade é um direito fundamental.** O Namada foi criado especificamente para protegê-la por meio de criptografia avançada de conhecimento zero. Este guia reúne as práticas mais eficazes usadas por usuários e desenvolvedores preocupados com a privacidade.

---

## Como o Namada protege sua privacidade

O Namada é uma blockchain soberana e focada em privacidade, que oculta endereços de carteiras, valores de transações e saldos usando **provas de conhecimento zero (zk-SNARKs)**.

### Principais recursos de privacidade

- **Transações blindadas**: ocultam completamente o remetente, o destinatário e os valores.
- **Pool blindado multiativos (MASP)**: transferências privadas, conversões e pontes para qualquer ativo.
- **Privacidade cross-chain**: pontes blindadas via IBC (suporte a Ethereum e Solana em breve).
- **Recompensas de rendimento blindado**: ganhe tokens NAM simplesmente blindando transações.
- **Taxas baixas**: privacidade forte sem sacrificar a usabilidade.

---

## Limitações importantes

Mesmo a privacidade on-chain mais forte pode ser comprometida pelo comportamento do usuário ou por fatores off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**O Namada NÃO protege contra:**

- Conectar-se sem VPN ou Tor (seu endereço IP fica exposto)
- Reutilizar endereços blindados repetidamente
- Fazer transações transparentes (não blindadas)
- Vincular seu endereço Namada às redes sociais ou à sua identidade no mundo real
- Usar corretoras centralizadas com KYC para depósitos ou saques

</div>

---

## Boas práticas para o máximo de privacidade

### 1. Princípios gerais
- Use **transações blindadas** por padrão em todas as ações.
- Nunca reutilize endereços blindados para finalidades diferentes.
- Evite misturar atividade blindada e transparente na mesma sessão.

### 2. Pontes de ativos
- Use um endereço transparente dedicado **somente** para pontes de entrada.
- Blinde os ativos imediatamente após a entrada pela ponte.
- Minimize as saídas por ponte do Namada sempre que possível.

### 3. MASP (pool blindado multiativos)
- Mantenha todos os ativos dentro do MASP por padrão.
- Trate seu saldo no MASP como sua principal carteira privada.

### 4. Chaves de visualização
- Compartilhe chaves de visualização **somente** com pessoas em quem você confia totalmente.
- Nunca publique nem divulgue chaves de visualização publicamente.

### 5. Higiene das transações
- Varie aleatoriamente os horários e os valores entre as transações.
- Agrupe várias transações sempre que possível.
- Evite enviar valores redondos ou facilmente identificáveis.

### 6. Segurança operacional
- Sempre use uma **VPN** (de preferência Tor) ao interagir com carteiras ou dApps.
- Nunca compartilhe capturas de tela que mostrem endereços ou saldos.
- Use carteiras separadas para atividades diferentes (trading, doações, uso pessoal).

---

## Checklist de privacidade ampliado

1. **Sempre blinde primeiro**: mova os ativos para o MASP antes de fazer transações.
2. **Alterne endereços blindados** regularmente para diferentes casos de uso.
3. **Saque diretamente para endereços blindados** a partir das corretoras sempre que possível.
4. **Varie o horário das transações** para quebrar padrões identificáveis.
5. **Use carteiras de hardware** para valores maiores.
6. **Mantenha o software atualizado**: sempre use a versão mais recente do cliente Namada.
7. **Proteja seu dispositivo** com criptografia forte e gerenciadores de senhas.
8. **Tenha extremo cuidado** com vazamentos de metadados em chats ou logs públicos.

---

## Contribua

Tem outras boas práticas ou sugestões?  
[Participe da discussão no Discord](https://discord.gg/srC76aE6)

---
*Última atualização: mar 2026*
