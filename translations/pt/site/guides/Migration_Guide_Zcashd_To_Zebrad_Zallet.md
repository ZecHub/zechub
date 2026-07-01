# Guia de Migração: De zcashd para Zebrad/Zallet

O ecossistema Zcash está evoluindo. O nó completo tradicional Zcashd, mantido pela *Electric Coin Company (ECC)* / *Zodl*, está sendo gradualmente substituído por Zebra e Zallet.

- Zebra é uma implementação moderna em Rust do protocolo Zcash desenvolvida pela Zcash Foundation
- Zallet é uma carteira leve construída para interagir perfeitamente com nós Zebra desenvolvidos pela Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Este guia orienta você na migração de **Zcashd** para **Zebrad** e **Zallet**, incluindo configuração, importação da carteira e solução de problemas comuns de migração.

---

## O projeto Zcash anunciou formalmente que o zcashd será descontinuado em 2025.

**Status da Descontinuação e o que isso significa**

- O projeto Zcash anunciou formalmente que o zcashd será descontinuado em 2025.
- Os nós completos estão sendo migrados para Zebrad, uma implementação em Rust, enquanto Zallet foi projetado para suceder o componente de carteira do zcashd.
- Em resposta, o projeto Zebra acompanha um marco de "Descontinuação do Zcashd" para garantir compatibilidade, migração de RPC e suporte ao ecossistema.
- Para muitos métodos RPC, Zebrad/Zallet buscarão ser substituições diretas (emulando ou correspondendo ao comportamento). Outros mudarão ou podem não ser suportados.

**Por que migrar — além da descontinuação**

Mesmo deixando a descontinuação de lado, há razões convincentes para migrar:
- Segurança e Robustez: a segurança de memória do Rust e suas ferramentas modernas reduzem os riscos de vulnerabilidades.
- Desempenho e Eficiência: o Zebrad foi projetado para paralelismo, uso mais eficiente de recursos e sincronização mais rápida.
- Arquitetura Modular: separar a lógica do nó (Zebrad) da interface da carteira (Zallet) oferece limites mais claros e melhores caminhos de atualização.
- Compatibilidade Futura com o Ecossistema: ferramentas, melhorias e o restante do ecossistema Zcash passarão a mirar cada vez mais em Zebrad/Zallet.
- Tranquilidade: evita ficar preso executando um componente descontinuado e sem suporte.

### Agora vamos mergulhar no guia de Migração

**1. Faça backup de tudo**
* Faça backup do seu wallet.dat (ou de qualquer outro arquivo de carteira / armazenamento de chaves) do seu nó zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Salve seu zcash.conf e quaisquer configurações personalizadas.
* Exporte uma cópia de quaisquer scripts RPC ou automações que você use.
* Verifique se seus backups são válidos (por exemplo, em outro ambiente, tente abri-los ou inspecioná-los).
* Revise de quais métodos JSON-RPC você depende atualmente.
* Compare com a tabela de compatibilidade planejada mantida no [site de suporte do Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com)
* Prepare-se para mudanças ou métodos ausentes (alguns podem exigir contornos ou adaptação).

**2. Requisitos do sistema e espaço em disco**
* Certifique-se de ter espaço em disco suficiente (a cadeia do Zcash é grande). Pelo menos 10 GB de espaço livre em disco.
* Certifique-se de que sua máquina tenha rede, CPU e RAM estáveis.
* Uma conexão com a internet
* Se você pretende compilar a partir do código-fonte, tenha Rust e Cargo instalados.

**3. Instale / configure o Zebrad**
Você pode baixar um binário pré-compilado ou compilar a partir do código-fonte.
* A Zcash Foundation publica versões e binários do Zebra. Por exemplo, você pode usar um script de instalação ou baixar o binário apropriado para o seu sistema operacional.

* Observe que, nas versões recentes do Zebra, [o endpoint RPC não vem mais habilitado por padrão no Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Opção A: Instalar via binário pré-compilado**  
No **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Isso instala a versão estável mais recente do zebrad.

**Opção B: Compilar a partir do código-fonte**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Após compilar, mova o binário para o seu path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configuração e inicialização**  
Gere uma configuração padrão:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Edite o **zebrad.toml** de acordo com suas preferências (endereço de escuta, portas, diretório de estado, cache).

**Inicie o nó:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

O nó começará a sincronizar a partir do gênese — espere várias horas (ou mais), dependendo do hardware e da rede.

**5. Instale / configure o Zallet (Carteira)**

O Zallet foi projetado para substituir a parte de carteira do zcashd.

Verifique a página do GitHub / de lançamentos do Zallet para obter os binários.

**Ou compile a partir do código-fonte:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Inicie a GUI ou CLI (conforme sua instalação oferecer).
* Configure-o para se conectar ao seu nó local Zebrad via endpoint RPC ou API.

**6. Importando sua carteira zcashd para o Zallet**  
Via exportação de chave privada

No zcashd, exporte suas chaves privadas:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* No Zallet, escolha Importar Chaves ou uma opção semelhante.
* Aponte para **zcashd_keys.txt**.
* O Zallet deve analisar e importar endereços ZEC e as chaves associadas.

**Via frase-semente** (se aplicável)

* Se sua carteira suportar backup por semente, use Restaurar a partir da Frase-Semente no Zallet.
* Isso só funciona se sua carteira zcashd foi derivada de uma semente (ou se você tiver conversão de semente).

**Reescaneamento da carteira e sincronização**

* Depois que as chaves forem importadas, o Zallet acionará um reescaneamento da cadeia via Zebrad.
* Aguarde algum tempo para o Zallet reconstruir seu saldo e histórico de transações.

**7. Verifique os saldos e a sincronização**

Depois de importado, o Zallet se conectará ao seu nó Zebrad e reescaneará a blockchain.
Quando a sincronização for concluída, seus saldos e transações deverão aparecer exatamente como antes.

Você pode verificar o status de sincronização do seu nó executando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Ou verificar os logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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
        <td className="px-6 py-4">Verifique o **zebrad.toml** e use uma porta livre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronização lenta</td>
        <td className="px-6 py-4">Congestionamento da rede</td>
        <td className="px-6 py-4">Garanta internet estável, reinicie o Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transações ausentes na carteira</td>
        <td className="px-6 py-4">Importação parcial de chaves</td>
        <td className="px-6 py-4">Importe as chaves novamente ou reescaneie no Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet não consegue se conectar ao nó</td>
        <td className="px-6 py-4">Nó não está em execução ou endpoint incorreto</td>
        <td className="px-6 py-4">Inicie o Zebrad e verifique a porta RPC correta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet trava</td>
        <td className="px-6 py-4">Build desatualizada</td>
        <td className="px-6 py-4">Atualize para a versão mais recente do GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusão**

Migrar de zcashd para Zebrad e Zallet oferece uma experiência Zcash mais rápida, segura e moderna.
Com a segurança baseada em Rust, design modular e melhores ferramentas, essa configuração garante que seu nó e sua carteira permaneçam prontos para o futuro à medida que o ecossistema Zcash continua evoluindo.

Dica: mantenha as chaves da sua carteira offline e faça backup regularmente dos seus dados do Zallet.
Visite [zebra.zfnd.org](https://zebra.zfnd.org) e [zallet.zfnd.org](https://zallet.zfnd.org) para atualizações e suporte da comunidade.
