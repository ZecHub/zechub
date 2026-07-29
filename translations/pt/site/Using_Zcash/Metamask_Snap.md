# Guia de Integração do MetaMask Zcash Snap

Para um passo a passo completo e uma explicação visual, assista a este [**guia no YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Como usar ZEC no Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

O MetaMask agora oferece suporte a **Zcash (ZEC) shielded** por meio do **Zcash Snap desenvolvido pela ChainSafe**, permitindo que você envie, receba e gerencie ZEC privada diretamente na sua carteira do navegador. Auditado pela **Hacken** e listado no **diretório oficial de MetaMask Snaps**, ele **não exige nenhum software Zcash separado** - apenas MetaMask e o Snap.

---

## **Pré-requisitos**


> [**Extensão MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (somente desktop) - Chrome, Edge ou Firefox.
> Conta MetaMask - Frase-semente protegida; o Snap deriva dela as chaves Zcash.  
> Conexão de Internet Estável - Para sincronizar com a rede Zcash.  
> Fundos - ETH para trocar por ZEC ou ZEC de uma exchange.

> **Dica:** Proteja sua frase de recuperação do MetaMask - ela controla tanto ETH quanto ZEC.

---

## **1. Instale o Zcash Snap**

1. Vá até o [**diretório de MetaMask Snaps**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Procure por [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) ou [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Clique em **Install/Add to MetaMask**.
4. Aprove permissões como:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![instalação-do-Zcash-snap](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


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
Isso habilita informações da rede e links do explorador.
![Adicionar-uma-rede-personalizada....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Para a **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Conecte-se à carteira ChainSafe WebZjs**

1. Acesse [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Clique em **Connect MetaMask Snap**.  

![carteira-web-Zcash](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Aprove a conexão.  
4. Veja o resumo da sua conta Zcash, incluindo:
   - Unified addresses e Transparent address

![resumo-da-conta-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Aguarde a sincronização ser concluída.




---

## **4. Adicione fundos à sua carteira**

> **Trocar ETH -> ZEC** - Use serviços como **LeoDex** e envie para seu endereço shielded.  
> **Saque de exchange** - Saque o ZEC comprado para seu endereço shielded do WebZjs.  

![TROCA-LEODEX](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Use endereços shielded (z) para **privacidade total**.

---

## **5. Enviar / Receber ZEC**

1. No **WebZjs**, vá para **Transfer Balance**.  
2. Insira:
```
   - Shielded recipient address  
   - Amount
```
   ![Transferir-Saldo](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Confirme a transação no MetaMask (assine a transação).  
5. Os fundos recebidos aparecerão no WebZjs após a confirmação.

---

## **6. Verificar / Solução de problemas**

> Verifique o **WebZjs** para saldos atualizados **(o MetaMask ainda não listou ZEC diretamente)** .  
> Se ocorrerem problemas:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Dica de segurança:** Instale apenas o **ChainSafe Snap auditado**; revise as permissões antes de aprovar.

---

## **7. Verifique os componentes do endereço**

1. Vá até a seção **Receive** - seu Unified Address será exibido por padrão.  
2. Copie o Unified Address e acesse o [Explorador de Blocos Zcash](https://mainnet.zcashexplorer.app/).  
3. Cole seu Unified Address na barra de pesquisa.  
4. Agora você verá todos os componentes do Unified Address, que incluem:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![componentes-do-endereço](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Notas adicionais**

> Use a [**versão mais recente do MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - a versão pública oferece suporte a Snaps.  
> As provas shielded podem levar tempo; o WebAssembly faz o processamento no navegador.  
> A recuperação é simples: instale o MetaMask e o Snap e depois importe sua seed existente.  
> O Snap usa por padrão **ZEC shielded**; endereços transparentes **não são o foco**.  
> Use [zcashblockexplorer.com](https://zcashblockexplorer.com) para confirmações de transações.
