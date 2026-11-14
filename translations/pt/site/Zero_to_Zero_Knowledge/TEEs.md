# Zero to Zero Knowledge: Ambientes de execução confiáveis (TEEs)

**Série:** Zero to Zero Knowledge

O Zero to Zero Knowledge está de volta com um novo tema!  
Nesta semana, exploramos os **ambientes de execução confiáveis (TEEs)** - como eles são usados em moedas de privacidade e em outras aplicações de blockchain.

![Introdução aos Trusted Execution Environments](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs e blockchains: propriedades complementares

Blockchains e TEEs têm pontos fortes muito complementares:

- **Blockchains** garantem disponibilidade e persistência de estado, e permitem a verificação pública de todo o estado - mas têm poder de computação limitado.  
- **TEEs** podem executar tarefas computacionais intensivas de forma privada - mas não têm persistência de estado nativa.

Juntos, eles podem criar sistemas poderosos que preservam a privacidade.

---

## Secret Network: privacidade com TEEs

A **Secret Network** usa a tecnologia TEE (especificamente o Intel SGX) para realizar computação sobre entradas, saídas e estado criptografados.

Cada nó validador roda chips Intel SGX. As camadas de consenso e de computação são combinadas:

- As transações são processadas dentro de enclaves seguros.  
- Os dados só são descriptografados **dentro do TEE**.

Isso é diferente do Zcash, que usa **provas de conhecimento zero** para garantir a privacidade. No Zcash, as transações blindadas são transmitidas e validadas publicamente, sem que nenhum dado adicional seja revelado à rede. Os ativos blindados do Zcash seguem o mesmo princípio.

![Diagrama TEE da Secret Network](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Para uma explicação detalhada de como os TEEs são implementados na Secret Network, leia este excelente artigo de @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Como a Secret Network protege chaves e estado

- A **semente de criptografia de consenso** da rede fica armazenada dentro do TEE de cada validador.  
- Os contratos usam chaves de criptografia únicas e infalsificáveis.  
- Os contratos secretos rodam no módulo de computação do SDK Cosmos, mas suportam entradas, saídas e estado criptografados.

---

## Atestação remota

A **atestação remota** é o processo de provar que um enclave está rodando em um ambiente de hardware seguro genuíno.

Ela permite que uma parte remota verifique que:
- O aplicativo correto está rodando  
- O aplicativo não foi adulterado  
- Ele está sendo executado com segurança dentro de um enclave Intel SGX

![Explicação da atestação remota](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Os enclaves também contêm chaves privadas de assinatura e de atestação que não podem ser acessadas de fora.

![Proteção de chaves do enclave](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Selagem de dados

Como os enclaves não têm estado, às vezes os dados precisam ser armazenados fora deles, em memória não confiável.  

A **selagem de dados** criptografa os dados dentro do enclave usando uma chave derivada da CPU. O bloco criptografado só pode ser desselado no **mesmo sistema**.

![Diagrama de selagem de dados](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

A **Oasis Network** também usa TEEs por meio de seus ParaTimes confidenciais (por exemplo, Sapphire e Cipher).

Os dados criptografados entram no TEE junto com o contrato inteligente. Eles são descriptografados, processados e criptografados novamente antes de sair do enclave.

![Fluxo TEE da Oasis Network](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs em redes de Proof-of-Stake

Muitas blockchains de Proof-of-Stake (incluindo a Secret e a Oasis) usam o **Tendermint** como framework de consenso.

Para validadores PoS:
- As chaves precisam ser gerenciadas com segurança e nunca expostas em texto simples.  
- Os validadores precisam permanecer online (há penalidades por inatividade).  
- Assinar mensagens conflitantes pode levar a slashing.

Os **TEEs** são ideais para gerar e usar chaves de validadores com segurança.

![Tendermint e segurança PoS](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## O Zcash e a pesquisa sobre Proof-of-Stake

O Zcash está pesquisando ativamente uma migração para Proof-of-Stake.

- Leia a pesquisa: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Assista a este trecho de uma Community Call da Zcash Foundation que explica diferentes designs de PoS e suas implicações para a privacidade:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Thread original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Esta página foi compilada a partir da thread original do Zero to Zero Knowledge para a wiki do ZecHub.*
