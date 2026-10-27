# Guia de migração: de zcashd para Zebrad/Zallet

O nó integral tradicional zcashd, mantido pela *Electric Coin Company (ECC)* / *Zodl*, foi substituído por Zebra e Zallet. O zcashd chegou ao fim do suporte em 18 de julho de 2026 e não funciona mais.

- Zebra é uma implementação moderna em Rust do protocolo Zcash desenvolvida pela Zcash Foundation
- Zallet é uma carteira leve criada para se conectar perfeitamente aos nós Zebra, desenvolvida pela Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagrama: zcashd dividido em zebrad para as funções de nó e Zallet para as funções de carteira](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Este guia orienta você na migração de **zcashd** para **Zebrad** e **Zallet**, incluindo configuração, importação da carteira e solução de problemas comuns de migração.

---

## zcashd deixou de funcionar em 18 de julho de 2026

**O que isso significa**

- O zcashd chegou ao fim do suporte em 18 de julho de 2026. Ele não voltará a sincronizar com a ponta da chain e não pode enviar nem receber fundos. Isso já aconteceu, não está planejado.
- As duas funções do zcashd agora estão separadas: **zebrad** é o nó integral e **Zallet** é a carteira.
- Zallet está em **beta**. Podem ocorrer alterações incompatíveis entre versões, e alguns métodos JSON-RPC do zcashd ainda não estão implementados. Consulte a [matriz de status dos métodos](https://zcash.github.io/zallet/) antes de depender de uma chamada específica.
- Se você ainda tiver fundos **Sprout**, leia primeiro o aviso na etapa 6. Zallet não oferece suporte ao pool Sprout, e a forma usual de mover esses fundos exigia um zcashd em execução.

**Por que migrar - além da descontinuação**

Mesmo deixando a descontinuação de lado, há razões convincentes para migrar:

- Segurança e robustez: a segurança de memória do Rust e as ferramentas modernas reduzem os riscos de vulnerabilidades.
- Desempenho e eficiência: Zebrad foi projetado para paralelismo, uso mais eficiente de recursos e sincronização mais rápida.
- Arquitetura modular: separar a lógica do nó (Zebrad) da interface da carteira (Zallet) oferece limites mais claros e melhores caminhos de atualização.
- Compatibilidade com o ecossistema futuro: ferramentas, melhorias e o restante ecossistema Zcash visarão cada vez mais Zebrad/Zallet.
- Tranquilidade: evite ficar preso a um componente descontinuado e sem suporte.

### Agora, vamos aprofundar o guia de migração

**1. Faça backup de tudo**
* Faça backup do seu wallet.dat (ou de qualquer outro arquivo de carteira / armazenamento de chaves) do seu nó zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Guarde seu zcash.conf e quaisquer configurações personalizadas.
* Exporte uma cópia de quaisquer scripts RPC ou automações que você use.
* Verifique se seus backups são válidos (por exemplo, em outro ambiente, tente abri-los ou inspecioná-los).
* Revise os métodos JSON-RPC dos quais você depende atualmente.
* Compare com a tabela de compatibilidade planejada mantida no [site de suporte do Zcash](https://z.cash/support/zcashd-deprecation/) 
* Prepare-se para alterações ou métodos ausentes (alguns podem exigir uma solução alternativa ou adaptação).

**2. Requisitos do sistema e espaço em disco**
* O espaço em disco é o requisito que as pessoas subestimam. A chain do Zcash ultrapassou **270 GB** em agosto de 2026, então reserve pelo menos **300 GB** de espaço livre, em um SSD se possível.
* Certifique-se de que sua máquina tenha rede, CPU e RAM estáveis.
* Uma conexão com a internet 
* Se você planeja compilar a partir do código-fonte, tenha Rust e Cargo instalados.

**3. Instalar / configurar Zebrad**
Você pode baixar um binário pré-compilado ou compilar a partir do código-fonte.
* A Zcash Foundation publica versões e binários do Zebra. Por exemplo, você pode usar um script de instalação ou baixar o binário adequado para seu sistema operacional.

* Observe que, nas versões recentes do Zebra, [o endpoint RPC não é mais ativado por padrão no Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opção A: Instalar por meio de binário pré-compilado**  
No **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Isso instala a versão estável mais recente do zebrad.

**Opção B: Compilar a partir do código-fonte**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Após a compilação, mova o binário para seu caminho:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migração 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuração e inicialização**  
Gere uma configuração padrão:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migração2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edite **zebrad.toml** de acordo com suas preferências (endereço de escuta, portas, diretório de estado, cache).

**Inicie o nó:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

O nó começará a sincronizar a partir da gênese — espere várias horas (ou mais), dependendo do hardware e da rede.

**5. Instalar / configurar Zallet (carteira)**

Zallet foi projetada para substituir o componente de carteira do zcashd.

Consulte a página do GitHub / de versões do Zallet para obter binários.

**Ou compile a partir do código-fonte:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Inicie a GUI ou CLI (conforme sua instalação disponibilizar).
* Configure-a para se conectar ao seu nó Zebrad local por meio do endpoint RPC ou da API.

**6. Importar sua carteira zcashd para o Zallet**

Você não precisa de um zcashd em execução para isso. Zallet lê diretamente o arquivo `wallet.dat`, o que é importante porque o zcashd não pode mais ser iniciado.

> **Mantenha o `wallet.dat`.** A migração informa tudo o que não consegue representar em uma carteira Zallet em vez de importar, e esse material de chaves passa então a existir apenas no `wallet.dat`. Não o exclua após a migração.

Execute primeiro `zallet init-wallet-encryption`. Zallet criptografa o material de chaves para uma identidade age, e essa identidade deve existir antes que quaisquer chaves sejam importadas.

Em seguida, converta sua configuração e sua carteira:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` está presente apenas em compilações com o recurso `zcashd-import`, e a leitura de `wallet.dat` exige o utilitário `db_dump` do Berkeley DB 6.2, a versão usada pelo zcashd. Se você tiver mais de um arquivo de carteira, execute o comando uma vez por arquivo e adicione `--allow-multiple-wallet-imports` nas execuções posteriores; cada um se torna seu próprio conjunto de contas. Seu `rpcuser` e `rpcpassword` não são transferidos, porque o JSON-RPC do Zallet usa autenticação por cookie por padrão; adicione credenciais com `zallet add-rpc-user` se precisar delas.

**O que é transferido**

* Seeds mnemônicas e as chaves delas derivadas, com contas reconstruídas para corresponder à carteira zcashd
* Chaves de gastos Sapling importadas de forma independente e chaves transparentes
* Entradas transparentes somente para visualização que incluem sua chave pública ou script de resgate
* Datas de nascimento das contas, para que a análise da chain comece no momento correto

**O que não é transferido.** Estes itens são informados com contagens em vez de importados:

* **Chaves de gastos e fundos Sprout.** Zallet não oferece suporte ao pool Sprout. A forma documentada era mover os fundos Sprout usando o zcashd antes de desativá-lo, e isso não é mais possível. Se isso afetar você, pergunte no [Discord de P&D do Zcash](https://discord.gg/xpzPR53xtU) ou no [fórum da comunidade](https://forum.zcashcommunity.com/) antes de fazer qualquer outra coisa.
* Entradas do catálogo de endereços
* Entradas somente para visualização armazenadas sem uma chave pública ou script de resgate, e entradas com chaves públicas não comprimidas
* Carteiras Regtest

**Faça backup depois.** Uma mnemônica, por si só, não é um backup completo, porque as chaves importadas existem apenas no banco de dados da carteira. Mantenha cópias seguras de `wallet.db`, do arquivo de identidade de criptografia age indicado pela opção `keystore.encryption_identity` e da sua frase mnemônica, e mantenha o `wallet.dat` original. Observe que `wallet.db` não é, por si só, criptografado: contém seu histórico de transações e chaves de visualização em texto simples, então guarde o backup em um local seguro.

**Nova análise e sincronização da carteira**

* Depois que as chaves forem importadas, Zallet acionará uma nova análise da chain por meio do Zebrad.
* Dê algum tempo ao Zallet para reconstruir seu saldo e histórico de transações.

**7. Verificar saldos e sincronização**

Depois de importado, Zallet se conectará ao seu nó Zebrad e analisará novamente a blockchain.
Quando a sincronização estiver concluída, seus saldos e transações deverão aparecer exatamente como antes.

Você pode verificar o status de sincronização do seu nó executando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ou consulte os registros.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Solução de problemas**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problema</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Possível causa</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solução</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad não inicia</td>
        <td className="px-6 py-4">Porta em uso ou configuração incorreta</td>
        <td className="px-6 py-4">Verifique **zebrad.toml** e use uma porta livre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronização lenta</td>
        <td className="px-6 py-4">Congestionamento de rede</td>
        <td className="px-6 py-4">Garanta uma conexão de internet estável, reinicie o Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Faltam transações na carteira</td>
        <td className="px-6 py-4">Importação parcial de chaves</td>
        <td className="px-6 py-4">Importe novamente as chaves ou faça uma nova análise no Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet não consegue se conectar ao nó</td>
        <td className="px-6 py-4">Nó não está funcionando ou endpoint incorreto</td>
        <td className="px-6 py-4">Inicie o Zebrad e verifique a porta RPC correta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet falha</td>
        <td className="px-6 py-4">Compilação desatualizada</td>
        <td className="px-6 py-4">Atualize para a versão mais recente do GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusão**

Migrar de zcashd para Zebrad e Zallet proporciona a você uma experiência com o Zcash mais rápida, segura e moderna.
Com segurança baseada em Rust, design modular e melhores ferramentas, esta configuração garante que seu nó e carteira permaneçam preparados para o futuro à medida que o ecossistema do Zcash continua evoluindo.

Dica: mantenha as chaves da sua carteira offline e faça backup regularmente dos seus dados do Zallet.
Visite [zebra.zfnd.org](https://zebra.zfnd.org) para Zebra e [O Livro do Zallet](https://zcash.github.io/zallet/) ou o [repositório do Zallet](https://github.com/zcash/zallet) para Zallet. O capítulo [Migrar de zcashd](https://zcash.github.io/zallet/) de O Livro do Zallet é a referência oficial para o passo 6.
