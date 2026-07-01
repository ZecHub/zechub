<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Nodos Lightwallet de Zcash

## Introducción

Zcash, una criptomoneda centrada en la privacidad, admite una función llamada "nodos lightwallet" que permite a los usuarios interactuar con la blockchain de Zcash sin descargar todo el historial de la blockchain. Esta página wiki ofrece una visión general de los nodos lightwallet, el papel del servicio "lightwalletd" en el ecosistema de Zcash, una lista actual de servidores de nodos lightwallet e instrucciones sobre cómo cambiar de servidor en billeteras populares como Ywallet y Zingo.

## Servicio Lightwalletd

El servicio "lightwalletd", abreviatura de "lightwallet daemon", desempeña un papel fundamental en el ecosistema de nodos lightwallet de Zcash. Actúa como intermediario que proporciona a los clientes ligeros (lightwallets) la información que necesitan para funcionar de manera eficaz. Aquí tienes una breve explicación del servicio lightwalletd:

__Agregador de datos__: Lightwalletd agrega datos de la blockchain de Zcash, como información de transacciones, datos de bloques e información del pool blindado.

__Verificación simplificada__: Lightwalletd realiza una verificación simplificada de estos datos, lo que permite a las lightwallets acceder a la información necesaria sin tener que validar toda la blockchain.

__Preservación de la privacidad__: El servicio mantiene la privacidad de los usuarios de Zcash al no requerir que expongan sus Viewing Key ni su información personal de transacciones.

__Sincronización eficiente__: Lightwalletd permite una sincronización eficiente para las lightwallets, reduciendo significativamente el tiempo y los recursos necesarios para ponerse al día con la blockchain de Zcash.


## Lista actual de servidores Lightwalletd

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Cambio de servidores en billeteras móviles

Cambiar el servidor del nodo lightwallet es relativamente sencillo. Busca y accede a la configuración avanzada dentro de la aplicación.

__Abrir YWallet/Zingo/Zashi/eZcash__: Inicia la billetera que prefieras en tu dispositivo.

#### YWallet:

En YWallet, es el icono de engranaje en la esquina superior derecha; ve a la pestaña de Zcash. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

En Zingo, está en el menú hamburguesa de la esquina superior izquierda; luego haz clic en configuración y desplázate hacia abajo

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

En Zashi, es el icono de engranaje en la esquina superior derecha; ve a Configuración avanzada y luego elige un servidor

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

En eZcash, está en el menú hamburguesa de la esquina superior izquierda; luego haz clic en Configuración y toca Avanzado

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Conclusión

Los nodos lightwallet de Zcash y el servicio lightwalletd ofrecen una forma cómoda y respetuosa con la privacidad para que los usuarios interactúen con la blockchain. La posibilidad de cambiar de servidor ofrece flexibilidad para seleccionar un nodo que se adapte mejor a tus necesidades.
