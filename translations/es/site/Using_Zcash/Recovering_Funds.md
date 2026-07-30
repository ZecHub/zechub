[![Editar página](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Recuperación de fondos de la billetera Zcash

**¿Por qué guardar tu clave privada?** 

Las claves privadas son el secreto de la seguridad de tus activos digitales. Mantenerlas seguras y nunca compartirlas con terceros es esencial. 

> En este contexto, una **frase semilla** puede considerarse equivalente a una clave privada.

Al mantener el control sobre tus claves privadas, el proceso de recuperación siempre es posible. Existen 2 tipos de claves privadas de Zcash (transparentes y blindadas), y puedes importarlas fácilmente a tu billetera, ya sea utilizando la función Sweep Funds o importándolas como una cuenta nueva. Al mantener el control sobre tus claves privadas, conservas el control total de tus activos, garantizando propiedad, seguridad y tranquilidad.

# Seguridad y responsabilidad

Es fundamental que los usuarios comprendan los riesgos relacionados con el manejo de claves privadas y mantengan estas claves protegidas contra accesos no autorizados. La seguridad de los fondos depende de la responsabilidad del usuario de proteger sus claves privadas.

## Recuperación de fondos con Ywallet

YWallet es reconocida como una de las mejores opciones para recuperar fondos inaccesibles, tanto desde claves privadas *solo transparentes* como blindadas.

### 1) Importación de clave privada 

1. Descarga Ywallet[](https://ywallet.app)

2. Una vez abierta, en la parte inferior derecha haz clic en 'More'

3. Selecciona 'Accounts'

4. En la esquina superior derecha haz clic en el signo más 

![Botón de signo más](https://i.postimg.cc/xJbVz7gB/plus.png)

5. Activa 'Restore an account' 

6. Ingresa la frase semilla o la clave privada

> **Nota**: Si tenías fondos en una billetera que no admite direcciones blindadas (Trust, Coinomi, Guarda, etc.), tendrás que usar la función 'Sweep Funds'.

### 2) Sweep Funds

1. Descarga Ywallet[](https://ywallet.app)

2. Una vez abierta, en la parte inferior derecha haz clic en 'More'

3. Desplázate hacia abajo hasta la sección Tools y haz clic en 'Sweep'

4. Ingresa tu frase semilla (Gap limit busca direcciones adicionales generadas por la semilla)

![Pantalla de Sweep Funds](https://i.postimg.cc/3055CBcN/sweep.png)

5. Ingresa el Value Pool para el destino que deseas usar (los exchanges usan Transparent)

6. Ingresa la dirección de destino donde deseas depositar los fondos. 

## Zkool

Consulta la documentación detallada de Zkool para otra vía de recuperación de fondos:

- [Documentación de Zkool](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator es una herramienta que recupera (¡excava!) ZEC posiblemente perdidos:

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
