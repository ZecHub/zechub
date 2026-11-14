<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) é um pacote de software criptográfico que oferece comunicação segura em canais inseguros. O PGP usa uma combinação de criptografia e assinaturas digitais para garantir que somente o destinatário pretendido possa ler uma mensagem e que o remetente seja quem diz ser.

## Ferramentas disponíveis

Existem muitas ferramentas PGP diferentes disponíveis, mas algumas das mais populares incluem:

* **[GnuPG (GPG)](https://gnupg.org/)**: Uma ferramenta de linha de comando OpenPGP gratuita e de código aberto. Escolha o pacote ou a interface gráfica adequada ao seu sistema operacional.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)**: Um cliente de e-mail para desktop gratuito e de código aberto, com suporte integrado a OpenPGP desde a versão 78. Ele não precisa do Mailvelope para criptografar e-mails.
* **[Mailvelope](https://mailvelope.com/)**: Uma extensão de navegador de código aberto que adiciona OpenPGP a serviços de webmail compatíveis, incluindo o Gmail. É uma ferramenta de webmail, não uma extensão para o Thunderbird.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Como gerar chaves

Para usar o PGP, você precisa gerar um par de chaves. Veja como gerar chaves PGP:

1. Abra seu software PGP.
2. Clique no botão "Generate Key".
3. Insira seu nome e seu endereço de e-mail.
4. Escolha o tamanho da chave. Quanto maior o tamanho da chave, mais seguras serão suas chaves.
5. Clique no botão "Generate".

Seu par de chaves PGP será gerado.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Como usar o PGP para e-mail

Depois de gerar um par de chaves PGP, você pode usá-lo para criptografar e descriptografar e-mails. Para criptografar um e-mail, você precisa conhecer a chave pública do destinatário. Em seguida, você pode usar sua ferramenta PGP para criptografar o e-mail com a chave pública do destinatário.

O e-mail criptografado ficará ilegível para qualquer pessoa que não tenha a chave privada do destinatário. Para descriptografar o e-mail, o destinatário pode usar a própria chave privada.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Boas práticas

Aqui estão algumas boas práticas para usar o PGP:

* Mantenha sua chave privada em segurança. A chave privada é a parte mais importante do seu par de chaves PGP. Se alguém obtiver sua chave privada, poderá descriptografar qualquer mensagem que tenha sido criptografada com sua chave pública.

![Boas práticas 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Boas práticas 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Compartilhe sua chave pública com pessoas em quem você confia. Você pode compartilhar sua chave pública enviando-a diretamente a elas ou fazendo o upload dela para um servidor de chaves PGP.
* Use senhas fortes para o seu chaveiro PGP. Seu chaveiro PGP é um arquivo que armazena suas chaves PGP. É importante usar uma senha forte para proteger esse arquivo.
* Mantenha seu software PGP atualizado. O software PGP é constantemente atualizado para corrigir bugs e melhorar a segurança. É importante manter seu software atualizado para garantir que você esteja usando os recursos de segurança mais recentes.

## Como criptografar um e-mail com PGP

* Abra seu software PGP.
* Abra o e-mail que você deseja criptografar.
* Clique no botão "Encrypt".
* Insira a chave pública do destinatário.
* Clique no botão "Encrypt".
* O e-mail será criptografado.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Como descriptografar um e-mail com PGP

* Abra seu software PGP.
* Abra o e-mail criptografado.
* Clique no botão "Decrypt".
* Insira sua chave privada.
* Clique no botão "Decrypt".
* O e-mail será descriptografado.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
