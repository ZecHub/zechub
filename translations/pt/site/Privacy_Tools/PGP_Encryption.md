<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) é um pacote de software criptográfico que fornece comunicação segura por canais inseguros. O PGP usa uma combinação de criptografia e assinaturas digitais para garantir que apenas o destinatário pretendido possa ler uma mensagem e que o remetente seja quem diz ser.

## Ferramentas Disponíveis

Existem muitas ferramentas PGP diferentes disponíveis, mas algumas das mais populares incluem:

* **[GPG](https://gpgtools.org/)**: GPG é uma implementação de PGP gratuita e de código aberto, disponível para Windows, macOS e Linux.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail é um cliente de e-mail PGP comercial, disponível para Windows e macOS.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope é uma extensão PGP gratuita e de código aberto para Gmail e Thunderbird.

![Ferramentas PGP](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## Como Gerar Chaves

Para usar PGP, você precisa gerar um par de chaves: Como gerar chaves PGP:

1. Abra seu software PGP.
2. Clique no botão "Generate Key".
3. Insira seu nome e endereço de e-mail.
4. Escolha o comprimento da chave. Quanto maior o comprimento da chave, mais seguras serão suas chaves.
5. Clique no botão "Generate".

Seu par de chaves PGP será gerado.

![Gerar Chaves](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## Como Usar PGP para E-mail

Depois de gerar um par de chaves PGP, você pode usá-lo para criptografar e descriptografar e-mails. Para criptografar um e-mail, você precisa conhecer a chave pública do destinatário. Em seguida, você pode usar sua ferramenta PGP para criptografar o e-mail usando a chave pública do destinatário.

O e-mail criptografado será ilegível para qualquer pessoa que não tenha a chave privada do destinatário. Para descriptografar o e-mail, o destinatário pode usar sua chave privada para descriptografar o e-mail.

![E-mail PGP](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## Boas Práticas

Aqui estão algumas boas práticas para usar PGP:

* Mantenha sua chave privada em segurança. A chave privada é a parte mais importante do seu par de chaves PGP. Se alguém obtiver sua chave privada, poderá descriptografar quaisquer mensagens que tenham sido criptografadas com sua chave pública.

![Boas Práticas 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Boas Práticas 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* Compartilhe sua chave pública com pessoas em quem você confia. Você pode compartilhar sua chave pública enviando-a diretamente a elas ou fazendo upload dela para um servidor de chaves PGP.
* Use senhas fortes para seu chaveiro PGP. Seu chaveiro PGP é um arquivo que armazena suas chaves PGP. É importante usar uma senha forte para proteger esse arquivo.
* Mantenha seu software PGP atualizado. O software PGP é constantemente atualizado para corrigir bugs e melhorar a segurança. É importante manter seu software atualizado para garantir que você esteja usando os recursos de segurança mais recentes.

## Como criptografar um e-mail com PGP

* Abra seu software PGP.
* Abra o e-mail que você deseja criptografar.
* Clique no botão "Encrypt".
* Insira a chave pública do destinatário.
* Clique no botão "Encrypt".
* O e-mail será criptografado.

![Criptografar E-mail](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Fluxo de Criptografia](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## Como descriptografar um e-mail com PGP

* Abra seu software PGP.
* Abra o e-mail criptografado.
* Clique no botão "Decrypt".
* Insira sua chave privada.
* Clique no botão "Decrypt".
* O e-mail será descriptografado.

![Descriptografar E-mail](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
