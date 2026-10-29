<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O que um explorador de blocos consegue ver no Zcash

## Resumo

- No Bitcoin, um explorador de blocos mostra tudo: remetente, destinatário e valor.
- No Zcash, isso só é verdade para atividades transparentes (endereços t).
- Um explorador consegue ver dinheiro entrando e saindo do pool blindado, mas não o que acontece dentro dele.
- Transações totalmente blindadas (z para z) não revelam remetente, destinatário nem valor.
- Qualquer valor público de "shield rate" é um limite mínimo, porque atividades totalmente privadas são invisíveis de fora.

---

## Dois tipos de endereço

O Zcash tem dois tipos de endereços.

Um **endereço transparente** começa com `t` e funciona como um endereço de Bitcoin. Saldos e pagamentos são públicos.

Um **endereço blindado** começa com `z` e é protegido por provas de conhecimento zero. A rede pode confirmar que um pagamento blindado é válido sem revelar o remetente, o destinatário ou o valor.

Como existem dois tipos, o valor pode se mover de quatro formas: transparente para transparente (t para t), transparente para blindado (t para z, chamado shielding), blindado para transparente (z para t, chamado deshielding) e blindado para blindado (z para z, totalmente privado).

## O que um explorador consegue ver

Um explorador público como o [ZecBlock](https://zecblock.com/) consegue ler claramente:

- Qualquer pagamento totalmente transparente (t para t), de ponta a ponta.
- Dinheiro entrando no pool blindado (o lado transparente e o valor).
- Dinheiro saindo do pool blindado (o lado transparente e o valor).
- O total de ZEC mantido em cada pool blindado, que é público para que a rede possa provar que nenhuma moeda foi criada do nada.

Em resumo, as bordas do pool blindado são visíveis. Você pode observar o valor entrando e saindo.

## O que um explorador não consegue ver

Um explorador público não consegue ler:

- Transações totalmente blindadas (z para z). O remetente, o destinatário e o valor permanecem ocultos.
- O remetente ou o destinatário por trás de qualquer pagamento blindado.
- O saldo de um endereço blindado individual.
- O que acontece com os fundos depois que entram no pool.

Se você consultar os dados brutos, os campos de remetente e destinatário blindados retornarão vazios. O explorador não está ocultando isso por escolha. Essas informações nunca estiveram na chain pública em formato legível. As informações são criptografadas, e apenas alguém com a chave de visualização correta pode lê-las.

## Por que isso importa

**Sua privacidade vem da criptografia, não da confiança em uma empresa.** Um provedor de dados não consegue ver dentro de uma transação blindada, mesmo que queira.

**Os números públicos de shield rate subestimam a privacidade.** Pesquisadores só conseguem medir o que atravessa a fronteira pública, portanto a quantidade real de atividade privada é, no mínimo, a que eles relatam, e geralmente é maior.

**Um pool blindado maior protege todos.** Quanto mais pessoas usarem endereços blindados, maior será o grupo no qual qualquer pagamento privado individual se esconde. Usar um endereço blindado ajuda a proteger você e todos os outros no pool.

## Coloque em prática

- Use uma carteira que utilize endereços blindados por padrão, como a [ZODL](https://zodl.com) ou a [Zingo!](https://www.zingolabs.org/).
- Quando você receber ZEC em um endereço transparente, mova-o para um endereço blindado antes de gastá-lo.
- Pague para endereços blindados sempre que puder. Todo pagamento transparente é totalmente público; um pagamento blindado não é.

## Recursos

- [Zcash: recomendações de privacidade e segurança](https://z.cash/support/security/privacy-security-recommendations/)
- [Um ecossistema blindado (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Como a tecnologia do Zcash funciona](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Páginas relacionadas

- [Noções básicas do Zcash](/start-here/what-is-zec-and-zcash)
- [Carteiras](/using-zcash/wallets)
- [Pools blindados](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Se você quiser adicionar ou sugerir edições a esta página da wiki, acesse o [repositório GitHub da ZecHub](https://github.com/ZecHub/zechub) e envie um pull request.*
