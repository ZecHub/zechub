# Guia de Multisig do Zkool

Este guia fornece um passo a passo de como realizar transações multisig usando Zkool. Inclui a criação de contas, o envio ou recebimento de fundos e a configuração da geração distribuída de chaves (DKG) para multisig. Capturas de tela estão incluídas para cada etapa principal.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Demo do Zkool | O Sucessor do Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Criando uma Conta


1. Abra o **app Zkool** e vá para **Nova Conta**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Insira um **Nome da Conta** (ex.: Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Opcionalmente, ative **Use Internal Change** ou **Restore Account**, se necessário.


5. Após a criação, a conta aparecerá na sua **Lista de Contas**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Recebendo Fundos

Cada conta gera vários tipos de endereço:

**Unified Address**

**Endereço somente Orchard**

**Endereço Sapling**
  
**Endereço Transparente**


Selecione o tipo que deseja usar e compartilhe-o para receber fundos.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Enviando Fundos

1. Vá para a seção **Recipient**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Insira o **endereço do destinatário**.  

4. Especifique o **valor** e o **memo** opcional.  

5. Revise os detalhes da transação e **confirme**.  


Quando concluído, o saldo será atualizado na sua lista de contas.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Realizando Transações Multisig: Configurando a Geração Distribuída de Chaves (Multisig)

O multisig no Zkool usa **Distributed Key Generation (DKG)** para garantir que vários participantes controlem uma conta compartilhada.



### Etapa 1: Iniciar o DKG
Escolha um **Nome** para a carteira compartilhada (ex.: Anabelle).

Defina o **Número de Participantes**.
  
Escolha seu **ID de Participante**.
  
Defina o **Número de Signatários Necessários (Limite)**.
    
Selecione a **Conta de Financiamento**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Etapa 2: Adicionar Endereços dos Participantes
- Insira o **Unified Address** de cada participante (recomendado).


**Observação:** Se você usar um endereço somente Orchard ou somente Sapling, o multisig ficará limitado apenas àquele pool (Orchard ou Sapling).  
Isso significa que a carteira compartilhada não poderá receber fundos de outros pools.  
Para máxima compatibilidade e flexibilidade, use sempre **Unified Addresses**.  


### Etapa 3: Executar as Rodadas de DKG
Aguarde que todos os participantes troquem os pacotes da **rodada 1** e da **rodada 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Etapa 4: Finalizar o Endereço Compartilhado
Quando concluído, um **endereço compartilhado** é gerado.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Conclusão

Usando Zkool, você pode: criar contas, enviar e receber fundos e configurar uma **carteira multisig** usando Distributed Key Generation. Isso garante **maior segurança** e **gestão colaborativa e privada de fundos**.
