# Do Zero ao Conhecimento Zero: Protocolo CryptoNote

**Série:** Do Zero ao Conhecimento Zero

Uma bem interessante hoje!  
O protocolo **CryptoNote** permite forte privacidade on-chain. Hoje vamos aprender todas as suas principais funcionalidades e como ele foi implementado por vários projetos de privacidade notáveis.

![Introdução ao CryptoNote](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Contexto

O whitepaper original do CryptoNote foi publicado sob o pseudônimo **"Nicolas van Saberhagen"**.  

**Bytecoin** foi a primeira criptomoeda a implementar o protocolo. O projeto mais conhecido que o utiliza hoje é o **Monero (XMR)**. Ele também foi usado em TurtleCoin, Aeon e vários outros.

---

## Principais Funcionalidades do CryptoNote

O Protocolo CryptoNote oferece três funcionalidades principais:

1. **Não rastreabilidade e não vinculação** das transações
2. **Prova de Trabalho igualitária** (resistente a ASIC) 
3. **Emissão dinâmica**

---

## 1. Não rastreabilidade - Assinaturas em Anel

A não rastreabilidade é alcançada principalmente com o uso de **Assinaturas em Anel**.

Ao enviar uma transação, sua chave pública real é misturada com várias chaves isca (o "anel") - todas contendo a mesma quantidade de moedas. Isso torna extremamente difícil determinar quem realmente enviou as moedas.

O **tamanho do anel** afeta significativamente o conjunto de anonimato. Anéis maiores proporcionam melhor privacidade.

![Explicação das Assinaturas em Anel](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Comparação com Zcash**:  
O conjunto de anonimato do Zcash é o número total de transações *já feitas* em um determinado pool blindado (muito maior do que os tamanhos típicos de anel do CryptoNote).

---

## Ring CT (Transações Confidenciais)

O modelo **Ring CT** melhorou muito a privacidade nas moedas baseadas em CryptoNote.

Em vez de esconder apenas o remetente, o Ring CT também **ofusca os valores das transações** entre remetente e destinatário.

![Diagrama do Ring CT](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Ele usa:
- Criptografia de Curva Elíptica
- Compromissos de Pedersen
- Criptografia Homomórfica

**Provas** são usadas para mostrar que o valor é maior que 0 e está dentro de intervalos válidos **sem revelar os valores reais**.

**Endereços furtivos** também adicionam endereços de uso único para o destinatário.

![Endereços furtivos + Provas](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Prova de Trabalho igualitária (ePoW)

O CryptoNote busca criar um sistema de mineração mais justo ao ser resistente a ASICs.

Ele usa o algoritmo **CryptoNight** (uma função memory-hard). Diferentemente do SHA256 do Bitcoin, o CryptoNight foi projetado para reduzir a diferença entre mineradores com CPU, GPU e ASIC.

**Etapas do CryptoNight:**
1. Inicializar uma grande área de memória (scratchpad) com dados pseudoaleatórios
2. Realizar inúmeras operações de leitura/escrita no scratchpad
3. Aplicar hash em todo o scratchpad para produzir o valor final

![Mineração com CryptoNight](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Observação: desde então, o Monero deixou de usar CryptoNight e migrou para outros algoritmos.)

---

## 3. Emissão dinâmica

Em vez de eventos repentinos de halving (como no Bitcoin), o CryptoNote usa uma **recompensa de bloco que diminui suavemente**.

Isso cria uma curva de emissão muito mais suave ao longo do tempo.

![Curva de emissão dinâmica](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Conexão com Zcash**:  
Desenvolvedores do Zcash discutiram implementar uma curva de emissão mais suave no futuro, potencialmente por meio de um "Zcash Posterity Fund".

---

## Conclusão

O CryptoNote provou ser uma abordagem forte e testada em batalha para a privacidade on-chain. Muitas de suas inovações influenciaram o ecossistema mais amplo das privacy coins.

Alguns pesquisadores acreditam que as funcionalidades do CryptoNote poderiam eventualmente ser combinadas com pools blindados de conhecimento zero sem confiança.

---

**Tópico original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Esta página foi compilada a partir do tópico original Zero to Zero Knowledge para a wiki da ZecHub.*
