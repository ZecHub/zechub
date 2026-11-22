# Testnet do Zcash

## O que é a Testnet do Zcash?

A **Testnet do Zcash** é uma blockchain paralela à rede principal real do Zcash (Mainnet) que replica exatamente o protocolo, as regras e a lógica de transações, mas com duas diferenças principais:

1. **As moedas não têm valor monetário real**: elas se chamam **TAZ**, não ZEC, e são usadas apenas para testes.  
2. **Atualizações da rede, ferramentas e softwares são testados aqui primeiro**, antes da implantação na blockchain real do Zcash.  

Em outras palavras, a Testnet é como uma **sandbox ou ambiente experimental** onde desenvolvedores, auditores e criadores podem testar ideias sem arriscar dinheiro real.


## Por que a Testnet existe?

A Testnet é crucial para o desenvolvimento de blockchains porque **blockchains reais como o Zcash são imutáveis**: depois que as transações são confirmadas na rede principal, elas não podem ser desfeitas. A Testnet oferece uma **réplica segura** para experimentar, testar e depurar funcionalidades antes de implantá-las na Mainnet.

### Usos da Testnet

#### 1. Desenvolvimento e integração de software

Desenvolvedores que criam carteiras, corretoras, softwares de mineração ou ferramentas de privacidade podem testá-los com segurança na Testnet. Os recursos incluem:

- Enviar e receber transações  
- Minerar novos blocos com moedas TAZ sem valor  
- Criar interfaces de usuário e APIs  
- Testar recursos de privacidade de transações (transparentes vs. blindadas)  

**Exemplo:**  
Ferramentas como [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) usam a Testnet para gerar transações e testar funcionalidades de ativos blindados do Zcash.  

**Cenário real:**  
Um desenvolvedor de carteira pode conectar o software a um endpoint RPC da Testnet e simular o ciclo de vida completo (criar endereços, enviar transações blindadas e validar saldos) antes de entrar em produção na Mainnet.

#### 2. Teste de atualizações da rede

O Zcash atualiza seu protocolo principal periodicamente (por exemplo, NU6.1, NU6.2 e Ironwood). A Testnet ativa as novas atualizações **antes da Mainnet**, permitindo que os desenvolvedores e a comunidade identifiquem e corrijam bugs.

**Exemplo:**  
Uma nova regra de consenso ou um novo tipo de transação é enviado primeiro para a Testnet. Após testes bem-sucedidos, ele é ativado na Mainnet em uma altura de bloco predeterminada.

#### 3. Teste de implementações de nós

