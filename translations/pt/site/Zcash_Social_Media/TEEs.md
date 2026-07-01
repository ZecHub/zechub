# Do Zero ao Conhecimento Zero: Trusted Execution Environments (TEEs)

**Série:** Do Zero ao Conhecimento Zero

Do Zero ao Conhecimento Zero está de volta com um novo tema!  
Esta semana exploramos **Trusted Execution Environments (TEEs)** - como são usados em moedas de privacidade e outras aplicações de blockchain.

![Introdução aos Trusted Execution Environments](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs e Blockchains: Propriedades Complementares

Blockchains e TEEs têm forças muito complementares:

- **Blockchains** garantem disponibilidade, persistência de estado e permitem verificação pública de todo o estado - mas têm poder computacional limitado.  
- **TEEs** podem executar tarefas computacionais intensivas de forma privada - mas não têm persistência de estado nativa.

Juntos, podem criar sistemas poderosos de preservação da privacidade.

---

## Secret Network: Privacidade Impulsionada por TEE

**Secret Network** aproveita a tecnologia TEE (especificamente Intel SGX) para executar computação sobre entradas, saídas e estado encriptados.

Cada nó validador executa chips Intel SGX. As camadas de consenso e computação são combinadas:

- As transações são processadas dentro de enclaves seguros.  
- Os dados só são desencriptados **dentro da TEE**.

Isto é diferente de Zcash, que usa **provas de conhecimento zero** para privacidade. No Zcash, as transações shielded são transmitidas e validadas publicamente sem quaisquer dados adicionais revelados à rede. Os Zcash Shielded Assets seguem o mesmo princípio.

![Diagrama TEE da Secret Network](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Para uma explicação detalhada de como as TEEs são implementadas na Secret Network, leia este excelente artigo de @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Como a Secret Network Protege Chaves e Estado

- A **seed de encriptação do consenso** da rede é armazenada dentro da TEE de cada validador.  
- Os contratos usam chaves de encriptação únicas e impossíveis de falsificar.  
- Os contratos secretos correm no módulo de computação do Cosmos SDK, mas suportam entradas/saídas e estado encriptados.

---

## Atestação Remota

**Atestação Remota** é o processo de provar que um enclave está a correr num ambiente de hardware seguro genuíno.

Permite que uma parte remota verifique:
- A aplicação correta está em execução  
- A aplicação não foi adulterada  
- Está a executar-se com segurança dentro de um enclave Intel SGX

![Explicação da Atestação Remota](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Os enclaves também contêm chaves privadas de assinatura e atestação que não podem ser acedidas a partir do exterior.

![Proteção de chaves do enclave](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Selagem de Dados

Como os enclaves não têm estado, por vezes os dados têm de ser armazenados externamente em memória não confiável.  

**Selagem de Dados** encripta dados dentro do enclave usando uma chave derivada da CPU. O bloco encriptado só pode ser desselado no **mesmo sistema**.

![Diagrama de Selagem de Dados](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** também usa TEEs através do seu ParaTime confidencial (por exemplo, Sapphire e Cipher).

Os dados encriptados entram na TEE juntamente com o smart contract. São desencriptados, processados e reencriptados antes de saírem do enclave.

![Fluxo TEE da Oasis Network](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs em Redes Proof-of-Stake

Muitas blockchains Proof-of-Stake (incluindo Secret e Oasis) usam **Tendermint** como o seu framework de consenso.

Para validadores PoS:
- As chaves devem ser geridas com segurança e nunca expostas em texto simples.  
- Os validadores devem permanecer online (aplicam-se penalizações por inatividade).  
- Assinar mensagens em conflito pode levar a slashing.

As **TEEs** são ideais para gerar e usar chaves de validador com segurança.

![Segurança do Tendermint & PoS](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash e a Pesquisa sobre Proof-of-Stake

Zcash está a pesquisar ativamente uma migração para Proof-of-Stake.

- Leia a pesquisa: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Veja este segmento de uma Community Call da Zcash Foundation que explica diferentes modelos de PoS e as suas implicações para a privacidade:
  
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

**Thread Original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Esta página foi compilada a partir da thread original Do Zero ao Conhecimento Zero para a wiki da ZecHub.*
