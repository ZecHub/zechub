<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync é o mecanismo de sincronização introduzido no Zingo! 2.0, a carteira Zcash de código aberto criada pela Zingo Labs.
* Ele usa sincronização não linear em vez de varrer a chain em grandes blocos sequenciais, então seu saldo e suas transações aparecem muito mais cedo.
* O progresso é salvo continuamente. Se a conexão cair ou o app fechar, a sincronização continua de onde parou em vez de recomeçar.
* Você pode gastar antes de a sincronização terminar.
* As transações blindadas permanecem privadas durante todo o processo.

## Explicação principal

O Zingo 2.0 é o lançamento da carteira Zingo!, uma carteira leve e de código aberto criada para a comunidade Zcash, que introduziu o Pepper Sync, uma grande atualização que repensa completamente a forma como as carteiras se conectam com a blockchain. As versões posteriores mantêm o Pepper Sync: a versão móvel atual, [Zingo 3.0](https://github.com/zingolabs/zingo-mobile/releases/tag/zingo-3.0.0-324) (31 de out de 2026), adiciona suporte a NU7 e conversões integradas.

No passado, a sincronização podia parecer terrivelmente lenta, sujeita a erros e pesada em recursos, às vezes obrigando os usuários a recomeçar do zero. O Pepper Sync muda tudo isso. Ele torna a sincronização mais rápida, mais fluida, mais confiável e menos exigente para o seu dispositivo, preservando totalmente a privacidade das transações blindadas.

Seja você um usuário novo testando o Zcash pela primeira vez, ou um membro antigo da comunidade gerenciando várias carteiras blindadas, o Pepper Sync torna a experiência muito mais prática e agradável.

### Principais recursos do Pepper Sync

O Pepper Sync traz várias melhorias:

- Sincronização muito mais rápida - Sua carteira fica pronta em minutos, não em horas.
- Atualizações inteligentes - Os dados são processados em partes menores, evitando novas varreduras completas.
- Resistente a interrupções - Se sua conexão cair, a sincronização continua de onde parou.
- Leve e eficiente - Otimizado para celulares, laptops e outros dispositivos de menor potência.
- Feedback mais claro - Atualizações de progresso em tempo real reduzem a confusão.
- Preserva a privacidade - As transações blindadas permanecem privadas durante todo o processo.

### O que melhorou em relação a antes

Versões mais antigas do Zingo frequentemente frustravam os usuários com longos tempos de sincronização, tratamento de erros pouco claro e uso pesado de recursos. O Pepper Sync corrige esses problemas comuns:

| Recurso            | Versões anteriores do Zingo            | Zingo 2.0 com Pepper Sync                    |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Velocidade de sincronização | Mais lenta, especialmente na primeira configuração | Sincronização inicial e contínua muito mais rápida |
| Tratamento de erros | Travamentos ocasionais e falhas pouco claras | Estabilidade aprimorada com recuperação automática |
| Experiência do usuário | A sincronização parecia "opaca" para iniciantes | Transparente, com status e atualizações mais claros |
| Desempenho do dispositivo | Alto uso de CPU/memória        | Otimizado para um uso fluido de recursos     |

Resumindo: a sincronização agora é mais rápida, mais confiável e mais fácil de entender.

## Visual / analogia

Pense na sincronização de uma carteira antiga como ler um livro muito longo desde a primeira página, em voz alta, antes de poder dizer qualquer coisa sobre ele. Se você parar no meio, recomeça da primeira página. O Pepper Sync lê o mesmo livro, mas usa um marcador de página, lê primeiro os capítulos que importam para você e deixa você falar sobre a história antes de terminar a última página.

O marcador é a parte importante. Todas as versões anteriores tratavam uma sincronização interrompida como trabalho desperdiçado; o Pepper Sync a trata como uma pausa.

### Guias visuais

- Fluxo detalhado - Mostra o processo completo. ![Detailed Flow](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Fluxo simplificado - Visão rápida para usuários do dia a dia. ![Simplified Flow](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Aprofundamento

### Como o Pepper Sync funciona (visão simples)

Em vez de varrer novamente a blockchain em partes enormes e desajeitadas, o Pepper Sync trabalha em passos pequenos e gerenciáveis, sempre salvando onde você parou ao longo do caminho.

1. Conectar - A carteira se conecta com a rede.
2. Buscar blocos - Os dados são baixados de forma incremental.
3. Verificar - As transações são validadas.
4. Tratar notes blindadas - A privacidade é preservada o tempo todo.
5. Atualizar saldos - A carteira é atualizada com segurança.
6. Salvar progresso - Para e retoma sem interrupções.
7. Concluir - A carteira está pronta para realizar transações.

## Implicações práticas

### Quem se beneficia do Pepper Sync?

- Novos usuários - Podem configurar carteiras rapidamente sem desanimar com atrasos.
- Usuários do dia a dia - A sincronização confiável torna os pagamentos blindados práticos para o uso diário.
- Desenvolvedores e testadores - Tempos de sincronização menores significam ciclos de teste mais rápidos.
- Dispositivos móveis e leves - O Zingo agora funciona de forma eficiente mesmo em hardware com recursos limitados.

### Por que isso importa para o Zcash

O Zcash é construído em torno das transações blindadas, uma das ferramentas de privacidade mais poderosas do mundo das criptomoedas. Mas a privacidade só é útil se for acessível.

O Pepper Sync ajuda:

- Reduzindo as barreiras de entrada - Novos usuários podem começar rapidamente.
- Apoiando a usabilidade no dia a dia - Os endereços blindados se tornam mais fáceis de confiar.
- Incentivando o crescimento do ecossistema - Uma experiência de carteira melhor impulsiona mais adoção, apps e serviços.

Ao melhorar a experiência da carteira, o Pepper Sync fortalece todo o ecossistema Zcash.

### Primeiros passos: começando com o Zingo 2.0

1. Baixe a carteira - Obtenha a versão certa em [zingolabs.org](https://zingolabs.org/) ou nas GitHub páginas de versões para [celular](https://github.com/zingolabs/zingo-mobile/releases) e [desktop](https://github.com/zingolabs/zingo-pc/releases)
2. Configure sua carteira - Crie uma nova ou restaure a partir de uma frase semente existente. [Zingo 2.0 com Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Deixe o Pepper Sync rodar - Acompanhe os indicadores de progresso enquanto sua carteira é atualizada. [Execução do Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Comece a usar Zcash - Envie e receba ZEC blindados assim que a sincronização terminar.
5. Não se preocupe com interrupções - Se o app fechar ou a conexão cair, o Pepper Sync será retomado automaticamente.

## Erros comuns

**Tratar o Pepper Sync como uma carteira por si só**. O Pepper Sync é o mecanismo de sincronização dentro da carteira Zingo!, não um aplicativo separado. Você instala o Zingo; o Pepper Sync é o que roda por baixo dele.

**Supor que uma sincronização mais rápida significa menos privacidade**. A velocidade vem da forma como os dados dos blocos são buscados, ordenados e armazenados em cache, não da revelação de mais informações. As transações blindadas permanecem privadas o tempo todo.

**Supor que você precisa estar totalmente sincronizado antes de poder gastar**. Gastar antes de a sincronização terminar é um dos principais recursos do Pepper Sync, então você não precisa esperar a carteira alcançar a ponta da chain.

## FAQ - Perguntas comuns

**P: Preciso fazer uma nova varredura toda vez que abro a carteira?**

R: Não. O Pepper Sync salva o progresso, então você só atualiza a partir do último ponto.

**P: O que acontece se minha internet cair?**

R: A sincronização pausa e continua depois, sem recomeçar.

**P: Minha privacidade está segura durante a sincronização?**

R: Sim. As transações blindadas permanecem totalmente privadas.

**P: Quanto tempo leva a primeira sincronização?**

R: Normalmente minutos em vez de horas, dependendo do seu dispositivo e da sua internet.

**P: Posso usar a carteira antes de a sincronização terminar?**

R: Sim. O Pepper Sync permite gastar antes de a sincronização ser concluída, então você não precisa esperar a carteira alcançar a ponta da chain.

## Conclusão

Com o Pepper Sync do Zingo 2.0, a sincronização deixou de ser o maior ponto fraco das carteiras blindadas. Agora ela é rápida, estável e fácil de usar, reduzindo a barreira para iniciantes e tornando o uso diário muito mais prático.

Para os usuários, isso significa menos espera e mais privacidade. Para os desenvolvedores, significa uma base mais sólida para construir. Para o ecossistema Zcash, é mais um passo para tornar as transações blindadas acessíveis a todos.

O Zingo 2.0 com Pepper Sync não é apenas uma atualização; é um salto adiante para criptomoedas privadas e utilizáveis.

## Páginas relacionadas

- [Sincronização de carteiras Zcash](/zcash-tech/zcash-wallet-syncing) — como funciona a sincronização de carteiras no ecossistema Zcash.
- [Nós de carteira leve](/zcash-tech/lightwallet-nodes) — a infraestrutura com a qual uma carteira leve como o Zingo se sincroniza.
- [Zaino](/zcash-tech/zaino) — o indexador desenvolvido pela equipe Zingo.
- [Carteiras](/wallets) — o diretório completo de carteiras Zcash e seus recursos.

## Para saber mais

- [Repositório Zingo! GitHub](https://github.com/zingolabs/zingolib)
- [Fórum da comunidade Zcash](https://forum.zcashcommunity.com/)
- Anúncios oficiais - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
