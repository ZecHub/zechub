<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* O Pepper Sync é o mecanismo de sincronização introduzido no Zingo! 2.0, a carteira Zcash de código aberto criada pela Zingo Labs.
* Usa sincronização não linear em vez de analisar a chain em grandes blocos sequenciais, por isso seu saldo e suas transações aparecem muito mais cedo.
* O progresso é salvo continuamente. Se a conexão cair ou o app fechar, a sincronização continua de onde parou em vez de recomeçar.
* Você pode gastar antes de a sincronização terminar.
* As transações blindadas permanecem privadas durante todo o processo.

## Explicação principal

O Zingo 2.0 é a versão mais recente da carteira Zingo!, uma carteira leve e de código aberto criada para a comunidade Zcash. A grande estrela desta versão é o Pepper Sync, uma grande atualização que repensa por completo como as carteiras se conectam à blockchain.

No passado, a sincronização podia parecer dolorosamente lenta, propensa a erros e pesada em recursos, às vezes obrigando os usuários a recomeçar do zero. O Pepper Sync muda tudo isso. Torna a sincronização mais rápida, mais fluida, mais confiável e menos exigente para seu dispositivo, preservando totalmente a privacidade das transações blindadas.

Seja você um usuário totalmente novo testando o Zcash pela primeira vez ou um membro de longa data da comunidade gerenciando várias carteiras blindadas, o Pepper Sync torna a experiência muito mais prática e agradável.

### Recursos principais do Pepper Sync

O Pepper Sync introduz várias melhorias:

- Sincronização muito mais rápida - Sua carteira fica pronta em minutos, não em horas.
- Atualizações inteligentes - Os dados são processados em blocos menores, evitando novas análises completas.
- Resistente a interrupções - Se sua conexão cair, a sincronização continua de onde parou.
- Leve e eficiente - Otimizado para celulares, laptops e outros dispositivos menos potentes.
- Feedback mais claro - Atualizações de progresso em tempo real reduzem a confusão.
- Preservação da privacidade - As transações blindadas permanecem privadas durante todo o processo.

### O que melhorou em relação a antes

As versões mais antigas do Zingo frequentemente frustravam os usuários com longos tempos de sincronização, tratamento de erros pouco claro e alto uso de recursos. O Pepper Sync resolve esses problemas comuns:

| Feature            | Versões anteriores do Zingo            | Zingo 2.0 com Pepper Sync                   |
| ----------------- | -------------------------------------- | ------------------------------------------- |
| Sync Speed         | Mais lenta, especialmente na configuração inicial | Sincronização inicial e contínua muito mais rápida |
| Error Handling     | Travamentos ocasionais e falhas pouco claras | Maior estabilidade com recuperação automática |
| User Experience    | A sincronização parecia "opaca" para os novos usuários | Transparente, com status e atualizações mais claros |
| Device Performance | Alto uso de CPU/memória                 | Otimizado para uso fluido de recursos       |

Em resumo: a sincronização agora é mais rápida, mais confiável e mais fácil de entender.

## Visual / analogia

Pense em uma sincronização de carteira antiga como ler um livro muito longo desde a primeira página, em voz alta, antes de poder dizer qualquer coisa sobre ele. Se parar no meio, você começa novamente na página um. O Pepper Sync lê o mesmo livro, mas guarda um marcador, lê primeiro os capítulos que interessam a você e permite que você fale sobre a história antes de terminar a última página.

O marcador é a parte importante. Todas as versões anteriores tratavam uma sincronização interrompida como trabalho perdido; o Pepper Sync a trata como uma pausa.

### Guias visuais

