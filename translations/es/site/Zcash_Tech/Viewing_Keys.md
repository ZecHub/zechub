<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Viewing Keys

Las direcciones blindadas permiten a los usuarios realizar transacciones revelando la menor cantidad de información posible en la blockchain de Zcash. ¿Qué sucede cuando necesitas divulgar información sensible sobre una transacción blindada de Zcash a una parte específica? Toda dirección blindada incluye una Viewing Key. Las Viewing Keys se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se añadieron al protocolo en la actualización de red Sapling. Las Viewing Keys son una parte crucial de Zcash, ya que permiten a los usuarios divulgar selectivamente información sobre las transacciones.

### ¿Por qué usar una Viewing Key?

¿Por qué querría un usuario hacer esto? Del blog de Electric Coin Co. sobre el tema...

*- Un exchange quiere detectar cuándo un cliente deposita ZEC en una dirección blindada, mientras mantiene las claves de **autoridad de gasto** en hardware seguro. El exchange podría generar una Viewing Key entrante y cargarla en un nodo de **detección** conectado a Internet, mientras la clave de gasto permanece en el sistema más seguro.*

*- Un custodio necesita proporcionar visibilidad de sus tenencias de Zcash a los auditores. El custodio puede generar una Viewing Key completa para cada una de sus direcciones blindadas y compartir esa clave con su auditor. El auditor podrá verificar el saldo de esas direcciones y revisar la actividad pasada de transacciones hacia y desde esas direcciones.* 

*- Un exchange puede necesitar realizar comprobaciones de diligencia debida sobre un cliente que hace depósitos desde una dirección blindada. El exchange podría solicitar la Viewing Key del cliente para su dirección blindada y usarla para revisar la actividad de transacciones blindadas del cliente como parte de estos procedimientos reforzados de diligencia debida.*

### Cómo encontrar tu Viewing Key

#### zcashd

* Lista todas las direcciones conocidas usando *./zcash-cli listaddresses*

* Luego ejecuta el siguiente comando para direcciones blindadas UA o Sapling

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* En la esquina superior derecha selecciona "Backup", autentica tu teléfono y luego simplemente copia tu Viewing Key que se muestra.

### Cómo usar tu Viewing Key

#### zcashd

* Usa lo siguiente con cualquier vkey o ukey: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* En la esquina superior derecha, selecciona "Account", haz clic en "+" en la esquina inferior derecha para añadir e importar tu Viewing Key y agregar tu cuenta de 'solo lectura'.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Simplemente dirige tu navegador [aquí](https://zcashblockexplorer.com/vk) y espera los resultados. Nota: este resultado ahora está en el nodo de zcashblockexplorer y, por lo tanto, estás confiando esta información a los propietarios de zcashblockexplorer.com

### Recursos

Aunque es una gran tecnología, se recomienda que uses Viewing Keys solo cuando sea necesario.

Consulta este tutorial sobre Viewing Keys. A continuación se muestra una lista de recursos sobre el tema si quieres profundizar más:

- [ECC, Explicación de las Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgación selectiva y Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentación en video sobre la Viewing Key de Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
