# Do zero ao conhecimento zero: ambientes de execução confiáveis (TEEs)

**Série:** Zero to Zero Knowledge

Zero to Zero Knowledge está de volta com um novo tema!  
Esta semana, exploramos **Trusted Execution Environments (TEEs)** - como são usados em moedas de privacidade e outras aplicações de blockchain.

![Introdução aos Trusted Execution Environments](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs e blockchains: propriedades complementares

Blockchains e TEEs têm pontos fortes muito complementares:

- **Blockchains** garantem disponibilidade, persistência de estado e permitem a verificação pública de todo o estado - mas têm poder computacional limitado.  
- **TEEs** podem executar tarefas computacionais intensivas de forma privada - mas não têm persistência de estado nativa.

Juntos, podem criar sistemas poderosos que preservam a privacidade.

---

## Secret Network: privacidade impulsionada por TEE

**Secret Network** utiliza a tecnologia TEE (especificamente Intel SGX) para executar computação sobre entradas, saídas e estado criptografados.

Cada nó validador usa chips Intel SGX. As camadas de consenso e computação são combinadas:

- As transações são processadas dentro de enclaves seguros.  
- Os dados são descriptografados apenas **dentro da TEE**.

Isso é diferente do Zcash, que usa **provas de conhecimento zero** para privacidade. No Zcash, as transações blindadas são transmitidas e validadas publicamente sem dados adicionais revelados à rede. Os Zcash Shielded Assets seguem o mesmo princípio.

![Diagrama TEE da Secret Network](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Para uma explicação detalhada de como as TEEs são implementadas na Secret Network, leia este excelente artigo de @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Como a Secret Network protege chaves e estado

- A **seed de criptografia do consenso** da rede é armazenada dentro da TEE de cada validador.  
- Os contratos usam chaves de criptografia únicas e impossíveis de falsificar.  
- Os contratos secretos são executados no módulo de computação do Cosmos SDK, mas suportam entradas/saídas e estado criptografados.

---

## Atestação remota

**Atestação remota** é o processo de provar que um enclave está sendo executado em um ambiente de hardware seguro genuíno.

Ela permite que uma parte remota verifique:
- O aplicativo correto está em execução  
- O aplicativo não foi adulterado  
- Ele está sendo executado com segurança dentro de um enclave Intel SGX

![Explicação da atestação remota](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Os enclaves também contêm chaves privadas de assinatura e atestação que não podem ser acessadas externamente.

![Proteção de chaves do enclave](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Selagem de dados

Como os enclaves não têm estado, às vezes os dados precisam ser armazenados externamente em memória não confiável.  

**Selagem de dados** criptografa dados dentro do enclave usando uma chave derivada da CPU. O bloco criptografado só pode ser desselado no **mesmo sistema**.

![Diagrama de selagem de dados](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** também usa TEEs por meio de seu ParaTime confidencial (por exemplo, Sapphire e Cipher).

Os dados criptografados entram na TEE junto com o contrato inteligente. Eles são descriptografados, processados e criptografados novamente antes de sair do enclave.

![Fluxo TEE da Oasis Network](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs em redes Proof-of-Stake

Muitas blockchains Proof-of-Stake (incluindo Secret e Oasis) usam **Tendermint** como framework de consenso.

Para validadores PoS:
- As chaves devem ser gerenciadas com segurança e nunca expostas em texto simples.  
- Os validadores devem permanecer online (penalidades por inatividade se aplicam).  
- Assinar mensagens conflitantes pode levar a slashing.

As **TEEs** são ideais para gerar e usar chaves de validador com segurança.

![Segurança do Tendermint e PoS](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash e a pesquisa sobre Proof-of-Stake

O Zcash está pesquisando ativamente uma migração para Proof-of-Stake.

- Leia a pesquisa: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Assista a este trecho de uma Community Call da Zcash Foundation que explica diferentes modelos de PoS e suas implicações para a privacidade:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="Modelos de PoS"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Thread original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Esta página foi compilada a partir da thread original Zero to Zero Knowledge para a wiki da ZecHub.*
