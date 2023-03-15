# Visualizando direcciones de Zcash

Si es tu primera vez con Zcash de inmediato te darás cuenta de que pueden ocurrir dos tipos de [transacciones](#): *transparentes* y *protegidas o blindadas.* Si, en cambio, vienes siguiendo el desarrollo del ecosistema Zcash, puede que ya hayas aprendido sobre las [Direcciones Unificadas](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), o DU. Cuando la gente en la industria de Zcash habla sobre transacciones blindadas, se refieren a las transacciones que involucran direcciones que están codificadas para los protocolos *sapling* u *orchard*. Las DU son designadas para unir cualquier tipo de dirección privada o transparente en una sola. Esta generalización es la clave para simplificar la experiencia de usuario de aquí en adelante. El propósito de esta guía es complementar la comprensión de las direcciones unificadas con ejemplos visuales concretos.

### Tipos de direcciones

En la actualidad existen tres tipos principales en uso. Éstas incluyen:

- Transparente

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

- Sapling

![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

- Unificada

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)

Lo primero que hay que notar es cómo la longitud de cada dirección es diferente. Puedes verlo por el número de caracteres en la cadena de la dirección o mirando los códigos QR asociados. A medida que la longitud de la dirección aumenta, el código QR tiende a *alejarse* y comprimir más datos dentro del recuadro.

- `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu  tiene 35 caracteres de largo`
    
- `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53 tiene 78 caracteres`
    
- `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs tiene 213 caracteres`
    

Lo segundo que notarás es el prefijo de cada dirección. La transparente empieza con *t*, la sapling con *zs* y la DU con *u1*.

Vale la pena resaltar que:

Los pagos con direcciones Orchard no tienen una codificación propia. En su lugar, definimos “direcciones unificadas” que pueden agrupar otras de diferentes tipos, incluyendo a Orchard. Las direcciones unificadas, en la *Mainnet*, tienen una *Parte Legible por el Humano* que consiste en una “u”. Por ejemplo, tendrán el prefijo “u1”.

## Receptores de Direcciones Unificadas

Cómo se menciona [aquí (en inglés)](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), se pueden crear DU con diferentes receptores, con alguna combinación de tipos de direcciones transparentes, sapling y orchard. Además de la DU completa, aquí están las más comunes que encontrarás ahí afuera:

- transparente + sapling

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)
    
- transparente + orchard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)
    
- sapling + orchard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

- orchard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


Lo primero a tener en cuenta es como cada una de estas DU provienen de la misma clave privada. Lo segundo es la longitud de cada tipo de dirección.

- t+s
    `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e`tiene 141 caracteres
    
- t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws`
    tiene 141 caracteres
    
- s+o
    `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws`178 caracteres
    
- o
    `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws`106 caracteres
    

Lo tercero es cómo, visualmente, ¡cada DU es ligeramente diferente! El poder de las DU está en la elección que le dan los usuarios finales. Si en el futuro se necesitase un nuevo protocolo, las DU estarán listas para desplegarse.

### Fuentes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
