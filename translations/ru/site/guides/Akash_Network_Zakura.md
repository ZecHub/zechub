# Как запустить Zakura в сети Akash

Пошаговое руководство по запуску полного узла **Zakura** Zcash с помощью шаблона [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura — совместимый с консенсусом узел Zcash (ответвление от Zebra) с более быстрой синхронизацией, встроенной обрезкой истории и первоначальной загрузкой из снимка. В этом шаблоне закреплена версия **`zakuracore/zakura:1.8.1`** (по дайджесту; не используйте `:latest` или `1.1.1`).

### Что вы получаете

- P2P в Mainnet: контейнерный порт **8233**, опубликованный в интернете (см. сопоставление портов ниже)
- Постоянное хранилище с обрезанной историей (по умолчанию 64 ГиБ) и первоначальная загрузка из снимка Valar при первом запуске
- Prometheus **9999** и проверка работоспособности **8080** (внутренние порты, без публичного URI)
- JSON-RPC **8232** для размещённого рядом **lightwalletd**; LWD слушает порт контейнера **9067**, опубликованный в интернете

Флаги функций в SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. При включённом lightwalletd аутентификация по cookie отключена, поскольку lightwalletd не может читать файлы cookie.

### Какой сайт использовать (оплата)

SDL одинаковый. Два веб-интерфейса Akash различаются **способом оплаты**.

| Сайт | Оплата | Кошелёк |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Обычная оплата через сайт (карта / фиатные способы, доступные в Console) | Учётная запись Console |
| [air.akash.network](https://air.akash.network) | Нативная оплата в сети Akash (AKT / ACT) | **Keplr** |

Выберите **Air**, если хотите платить Keplr непосредственно в блокчейне. Выберите **Console**, если предпочитаете обычную оплату через сайт. Не рассчитывайте на нативные расчёты в Keplr через Console.

### Развёртывание

**Оплата через сайт (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Нативная оплата в Akash через Keplr (Air)**

[Открыть этот шаблон в Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Откройте подходящую ссылку выше (Console или Air).
2. В Air подключите **Keplr** и убедитесь, что у вас есть AKT/ACT для депозита и аренды. В Console завершите оплату через сайт, следуя подсказкам интерфейса.
3. Загрузите `zcash-zakura/deploy.yaml`, если он ещё не заполнен.
4. Внесите депозит, примите предложение и дождитесь начала аренды.
5. В журналах сначала должна появиться загрузка снимка (при первом запуске), затем `zakurad start`.
6. Откройте **Аренда → URI**. Используйте назначенный провайдером адрес хост:порт, а не 8233 или 9067 на публичном IP.

### Как Akash публикует порты

Порты SDL `port` / `as` (8233, 9067, 8232) — это **порты контейнера**. Zakura по-прежнему слушает 8233; lightwalletd — 9067; RPC на 8232 предназначен для бокового контейнера LWD (`zakura:8232`).

Это **не** порты на публичном IP провайдера.

**По умолчанию (в этом шаблоне):** выделенного IP нет. Каждый TCP-порт `global: true` сопоставляется со **случайным портом из верхнего диапазона** на общем хосте провайдера. Console/Air показывают их как URI аренды, например:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Узлы-пиры подключаются по URI **8233** (`provider.example:31482`). Кошельки с компактными блоками используют URI **9067** (TLS отключён, если вы не настроили завершение TLS самостоятельно). Укажите `ZAKURA_NETWORK__EXTERNAL_ADDR` — сопоставленный URI P2P, а не `:8233`.

**Внутренние** порты (RPC `8232`, метрики `9999`, проверка работоспособности `8080`) доступны только в сети развёртывания. Публичного URI нет.

**Выделенные IP-адреса** (`endpoints` / `kind: ip`) оплачиваются отдельно и **не входят** в этот шаблон. Они позволяют закрепить публичный IP, а иногда и порт `as`. Добавляйте их, только если вам нужен постоянный `host:8233`.

### Архивный узел и узел с обрезанной историей

По умолчанию используется режим **с обрезанной историей** (снимок около 11 ГиБ, диск 64 ГиБ). Чтобы хранить полную историю, задайте `SNAPSHOT_KIND=archive`, увеличьте диск как минимум до 350 ГиБ и задайте `ZAKURA_STATE__STORAGE_MODE=archive`.

### Связанные материалы

- [Zebra в Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (полная история, без снимка)
- [Thus Spoke Zakura в Akash](/guides/thus-spoke-zakura-akash) — панель Regtest и приложение (v0.4.1)
- Zakura исходный код: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Снимки: [zakura.com/snapshots/](https://zakura.com/snapshots/)
