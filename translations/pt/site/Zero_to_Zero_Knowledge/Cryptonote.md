# Zero to Zero Knowledge: Protocolo CryptoNote

**Série:** Zero to Zero Knowledge

Um tema interessante hoje!  
O protocolo **CryptoNote** permite uma forte privacidade on-chain. Hoje vamos conhecer todos os seus principais recursos e ver como ele foi implementado por vários projetos de privacidade notáveis.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Contexto

O whitepaper original do CryptoNote foi publicado sob o pseudônimo **"Nicolas van Saberhagen"**.  

O **Bytecoin** foi a primeira criptomoeda a implementar o protocolo. O projeto mais conhecido que o utiliza hoje é o **Monero (XMR)**. Ele também foi usado no TurtleCoin, no Aeon e em vários outros.

---

## Principais recursos do CryptoNote

O protocolo CryptoNote oferece três recursos principais:

1. **Impossibilidade de rastreamento e de vinculação** das transações
2. **Proof of Work igualitário** (resistente a ASICs) 
3. **Emissão dinâmica**

---

## 1. Impossibilidade de rastreamento: assinaturas em anel

A impossibilidade de rastreamento é obtida principalmente por meio de **assinaturas em anel**.

Ao enviar uma transação, sua chave pública real é misturada a várias chaves de despiste (o "anel"), todas contendo a mesma quantidade de moedas. Isso torna extremamente difícil determinar quem realmente enviou as moedas.

O **tamanho do anel** afeta significativamente o conjunto de anonimato. Anéis maiores oferecem mais privacidade.

![Explicação de assinaturas em anel](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Comparação com o Zcash**:  
O conjunto de anonimato do Zcash é o número total de transações *já* realizadas em uma determinada pool blindada (muito maior do que os tamanhos de anel típicos do CryptoNote).

---

## Ring CT (transações confidenciais)

O modelo **Ring CT** melhorou muito a privacidade nas moedas baseadas em CryptoNote.

Em vez de apenas ocultar o remetente, o Ring CT também **ofusca os valores das transações** entre remetente e destinatário.

![Diagrama de Ring CT](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Ele utiliza:
- Criptografia de curvas elípticas
- Compromissos de Pedersen
- Criptografia homomórfica

**Provas** são usadas para mostrar que o valor é maior que 0 e está dentro de intervalos válidos, **sem revelar os valores reais**.

Os **endereços furtivos** também acrescentam endereços de uso único para o destinatário.

![Endereços furtivos + provas](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Proof of Work igualitário (ePoW)

O CryptoNote busca criar um sistema de mineração mais justo, sendo resistente a ASICs.

Ele usa o algoritmo **CryptoNight** (uma função que exige muita memória). Ao contrário do SHA256 do Bitcoin, o CryptoNight foi projetado para reduzir a diferença entre mineradores com CPU, GPU e ASIC.

**Etapas do CryptoNight:**
1. Inicializar uma grande área de memória (scratchpad) com dados pseudoaleatórios
2. Realizar inúmeras operações de leitura e escrita no scratchpad
3. Calcular o hash de todo o scratchpad para produzir o valor final

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Observação: desde então, o Monero deixou o CryptoNight e passou a usar outros algoritmos.)

---

## 3. Emissão dinâmica

Em vez de eventos repentinos de halving (como no Bitcoin), o CryptoNote usa uma **recompensa por bloco que diminui de forma gradual**.

Isso cria uma curva de emissão muito mais suave ao longo do tempo.

![Curva de emissão dinâmica](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Relação com o Zcash**:  
Os desenvolvedores do Zcash já discutiram a implementação de uma curva de emissão mais suave no futuro, possivelmente por meio de um "Zcash Posterity Fund".

---

## Conclusão

O CryptoNote provou ser uma abordagem sólida e testada na prática para a privacidade on-chain. Muitas de suas inovações influenciaram o ecossistema mais amplo das moedas de privacidade.

Alguns pesquisadores acreditam que os recursos do CryptoNote poderiam, no futuro, ser combinados com pools blindadas de conhecimento zero que não exigem confiança.

---

**Thread original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Esta página foi compilada a partir da thread original no Zero to Zero Knowledge para a wiki do ZecHub.*
