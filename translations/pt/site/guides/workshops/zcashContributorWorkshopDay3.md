# Dia 3 do Workshop



## Análise de Dados

* A ciência de analisar dados brutos usando sistemas, ferramentas e técnicas especializadas para identificar padrões, tendências e insights


Envolve:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Dinheiro eletrônico criptografado. A primeira criptomoeda a desenvolver criptografia de conhecimento zero para pagamentos privados peer-to-peer.

nota: Se você quiser dados precisos em que CONFIA, é recomendável executar seu próprio nó completo [zebrad]. Você pode configurar a
infraestrutura z3 [ zebrad + zainod/lightwalletd + "wallet of choice here" ] se quiser uma solução completa e robusta. Você acessa
os dados usando RPC's (Chamadas de Procedimento Remoto)

Para uma demonstração rápida de como isso funciona, assista a este vídeo:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Demonstração do Workshop

Este workshop vai se concentrar em coletar e transformar dados no nível da carteira. Esse é o nível em que a maioria das pessoas vai acessar
a blockchain da Zcash.


### Caso de uso ( Criar um arquivo .csv de todas as transações de uma conta específica no Zkool)

Este é um cenário popular em que alguém precisaria organizar e otimizar suas finanças pessoais *digitais*.

#### Passo 1

Abra o Zkool e selecione a conta que você quer usar

nota: Vamos usar uma carteira testnet para esta demonstração.

nota2: Estamos escolhendo o Zkool aqui, mas QUALQUER carteira que tenha funcionalidade de exportação vai funcionar!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Passo 2


Vá ao menu no canto superior direito e selecione "Exportar Transações"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Passo 3

Baixe o script bash que vamos usar para transformar nossos dados. Para os Desenvolvedores que estiverem assistindo, vou usar bash, que
é padrão na maioria das distribuições Linux, mas você pode usar a linguagem de sua preferência. 

Para não desenvolvedores ou estudantes que estão começando, usem IA! 

Alguns exemplos de prompts para começar:

"Como posso usar "bash/rust/python/ ... etc." para transformar arquivos CSV"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

nota: Você ainda precisa entender o básico, mas realizar estes workshops é como você entende o FLUXO do processo.

nota2: A IA normalmente não é privada, então tenha ainda mais cuidado ao usá-la como estudante!

#### Passo 4

Configure os scripts para uso e execute

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Passo 5 Usar os dados

Abra no libreOffice ou em qualquer visualizador de CSV para usar!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
