[![Editar página](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocolo Namada

![Logotipo da Namada](/content-images/logo-2067e2533d.webp)


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

O Protocolo Namada atua como uma plataforma de Camada 1 baseada em consenso de proof-of-stake, projetada para oferecer privacidade interchain independente de ativos. Por meio do protocolo Inter-Blockchain Communication (IBC), Namada integra-se perfeitamente com chains de finalidade rápida, permitindo uma interoperabilidade fluida. Além disso, Namada estabelece uma ponte bidirecional sem confiança com Ethereum, facilitando uma comunicação segura e confiável entre as duas redes.

Namada prioriza a privacidade ao implementar uma iteração aprimorada do circuito Multi-Asset Shielded Pool (MASP). Essa versão atualizada permite que todos os tipos de ativos, incluindo tokens fungíveis e não fungíveis, utilizem um conjunto blindado compartilhado exatamente como o do Zcash. Como resultado, a transferência de ativos suportados na Namada torna-se difícil de identificar devido ao alto nível de privacidade envolvido. Além disso, a atualização mais recente do circuito Multi Asset Shielded Pool permite recompensas do conjunto blindado, um recurso ou incentivo inovador que aloca recursos para promover a privacidade como um bem público.

## Ponte com Ethereum + compatível com IBC

A integração da ponte com Ethereum à Namada elimina a necessidade de um protocolo separado, pois ela se torna parte integrante do ecossistema Namada. Os validadores dentro da Namada são encarregados de operar a ponte juntamente com o protocolo principal da Namada. Esses validadores também atuam como relayers quando se trata de transferir ativos para Namada, tornando desnecessário o envolvimento de atores adicionais. Por outro lado, ao transferir ativos para Ethereum, partes externas (conhecidas como relayers) estão envolvidas, embora não tenham responsabilidade pela validação ou segurança da ponte.

![Diagrama da ponte com Ethereum](/content-images/image-0fd8f754ba.webp)

O Protocolo Namada também tem a capacidade de se conectar perfeitamente com qualquer chain de finalidade rápida que suporte o protocolo Inter-Blockchain Communication (IBC). Quando se trata de interoperar com Ethereum, Namada implementa uma ponte especializada e segura com Ethereum que opera de maneira trustless. Essa ponte é cuidadosamente projetada para priorizar a segurança, impondo controles de fluxo para todas as conexões da ponte e tratando quaisquer transferências com falha no Ethereum como uma infração grave que pode resultar em penalidades de slashing.

## Recompensas do conjunto blindado

Na atualização mais recente do [Protocolo Namada](https://namada.net/blog/what-is-namada), os usuários que detêm ativos blindados são incentivados a participar ativamente no conjunto blindado compartilhado. Isso é possível por meio da integração do circuito MASP atualizado, que agora inclui o inovador Convert Circuit. Ao aproveitar esse novo recurso, Namada incentiva os usuários a contribuir para o conjunto blindado compartilhado mantendo ativos blindados.

Na Namada, o conjunto blindado é considerado um bem público não exclusivo e antirrival. Isso significa que, à medida que mais pessoas utilizam transferências blindadas, o nível de garantias de privacidade melhora para cada participante. O protocolo reconhece a importância da adoção e da participação coletiva no fortalecimento da privacidade para todos os usuários. Portanto, ao incentivar os usuários a manter ativos blindados e contribuir para o conjunto blindado compartilhado, Namada promove um ecossistema de privacidade mais forte e robusto.

## Transação de ativos blindados

O MASP ([Multi-Asset Shielded Pool](https://docs.namada.net/users/shielded-accounts)) estende o circuito Sapling do Zcash para dar suporte a transferências blindadas de ativos nativos e não nativos. Compartilhar um pool não significa que a privacidade seja independente do uso de um ativo. A documentação do Namada explica que ativos do mesmo tipo compartilham um conjunto de anonimato e que padrões públicos de blindagem e desblindagem ainda podem revelar a origem de um ativo.

![Diagrama da transação de ativos blindados](/content-images/image-1-512c639d56.webp)

Por exemplo, se apenas uma conta blinda BTC e depois o saca para a mesma conta, esses pontos públicos de entrada e saída podem ser vinculados, mesmo que os fundos tenham se movido de forma privada dentro do MASP. Quando mais contas blindam BTC, um saque posterior poderia pertencer a qualquer uma dessas contas. A participação relevante e o padrão de transações importam; o tamanho do pool compartilhado, por si só, não garante privacidade idêntica para todos os ativos.

## Menos taxas e transações rápidas

Namada combina dois elementos-chave para oferecer alta velocidade de transação e finalidade: geração rápida de provas e consenso moderno Byzantine Fault Tolerant (BFT). Esses dois recursos permitem que a Namada alcance uma taxa de processamento de transações comparável à da Visa, uma rede de pagamentos bem conhecida por sua alta capacidade de processamento. Geração rápida de provas refere-se à produção eficiente de provas criptográficas que validam a correção e a integridade das transações na blockchain. Ao empregar técnicas avançadas e otimizações, o Protocolo Namada minimiza a sobrecarga computacional necessária para gerar essas provas, resultando em verificação e confirmação rápidas das transações.

Além disso, Namada utiliza algoritmos modernos de consenso BFT, que garantem a integridade e o acordo das transações em toda a rede. Esses mecanismos de consenso permitem que Namada chegue a um consenso sobre a ordem e a validade das transações, fornecendo uma forte garantia de finalidade. Com a finalidade, as transações são consideradas irreversíveis, reduzindo o risco de gasto duplo ou reversão de transações. Namada segue uma abordagem semelhante à da Anoma, outro protocolo conhecido por suas soluções de escalabilidade. Namada adota instâncias fractais, que permitem a criação de chains aninhadas dentro da blockchain principal. Essa estrutura fractal possibilita escalabilidade horizontal ao distribuir a carga entre múltiplas instâncias, aumentando a capacidade e o desempenho geral da rede.

## Namada e a aliança estratégica com o Zcash

De acordo com uma publicação recente que pode ser encontrada no [Blog do Protocolo Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), a equipe por trás do Protocolo Namada tem o prazer de apresentar uma proposta e um pedido de comentários (RFC) para uma aliança estratégica entre os ativos, chains e comunidades da Namada e do Zcash.

![Diagrama da aliança estratégica Namada-Zcash](/content-images/image-2-68804c60f3.webp)

A aliança proposta abrange três elementos principais. Primeiro, haverá um fundo de subsídios que será criado para fornecer financiamento a projetos que tragam benefícios tanto para o Zcash quanto para a Namada. Em segundo lugar, um airdrop de tokens NAM será destinado aos detentores de ZEC. Por fim, há um plano para estabelecer uma ponte com confiança minimizada conectando o Zcash e a Namada. Uma vez implementada, essa ponte permitirá que os detentores de ZEC, chamados de Zolders, utilizem seu ZEC na Namada. Além disso, os Zolders terão a oportunidade de acessar os ecossistemas mais amplos de Cosmos e Ethereum por meio da Namada. Você pode saber mais sobre a aliança estratégica no [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Links de referência

- [Vídeo oficial do Protocolo Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Site oficial do Protocolo Namada](https://namada.net/)
- [Blog da Namada](https://namada.net/blog)
- [Documentação da Namada](https://docs.namada.net/)
