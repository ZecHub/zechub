---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync é o motor de sincronização introduzido no Zingo! 2.0, a wallet open-source de Zcash criada pela Zingo Labs.
* Utiliza sincronização não linear em vez de analisar a cadeia em grandes blocos sequenciais, por isso o seu saldo e as suas transações aparecem muito mais cedo.
* O progresso é guardado continuamente. Se a ligação cair ou a aplicação fechar, a sincronização retoma de onde parou em vez de recomeçar.
* Pode gastar antes de a sincronização estar concluída.
* As transações shielded mantêm-se privadas durante todo o processo.

## Explicação Principal

Zingo 2.0 é a versão mais recente da wallet Zingo!, uma wallet leve e open-source criada para a comunidade Zcash. A grande estrela desta versão é o Pepper Sync, uma grande atualização que repensa por completo a forma como as wallets se ligam à blockchain.

No passado, a sincronização podia parecer dolorosamente lenta, propensa a erros e pesada em recursos, chegando por vezes a obrigar os utilizadores a recomeçar do zero. O Pepper Sync muda tudo isso. Torna a sincronização mais rápida, mais fluida, mais fiável e menos exigente para o seu dispositivo, preservando totalmente a privacidade das transações shielded.

Quer seja um utilizador totalmente novo a experimentar Zcash pela primeira vez, quer seja um membro antigo da comunidade a gerir várias wallets shielded, o Pepper Sync torna a experiência muito mais prática e agradável.

### Funcionalidades principais do Pepper Sync

O Pepper Sync introduz várias melhorias:

- Sincronização Muito Mais Rápida - A sua wallet fica pronta em minutos, não em horas.
- Atualizações Inteligentes - Os dados são processados em blocos mais pequenos, evitando reanálises completas.
- Resistente a Interrupções - Se a sua ligação cair, a sincronização retoma onde ficou.
- Leve e Eficiente - Otimizado para telemóveis, portáteis e outros dispositivos com menos potência.
- Feedback Mais Claro - Atualizações de progresso em tempo real reduzem a confusão.
- Preservação da Privacidade - As transações shielded mantêm-se privadas durante todo o processo.

### O que melhorou em relação ao passado

As versões mais antigas do Zingo frustravam frequentemente os utilizadores com longos tempos de sincronização, tratamento de erros pouco claro e elevado consumo de recursos. O Pepper Sync resolve estes problemas comuns:

| Funcionalidade    | Versões Anteriores do Zingo            | Zingo 2.0 com Pepper Sync                   |
| ----------------- | -------------------------------------- | ------------------------------------------- |
| Velocidade de Sync| Mais lenta, especialmente na configuração inicial | Sincronização inicial e contínua muito mais rápida |
| Tratamento de Erros | Bloqueios ocasionais e falhas pouco claras | Maior estabilidade com recuperação automática |
| Experiência do Utilizador | A sincronização parecia "opaca" para os recém-chegados | Transparente, com estado e atualizações mais claros |
| Desempenho do Dispositivo | Uso elevado de CPU/memória      | Otimizado para utilização suave de recursos |

Em resumo: a sincronização é agora mais rápida, mais fiável e mais fácil de compreender.

## Visual / Analogia

Pense numa sincronização de wallet antiga como ler um livro muito comprido desde a primeira página, em voz alta, antes de poder dizer seja o que for sobre ele. Se parar a meio, começa novamente na página um. O Pepper Sync lê o mesmo livro, mas guarda um marcador, lê primeiro os capítulos que lhe interessam e deixa-o falar sobre a história antes de terminar a última página.

O marcador é a parte importante. Todas as versões anteriores tratavam uma sincronização interrompida como trabalho perdido; o Pepper Sync trata-a como uma pausa.

### Guias visuais