O nó mantido do Zcash é o **Zebra** (o nó baseado em Rust mantido pela Zcash Foundation) e a carteira mantida é a [Zallet](https://github.com/zcash/zallet). O `zcashd`, a implementação original de nó, atingiu sua parada automática de fim de suporte em 18 de julho de 2026 e não recebe mais manutenção. Consulte o [guia de migração do zcashd para o Zebra e a Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). A Testnet permite testar nós em condições reais sem risco financeiro.

Desenvolvedores de nós podem:

- Validar a propagação de blocos  
- Testar interfaces RPC  
- Observar o comportamento do nó sob carga  
- Testar interações com softwares de mineração  

#### 4. Aprendizado e educação

Iniciantes podem aprender recursos do Zcash, como mineração, criação de transações blindadas e uso de Unified Addresses.  
Tutoriais e documentação da comunidade dão acesso a **faucets, exploradores e guias da Testnet**.


## Casos de uso reais da Testnet

### 1. Testes de desenvolvedores (carteira / app)

- Conecte-se à Testnet do Zcash  
- Solicite TAZ em um faucet  
- Envie transações blindadas  
- Verifique a privacidade e a estabilidade da interface  

Nenhum ZEC real é perdido, mesmo que ocorram erros.

### 2. Testes de integração de corretoras

- Execute um nó da Testnet  
- Use os endpoints JSON-RPC do Zebrad para processar transações  
- Teste a lógica automatizada de depósitos/saques  

Garante código de produção seguro e evita perdas financeiras.

### 3. Testes de configuração de mineração

- Use templates de mineração  
- Teste a validação de blocos  
- Observe as recompensas de mineração (apenas TAZ)  
- Ajuste o desempenho da mineração  

Evita tempo de inatividade ou perda de ganhos ao migrar para a Mainnet.

### 4. Pesquisa acadêmica / de protocolo

Pesquisadores podem testar inovações como **verificação stateless**, **otimização de provas de conhecimento zero** ou outros experimentos de protocolo usando a Testnet.  
Usuários avançados também podem executar **Testnets personalizadas ou ambientes regtest** para experimentos especializados.


## Principais diferenças entre Mainnet e Testnet

| Característica        | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Valor das moedas      | ZEC real         | TAZ (sem valor monetário)  |
| Risco                 | Risco financeiro   | Segura para testes         |
| Atualizações do protocolo | Produção       | Ativação antecipada         |
| Recompensas de mineração | Emissão real    | Apenas recompensa de teste         |
| Utilidade da rede     | Transações reais| Testes e desenvolvimento  |

## Equívocos comuns

- **As moedas da Testnet valem alguma coisa** -> Falso, TAZ não têm valor.  
- **Perder moedas da Testnet é um problema** -> Falso, nenhum valor real é perdido.  
- **A Testnet e a Mainnet são idênticas** -> Falso, a Testnet é reiniciada com frequência e não tem segurança econômica como a Mainnet.

---

## O que é TAZ?

**TAZ** é a versão de Testnet das moedas Zcash:  

- Não é dinheiro real; não pode ser trocado por ZEC nem por moeda fiduciária  
- É usado para testes, desenvolvimento e aprendizado  
- Segue todas as regras do Zcash: pode ser enviado, minerado e usado em endereços blindados  

**Exemplo:**  
Um desenvolvedor pode enviar 100 TAZ de um endereço da Testnet para outro para testar um recurso de carteira sem arriscar ZEC real.  

Pense no TAZ como **"dinheiro de brincadeira" da Testnet do Zcash**.


## O que são faucets?

Um **faucet** é um serviço que fornece moedas TAZ gratuitas para testes:

- Geralmente são sites ou APIs  
- Os usuários informam um endereço da Testnet; o faucet envia uma pequena quantidade de TAZ  
- Evita a necessidade de minerar TAZ manualmente  

**Exemplo:**  
1. Acesse um faucet da Testnet (por exemplo, [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Digite seu endereço da Testnet  
3. Solicite TAZ  
4. Receba TAZ instantaneamente para começar a testar  

**Por que isso importa:**  
- Testes seguros sem arriscar ZEC  
- Acessibilidade para iniciantes e desenvolvedores  
- Prototipagem rápida de carteiras, corretoras e apps



## Carteiras Zkool e Zingo!

### Zkool

- Carteira com várias contas para usuários avançados do Zcash  
- Suporta frases semente, chaves de visualização, endereços transparentes e blindados  
- Pode se conectar à Mainnet, à Testnet ou à Regtest por meio de nós integrais ou servidores lightwallet

### Zingo!

- Carteira para celular focada em privacidade e simplicidade  
- Suporta endereços blindados e unificados  
- Atualizada para suportar os protocolos da Testnet (incluindo a Testnet NU6)

## Como ativar a Testnet nas carteiras

### Carteira Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Dicas:**  
- A carteira pode reiniciar ao trocar de rede  
- As contas ZEC da Mainnet não são afetadas  
- Use um servidor lightwallet da Testnet, se solicitado

### Carteira Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Depois de ativada, as carteiras podem enviar e receber TAZ, testar transações blindadas e experimentar com segurança.


## Depois de ativar a Testnet

- As transações se comportam como na Mainnet, mas com **TAZ sem valor**  
- Transações blindadas, múltiplos endereços e recursos de privacidade podem ser testados  
- Os desenvolvedores podem depurar e testar recursos sem arriscar ZEC real


## Resumo rápido

- A **Testnet do Zcash** é um ambiente sandbox seguro para criar, testar e experimentar  
- Casos de uso: testes de desenvolvedores, testes de nós, integração de corretoras, pesquisa e educação  
- As **moedas TAZ** são usadas no lugar do ZEC e não têm valor real  
- A Testnet é essencial antes de colocar recursos em produção na Mainnet
