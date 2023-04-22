# Claves de visualización

Las direcciones protegidas permiten a los usuarios realizar transacciones revelando la menor cantidad de información posible en la blockchain de Zcash. ¿Qué sucede cuando necesitas divulgar información sensible sobre una transacción protegida de Zcash a una parte específica? Cada dirección protegida incluye una clave de visualización. Las claves de visualización se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se agregaron al protocolo en la actualización de red Sapling. Las claves de visualización son una parte crucial de Zcash ya que permiten a los usuarios divulgar selectivamente información sobre transacciones.

### ¿Por qué usar una clave de visualización?

¿Por qué un usuario querría hacer esto? Según el blog de Electric Coin Co. sobre el asunto... 

*- Un intercambio quiere detectar cuando un cliente deposita ZEC en una dirección protegida, mientras mantiene las claves de "autoridad de gasto" en hardware seguro (por ejemplo, HSM). El intercambio podría generar una clave de visualización entrante y cargarla en un nodo "de detección" conectado a Internet, mientras que la clave de gasto permanece en el sistema más seguro.*

*- Un custodio necesita proporcionar visibilidad de sus tenencias de Zcash a los auditores. El custodio puede generar una clave de visualización completa para cada una de sus direcciones protegidas y compartir esa clave con su auditor. El auditor podrá verificar el saldo de esas direcciones y revisar la actividad de transacciones pasadas hacia y desde esas direcciones.*

*- Un intercambio puede necesitar realizar controles de debida diligencia sobre un cliente que realiza depósitos desde una dirección protegida. El intercambio podría solicitar la clave de visualización del cliente para su dirección protegida y usarla para revisar la actividad de transacciones protegidas del cliente como parte de estos procedimientos de debida diligencia mejorados.*

*(Originalmente en ingles, enlace a continuación)*

### Cómo encontrar tu clave de visualización

#### zcashd

* Lista todas las direcciones conocidas usando ` ./zcash-cli listaddresses`

* Luego emite el siguiente comando para las direcciones protegidas UA o Sapling

  `./zcash-cli z_exportviewingkey "<dirección UA o Z>"`

#### ywallet

* En la esquina superior derecha, selecciona Backup, autentica tu teléfono y luego copia simplemente tu clave de visualización que se muestra.

### Cómo usar tu clave de visualización

#### zcashd

* Usa lo siguiente con cualquier vkey o ukey:

`./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000`

#### ywallet

* En la esquina superior derecha, selecciona Accounts y haz clic en el círculo verde en la esquina inferior derecha para agregar tu cuenta solo para lectura

![myViewKey](https://user-images.githubusercontent.com/81990132/208585568-46065002-6682-4ff4-ae8b-d206205b5d9b.png)


#### zcashblockexplorer.com

* Simplemente apunte su navegador a [aquí](https://zcashblockexplorer.com/vk) ¡y espere los resultados! nota: este resultado está ahora en el nodo zcashblockexplorer y, por lo tanto, está confiando esta información a los propietarios de zcashblockexplorer.com

### Recursos

Si bien es una gran tecnología, se recomienda que use las claves de visualización según sea necesario.

Consulte este tutorial sobre claves de visualización. A continuación se muestra una lista de recursos sobre el tema si desea profundizar:

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
