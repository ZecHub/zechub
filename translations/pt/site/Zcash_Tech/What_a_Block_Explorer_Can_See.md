<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# O que um explorador de blocos consegue ver no Zcash

## Resumo

- No Bitcoin, um explorador de blocos mostra tudo: remetente, destinatário e valor.
- No Zcash, isso só é verdade para a atividade transparente (t-address).
- Um explorador consegue ver o dinheiro entrando e saindo da pool blindada, mas não o que acontece dentro dela.
- Transações totalmente blindadas (z para z) não revelam remetente, destinatário nem valor.
- Qualquer número público de "taxa de blindagem" é um piso, porque a atividade totalmente privada é invisível de fora.

---

## Dois tipos de endereço

O Zcash tem dois tipos de endereços.

Um **endereço transparente** começa com `t` e funciona como um endereço Bitcoin. Saldos e pagamentos são públicos.

Um **endereço blindado** começa com `z` e é protegido por provas de conhecimento zero. A rede consegue confirmar que um pagamento blindado é válido sem revelar o remetente, o destinatário ou o valor.

Como existem dois tipos, o valor pode se mover de quatro formas: de transparente para transparente (t para t), de transparente para blindado (t para z, chamado de blindagem), de blindado para transparente (z para t, chamado de desblindagem) e de blindado para blindado (z para z, totalmente privado).

## O que um explorador consegue ver

Um explorador público como o [ZecBlock](https://zecblock.com/) consegue ler claramente:

- Qualquer pagamento totalmente transparente (t para t), de ponta a ponta.
- Dinheiro entrando na pool blindada (o lado transparente e o valor).
- Dinheiro saindo da pool blindada (o lado transparente e o valor).
- O total de ZEC mantido em cada pool blindada, que é público para que a rede possa provar que nenhuma moeda foi criada do nada.

Em resumo, as bordas da pool blindada são visíveis. Você pode observar o valor entrando e saindo.

## O que um explorador não consegue ver

Um explorador público não consegue ler:

- Transações totalmente blindadas (z para z). O remetente, o destinatário e o valor permanecem ocultos.
- O remetente ou o destinatário por trás de qualquer pagamento blindado.
- O saldo de um endereço blindado individual.
- O que acontece com os fundos depois que eles estão dentro da pool.

Consulte os dados brutos e os campos de remetente e destinatário blindados voltam vazios. O explorador não está escondendo isso por escolha. Essas informações nunca estiveram na chain pública em forma legível. Elas estão protegidas por criptografia, e só alguém com a chave de visualização correta consegue lê-las.

## Por que isso importa

**Sua privacidade vem da criptografia, não da confiança em uma empresa.** Um provedor de dados não consegue olhar dentro de uma transação blindada, mesmo que queira.

**Os números públicos de taxa de blindagem subestimam a privacidade.** Os pesquisadores só conseguem medir o que atravessa a fronteira pública, então a quantidade real de atividade privada é pelo menos o que eles relatam, e geralmente mais.

**Uma pool blindada maior protege todo mundo.** Quanto mais pessoas usam endereços blindados, maior é a multidão em que cada pagamento privado se esconde. Usar um endereço blindado ajuda a proteger você e todos os outros na pool.

## Coloque em prática

- Use uma carteira que use endereços blindados por padrão, como a [ZODL](https://zodl.com) ou a [Zingo!](https://www.zingolabs.org/).
- Quando receber ZEC em um endereço transparente, mova-o para um endereço blindado antes de gastá-lo.
- Pague para endereços blindados sempre que puder. Todo pagamento transparente é totalmente público; um blindado não é.

## Recursos

- [Zcash: recomendações de privacidade e segurança](https://z.cash/support/security/privacy-security-recommendations/)
- [Um ecossistema blindado (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Como funciona a tecnologia Zcash](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Páginas relacionadas

- [Noções básicas do Zcash](/start-here/what-is-zec-and-zcash)
- [Carteiras](/using-zcash/wallets)
- [Pools blindadas](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Se você quiser adicionar ou sugerir edições a esta página da wiki, acesse o [repositório ZecHub GitHub](https://github.com/ZecHub/zechub) e envie um pull request.*
