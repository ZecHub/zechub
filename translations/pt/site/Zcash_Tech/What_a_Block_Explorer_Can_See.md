<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O que um explorador de blocos consegue ver na Zcash

## Resumo

- Na Bitcoin, um explorador de blocos mostra tudo: remetente, destinatário e montante.
- Na Zcash, isso só é verdade para a atividade transparente (endereço t).
- Um explorador consegue ver dinheiro a entrar e a sair do pool shielded, mas não o que acontece dentro dele.
- As transações totalmente shielded (z para z) não revelam remetente, destinatário nem montante.
- Qualquer valor público de "shield rate" é um mínimo, porque a atividade totalmente privada é invisível do exterior.

---

## Dois tipos de endereço

A Zcash tem dois tipos de endereços.

Um **endereço transparente** começa por `t` e funciona como um endereço Bitcoin. Os saldos e os pagamentos são públicos.

Um **endereço shielded** começa por `z` e é protegido por provas de conhecimento zero. A rede pode confirmar que um pagamento shielded é válido sem revelar o remetente, o destinatário ou o montante.

Como existem dois tipos, o valor pode mover-se de quatro formas: transparente para transparente (t para t), transparente para shielded (t para z, chamado shielding), shielded para transparente (z para t, chamado deshielding) e shielded para shielded (z para z, totalmente privado).

## O que um explorador consegue ver

Um explorador público como o [Blockchair](https://blockchair.com/zcash) consegue ler claramente:

- Qualquer pagamento totalmente transparente (t para t), de uma ponta à outra.
- Dinheiro a entrar no pool shielded (o lado transparente e o montante).
- Dinheiro a sair do pool shielded (o lado transparente e o montante).
- O total de ZEC detido em cada pool shielded, que é público para que a rede possa provar que não foram criadas moedas do nada.

Em suma, os limites do pool shielded são visíveis. É possível observar o valor a entrar e a sair.

## O que um explorador não consegue ver

Um explorador público não consegue ler:

- Transações totalmente shielded (z para z). O remetente, o destinatário e o montante permanecem ocultos.
- O remetente ou o destinatário por detrás de qualquer pagamento shielded.
- O saldo de um endereço shielded individual.
- O que acontece aos fundos depois de entrarem no pool.

Se consultares os dados em bruto, os campos do remetente e do destinatário shielded aparecem vazios. O explorador não está a ocultar isto por opção. Esta informação nunca esteve na cadeia pública em formato legível. A informação está cifrada, e apenas alguém com a viewing key correta a pode ler.

## Porque é importante

**A tua privacidade vem da criptografia, não da confiança numa empresa.** Um fornecedor de dados não consegue ver o interior de uma transação shielded, mesmo que queira.

**Os números públicos de shield rate subestimam a privacidade.** Os investigadores só conseguem medir o que atravessa a fronteira pública, por isso a quantidade real de atividade privada é, no mínimo, a que eles reportam, e normalmente é maior.

**Um pool shielded maior protege toda a gente.** Quanto mais pessoas usarem endereços shielded, maior será o conjunto no qual qualquer pagamento privado individual se esconde. Usar um endereço shielded ajuda a proteger-te a ti e a todos os outros no pool.

## Põe isto em prática

- Usa uma wallet que, por predefinição, utilize endereços shielded, como a [Zashi](https://electriccoin.co/zashi/) ou a [Ywallet](https://ywallet.app/).
- Quando receberes ZEC num endereço transparente, move-o para um endereço shielded antes de o gastares.
- Paga para endereços shielded sempre que possível. Todos os pagamentos transparentes são totalmente públicos; um pagamento shielded não o é.

## Recursos

- [Zcash: recomendações de privacidade e segurança](https://z.cash/support/security/privacy-security-recommendations/)
- [Um ecossistema shielded (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Como funciona a tecnologia da Zcash](https://z.cash/technology/)
- [Explorador Zcash do Blockchair](https://blockchair.com/zcash)

## Páginas relacionadas

- [Noções básicas da Zcash](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Pools shielded](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Se quiseres acrescentar ou sugerir edições a esta página da wiki, vai ao [repositório GitHub da ZecHub](https://github.com/ZecHub/zechub) e envia um pull request.*
