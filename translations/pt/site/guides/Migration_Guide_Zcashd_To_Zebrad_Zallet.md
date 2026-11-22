# Guia de migração: do zcashd para Zebrad/Zallet

O tradicional nó integral zcashd, mantido pela *Electric Coin Company (ECC)* / *Zodl*, foi substituído pelo Zebra e pela Zallet. O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026 e não funciona mais.

- O Zebra é uma implementação moderna em Rust do protocolo Zcash, desenvolvida pela Zcash Foundation
- A Zallet é uma carteira leve criada para se integrar perfeitamente aos nós Zebra, desenvolvida pela Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagrama: o zcashd se dividindo em zebrad, para as funções de nó, e Zallet, para as funções de carteira](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Este guia mostra a você como migrar do **zcashd** para o **Zebrad** e a **Zallet**, incluindo a configuração, a importação da carteira e a solução de problemas comuns de migração.

---

## O zcashd parou de funcionar em 18 de julho de 2026

**O que isso significa**

- O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026. Ele não vai mais sincronizar até a ponta da chain e não consegue enviar nem receber fundos. Isso já aconteceu, não é algo planejado.
- As duas funções do zcashd agora estão separadas: o **zebrad** é o nó integral, e a **Zallet** é a carteira.
- A Zallet está em **beta**. Podem ocorrer mudanças incompatíveis entre as versões, e alguns métodos JSON-RPC do zcashd ainda não foram implementados. Confira a [matriz de status dos métodos](https://zcash.github.io/zallet/) antes de depender de uma chamada específica.
- Se você ainda tem fundos **Sprout**, leia primeiro o aviso no passo 6. A Zallet não oferece suporte ao pool Sprout, e a forma habitual de mover esses fundos exigia um zcashd em execução.

**Por que migrar: além da descontinuação**

Mesmo deixando a descontinuação de lado, há motivos convincentes para migrar:
- Segurança e robustez: a segurança de memória e as ferramentas modernas do Rust reduzem os riscos de vulnerabilidades.
- Desempenho e eficiência: o Zebrad foi projetado para paralelismo, uso mais eficiente de recursos e sincronização mais rápida.
- Arquitetura modular: separar a lógica do nó (Zebrad) da interface da carteira (Zallet) oferece limites mais claros e melhores caminhos de atualização.
- Compatibilidade com o ecossistema futuro: ferramentas, melhorias e o restante do ecossistema do Zcash vão priorizar cada vez mais o Zebrad/a Zallet.
- Tranquilidade: evite ficar preso executando um componente descontinuado e sem suporte.

### Agora vamos ao guia de migração

**1. Faça backup de tudo**
* Faça backup do seu wallet.dat (ou de qualquer outro arquivo de carteira / armazenamento de chaves) do seu nó zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Salve o seu zcash.conf e quaisquer configurações personalizadas.
* Exporte uma cópia de todos os scripts RPC ou automações que você usa.
* Verifique se os seus backups são válidos (por exemplo, em outro ambiente, tente abri-los ou inspecioná-los).
* Revise de quais métodos JSON-RPC você depende atualmente.
* Compare com a tabela de compatibilidade planejada mantida no [site de suporte do Zcash](https://z.cash/support/zcashd-deprecation/) 
* Prepare-se para mudanças ou métodos ausentes (alguns podem exigir soluções alternativas ou adaptações).

**2. Requisitos do sistema e espaço em disco**
* O espaço em disco é o requisito que as pessoas mais subestimam. A chain do Zcash ultrapassou **270 GB** em agosto de 2026, então reserve pelo menos **300 GB** de espaço livre, de preferência em um SSD.
* Garanta que sua máquina tenha rede, CPU e RAM estáveis.
* Uma conexão com a internet 
* Se você pretende compilar a partir do código-fonte, tenha o Rust e o Cargo instalados.

**3. Instale / configure o Zebrad**
Você pode baixar um binário pré-compilado ou compilar a partir do código-fonte.
* A Zcash Foundation publica versões e binários do Zebra. Por exemplo, você pode usar um script de instalação ou baixar o binário adequado para o seu sistema operacional.

* Observe que, nas versões recentes do Zebra, [o endpoint RPC não é mais ativado por padrão no Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opção A: instalar via binário pré-compilado**  
No **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Isso instala a versão estável mais recente do zebrad.

**Opção B: compilar a partir do código-fonte**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Depois de compilar, mova o binário para o seu path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuração e inicialização**  
Gere uma configuração padrão:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edite o **zebrad.toml** conforme suas preferências (endereço de escuta, portas, diretório de estado, cache).

**Inicie o nó:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

O nó começará a sincronizar a partir do bloco gênese. Espere várias horas (ou mais), dependendo do hardware e da rede.

**5. Instale / configure a Zallet (carteira)**

A Zallet foi projetada para substituir a parte de carteira do zcashd.

Confira a página Zallet GitHub / de releases para obter os binários.

**Ou compile a partir do código-fonte:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Abra a GUI ou a CLI (conforme a sua instalação oferecer).
* Configure-a para se conectar ao seu nó Zebrad local via endpoint RPC ou API.

**6. Importando sua carteira zcashd para a Zallet**

Você não precisa de um zcashd em execução para isso. A Zallet lê o arquivo `wallet.dat` diretamente, o que é importante porque o zcashd não pode mais ser iniciado.

> **Guarde o `wallet.dat`.** A migração informa tudo o que não consegue representar em uma carteira Zallet em vez de importar, e esse material de chaves passa a existir apenas no `wallet.dat`. Não o exclua depois de migrar.

Execute `zallet init-wallet-encryption` primeiro. A Zallet criptografa o material de chaves para uma identidade age, e essa identidade precisa existir antes que qualquer chave seja importada.

Depois, converta sua configuração e sua carteira:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

O `migrate-zcashd-wallet` só está presente em builds com o recurso `zcashd-import`, e a leitura do `wallet.dat` requer o utilitário `db_dump` do Berkeley DB 6.2, a versão que o zcashd usava. Se você tiver mais de um arquivo de carteira, execute o comando uma vez por arquivo e adicione `--allow-multiple-wallet-imports` nas execuções seguintes; cada um se torna um conjunto próprio de contas. Seus `rpcuser` e `rpcpassword` não são transferidos, porque o JSON-RPC da Zallet usa autenticação por cookie por padrão; adicione credenciais com `zallet add-rpc-user` se precisar delas.

**O que é transferido**

* Seeds mnemônicas e as chaves derivadas delas, com as contas reconstruídas para corresponder à carteira zcashd
* Chaves de gastos Sapling importadas avulsas e chaves transparentes
* Entradas transparentes somente de observação que incluem sua chave pública ou redeem script
* Datas de criação das contas, para que a varredura da chain comece na altura certa

**O que não é transferido.** Estes itens são informados com contagens em vez de serem importados:

* **Chaves de gastos e fundos Sprout.** A Zallet não oferece suporte ao pool Sprout. O caminho documentado era retirar os fundos Sprout usando o zcashd antes de desativá-lo, e isso não é mais possível. Se isso afeta você, pergunte no [Discord de P&D do Zcash](https://discord.gg/xpzPR53xtU) ou no [fórum da comunidade](https://forum.zcashcommunity.com/) antes de fazer qualquer outra coisa.
* Entradas do catálogo de endereços
* Entradas somente de observação armazenadas sem chave pública ou redeem script, e entradas com chaves públicas não comprimidas
* Carteiras de regtest

**Fazendo backup depois.** Uma frase mnemônica sozinha não é um backup completo, porque as chaves importadas existem apenas no banco de dados da carteira. Guarde cópias seguras do `wallet.db`, do arquivo de identidade de criptografia age indicado pela opção `keystore.encryption_identity` e da sua frase mnemônica, e mantenha o `wallet.dat` original. Observe que o `wallet.db` em si não é criptografado: ele contém seu histórico de transações e suas chaves de visualização em texto claro, então guarde o backup em um lugar seguro.

**Nova varredura e sincronização da carteira**

* Depois que as chaves forem importadas, a Zallet vai iniciar uma nova varredura da chain via Zebrad.
* Aguarde um tempo para que a Zallet reconstrua seu saldo e seu histórico de transações.

**7. Verifique os saldos e a sincronização**

Após a importação, a Zallet vai se conectar ao seu nó Zebrad e fazer uma nova varredura da blockchain.
Quando a sincronização terminar, seus saldos e transações devem aparecer exatamente como antes.

Você pode verificar o status de sincronização do seu nó executando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ou confira os logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Solução de problemas**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problema</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Causa provável</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solução</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad não inicia</td>
        <td className="px-6 py-4">Porta em uso ou configuração incorreta</td>
        <td className="px-6 py-4">Verifique o **zebrad.toml** e use uma porta livre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronização lenta</td>
        <td className="px-6 py-4">Congestionamento da rede</td>
        <td className="px-6 py-4">Garanta uma internet estável e reinicie o Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transações faltando na carteira</td>
        <td className="px-6 py-4">Importação parcial de chaves</td>
        <td className="px-6 py-4">Importe as chaves novamente ou faça uma nova varredura na Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet não consegue se conectar ao nó</td>
        <td className="px-6 py-4">Nó parado ou endpoint incorreto</td>
        <td className="px-6 py-4">Inicie o Zebrad e verifique se a porta RPC está correta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet trava</td>
        <td className="px-6 py-4">Build desatualizado</td>
        <td className="px-6 py-4">Atualize para a versão mais recente do GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusão**

Migrar do zcashd para o Zebrad e a Zallet oferece a você uma experiência com o Zcash mais rápida, segura e moderna.
Com a segurança baseada em Rust, o design modular e ferramentas melhores, essa configuração garante que seu nó e sua carteira continuem preparados para o futuro à medida que o ecossistema do Zcash evolui.

Dica: mantenha as chaves da sua carteira offline e faça backups regulares dos seus dados do Zallet.
Acesse [zebra.zfnd.org](https://zebra.zfnd.org) para Zebra, e [The Zallet Book](https://zcash.github.io/zallet/) ou o [repositório Zallet](https://github.com/zcash/zallet) para Zallet. O capítulo [Migrating from zcashd](https://zcash.github.io/zallet/) do The Zallet Book é a referência oficial para o passo 6.
