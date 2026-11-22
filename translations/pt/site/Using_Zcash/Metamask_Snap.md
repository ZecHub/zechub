<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Guia de integração MetaMask Zcash Snap

> Guarde e envie ZEC blindado pela extensão de navegador MetaMask, usando o Zcash Snap da ChainSafe e a carteira web WebZjs.

## Resumo

* O ChainSafe Zcash Snap adiciona ZEC blindado ao MetaMask no desktop (Chrome, Edge, Firefox). Nenhum software Zcash separado é necessário.
* Suas chaves Zcash são derivadas da sua frase de recuperação do MetaMask. Essa única frase agora protege tanto seu ETH quanto seu ZEC.
* Você gerencia o ZEC pela carteira WebZjs em webzjs.chainsafe.dev, e não na própria lista de ativos do MetaMask.
* Sua conta recebe um endereço unificado, para que os remetentes paguem você no pool mais privado que eles suportam.
* Abasteça a carteira fazendo uma conversão (por exemplo, de ETH para ZEC) ou sacando ZEC de uma corretora para o seu endereço blindado.
* Recuperação: reinstale o MetaMask e o Snap e, em seguida, importe sua frase de recuperação existente.

## Explicação principal

Um MetaMask Snap é um pequeno complemento isolado em sandbox que ensina o MetaMask a lidar com uma nova blockchain. O Zcash Snap, criado pela ChainSafe e auditado pela Hacken, permite que o MetaMask derive chaves Zcash a partir da sua frase de recuperação existente e assine transações Zcash.

O próprio MetaMask não mostra um saldo de ZEC. Em vez disso, a carteira web WebZjs se conecta ao Snap, sincroniza com a rede Zcash por meio de um servidor lightwalletd e mostra seus endereços e seu saldo. As provas blindadas são calculadas no seu navegador com WebAssembly, e é por isso que os envios podem levar um momento.

As etapas abaixo abordam a instalação do Snap, a conexão do WebZjs, o abastecimento da carteira, o envio e o recebimento, e a verificação das partes do seu endereço unificado.

## Guia completo

Para um passo a passo completo e uma explicação visual, assista a este [**guia em YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

O MetaMask agora suporta **Zcash blindado (ZEC)** por meio do **Zcash Snap desenvolvido pela ChainSafe**, permitindo que você envie, receba e gerencie ZEC privado diretamente na carteira do seu navegador. Auditado pela **Hacken** e listado no **diretório oficial de Snaps do MetaMask**, ele **não requer nenhum software Zcash separado** - apenas o MetaMask e o Snap.

---

## **Pré-requisitos**


> [**Extensão MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (somente desktop) - Chrome, Edge ou Firefox.
> Conta MetaMask - Frase semente protegida; o Snap deriva as chaves Zcash dela.  
> Conexão estável com a internet - Para sincronizar com a rede Zcash.  
> Fundos - ETH para converter em ZEC ou ZEC vindo de uma corretora.

> **Dica:** Proteja sua frase de recuperação do MetaMask - ela controla tanto o ETH quanto o ZEC.

---

## **1. Instale o Zcash Snap**

1. Acesse o [**diretório de Snaps do MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Pesquise por [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) ou [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Clique em **Install/Add to MetaMask**.
4. Aprove permissões como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opcional) Adicione a rede Zcash**

No MetaMask, escolha **Add Network** e insira:

Para a **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Isso habilita as informações da rede e os links do explorador.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Para a **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` é um servidor lightwalletd compatível com WebZjs (gRPC-web) mantido por [zec.rocks](https://zec.rocks) (@emersonian). Para a testnet, use `https://zjs.zec.rocks/testnet`. Se você mesmo executar a carteira web WebZjs, este é o valor a ser definido como `LIGHTWALLETD_PROXY`.

---

## **3. Conecte-se à carteira ChainSafe WebZjs**

1. Acesse [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Clique em **Connect MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Aprove a conexão.  
4. Veja o resumo da sua conta Zcash, incluindo:
   - Endereços unificados e endereço transparente

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Aguarde a conclusão da sincronização.




---

## **4. Abasteça sua carteira**

> **Conversão de ETH -> ZEC** - Use serviços como **LeoDex** e envie para o seu endereço blindado.  
> **Saque de corretora** - Saque o ZEC comprado para o seu endereço blindado WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Use endereços blindados (z) para ter **privacidade total**.

---

## **5. Envie / receba ZEC**

1. Em **WebZjs**, vá para **Transfer Balance**.  
2. Insira:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirme a transação no MetaMask (assine a transação).  
5. Os fundos recebidos aparecerão no WebZjs após a confirmação.

---

## **6. Verifique / solucione problemas**

> Confira o **WebZjs** para ver os saldos atualizados **(o MetaMask não listou o ZEC diretamente)** .  
> Se ocorrerem problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Dica de segurança:** Instale somente o **ChainSafe Snap auditado**; revise as permissões antes de aprovar.

---

## **7. Verifique os componentes do endereço**

1. Vá para a seção **Receive** - seu endereço unificado será exibido por padrão.  
2. Copie o endereço unificado e acesse o [explorador de blocos Zcash](https://mainnet.zcashexplorer.app/).  
3. Cole seu endereço unificado na barra de pesquisa.  
4. Agora você verá todos os componentes do endereço unificado, que incluem:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Observações adicionais**

> Use a [**versão mais recente do MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - a versão pública suporta Snaps.  
> As provas blindadas podem levar algum tempo, pois o WebAssembly faz o cálculo no navegador.  
> A recuperação é simples: instale o MetaMask e o Snap e, em seguida, importe sua frase semente existente.  
> O Snap usa por padrão **ZEC blindado**; os endereços transparentes **não são o foco**.  
> Use [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) para confirmações de transações.
