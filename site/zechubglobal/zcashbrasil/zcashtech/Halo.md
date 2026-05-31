<a href="https://github.com/zechub/zechub/edit/main/site/zechubglobal/zcashbrasil/zcashtech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Editar-blue" alt="Editar Página"/>
</a>

# Halo

> 🇺🇸 [English version](/zcash-tech/halo)

Halo é um sistema de prova de conhecimento zero confiável e recursivo descoberto por Sean Bowe na Electric Coin Co. Ele elimina a necessidade de uma configuração confiável (trusted setup) e torna a composição recursiva de provas prática. O Halo foi o primeiro sistema de prova de conhecimento zero a combinar essas duas propriedades de forma eficiente, sendo amplamente reconhecido como um avanço científico. O pool blindado Orchard do Zcash, ativado com a Atualização de Rede 5 (NU5), usa o sistema de prova Halo 2.

![Visão geral do Halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "Visão geral do Halo")

## TL;DR

- O Halo elimina a **configuração confiável** que os sistemas de prova anteriores do Zcash (Sprout, Sapling) exigiam.
- Ele permite **provas recursivas**: uma prova pode verificar a correção de muitas outras provas.
- O **Halo 2** é a implementação em produção, escrita em Rust, usada pelo pool blindado Orchard desde a NU5.
- Remover a configuração confiável significa que as atualizações de protocolo não precisam mais de uma nova cerimônia multi-partes.
- A mesma pesquisa influenciou o Ethereum, a Filecoin e vários projetos de zkRollup.

---

## Explicação Principal

O Zcash usa provas de conhecimento zero para que transações blindadas provem sua validade sem revelar remetente, destinatário ou valor na blockchain pública. Os sistemas de prova anteriores do Zcash (Sprout usava BCTV14; Sapling usava Groth16) eram seguros e eficientes, mas dependiam de uma **cerimônia de configuração confiável**.

Em uma configuração confiável, os participantes geram conjuntamente uma aleatoriedade secreta. Se algum material secreto — frequentemente chamado de "lixo tóxico" — não for destruído, uma parte desonesta poderia criar provas falsas. O Zcash reduziu esse risco por meio de cerimônias multi-partes elaboradas, mas os usuários ainda precisavam confiar que pelo menos um participante destruiu sua parte.

**O Halo remove completamente esse requisito.** Em vez de depender de uma string de referência comum fixa, o Halo usa compromissos polinomiais e amortização aninhada. As provas raciocinam sobre provas anteriores, eliminando o lixo tóxico e a confiança em participantes da configuração.

---

## Aprofundamento

### Sem Configuração Confiável

O Halo evita a configuração confiável com dois primitivos:

**Esquema de compromisso polinomial sucinto.** Um provador se compromete com um polinômio com uma string curta. Um verificador pode verificar avaliações reivindicadas sem ver toda a computação.

**Prova interativa de oráculo polinomial.** O verificador pede ao provador que abra compromissos em pontos escolhidos e verifica se as identidades esperadas se mantêm.

Ao colapsar múltiplas instâncias de problemas difíceis sobre ciclos de curvas elípticas (**amortização aninhada**), o sistema permite que as provas raciocinem sobre provas anteriores sem material secreto.

Garantias concretas para usuários do Zcash:
1. Nenhum participante de cerimônias anteriores pode usar lixo tóxico para forjar provas no sistema Halo.
2. Futuras atualizações de protocolo não requerem nova cerimônia de configuração confiável.

[Explicação de Sean Bowe no Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

### Provas Recursivas

A composição recursiva permite que uma prova ateste a correção de muitas outras provas. O [artigo do Halo](https://eprint.iacr.org/2019/1021.pdf) descreve uma técnica de agregação em que muitas provas independentes podem ser verificadas quase tão rapidamente quanto uma única prova.

Para o Zcash, a recursão cria a base para escalabilidade horizontal, compressão de computação blindada e futuros contratos inteligentes.

### Halo 2 e o Pool Orchard

O Halo 2 é uma implementação de alto desempenho em Rust com um **esquema de acumulação**: provas são adicionadas a um acumulador, e cada nova prova raciocina sobre o estado anterior. Verificar o acumulador atual garante confiança em toda a cadeia de provas anteriores.

O **pool blindado Orchard**, ativado com a NU5 em maio de 2022, é o primeiro deployment em produção do Halo 2 no Zcash. Usa Endereços Unificados começando com `u1`.

O Halo 2 é lançado sob as **licenças open-source MIT e Apache 2.0**.

---

## Páginas Relacionadas

- [zk-SNARKs](/zcash-tech/zk-snarks)
- [Pools Blindados](/using-zcash/shielded-pools)
- [Chaves de Visualização](/zcash-tech/viewing-keys)
- [FROST](/zcash-tech/frost)
- [Segurança Pós-Quântica](/zcash-tech/post-quantum-security)

## Recursos

- [Artigo do Halo (eprint)](https://eprint.iacr.org/2019/1021.pdf)
- [GitHub do Halo 2](https://github.com/zcash/halo2)
- [Documentação do Halo 2](https://zcash.github.io/halo2/)
- [Blog explicativo — ECC](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Explicação de Sean Bowe — Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
