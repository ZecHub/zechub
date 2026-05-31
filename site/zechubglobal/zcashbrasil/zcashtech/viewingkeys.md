<a href="https://github.com/zechub/zechub/edit/main/site/zechubglobal/zcashbrasil/zcashtech/viewingkeys.md" target="_blank">
  <img src="https://img.shields.io/badge/Editar-blue" alt="Editar Página"/>
</a>

# Chaves de Visualização

> 🇺🇸 [English version](/zcash-tech/viewing-keys)

As chaves de visualização permitem que um usuário do Zcash divulgue seletivamente informações de transações blindadas a uma parte escolhida — sem transferir a capacidade de gastar fundos. São uma das principais ferramentas que tornam a privacidade do Zcash prática para exchanges, custodiantes, auditores e empresas que precisam de acesso de leitura limitado para uma finalidade específica.

## TL;DR

- Uma chave de visualização fornece acesso **somente leitura** à atividade blindada de um endereço ou conta.
- Uma chave de visualização **não pode mover fundos** — não tem autoridade de gasto.
- Chaves de visualização suportam **divulgação seletiva**: compartilhe histórico de transações com uma parte escolhida sem torná-lo público para todos.
- **Chaves de visualização de entrada** são úteis para detectar pagamentos recebidos mantendo as chaves de gasto seguras.
- **Chaves de visualização completas** revelam atividade mais ampla; compartilhe apenas com partes confiáveis para uma finalidade clara.
- **Chaves de visualização unificadas** (ZIP 316) agrupam informações de visualização para um Endereço Unificado em todos os tipos de receptores suportados.

---

## Explicação Principal

Endereços blindados do Zcash ocultam detalhes de transações na blockchain. Essa privacidade é útil por padrão, mas às vezes um usuário precisa provar algo sobre atividade blindada a outra parte — para confirmar um depósito, fornecer visibilidade de auditoria ou apoiar um fluxo de conformidade.

As chaves de visualização resolvem isso separando o acesso de leitura da autoridade de gasto. Uma parte com a chave de visualização correta pode verificar a blockchain e ver as informações blindadas que a chave está autorizada a revelar. Elas não podem autorizar transações ou mover fundos.

Chaves de visualização fazem parte do modelo de divulgação seletiva do Zcash. Endereços blindados da era Sapling introduziram a capacidade (especificada na [ZIP 310](https://zips.z.cash/zip-0310)), e os Endereços Unificados a expandiram por meio das Chaves de Visualização Unificadas da [ZIP 316](https://zips.z.cash/zip-0316).

---

## Por Que Usar uma Chave de Visualização?

A Electric Coin Co. descreve três casos de uso comuns:

**Detecção de depósitos em exchanges.** Uma exchange pode manter a autoridade de gasto em hardware seguro enquanto carrega uma chave de visualização de entrada em um nó de detecção conectado à Internet. O nó detecta depósitos de clientes em endereços blindados sem poder gastar os fundos.

**Auditorias de custodiantes.** Um custodiante pode dar a um auditor uma chave de visualização completa para cada endereço blindado relevante. O auditor pode verificar saldos e revisar atividade de transações passadas sem obter controle dos fundos.

**Diligência devida do cliente.** Uma exchange ou serviço regulamentado pode pedir a um cliente que compartilhe uma chave de visualização para revisar a atividade de transações blindadas como parte de um fluxo de diligência devida aprimorada.

---

## Tipos de Chaves de Visualização

| Tipo | O que revela | Quando usar |
|------|-------------|-------------|
| Chave de visualização de entrada | Apenas transações recebidas | Monitoramento de depósitos em exchanges |
| Chave de visualização completa | Todas as transações (entrada e saída) | Auditorias de custodiantes, revisão completa da conta |
| Chave de visualização unificada | Atividade cross-pool para um Endereço Unificado | Carteiras modernas; cobre Orchard, Sapling e receptores Transparentes |

---

## Como Encontrar Sua Chave de Visualização

### Zashi

1. Abra o Zashi e vá em **Configurações**.
2. Selecione **Frase de Recuperação** (ou **Exportar Chave de Visualização** se disponível na sua versão).
3. Autentique com PIN ou biometria do dispositivo.
4. Copie ou compartilhe a chave de visualização exibida.

### YWallet

1. Selecione **Backup** no canto superior direito da conta.
2. Autentique no dispositivo.
3. Copie a chave de visualização exibida.

### zcashd / Zebra (CLI)

Liste todos os endereços conhecidos:

```bash
./zcash-cli listaddresses
```

Exporte a chave de visualização para um Endereço Unificado ou endereço blindado Sapling:

```bash
./zcash-cli z_exportviewingkey "<endereço UA ou Z>"
```

---

## Como Usar uma Chave de Visualização

### Zashi

O Zashi suporta contas somente leitura. Importe uma chave de visualização para monitorar um endereço sem ter a chave de gasto naquele dispositivo.

### YWallet

1. Selecione **Conta** no canto superior direito.
2. Toque em **+** no canto inferior direito.
3. Escolha **Importar Chave de Visualização** e cole a chave.
4. A carteira adiciona uma conta somente leitura para aquele endereço.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="Tela de importação de chave de visualização no YWallet" width="200" height="280"/>
</a>

### zcashd (CLI)

Importe qualquer tipo de chave de visualização suportado:

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

### Explorador de blocos

Abra [mainnet.zcashexplorer.app/vk](https://mainnet.zcashexplorer.app/vk) e insira a chave de visualização para inspecionar atividade blindada compatível.

**Importante:** isso envia informações da chave de visualização para o serviço de explorador de blocos. Use apenas se estiver confortável em confiar ao operador as informações que a chave pode revelar.

---

## Erros Comuns

**Compartilhar uma chave de gasto em vez de uma chave de visualização.** Uma chave de gasto autoriza transações e pode mover fundos. Nunca a compartilhe quando o acesso somente leitura for o objetivo.

**Tratar chaves de visualização como públicas.** Chaves de visualização revelam informações financeiras sensíveis. Compartilhe-as apenas quando uma parte precisar dessa visibilidade e você entender o que a chave expõe.

**Assumir que uma chave de visualização mostra tudo.** O que ela revela depende do tipo de chave (entrada vs. completa vs. unificada), do tipo de endereço, do suporte da carteira e da direção da transação.

**Inserir uma chave de visualização em um site de terceiros não confiável.** Um explorador de blocos pode ser útil, mas também aprende tudo o que a chave pode ver. Use apenas com operadores confiáveis.

---

## Páginas Relacionadas

- [Pools Blindados](/using-zcash/shielded-pools)
- [Carteiras](/using-zcash/wallets)
- [Transações](/using-zcash/transactions)
- [zk-SNARKs](/zcash-tech/zk-snarks)
- [Halo](/zcash-tech/halo)

## Recursos

- [ZIP 310: Propriedades de Segurança das Chaves de Visualização Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Endereços Unificados e Chaves de Visualização Unificadas](https://zips.z.cash/zip-0316)
- [ECC: Explicando Chaves de Visualização](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC: Divulgação Seletiva e Chaves de Visualização](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC: Apresentação em Vídeo sobre Chaves de Visualização](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
