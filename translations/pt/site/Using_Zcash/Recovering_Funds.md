[![Editar página](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Recuperação de Fundos de Carteiras Zcash

**Por que guardar sua chave privada?** 

As chaves privadas são o segredo da segurança dos seus ativos digitais. Mantê-las seguras e nunca compartilhá-las com terceiros é essencial. 

> Neste contexto, uma **Frase Semente** pode ser vista como o equivalente a uma chave privada.

Ao manter o controle sobre suas chaves privadas, o processo de recuperação é sempre possível. Existem 2 tipos de chaves privadas Zcash (transparentes e blindadas), e você pode importá-las facilmente para sua carteira, seja usando a função Sweep Funds ou importando-as como uma nova conta. Ao manter o controle sobre suas chaves privadas, você mantém controle total sobre seus ativos, garantindo propriedade, segurança e tranquilidade.

# Segurança e Responsabilidade

É crucial que os usuários entendam os riscos envolvidos ao lidar com chaves privadas e mantenham essas chaves protegidas contra acesso não autorizado. A segurança dos fundos depende da responsabilidade do usuário em proteger suas chaves privadas.

## Recuperação de Fundos com Ywallet

YWallet é reconhecida como uma das melhores opções para recuperar fundos inacessíveis, tanto de chaves privadas *somente transparentes* quanto blindadas.

### 1) Importação de Chave Privada 

1. Baixe o Ywallet[](https://ywallet.app)

2. Depois de abrir, clique em 'More' no canto inferior direito

3. Selecione 'Accounts'

4. No canto superior direito, clique no sinal de mais 

![Botão de sinal de mais](https://i.postimg.cc/xJbVz7gB/plus.png)

5. Ative 'Restore an account' 

6. Insira a Frase Semente ou a chave privada

> **Nota**: Se você tinha fundos em uma carteira que não oferece suporte a endereços blindados (Trust, Coinomi, Guarda etc.), será necessário usar o recurso 'Sweep Funds'.

### 2) Sweep Funds

1. Baixe o Ywallet[](https://ywallet.app)

2. Depois de abrir, clique em 'More' no canto inferior direito

3. Role para baixo até a seção Tools e clique em 'Sweep'

4. Insira sua frase semente (Gap limit procura endereços adicionais gerados pela semente)

![Tela de Sweep Funds](https://i.postimg.cc/3055CBcN/sweep.png)

5. Insira o Value Pool para o destino que você deseja usar (corretoras usam Transparent)

6. Insira o Endereço de Destino para onde deseja depositar os fundos. 

## Zkool

Confira a documentação detalhada do Zkool para outra opção de recuperação de fundos:

- [Documentação do Zkool](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator é uma ferramenta que recupera (escava!) ZEC possivelmente perdidos:

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
