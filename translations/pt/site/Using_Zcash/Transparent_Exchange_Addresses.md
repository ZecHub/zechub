# O que são endereços TEX do Zcash?

Os endereços TEX do Zcash representam um tipo único de endereço de recebimento. Acrônimo de endereço "Transparent Exchange", trata-se de uma codificação **única**, do tipo Unified (bech32m), de um único endereço Transparente p2pkh.

Seu único propósito é informar a uma carteira compatível para fazer uma transação somente Transparente (T -> T).

A lógica é a seguinte: ao detectar um endereço TEX, uma carteira compatível o decodifica para obter o receptor Transparente que ele contém. A carteira então envia os fundos necessários para a tx do pool Shielded para um endereço Transparente efêmero separado, controlado pelo usuário (Z -> T). Em seguida, ela envia esses fundos para o receptor Transparente decodificado do endereço TEX (T -> T).

A proposta técnica para endereços TEX está descrita no Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define um tipo de endereço exclusivamente para receber fundos de endereços Transparentes.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Embora os endereços TEX ainda não sejam amplamente adotados, os usuários de Zcash podem vir a precisar usá-los no futuro.

## Quando preciso de um endereço TEX

### Você **precisa** de um endereço TEX ao enviar fundos para um endereço Transparente usando uma carteira que não oferece suporte para envio direto a um endereço Transparente.
Algumas carteiras simplesmente não permitem enviar diretamente para um endereço Transparente e **o destinatário pode não fornecer um equivalente TEX**. Portanto, **converter** de um endereço Transparente para um endereço TEX pode ser necessário às vezes. Isso pode ser feito manualmente executando a implementação de referência descrita na zip-320. Uma instância hospedada de um **conversor de Transparente para TEX** pode ser encontrada [AQUI](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### Você precisa de um endereço TEX ao enviar fundos para uma exchange centralizada que **EXIGE que esses fundos venham de uma origem Transparente**.
Atualmente, a [Binance](https://www.binance.com/) é a única exchange centralizada que usa endereços TEX (e eles são a principal razão para a criação do TEX).
Os endereços TEX informam a uma carteira compatível que todos os fundos enviados para esse endereço devem ser transparentes e excluem qualquer valor shielded de ser enviado para esse endereço.
Se uma exchange como a Binance rejeitar o valor enviado, ela tem os meios necessários para devolver esse valor ao endereço de onde ele veio. Isso também ajuda entidades como a Binance a cumprir as leis e regulamentações impostas por governos ou outras autoridades.


## Quais carteiras oferecem suporte a endereços TEX?

Você pode ver a lista mais atualizada em nossa página de [carteiras](https://zechub.wiki/wallets). Use o **filtro de endereços TEX**.