- Fluxo detalhado - Mostra o processo completo. ![Fluxo detalhado](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Fluxo simplificado - Visão rápida para usuários do dia a dia. ![Fluxo simplificado](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Análise aprofundada

### Como o Pepper Sync funciona (visão simples)

Em vez de reanalisar a blockchain em blocos enormes e pesados, o Pepper Sync funciona em etapas pequenas e gerenciáveis — sempre salvando seu progresso à medida que avança.

1. Conectar - A carteira verifica sua conexão com a rede.
2. Buscar blocos - Os dados são baixados de forma incremental.
3. Verificar - As transações são validadas.
4. Processar notes blindadas - A privacidade é preservada o tempo todo.
5. Atualizar saldos - A carteira é atualizada com segurança.
6. Salvar progresso - Para e continua sem problemas.
7. Concluir - A carteira está pronta para realizar transações.

## Implicações práticas

### Quem se beneficia do Pepper Sync?

- Novos usuários - Podem configurar carteiras rapidamente sem se desanimar com atrasos.
- Usuários diários - A sincronização confiável torna os pagamentos blindados práticos para o uso diário.
- Desenvolvedores e testadores - Tempos de sincronização mais curtos significam ciclos de teste mais rápidos.
- Dispositivos móveis e leves - O Zingo agora funciona de forma eficiente mesmo em hardware com recursos limitados.

### Por que isso importa para o Zcash

O Zcash é construído em torno de transações blindadas, uma das ferramentas de privacidade mais poderosas em criptomoedas. Mas a privacidade só é útil se for acessível.

O Pepper Sync ajuda ao:

- Reduzir as barreiras de entrada - Novos usuários podem começar rapidamente.
- Apoiar a usabilidade no dia a dia - Os endereços blindados se tornam mais fáceis de confiar.
- Incentivar o crescimento do ecossistema - Uma melhor experiência de carteira impulsiona mais adoção, apps e serviços.

Ao melhorar a experiência da carteira, o Pepper Sync fortalece todo o ecossistema Zcash.

### Como começar: onboarding com o Zingo 2.0

1. Baixe a carteira - Obtenha a versão correta na [página de releases do GitHub do Zingo](https://github.com/zingolabs/zingolib)
2. Configure sua carteira - Crie uma nova ou restaure-a a partir de uma frase semente existente. [Zingo 2.0 com Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Deixe o Pepper Sync funcionar - Observe os indicadores de progresso enquanto sua carteira é atualizada. [Execução do Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Comece a usar o Zcash - Envie e receba ZEC blindado assim que a sincronização terminar.
5. Fique tranquilo com as interrupções - Se o app fechar ou a conexão cair, o Pepper Sync continua automaticamente.

## Erros comuns

**Tratar o Pepper Sync como se fosse uma carteira autônoma**. O Pepper Sync é o mecanismo de sincronização dentro da carteira Zingo!, não um aplicativo separado. Você instala o Zingo; o Pepper Sync é o que funciona por trás dele.

**Presumir que uma sincronização mais rápida significa privacidade mais fraca**. A velocidade vem de como os dados dos blocos são buscados, ordenados e armazenados em cache, não de revelar mais informações. As transações blindadas permanecem privadas durante todo o processo.

**Presumir que você deve estar totalmente sincronizado antes de poder gastar**. Gastar antes de a sincronização terminar é um dos principais recursos do Pepper Sync, então você não precisa esperar a carteira alcançar a ponta da chain.

## FAQ - Perguntas comuns

**P: Preciso reanalisar sempre que abro a carteira?**

R: Não. O Pepper Sync salva o progresso, então você atualiza somente a partir do último ponto.

**P: O que acontece se minha internet desconectar?**

R: A sincronização pausa e continua mais tarde sem recomeçar.

**P: Minha privacidade fica segura durante a sincronização?**

R: Sim. As transações blindadas permanecem totalmente privadas.

**P: Quanto tempo leva a primeira sincronização?**

R: Normalmente minutos em vez de horas, dependendo do seu dispositivo e da sua internet.

**P: Posso usar a carteira antes de a sincronização terminar?**

R: Sim. O Pepper Sync permite gastar antes de a sincronização terminar, então você não precisa esperar a carteira alcançar a ponta da chain.

## Conclusão

Com o Pepper Sync do Zingo 2.0, a sincronização deixou de ser o maior problema das carteiras blindadas. Agora ela é rápida, estável e fácil de usar, reduzindo a barreira para novos usuários e tornando o uso diário muito mais prático.

Para os usuários, isso significa menos espera e mais privacidade. Para os desenvolvedores, significa uma base mais sólida sobre a qual construir. Para o ecossistema Zcash, é mais um passo para tornar as transações blindadas acessíveis a todos.

O Zingo 2.0 com Pepper Sync não é apenas uma atualização; é um salto à frente para criptomoedas privadas e fáceis de usar.

## Páginas relacionadas

- [Sincronização de carteiras Zcash](/zcash-tech/zcash-wallet-syncing) — como funciona a sincronização de carteiras em todo o ecossistema Zcash.
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — a infraestrutura com a qual uma carteira leve como o Zingo se sincroniza.
- [Zaino](/zcash-tech/zaino) — o indexador desenvolvido pela equipe do Zingo.
- [Carteiras](/wallets) — o diretório completo de carteiras Zcash e seus recursos.

## Aprendizado adicional

- [Repositório do Zingo! no GitHub](https://github.com/zingolabs/zingolib)
- [Fórum da comunidade Zcash](https://forum.zcashcommunity.com/)
- Anúncios oficiais - [Twitter do Zingo Labs](https://twitter.com/ZingoLabs)

___
___
