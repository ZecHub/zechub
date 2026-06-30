# Guía de Multisig de Zkool

Esta guía ofrece un recorrido paso a paso sobre cómo realizar transacciones multisig usando Zkool. Incluye la creación de cuentas, el envío o la recepción de fondos y la configuración de la generación distribuida de claves (DKG) para multisig. Se incluyen capturas de pantalla para cada paso principal.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Demostración de Zkool | El sucesor de Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Crear una cuenta


1. Abre la **app de Zkool** y ve a **New Account**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Introduce un **Nombre de cuenta** (p. ej., Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Opcionalmente, activa **Use Internal Change** o **Restore Account** si es necesario.


5. Después de crearla, la cuenta aparecerá en tu **Lista de cuentas**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Recibir fondos

Cada cuenta genera varios tipos de direcciones:

**Unified Address**

**Dirección solo Orchard**

**Dirección Sapling**
  
**Dirección transparente**


Selecciona el tipo que quieres usar y compártelo para recibir fondos.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Enviar fondos

1. Ve a la sección **Recipient**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Introduce la **dirección del destinatario**.  

4. Especifica la **cantidad** y el **memo** opcional.  

5. Revisa los detalles de la transacción y **confirma**.  


Una vez completado, el saldo se actualiza en tu lista de cuentas.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Realizar transacciones Multisig: Configurar la generación distribuida de claves (Multisig)

El multisig en Zkool usa **Distributed Key Generation (DKG)** para garantizar que varios participantes controlen una cuenta compartida.



### Paso 1: Iniciar DKG
Elige un **Nombre** para la billetera compartida (p. ej., Anabelle).

Establece el **Número de participantes**.
  
Elige tu **ID de participante**.
  
Define el **Número de firmantes requeridos (umbral)**.
    
Selecciona la **Cuenta de financiación**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Paso 2: Agregar direcciones de los participantes
- Introduce la **Unified Address** de cada participante (recomendado).


**Nota:** Si usas una dirección solo Orchard o solo Sapling, el multisig quedará limitado únicamente a ese pool (Orchard o Sapling).  
Esto significa que la billetera compartida no podrá recibir fondos de otros pools.  
Para lograr la máxima compatibilidad y flexibilidad, usa siempre **Unified Addresses**.  


### Paso 3: Ejecutar las rondas de DKG
Espera a que todos los participantes intercambien los paquetes de **ronda 1** y **ronda 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Paso 4: Finalizar la dirección compartida
Una vez completado, se genera una **dirección compartida**.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Conclusión

Con Zkool, puedes: crear cuentas, enviar y recibir fondos, y configurar una **billetera multisig** usando Distributed Key Generation. Esto garantiza **mayor seguridad** y una **gestión colaborativa y privada de los fondos**.
