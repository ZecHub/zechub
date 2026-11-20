# Так говорил Zakura на Akash (Regtest)

Запустите стек **Thus Spoke Zakura v0.4.1** на Akash: Zakura Regtest, lightwalletd и кошельке с **панелью управления / HTTP API**. Тестовые монеты не имеют ценности. Не отправляйте сюда ZEC основной сети.

Шаблон: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Исходный проект: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura), тег **v0.4.1**

### Изображения

| Сервис | Образ |
| --- | --- |
| Панель управления + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (закреплён в лаунчере версии 0.4.1) |

### Самостоятельная инициализация

При первом запуске контейнер `app` выполняет `ths-server init` на постоянном томе, затем `ths-server serve`. Serve повторяет попытки, пока не заработают JSON-RPC Zakura и lightwalletd. Запускать `ths` у провайдера не нужно: SDL — это среда выполнения.

### Как Akash публикует порты

Порты SDL `port` / `as` — это порты **контейнера**. Приложение принимает подключения на порту **8080** (`THS_LISTEN`); lightwalletd — на порту **9067**; RPC Zakura — на порту **18232**, а P2P — на порту **18233**. Внутри развёртывания сервисы уже используют эти порты (`http://zakura:18232`, `http://lightwalletd:9067`).

Это **не** порты на общедоступном IP-адресе провайдера.

**По умолчанию (в этом шаблоне):** выделенного IP-адреса нет.

| Сервис | Порт прослушивания контейнера | SDL `as` | Как отображается в аренде |
| --- | --- | --- | --- |
| `app` (панель управления + HTTP API) | 8080 | 80 (HTTP) | Имя хоста для входящего трафика, обычно на порту 80/443 — **откройте этот URI в браузере** |
| `lightwalletd` | 9067 | 9067 (TCP, глобальный) | `host:&lt;random-high-port&gt;` |
| RPC `zakura` | 18232 | 18232 (TCP, глобальный) | `host:&lt;random-high-port&gt;` |
| P2P `zakura` | 18233 | 18233 (TCP, глобальный) | `host:&lt;random-high-port&gt;` |

После подготовки аренды актуальные данные смотрите в разделе **Leases → URIs**. Откройте URI **`app`** для панели управления (тот же интерфейс, который `ths` открывает локально). Для компактных клиентов укажите URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Не вводите `:8080`, `:80` или `:9067` для IP-адреса провайдера, если порты не стали общедоступными благодаря аренде с выделенным IP-адресом.

**Выделенные IP-адреса** (`endpoints` / `kind: ip`) предоставляются за дополнительную плату и **не входят** в этот шаблон. Они позволяют закрепить общедоступный IP-адрес, а иногда и порт `as`. Не подключайте их, если они вам не нужны.

### Какой сайт использовать (платежи)

SDL одинаковый. Два веб-интерфейса Akash различаются **способом оплаты**.

| Сайт | Платежи | Кошелёк |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Обычная веб-оплата (карта / доступные в Console способы оплаты фиатом) | Учётная запись Console |
| [air.akash.network](https://air.akash.network) | Нативные платежи в сети Akash (AKT / ACT) | **Keplr** |

Выберите **Air**, если хотите платить Keplr напрямую в блокчейне. Выберите **Console**, если вам удобнее обычная веб-оплата.

### Развёртывание

**Оплата через веб-интерфейс (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Нативные платежи Akash через Keplr (Air)**

[Откройте этот шаблон в Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Создайте развёртывание из шаблона, примите предложение, дождитесь, пока в журналах `app` будет видно, что `ths-server serve` продолжает работать, затем откройте URI **`app`** для панели управления.

### Связанные материалы

- [Zakura на Akash](/guides/akash-network-zakura) — узел-валидатор Mainnet/Testnet
- [Zebra на Akash](/guides/akash-network-zebra)
- Книга: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
