[![Editar Página](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocolo Namada

![Logo da Namada](https://i.ibb.co/BZcZHS1/logo.png)


## O que é Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explicado: Aliança Estratégica Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

O Protocolo Namada atua como uma plataforma de Camada 1 baseada em consenso proof-of-stake, projetada para oferecer privacidade interchain agnóstica a ativos. Por meio do protocolo Inter-Blockchain Communication (IBC), Namada integra-se perfeitamente com chains de finalidade rápida, permitindo uma interoperabilidade fluida. Além disso, Namada estabelece uma bridge bidirecional sem confiança com Ethereum, facilitando uma comunicação segura e confiável entre as duas redes.

Namada prioriza a privacidade ao implementar uma iteração aprimorada do circuito Multi-Asset Shielded Pool (MASP). Essa versão atualizada permite que todos os tipos de ativos, incluindo tokens fungíveis e não fungíveis, utilizem um conjunto blindado compartilhado exatamente como o do Zcash. Como resultado, o ato de transferir ativos suportados na Namada torna-se distinto, pois fica difícil de identificar devido ao alto nível de privacidade envolvido. Além disso, a atualização mais recente do circuito Multi Asset Shielded Pool permite recompensas do conjunto blindado, um recurso ou incentivo inovador que aloca recursos para promover a privacidade como um bem público.

## Bridge com Ethereum + Compatível com IBC

A integração da bridge com Ethereum à Namada elimina a necessidade de um protocolo separado, pois ela se torna parte integrante do ecossistema Namada. Os validadores dentro da Namada são encarregados de operar a bridge juntamente com o protocolo principal da Namada. Esses validadores também atuam como relayers quando se trata de transferir ativos para Namada, tornando desnecessário o envolvimento de atores adicionais. Por outro lado, ao transferir ativos para Ethereum, partes externas (conhecidas como relayers) estão envolvidas, embora não tenham responsabilidade pela validação ou segurança da bridge.

![Diagrama da Bridge com Ethereum](https://i.ibb.co/wKds5RP/image.jpg)

O Protocolo Namada também tem a capacidade de se conectar perfeitamente com qualquer chain de finalidade rápida que suporte o protocolo Inter-Blockchain Communication (IBC). Quando se trata de interoperar com Ethereum, Namada implementa uma bridge especializada e segura com Ethereum que opera de maneira trustless. Essa bridge é cuidadosamente projetada para priorizar a segurança, impondo controles de fluxo para todas as conexões da bridge e tratando quaisquer transferências com falha no Ethereum como uma infração grave que pode resultar em penalidades de slashing.

## Recompensas do Conjunto Blindado

Na atualização mais recente do [Protocolo Namada](https://blog.namada.net/what-is-namada/), os usuários que mantêm ativos blindados são incentivados a participar ativamente do conjunto blindado compartilhado. Isso é possível por meio da integração do circuito MASP atualizado, que agora inclui o inovador Convert Circuit. Ao aproveitar esse novo recurso, Namada incentiva os usuários a contribuir para o conjunto blindado compartilhado mantendo ativos blindados.

Na Namada, o conjunto blindado é considerado um bem público não exclusivo e antirrival. Isso significa que, à medida que mais pessoas utilizam transferências blindadas, o nível de garantias de privacidade melhora para cada participante. O protocolo reconhece a importância da adoção e da participação coletiva no fortalecimento da privacidade para todos os usuários. Portanto, ao incentivar os usuários a manter ativos blindados e contribuir para o conjunto blindado compartilhado, Namada promove um ecossistema de privacidade mais forte e robusto.

## Transação de Ativos Blindados

Quando se trata de transferências blindadas, seja envolvendo um token não fungível (NFT) de Ethereum, ATOM ou NAM, elas são indistinguíveis entre si. Isso significa que os recursos de preservação de privacidade fornecidos pelo MASP (Modified Accumulator Sapling Protocol), uma versão aprimorada do circuito Sapling do Zcash, se aplicam uniformemente a todos os tipos de ativos. O circuito MASP permite que todos os ativos dentro do ecossistema Namada compartilhem o mesmo conjunto blindado. Essa abordagem garante que as garantias de privacidade não sejam fragmentadas entre ativos individuais. Independentemente do volume de transações associado a um determinado ativo, a proteção de privacidade permanece consistente e independente.

![Diagrama da Transação de Ativos Blindados](https://i.ibb.co/7CDmWk6/image-1.png)

Ao unificar o conjunto blindado entre diferentes ativos, Namada garante que a privacidade seja mantida de forma uniforme, independentemente do tipo específico de ativo envolvido em uma transferência blindada. Essa abordagem promove uma estrutura de privacidade coesa dentro do protocolo e aumenta a confidencialidade das transações envolvendo NFTs de Ethereum, ATOM, NAM e outros ativos suportados. Namada também permite a transferência privada de tokens fungíveis e não fungíveis usando novos zk-SNARKs, garantindo confidencialidade para tokens nativos e não nativos, assim como é feito no Zcash.

## Menores Taxas e Transações Rápidas

Namada combina dois elementos-chave para oferecer alta velocidade de transação e finalidade: geração rápida de proofs e consenso moderno Byzantine Fault Tolerant (BFT). Esses dois recursos permitem que a Namada alcance uma taxa de processamento de transações comparável à da Visa, uma rede de pagamentos bem conhecida por sua alta capacidade de processamento. Geração rápida de proofs refere-se à produção eficiente de provas criptográficas que validam a correção e a integridade das transações na Blockchain. Ao empregar técnicas avançadas e otimizações, o Protocolo Namada minimiza a sobrecarga computacional necessária para gerar essas provas, resultando em verificação e confirmação rápidas das transações.

Além disso, Namada utiliza algoritmos modernos de consenso BFT, que garantem a integridade e o acordo das transações em toda a rede. Esses mecanismos de consenso permitem que Namada chegue a um consenso sobre a ordem e a validade das transações, fornecendo uma forte garantia de finalidade. Com a finalidade, as transações são consideradas irreversíveis, reduzindo o risco de gasto duplo ou reversão de transações. Namada segue uma abordagem semelhante à da Anoma, outro protocolo conhecido por suas soluções de escalabilidade. Namada adota instâncias fractais, que permitem a criação de chains aninhadas dentro da blockchain principal. Essa estrutura fractal possibilita escalabilidade horizontal ao distribuir a carga entre múltiplas instâncias, aumentando a capacidade e o desempenho geral da rede.

## Namada e a Aliança Estratégica com Zcash

De acordo com uma publicação recente que pode ser encontrada no [Blog do Protocolo Namada](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), a equipe por trás do Protocolo Namada tem o prazer de apresentar uma proposta e um request-for-comment (RFC) para uma aliança estratégica entre os ativos, chains e comunidades de Namada e Zcash.

![Diagrama da Aliança Estratégica Namada-Zcash](https://i.ibb.co/FqsmkMb/image-2.png)

A aliança proposta abrange três elementos principais. Primeiro, haverá um fundo de grants que será criado para fornecer financiamento a projetos que tragam benefícios tanto para Zcash quanto para Namada. Em segundo lugar, um airdrop de tokens NAM será destinado aos detentores de ZEC. Por fim, há um plano para estabelecer uma bridge com confiança minimizada conectando Zcash e Namada. Uma vez implementada, essa bridge permitirá que os detentores de ZEC, chamados de Zolders, utilizem seu ZEC na Namada. Além disso, os Zolders terão a oportunidade de acessar os ecossistemas mais amplos de Cosmos e Ethereum por meio da Namada. Você pode saber mais sobre a aliança estratégica no [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Links de Referência

- [Vídeo Oficial do Protocolo Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Site Oficial do Protocolo Namada](https://namada.net/)
- [Blog da Namada](https://blog.namada.net/)
- [Documentação da Namada](https://docs.namada.net/)
