# Guia de multisig do Zkool

Este guia mostra, passo a passo, como fazer transações multisig usando o Zkool. Ele inclui a criação de contas, o envio e o recebimento de fundos e a configuração da geração distribuída de chaves (DKG) para multisig. Há capturas de tela para cada etapa principal.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Criando uma conta


1. Abra o **app Zkool** e vá até **Nova conta**.


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. Digite um **Nome da conta** (por exemplo, Anabelle).  
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. Se precisar, ative **Usar troco interno** ou **Restaurar conta**.


5. Depois de criada, a conta vai aparecer na sua **Lista de contas**.  


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. Recebendo fundos

Cada conta gera vários tipos de endereço:

**Endereço unificado**

**Endereço somente Orchard**

**Endereço Sapling**
  
**Endereço transparente**


Selecione o tipo que você quer usar e compartilhe-o para receber fundos.  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. Enviando fundos

1. Vá até a seção **Destinatário**.  


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. Digite o **endereço do destinatário**.  

4. Informe o **valor** e, se quiser, um **memorando**.  

5. Revise os detalhes da transação e **confirme**.  


Quando a transação for concluída, o saldo é atualizado na sua lista de contas.  


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. Fazendo transações multisig: configurando a geração distribuída de chaves (multisig)

O multisig no Zkool usa a **geração distribuída de chaves (DKG)** para garantir que vários participantes controlem uma conta compartilhada.



### Passo 1: Inicie a DKG
Escolha um **Nome** para a carteira compartilhada (por exemplo, Anabelle).

Defina o **Número de participantes**.
  
Escolha o seu **ID de participante**.
  
Defina o **Número de assinantes necessários (limite)**.
    
Selecione a **Conta de financiamento**.
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### Passo 2: Adicione os endereços dos participantes
- Digite o **Endereço unificado** de cada participante (recomendado).


**Observação:** Se você usar um endereço somente Orchard ou somente Sapling, o multisig ficará limitado apenas a essa pool (Orchard ou Sapling).  
Isso significa que a carteira compartilhada não pode receber fundos de outras pools.  
Para ter máxima compatibilidade e flexibilidade, use sempre **Endereços unificados**.  


### Passo 3: Execute as rodadas da DKG
Aguarde até que todos os participantes troquem os pacotes da **rodada 1** e da **rodada 2**.  


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### Passo 4: Finalize o endereço compartilhado
Ao final do processo, um **endereço compartilhado** é gerado.  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## Conclusão

Usando o Zkool, você pode criar contas, enviar e receber fundos e configurar uma **carteira multisig** usando a geração distribuída de chaves. Isso garante **mais segurança** e uma **gestão de fundos colaborativa e privada**.
