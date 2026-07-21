<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) es un paquete de software criptográfico que proporciona comunicación segura a través de canales inseguros. PGP utiliza una combinación de cifrado y firmas digitales para garantizar que solo el destinatario previsto pueda leer un mensaje y que el remitente sea quien dice ser.

## Herramientas disponibles

Hay muchas herramientas PGP diferentes disponibles, pero algunas de las más populares incluyen:

* **[GPG](https://gpgtools.org/)**: GPG es una implementación de PGP gratuita y de código abierto que está disponible para Windows, macOS y Linux.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail es un cliente de correo electrónico PGP comercial que está disponible para Windows y macOS.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope es una extensión PGP gratuita y de código abierto para Gmail y Thunderbird.

![Herramientas PGP](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## Cómo generar claves

Para usar PGP, necesitas generar un par de claves: Cómo generar claves PGP:

1. Abre tu software PGP.
2. Haz clic en el botón "Generate Key".
3. Introduce tu nombre y dirección de correo electrónico.
4. Elige la longitud de la clave. Cuanto mayor sea la longitud de la clave, más seguras serán tus claves.
5. Haz clic en el botón "Generate".

Se generará tu par de claves PGP.

![Generar claves](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## Cómo usar PGP para el correo electrónico

Una vez que hayas generado un par de claves PGP, puedes usarlo para cifrar y descifrar correos electrónicos. Para cifrar un correo electrónico, necesitas conocer la clave pública del destinatario. Luego puedes usar tu herramienta PGP para cifrar el correo electrónico utilizando la clave pública del destinatario.

El correo electrónico cifrado será ilegible para cualquiera que no tenga la clave privada del destinatario. Para descifrar el correo electrónico, el destinatario puede usar su clave privada para descifrarlo.

![Correo electrónico PGP](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## Mejores prácticas

Estas son algunas mejores prácticas para usar PGP:

* Mantén segura tu clave privada. La clave privada es la parte más importante de tu par de claves PGP. Si alguien obtiene tu clave privada, podrá descifrar cualquier mensaje que haya sido cifrado con tu clave pública.

![Mejores prácticas 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Mejores prácticas 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* Comparte tu clave pública con personas en las que confíes. Puedes compartir tu clave pública enviándosela directamente o subiéndola a un servidor de claves PGP.
* Usa contraseñas seguras para tu llavero PGP. Tu llavero PGP es un archivo que almacena tus claves PGP. Es importante usar una contraseña segura para proteger este archivo.
* Mantén actualizado tu software PGP. El software PGP se actualiza constantemente para corregir errores y mejorar la seguridad. Es importante mantener tu software actualizado para asegurarte de que estás usando las funciones de seguridad más recientes.

## Cómo cifrar un correo electrónico con PGP

* Abre tu software PGP.
* Abre el correo electrónico que quieres cifrar.
* Haz clic en el botón "Encrypt".
* Introduce la clave pública del destinatario.
* Haz clic en el botón "Encrypt".
* El correo electrónico será cifrado.

![Cifrar correo electrónico](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Flujo de cifrado](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## Cómo descifrar un correo electrónico con PGP

* Abre tu software PGP.
* Abre el correo electrónico cifrado.
* Haz clic en el botón "Decrypt".
* Introduce tu clave privada.
* Haz clic en el botón "Decrypt".
* El correo electrónico será descifrado.

![Descifrar correo electrónico](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