- Fluxo Detalhado - Mostra o processo completo. ![Fluxo Detalhado](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Fluxo Simplificado - Vista rápida para utilizadores do dia a dia. ![Fluxo Simplificado](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Análise Aprofundada

### Como funciona o Pepper Sync (visão simples)

Em vez de reanalisar a blockchain em blocos enormes e pesados, o Pepper Sync funciona em passos pequenos e geríveis — guardando sempre o seu lugar à medida que avança.

1. Ligar - A wallet verifica a ligação com a rede.
2. Obter Blocos - Os dados são descarregados incrementalmente.
3. Verificar - As transações são validadas.
4. Tratar Notas Shielded - A privacidade é preservada em todos os momentos.
5. Atualizar Saldos - A wallet atualiza-se de forma segura.
6. Guardar Progresso - Para e retoma sem problemas.
7. Concluir - A wallet está pronta para transacionar.

## Implicações Práticas

### Quem beneficia do Pepper Sync?

- Novos Utilizadores - Podem configurar wallets rapidamente sem desanimar com atrasos.
- Utilizadores Diários - A sincronização fiável torna os pagamentos shielded práticos para uso diário.
- Developers e Testers - Tempos de sincronização mais curtos significam ciclos de teste mais rápidos.
- Dispositivos Móveis e Leves - O Zingo funciona agora de forma eficiente mesmo em hardware com recursos limitados.

### Porque é importante para o Zcash

Zcash foi construído em torno de transações shielded, uma das ferramentas de privacidade mais poderosas em criptomoedas. Mas a privacidade só é útil se for acessível.

O Pepper Sync ajuda ao:

- Reduzir as barreiras à entrada - Os novos utilizadores podem começar rapidamente.
- Apoiar a usabilidade no dia a dia - Os endereços shielded tornam-se mais fáceis de confiar.
- Incentivar o crescimento do ecossistema - Uma melhor experiência de wallet impulsiona mais adoção, apps e serviços.

Ao melhorar a experiência da wallet, o Pepper Sync fortalece todo o ecossistema Zcash.

### Como começar: onboarding com Zingo 2.0

1. Descarregar a Wallet - Obtenha a versão correta na [página de releases do GitHub do Zingo](https://github.com/zingolabs/zingolib)
2. Configurar a Sua Wallet - Crie uma nova ou restaure a partir de uma seed phrase existente. [Zingo 2.0 com Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Deixar o Pepper Sync Correr - Observe os indicadores de progresso enquanto a sua wallet é atualizada. [Execução do Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Começar a Usar Zcash - Envie e receba ZEC shielded assim que a sincronização estiver concluída.
5. Ficar Tranquilo com as Interrupções - Se a aplicação fechar ou a ligação cair, o Pepper Sync retoma automaticamente.

## Erros Comuns

**Tratar o Pepper Sync como se fosse uma wallet autónoma**. O Pepper Sync é o motor de sincronização dentro da wallet Zingo!, não uma aplicação separada. Instala o Zingo; o Pepper Sync é o que funciona por baixo.

**Assumir que uma sincronização mais rápida significa privacidade mais fraca**. A velocidade vem da forma como os dados dos blocos são obtidos, ordenados e colocados em cache, não de revelar mais informação. As transações shielded mantêm-se privadas durante todo o processo.

**Assumir que tem de estar totalmente sincronizado antes de poder gastar**. Gastar antes de a sincronização estar concluída é uma das funcionalidades de destaque do Pepper Sync, por isso não tem de esperar que a wallet alcance a ponta da cadeia.

## FAQ - Perguntas comuns

**P: Tenho de reanalisar sempre que abro a wallet?**

R: Não. O Pepper Sync guarda o progresso, por isso só atualiza a partir do último ponto.

**P: O que acontece se a minha internet se desligar?**

R: A sincronização pausa e continua mais tarde sem recomeçar.

**P: A minha privacidade está segura durante a sincronização?**

R: Sim. As transações shielded mantêm-se totalmente privadas.

**P: Quanto tempo demora a primeira sincronização?**

R: Normalmente minutos em vez de horas, dependendo do seu dispositivo e da sua internet.

**P: Posso usar a wallet antes de a sincronização terminar?**

R: Sim. O Pepper Sync suporta gastos antes de a sincronização estar concluída, por isso não precisa de esperar que a wallet alcance a ponta da cadeia.

## Conclusão

Com o Pepper Sync do Zingo 2.0, a sincronização já não é o maior ponto de dor das wallets shielded. Agora é rápida, estável e fácil de usar, reduzindo a barreira para os recém-chegados e tornando o uso diário muito mais prático.

Para os utilizadores, isso significa menos espera e mais privacidade. Para os developers, significa uma base mais sólida sobre a qual construir. Para o ecossistema Zcash, é mais um passo em direção a tornar as transações shielded acessíveis a todos.

Zingo 2.0 com Pepper Sync não é apenas uma atualização; é um salto em frente para uma cripto privada e utilizável.

## Páginas Relacionadas

- [Sincronização de Wallets Zcash](/zcash-tech/zcash-wallet-syncing) — como funciona a sincronização de wallets em todo o ecossistema Zcash.
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — a infraestrutura com a qual uma wallet leve como o Zingo se sincroniza.
- [Zaino](/zcash-tech/zaino) — o indexador desenvolvido pela equipa do Zingo.
- [Wallets](/wallets) — o diretório completo de wallets Zcash e das suas funcionalidades.

## Aprendizagem Adicional

- [Repositório GitHub do Zingo!](https://github.com/zingolabs/zingolib)
- [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/)
- Anúncios Oficiais - [Twitter do Zingo Labs](https://twitter.com/ZingoLabs)

___
___
