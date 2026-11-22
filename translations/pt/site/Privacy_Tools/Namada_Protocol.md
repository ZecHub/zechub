[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocolo Namada

![Namada Logo](/content-images/logo-2067e2533d.webp)


## O que é o Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash explicado: aliança estratégica Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

O Protocolo Namada é uma plataforma de camada 1 baseada em consenso proof-of-stake, projetada para oferecer privacidade intercadeias e agnóstica em relação a ativos. Por meio do protocolo Inter-Blockchain Communication (IBC), o Namada se integra perfeitamente a chains de finalidade rápida, permitindo uma interoperabilidade fluida. Além disso, o Namada estabelece uma ponte bidirecional sem necessidade de confiança com o Ethereum, facilitando uma comunicação segura e confiável entre as duas redes.

O Namada prioriza a privacidade ao implementar uma versão aprimorada do circuito Multi-Asset Shielded Pool (MASP). Essa versão atualizada permite que todos os tipos de ativos, incluindo tokens fungíveis e não fungíveis, utilizem um conjunto blindado compartilhado, exatamente como o do Zcash. Como resultado, a transferência de ativos suportados no Namada se torna indistinguível, pois fica difícil identificá-la devido ao alto nível de privacidade envolvido. Além disso, a atualização mais recente do circuito Multi Asset Shielded Pool permite recompensas pelo conjunto blindado, um recurso ou incentivo inovador que destina recursos para promover a privacidade como um bem público.

## Ponte com o Ethereum + compatibilidade com IBC

A integração da ponte com o Ethereum ao Namada elimina a necessidade de um protocolo separado, já que ela se torna parte integrante do ecossistema Namada. Os validadores do Namada são encarregados de operar a ponte junto com o protocolo principal do Namada. Esses validadores também atuam como relayers na transferência de ativos para o Namada, tornando desnecessária a participação de agentes adicionais. Por outro lado, na transferência de ativos para o Ethereum, partes externas (conhecidas como relayers) participam do processo, embora não tenham nenhuma responsabilidade pela validação ou pela segurança da ponte.

![Diagrama da ponte Ethereum](/content-images/image-0fd8f754ba.webp)

O Protocolo Namada também tem a capacidade de se conectar perfeitamente a qualquer chain de finalidade rápida que suporte o protocolo Inter-Blockchain Communication (IBC). Quando se trata de interoperar com o Ethereum, o Namada implementa uma ponte especializada e segura com o Ethereum, que opera sem necessidade de confiança. Essa ponte foi cuidadosamente projetada para priorizar a segurança, aplicando controles de fluxo em todas as conexões da ponte e tratando qualquer transferência defeituosa do Ethereum como uma infração grave, que pode resultar em penalidades de slashing.

## Recompensas pelo conjunto blindado

Na atualização mais recente do [Protocolo Namada](https://namada.net/blog/what-is-namada), os usuários que mantêm ativos blindados são incentivados a participar ativamente do conjunto blindado compartilhado. Isso é possível graças à integração do circuito MASP atualizado, que agora inclui o inovador Convert Circuit. Com esse novo recurso, o Namada incentiva os usuários a contribuir para o conjunto blindado compartilhado mantendo ativos blindados.

No Namada, o conjunto blindado é considerado um bem público não exclusivo e anti-rival. Isso significa que, quanto mais pessoas utilizam transferências blindadas, maior é o nível de garantia de privacidade para cada participante. O protocolo reconhece a importância da adoção e da participação coletivas para aumentar a privacidade de todos os usuários. Portanto, ao incentivar os usuários a manter ativos blindados e a contribuir para o conjunto blindado compartilhado, o Namada promove um ecossistema de privacidade mais forte e robusto.

## Transação de ativos blindados

O MASP ([Multi-Asset Shielded Pool](https://docs.namada.net/users/shielded-accounts)) estende o circuito Sapling do Zcash para suportar transferências blindadas de ativos nativos e não nativos. Compartilhar um pool não significa que a privacidade seja independente do uso de um ativo. A documentação do Namada explica que ativos do mesmo tipo compartilham um conjunto de anonimato e que padrões públicos de blindagem e desblindagem ainda podem revelar a origem de um ativo.

![Diagrama de transação de ativos blindados](/content-images/image-1-512c639d56.webp)

Por exemplo, se apenas uma conta blinda BTC e depois o retira para a mesma conta, esses pontos públicos de entrada e saída podem ser vinculados, mesmo que os fundos tenham se movimentado de forma privada dentro do MASP. Quando mais contas blindam BTC, uma retirada posterior poderia pertencer a qualquer uma dessas contas. O que importa são os padrões de participação e de transação relevantes; o tamanho do pool compartilhado, por si só, não garante privacidade idêntica para todos os ativos.

## Taxas menores e transações rápidas

O Namada combina dois elementos-chave para oferecer velocidade e finalidade rápidas nas transações: geração rápida de provas e consenso moderno Byzantine Fault Tolerant (BFT). Esses dois recursos permitem que o Namada alcance uma taxa de processamento de transações comparável à da Visa, uma conhecida rede de pagamentos reconhecida por sua alta capacidade de processamento. A geração rápida de provas refere-se à produção eficiente de provas criptográficas que validam a correção e a integridade das transações na blockchain. Ao empregar técnicas e otimizações avançadas, o Protocolo Namada minimiza a sobrecarga computacional necessária para gerar essas provas, resultando em verificação e confirmação rápidas das transações.

Além disso, o Namada utiliza algoritmos modernos de consenso BFT, que garantem a integridade das transações e o acordo sobre elas em toda a rede. Esses mecanismos de consenso permitem que o Namada chegue a um consenso sobre a ordem e a validade das transações, oferecendo uma forte garantia de finalidade. Com a finalidade, as transações são consideradas irreversíveis, reduzindo o risco de gasto duplo ou de reversão de transações. O Namada segue uma abordagem semelhante à do Anoma, outro protocolo conhecido por suas soluções de escalabilidade. O Namada adota instâncias fractais, que permitem a criação de chains aninhadas dentro da blockchain principal. Essa estrutura fractal possibilita a escalabilidade horizontal ao distribuir a carga entre várias instâncias, aumentando a capacidade e o desempenho gerais da rede.

## Aliança estratégica entre Namada e Zcash

De acordo com uma publicação recente, que pode ser encontrada no [blog do Protocolo Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), a equipe por trás do Protocolo Namada tem o prazer de apresentar uma proposta e um pedido de comentários (RFC) para uma aliança estratégica entre os ativos, as chains e as comunidades do Namada e do Zcash.

![Diagrama da aliança estratégica Namada-Zcash](/content-images/image-2-68804c60f3.webp)

A aliança proposta abrange três elementos principais. Primeiro, será criado um pool de subsídios para financiar projetos que tragam vantagens tanto para o Zcash quanto para o Namada. Segundo, um airdrop de tokens NAM será destinado aos detentores de ZEC. Por fim, há um plano para estabelecer uma ponte com confiança minimizada conectando o Zcash e o Namada. Uma vez implementada, essa ponte permitirá que os detentores de ZEC, chamados de Zolders, utilizem seus ZEC no Namada. Além disso, os Zolders terão a oportunidade de acessar os ecossistemas mais amplos do Cosmos e do Ethereum por meio do Namada. Você pode saber mais sobre a aliança estratégica no [fórum da comunidade Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Links de referência

- [Vídeo oficial do Protocolo Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Site oficial do Protocolo Namada](https://namada.net/)
- [Blog do Namada](https://namada.net/blog)
- [Documentação do Namada](https://docs.namada.net/)
