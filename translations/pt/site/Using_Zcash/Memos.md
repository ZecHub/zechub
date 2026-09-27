<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Memorandos

#### Enviando memorandos criptografados

Ao enviar uma transação Z2Z (shielded-to-shielded), você pode incluir um memorando (mensagem) na transação. Esse memorando pode ser usado para várias finalidades diferentes.

#### Assinando transações

Os memorandos são usados principalmente para assinar pagamentos. Como as transações shielded criptografam seus dados, você não consegue ver quem lhe enviou ZEC e para que aquele ZEC poderia ter sido destinado. Os usuários podem usar o campo de memorando para assinar com seu nome ou pseudônimo e informar à contraparte de quem veio a transação. Também podem descrever para que a transação foi feita.

#### Enviando uma mensagem

Outro caso de uso do memorando criptografado é enviar uma mensagem para alguém com um z-addr. Essas mensagens podem ser sobre qualquer coisa, seja um [lembrete para um amigo](https://twitter.com/iansagstette/status/1542142468505870336), ou uma [mensagem sensível que precisa permanecer o mais privada possível](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Bilhetes de amor na blockchain

Houve uma pessoa que enviou ao seu parceiro um bilhete de amor em um dos primeiros blocos da blockchain do Zcash. Alguém descobriu que seu parceiro havia lhe enviado um arquivo por meio de um memorando do Zcash. Esse arquivo era um ingresso para um evento especial, no exterior, do qual ela e seu amado distante vinham falando em participar juntos. O memorando era um bilhete de amor.

#### Avançado

> **Histórico. Esta demonstração não funciona mais como está escrita.**
>
> A demonstração abaixo usa o zcashd, e o seu [script de recepção](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lê os memorandos por meio do `zcash-cli`. O zcashd atingiu a sua interrupção automática de fim de suporte em 18 de julho de 2026, portanto esse script não consegue se conectar a um nó em funcionamento, e ele não foi portado.
>
> Ler memorandos protegidos pela linha de comando continua funcionando com o Zallet: `zallet rpc z_listunspent` retorna cada nota protegida recebida com o mesmo campo `memoStr` que o script lê. Consulte o [guia de referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide) para o comando e o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para tirar um nó do zcashd. O Zallet ainda está em beta.
>
> Esta seção é mantida como registro histórico da demonstração do Magic-Wormhole.

Veja como usar os Memorandos Shielded do Zcash com a CLI do Magic-Wormhole e o zcashd para enviar arquivos com segurança de um computador para outro!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMONSTRAÇÃO: Transferência de Arquivo Criptografada com Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### Recursos

[O campo de memorando criptografado](https://electriccoin.co/blog/encrypted-memo-field/)
