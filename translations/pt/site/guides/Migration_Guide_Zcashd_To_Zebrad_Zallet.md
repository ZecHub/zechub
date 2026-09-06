# Guia de Migração: De zcashd para Zebrad/Zallet

O nó completo tradicional zcashd, mantido pela *Electric Coin Company (ECC)* / *ZODL*, foi substituído por Zebra e Zallet. O zcashd atingiu a sua interrupção de fim de suporte em 18 de julho de 2026 e deixou de funcionar.

- Zebra é uma implementação moderna em Rust do protocolo Zcash, desenvolvida pela Zcash Foundation
- Zallet é uma wallet leve criada para interagir sem problemas com nós Zebra, desenvolvida pela ZODL

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagrama: zcashd dividido em zebrad para as funções de nó e Zallet para as funções de wallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Este guia acompanha-o na migração de **Zcashd** para **Zebrad** e **Zallet**, incluindo configuração, importação da wallet e resolução de problemas comuns de migração.

---

## zcashd deixou de funcionar em 18 de julho de 2026

**O que isto significa**

- zcashd atingiu a sua interrupção de fim de suporte em 18 de julho de 2026. Não voltará a sincronizar com o topo da cadeia e não pode enviar nem receber fundos. Isto já aconteceu, não está planeado.
- As duas funções do zcashd estão agora separadas: **zebrad** é o nó completo e **Zallet** é a wallet.
- Zallet está em **beta**. Podem ocorrer alterações incompatíveis entre lançamentos, e alguns métodos JSON-RPC do zcashd ainda não estão implementados. Consulte a [matriz de estado dos métodos](https://zcash.github.io/zallet/) antes de depender de uma chamada específica.
- Se ainda tiver fundos **Sprout**, leia primeiro o aviso no passo 6. Zallet não suporta o pool Sprout, e a forma habitual de mover esses fundos exigia um zcashd em execução.

**Porquê Migrar — Para Além da Descontinuação**

Mesmo deixando a descontinuação de lado, existem razões convincentes para migrar:
- Segurança e Robustez: A segurança de memória do Rust e as ferramentas modernas reduzem os riscos de vulnerabilidades.
- Desempenho e Eficiência: Zebrad foi concebido para paralelismo, utilização mais eficiente de recursos e sincronização mais rápida.
- Arquitetura Modular: Separar a lógica do nó (Zebrad) da UI da wallet (Zallet) oferece limites mais claros e melhores caminhos de atualização.
- Compatibilidade com o Ecossistema Futuro: Ferramentas, melhorias e o restante ecossistema Zcash visarão cada vez mais Zebrad/Zallet.
- Tranquilidade: Evite ficar preso a executar um componente descontinuado e sem suporte.

### Agora, vamos aprofundar o guia de migração

**1. Faça Cópias de Segurança de Tudo**
* Faça uma cópia de segurança do seu wallet.dat (ou de qualquer outro ficheiro de wallet / armazenamento de chaves) do seu nó zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Guarde o seu zcash.conf e quaisquer definições personalizadas.
* Exporte uma cópia de quaisquer scripts RPC ou automatizações que utilize.
* Verifique se as suas cópias de segurança são válidas (por exemplo, noutro ambiente, tente abri-las ou inspecioná-las).
* Reveja de quais métodos JSON-RPC depende atualmente.
* Compare com a tabela de compatibilidade planeada, mantida no [site de suporte do Zcash](https://z.cash/support/zcashd-deprecation/) 
* Prepare-se para alterações ou métodos em falta (alguns poderão necessitar de soluções alternativas ou adaptação).

**2. Requisitos do Sistema e Espaço em Disco**
* O espaço em disco é o requisito que as pessoas subestimam. A cadeia Zcash ultrapassou os **270 GB** em agosto de 2026, portanto reserve pelo menos **300 GB** de espaço livre, num SSD se possível.
* Certifique-se de que a sua máquina tem rede, CPU e RAM estáveis.
* Uma ligação à Internet 
* Se planeia compilar a partir do código-fonte, tenha Rust e Cargo instalados.

**3. Instalar / Configurar Zebrad**
Pode transferir um binário pré-compilado ou criar a partir do código-fonte.
* A Zcash Foundation publica lançamentos e binários para Zebra. Por exemplo, pode utilizar um script de instalação ou transferir o binário adequado ao seu sistema operativo.

* Tenha em atenção que, em versões recentes do Zebra, [o endpoint RPC já não está ativado por predefinição no Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opção A: Instalar através de binário pré-compilado**  
Em **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Isto instala a versão estável mais recente do zebrad.

**Opção B: Criar a partir do código-fonte**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Após a criação, mova o binário para o seu path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migração 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuração e Inicialização**  
Gere uma configuração predefinida:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migração2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edite **zebrad.toml** conforme as suas preferências (endereço de escuta, portas, diretório de estado, cache).

**Inicie o nó:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

O nó começará a sincronizar a partir da génese — conte com várias horas (ou mais), dependendo do hardware e da rede.

**5. Instalar / Configurar Zallet (Wallet)**

Zallet foi concebido para substituir a componente de wallet do zcashd.

Consulte a página de GitHub / lançamentos de Zallet para obter binários.

**Ou crie a partir do código-fonte:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Inicie a GUI ou CLI (conforme disponibilizado pela sua instalação).
* Configure-a para ligar ao seu nó Zebrad local através de um endpoint RPC ou API.

**6. Importar a Sua Wallet zcashd para Zallet**

Não precisa de um zcashd em execução para isto. Zallet lê diretamente o ficheiro `wallet.dat`, o que é importante porque o zcashd já não pode ser iniciado.

> **Mantenha o `wallet.dat`.** A migração reporta tudo o que não consegue representar numa wallet Zallet, em vez de o importar, e esse material de chave passa a existir apenas em `wallet.dat`. Não o elimine após a migração.

Execute primeiro `zallet init-wallet-encryption`. Zallet cifra o material das chaves numa identidade age, e essa identidade tem de existir antes de importar quaisquer chaves.

Depois, converta a sua configuração e a sua wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` está presente apenas em compilações com a funcionalidade `zcashd-import`, e a leitura de `wallet.dat` requer o utilitário `db_dump` do Berkeley DB 6.2, a versão utilizada pelo zcashd. Se tiver mais do que um ficheiro de wallet, execute o comando uma vez por ficheiro e adicione `--allow-multiple-wallet-imports` nas execuções posteriores; cada uma torna-se o seu próprio conjunto de contas. O seu `rpcuser` e `rpcpassword` não são transferidos, porque o JSON-RPC de Zallet utiliza autenticação por cookie por predefinição; adicione credenciais com `zallet add-rpc-user` se precisar delas.

**O que é transferido**

* Seeds mnemónicas e as chaves delas derivadas, com as contas reconstruídas para corresponder à wallet zcashd
* Chaves de gasto Sapling importadas de forma autónoma e chaves transparentes
* Entradas transparentes apenas de observação que incluem a respetiva chave pública ou script de resgate
* Datas de nascimento das contas, para que a análise da cadeia comece à altura correta

**O que não é transferido.** Estes itens são reportados com contagens em vez de serem importados:

* **Chaves de gasto e fundos Sprout.** Zallet não suporta o pool Sprout. O percurso documentado consistia em mover os fundos Sprout usando zcashd antes de o descontinuar, e isso já não é possível. Se isto o afetar, pergunte no [Discord de I&D do Zcash](https://discord.gg/xpzPR53xtU) ou no [fórum da comunidade](https://forum.zcashcommunity.com/) antes de fazer qualquer outra coisa.
* Entradas do livro de endereços
* Entradas apenas de observação armazenadas sem uma chave pública ou script de resgate, e entradas com chaves públicas não comprimidas
* Wallets Regtest

**Fazer cópias de segurança depois.** Uma mnemónica por si só não é uma cópia de segurança completa, porque as chaves importadas existem apenas na base de dados da wallet. Mantenha cópias seguras de `wallet.db`, do ficheiro de identidade de cifragem age indicado pela opção `keystore.encryption_identity`, e da sua frase mnemónica, e mantenha o `wallet.dat` original. Tenha em atenção que `wallet.db` não é por si só cifrado: contém o seu histórico de transações e chaves de visualização em texto simples, por isso guarde a cópia de segurança num local seguro.

**Nova Análise e Sincronização da Wallet**

* Assim que as chaves forem importadas, Zallet acionará uma nova análise da cadeia através de Zebrad.
* Reserve algum tempo para que Zallet reconstrua o seu saldo e histórico de transações.

**7. Verificar Saldos e Sincronização**

Depois de importado, Zallet ligar-se-á ao seu nó Zebrad e analisará novamente a blockchain.
Quando a sincronização estiver concluída, os seus saldos e transações deverão aparecer exatamente como antes.

Pode verificar o estado de sincronização do seu nó executando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ou consulte os registos.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagem](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Resolução de Problemas**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problema</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Possível Causa</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solução</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad não inicia</td>
        <td className="px-6 py-4">Porta em utilização ou configuração incorreta</td>
        <td className="px-6 py-4">Verifique **zebrad.toml** e utilize uma porta livre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronização lenta</td>
        <td className="px-6 py-4">Congestionamento da rede</td>
        <td className="px-6 py-4">Assegure uma Internet estável, reinicie Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet sem transações</td>
        <td className="px-6 py-4">Importação parcial de chaves</td>
        <td className="px-6 py-4">Importe novamente as chaves ou analise novamente em Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet não consegue ligar-se ao nó</td>
        <td className="px-6 py-4">Nó não está em execução ou endpoint incorreto</td>
        <td className="px-6 py-4">Inicie Zebrad e verifique a porta RPC correta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet falha</td>
        <td className="px-6 py-4">Compilação desatualizada</td>
        <td className="px-6 py-4">Atualize para o lançamento mais recente do GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusão**

Migrar de zcashd para Zebrad e Zallet proporciona-lhe uma experiência Zcash mais rápida, segura e moderna.
Com segurança baseada em Rust, design modular e melhores ferramentas, esta configuração garante que o seu nó e wallet permanecem preparados para o futuro à medida que o ecossistema Zcash continua a evoluir.

Sugestão: Mantenha as chaves da sua wallet offline e faça regularmente cópias de segurança dos seus dados Zallet.
Visite [zebra.zfnd.org](https://zebra.zfnd.org) para Zebra, e [O Livro de Zallet](https://zcash.github.io/zallet/) ou o [repositório Zallet](https://github.com/zcash/zallet) para Zallet. O capítulo [Migrar de zcashd](https://zcash.github.io/zallet/) de O Livro de Zallet é a referência oficial para o passo 6.
