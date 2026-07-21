<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Viewing Keys

Endereços blindados permitem que os usuários transacionem revelando o mínimo de informação possível na blockchain da Zcash. O que acontece quando você precisa divulgar informações sensíveis sobre uma transação blindada da Zcash para uma parte específica? Todo endereço blindado inclui uma Viewing Key. Viewing Keys foram introduzidas na [ZIP 310](https://zips.z.cash/zip-0310) e adicionadas ao protocolo na atualização de rede Sapling. Viewing Keys são uma parte crucial da Zcash, pois permitem que os usuários divulguem seletivamente informações sobre transações.

### Por que usar uma Viewing Key?

Por que um usuário desejaria fazer isso? Do blog da Electric Coin Co. sobre o assunto...

*- Uma exchange quer detectar quando um cliente deposita ZEC em um endereço blindado, mantendo as chaves de **autoridade de gasto** em hardware seguro. A exchange poderia gerar uma chave de visualização de entrada e carregá-la em um nó de **detecção** conectado à Internet, enquanto a chave de gasto permanece no sistema mais seguro.*

*- Um custodiante precisa fornecer visibilidade de suas reservas de Zcash para auditores. O custodiante pode gerar uma Viewing Key completa para cada um de seus endereços blindados e compartilhar essa chave com seu auditor. O auditor poderá verificar o saldo desses endereços e revisar a atividade de transações passadas de e para esses endereços.* 

*- Uma exchange pode precisar realizar verificações de due diligence em um cliente que faz depósitos a partir de um endereço blindado. A exchange poderia solicitar a Viewing Key do cliente para seu endereço blindado e usá-la para revisar a atividade de transações blindadas do cliente como parte desses procedimentos reforçados de due diligence.*

### Como encontrar sua Viewing Key

#### zcashd

* Liste todos os endereços conhecidos usando *./zcash-cli listaddresses*

* Em seguida, execute o seguinte comando para endereços blindados UA ou Sapling

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* No canto superior direito, selecione "Backup", autentique seu telefone e então simplesmente copie sua Viewing Key exibida.

### Como usar sua Viewing Key

#### zcashd

* Use o seguinte com qualquer vkey ou ukey: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* No canto superior direito, selecione "Account", clique em "+" no canto inferior direito para adicionar e importar sua Viewing Key e adicionar sua conta de 'somente leitura'.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Basta apontar seu navegador para [aqui](https://zcashblockexplorer.com/vk) e aguardar os resultados! nota: este resultado agora está no nó do zcashblockexplorer e, portanto, você está confiando essas informações aos proprietários de zcashblockexplorer.com

### Recursos

Embora seja uma ótima tecnologia, recomenda-se que você use Viewing Keys apenas quando necessário.

Confira este tutorial sobre Viewing Keys. Uma lista de recursos sobre o tema está abaixo, caso você queira se aprofundar:

- [ECC, Explicando Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgação Seletiva e Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Apresentação em Vídeo sobre a Viewing Key da Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
