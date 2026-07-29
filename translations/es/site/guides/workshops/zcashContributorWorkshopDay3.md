# Día 3 del taller



## Análisis de datos

* La ciencia de analizar datos sin procesar utilizando sistemas, herramientas y técnicas especializadas para identificar patrones, tendencias e información valiosa


Implica:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Dinero electrónico cifrado. La primera criptomoneda en desarrollar cifrado de conocimiento cero para pagos privados entre pares.

nota: Si quieres datos precisos en los que CONFÍES, se recomienda ejecutar tu propio nodo completo [zebrad]. Puedes configurar la
infraestructura z3 [ zebrad + zainod/lightwalletd + "wallet of choice here" ] si quieres una solución completa y robusta. Accedes a
los datos usando RPC's(Remote Procedure Calls)

Para una demostración rápida de cómo funciona esto, mira este video:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Demostración del taller

Este taller se centrará en recopilar y transformar datos desde el nivel de la wallet. Este nivel es donde la mayoría de la gente accederá a
la cadena de bloques de Zcash.


### Caso de uso ( Crear un archivo .csv de todas las transacciones de una cuenta determinada en Zkool)

Este es un escenario popular en el que alguien necesitaría organizar y optimizar sus finanzas personales *digitales*.

#### Paso 1

Abre Zkool y selecciona la cuenta que quieres usar

nota: Usaremos una wallet de testnet para esta demostración.

nota2: Estamos eligiendo Zkool aquí, ¡pero CUALQUIER wallet que tenga funcionalidad de exportación funcionará!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Paso 2


Ve al menú superior derecho y selecciona "Exportar transacciones"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Paso 3

Descarga el script bash que usaremos para transformar nuestros datos. Para los desarrolladores que estén viendo esto, usaré bash, que
es estándar en la mayoría de las distribuciones de Linux, pero puedes usar el lenguaje que prefieras. 

Para no desarrolladores o estudiantes que están empezando, ¡usa IA! 

Algunos prompts de ejemplo que pueden ayudarte a comenzar:

"How can I use "bash/rust/python/ ... etc." to transform CSV files"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

nota: Aun así necesitas entender lo básico, pero realizar estos talleres es la forma en que entiendes el FLUJO del proceso.

nota2: La IA normalmente no es privada, ¡así que ten mucho cuidado al usarla como estudiante!

#### Paso 4

Configura los scripts para usarlos y ejecútalos

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Paso 5 Usar datos

¡Ábrelo en libreOffice o en cualquier visor de CSV para usarlo!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
