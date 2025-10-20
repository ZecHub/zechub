import 'dart:math';

import 'package:flutter/material.dart';
import 'dart:ui' show FontFeature;
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:warp_api/warp_api.dart';

import '../accounts.dart';
import '../generated/intl/messages.dart';
import '../appsettings.dart';
import '../store2.dart';
import '../tablelist.dart';
import 'avatar.dart';
import 'utils.dart';
import 'widgets.dart';

// Shared width for the trailing amount column in transaction list items.
// Used by the Balance page header to align the "See all >" pill with numbers.
const double kTxTrailingWidth = 102.0; // 15% narrower to tighten trailing slot and header pill

class TxPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => TxPageState();
}

class TxPageState extends State<TxPage> {
  @override
  void initState() {
    super.initState();
    syncStatus2.latestHeight?.let((height) {
      Future(() async {
        final txListUpdated =
            await WarpApi.transparentSync(aa.coin, aa.id, height);
        if (txListUpdated) aa.update(height); // reload if updated
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.toString();
    return SortSetting(
      child: Observer(
        builder: (context) {
          aaSequence.seqno;
          aaSequence.settingsSeqno;
          syncStatus2.changed;
          return Scaffold(
            appBar: AppBar(
              title: Text(S.of(context).history),
              actions: [
                if (location.startsWith('/blank/history'))
                  IconButton(
                    icon: Icon(Icons.close),
                    onPressed: () => GoRouter.of(context).go('/blank'),
                  ),
              ],
            ),
            body: TableListPage(
              listKey: PageStorageKey('txs'),
              padding: EdgeInsets.fromLTRB(17, 8, 17, 8),
              view: appSettings.txView,
              items: aa.txs.items,
              metadata: TableListTxMetadata(),
            ),
          );
        },
      ),
    );
  }

}

void injectMockTxsIfEmpty({void Function()? notify}) {
  if (aa.txs.items.isNotEmpty) return;
  final now = DateTime.now();
  final latest = syncStatus2.latestHeight ?? 3000000;
  final demo = <Tx>[];
  void addTx({
    required int id,
    required int height,
    required DateTime ts,
    required double value,
    required String txId,
    required String fullId,
    String? address,
    String? contact,
    String? memo,
  }) {
    final confs = (syncStatus2.latestHeight?.let((h) => h - height + 1)) ?? 3;
    demo.add(Tx(
      id,
      height,
      confs,
      ts,
      txId,
      fullId,
      value,
      address,
      contact,
      memo,
      const [],
    ));
  }

  addTx(
    id: 1,
    height: latest - 120,
    ts: now.subtract(Duration(hours: 8)),
    value: 0.5234,
    txId: 'u_in_1',
    fullId: 'uaddr_incoming_1',
    address: 'u1qf...mock',
    contact: 'Alice (Unified)',
    memo: 'Payment for lunch',
  );
  addTx(
    id: 2,
    height: latest - 110,
    ts: now.subtract(Duration(hours: 7, minutes: 20)),
    value: -0.1178,
    txId: 'u_out_1',
    fullId: 'uaddr_outgoing_1',
    address: 'u1zo...mock',
    contact: 'Bob (Unified)',
    memo: 'Tip',
  );
  addTx(
    id: 3,
    height: latest - 90,
    ts: now.subtract(Duration(hours: 6, minutes: 45)),
    value: 1.0025,
    txId: 'sap_in_1',
    fullId: 'sapling_incoming_1',
    address: 'zs1...mock',
    contact: 'Carol (Sapling)',
    memo: 'Reimbursement',
  );
  addTx(
    id: 4,
    height: latest - 80,
    ts: now.subtract(Duration(hours: 5, minutes: 10)),
    value: -0.3501,
    txId: 'sap_out_1',
    fullId: 'sapling_outgoing_1',
    address: 'zs1...mock',
    contact: null,
    memo: 'Purchase',
  );
  addTx(
    id: 5,
    height: latest - 60,
    ts: now.subtract(Duration(hours: 3, minutes: 55)),
    value: 0.275,
    txId: 'orch_in_1',
    fullId: 'orchard_incoming_1',
    address: 'uo1...mock',
    contact: 'Dave (Orchard)',
    memo: 'Refund',
  );
  addTx(
    id: 6,
    height: latest - 58,
    ts: now.subtract(Duration(hours: 3, minutes: 40)),
    value: -0.0503,
    txId: 'orch_out_1',
    fullId: 'orchard_outgoing_1',
    address: 'uo1...mock',
    contact: null,
    memo: 'Swap',
  );
  addTx(
    id: 7,
    height: latest - 45,
    ts: now.subtract(Duration(hours: 2, minutes: 15)),
    value: 0.015,
    txId: 't_in_1',
    fullId: 'transparent_incoming_1',
    address: 't1...mock',
    contact: 'Legacy (T)',
    memo: 'Faucet',
  );
  addTx(
    id: 8,
    height: latest - 40,
    ts: now.subtract(Duration(hours: 2)),
    value: -0.0101,
    txId: 't_out_1',
    fullId: 'transparent_outgoing_1',
    address: 't1...mock',
    contact: null,
    memo: 'Fee',
  );
  // Mix in specific relative-time examples
  void addTimedTx({
    required int id,
    required int daysAgo,
    required bool incoming,
    required String pool,
    String? contact,
    String? memo,
  }) {
    final ts = now.subtract(Duration(days: daysAgo, hours: incoming ? 1 : 3));
    final h = latest - (daysAgo * 100 + (incoming ? 5 : 10));
    final address = pool == 'u'
        ? 'u1...mock'
        : pool == 'sap'
            ? 'zs1...mock'
            : pool == 'orch'
                ? 'uo1...mock'
                : 't1...mock';
    final txId = 'timed_${pool}_${incoming ? 'in' : 'out'}_${daysAgo}';
    final fullId = 'timed_${pool}_${incoming ? 'incoming' : 'outgoing'}_${daysAgo}';
    addTx(
      id: id,
      height: h,
      ts: ts,
      value: (incoming ? 1 : -1) * (0.01 + daysAgo * 0.002),
      txId: txId,
      fullId: fullId,
      address: address,
      contact: contact,
      memo: memo ?? (incoming ? 'Incoming' : 'Outgoing'),
    );
  }

  // Today
  addTimedTx(id: 1000, daysAgo: 0, incoming: true, pool: 'orch', contact: 'Today Friend', memo: 'Coffee');
  // Yesterday
  addTimedTx(id: 1001, daysAgo: 1, incoming: false, pool: 'sap', contact: null, memo: 'Pay bill');
  // 2-7 days ago
  addTimedTx(id: 1002, daysAgo: 2, incoming: true, pool: 'u', contact: 'Peer 2');
  addTimedTx(id: 1003, daysAgo: 3, incoming: false, pool: 't', contact: null);
  addTimedTx(id: 1004, daysAgo: 4, incoming: true, pool: 'orch', contact: 'Peer 4');
  addTimedTx(id: 1005, daysAgo: 5, incoming: false, pool: 'sap', contact: null);
  addTimedTx(id: 1006, daysAgo: 6, incoming: true, pool: 'u', contact: null);
  addTimedTx(id: 1007, daysAgo: 7, incoming: false, pool: 'orch', contact: 'Vendor 7');
  // 45 days ago
  addTimedTx(id: 1045, daysAgo: 45, incoming: true, pool: 'u', contact: null, memo: 'Old airdrop');

  // Additional explicit transactions for verification
  // Another Yesterday
  addTimedTx(id: 1101, daysAgo: 1, incoming: true, pool: 'u', contact: 'Yesterday Peer', memo: 'Groceries');
  // Another 3 days ago
  addTimedTx(id: 1103, daysAgo: 3, incoming: true, pool: 'orch', contact: null, memo: 'Reimbursement');
  // Specific date: Jul 15 at 8:07 AM (current year)
  final jul15 = DateTime(now.year, 7, 15, 8, 7);
  final daysAgoJul15 = now.difference(jul15).inDays;
  addTx(
    id: 1115,
    height: latest - (daysAgoJul15 * 100 + 17),
    ts: jul15,
    value: 0.042,
    txId: 'fixed_jul15_in',
    fullId: 'fixed_jul15_in_full',
    address: 'u1...jul15',
    contact: null,
    memo: 'Fixed date sample',
  );
  for (int i = 0; i < 6; i++) {
    final incoming = i % 2 == 0;
    final orchard = i % 3 == 0;
    final poolLabel = orchard ? 'orch' : (i % 3 == 1 ? 'sap' : 'u');
    addTx(
      id: 100 + i,
      height: latest - 20 + i,
      ts: now.subtract(Duration(minutes: 30 - 3 * i)),
      value: (incoming ? 1 : -1) * (0.01 + i * 0.003),
      txId: '${poolLabel}_${incoming ? 'in' : 'out'}_$i',
      fullId: '${poolLabel}_${incoming ? 'incoming' : 'outgoing'}_$i',
      address: orchard ? 'uo1...mock' : (poolLabel == 'sap' ? 'zs1...mock' : 'u1...mock'),
      contact: incoming ? (i.isEven ? null : 'Friend $i') : (i.isOdd ? null : 'Payment $i'),
      memo: incoming ? 'Thanks #$i' : 'Payment #$i',
    );
  }

  aa.txs.items = demo;
  notify?.call();
}

// For preview on Balance page: if there are very few real txs, append some
// mock samples so the UI can be verified. Does nothing if we already have
// at least [minCount] txs.
void injectMockTxsIfFew({int minCount = 10, void Function()? notify}) {
  if (aa.txs.items.length >= minCount) return;
  if (aa.txs.items.isEmpty) {
    injectMockTxsIfEmpty(notify: notify);
    return;
  }
  final now = DateTime.now();
  final latest = syncStatus2.latestHeight ?? 3000000;
  final List<Tx> extra = [];

  void addTx({
    required int id,
    required int height,
    required DateTime ts,
    required double value,
    required String txId,
    required String fullId,
    String? address,
    String? contact,
    String? memo,
  }) {
    final confs = (syncStatus2.latestHeight?.let((h) => h - height + 1)) ?? 3;
    extra.add(Tx(
      id,
      height,
      confs,
      ts,
      txId,
      fullId,
      value,
      address,
      contact,
      memo,
      const [],
    ));
  }

  DateTime daysAgo(int d, {int hour = 10, int minute = 0}) =>
      DateTime(now.year, now.month, now.day, hour, minute).subtract(Duration(days: d));
  int h(int d, int off) => latest - (d * 100 + off);

  // Append Today, Yesterday, 3 days ago, and the fixed Jul 15 sample
  addTx(
    id: 900001,
    height: h(0, 21),
    ts: daysAgo(0, hour: 9, minute: 32),
    value: 0.031,
    txId: 'preview_today',
    fullId: 'preview_today_full',
    address: 'u1...preview',
    contact: 'Preview Today',
    memo: 'Demo',
  );
  addTx(
    id: 900002,
    height: h(1, 22),
    ts: daysAgo(1, hour: 11, minute: 5),
    value: -0.012,
    txId: 'preview_yesterday',
    fullId: 'preview_yesterday_full',
    address: 'zs1...preview',
    contact: null,
    memo: 'Demo',
  );
  addTx(
    id: 900003,
    height: h(3, 23),
    ts: daysAgo(3, hour: 14, minute: 40),
    value: 0.25,
    txId: 'preview_3days',
    fullId: 'preview_3days_full',
    address: 'uo1...preview',
    contact: 'Preview 3d',
    memo: 'Demo',
  );
  final jul15 = DateTime(now.year, 7, 15, 8, 7);
  final daysAgoJul15 = now.difference(jul15).inDays;
  addTx(
    id: 900004,
    height: h(daysAgoJul15, 24),
    ts: jul15,
    value: 0.042,
    txId: 'preview_jul15',
    fullId: 'preview_jul15_full',
    address: 'u1...jul15',
    contact: null,
    memo: 'Demo',
  );

  aa.txs.items = [...aa.txs.items, ...extra];
  notify?.call();
}

class TableListTxMetadata extends TableListItemMetadata<Tx> {
  @override
  List<Widget>? actions(BuildContext context) => null;

  @override
  Text? headerText(BuildContext context) => null;

  @override
  void inverseSelection() {}

  @override
  Widget separator(BuildContext context) => Divider(
        height: 8,
        thickness: 0.5,
        color: Theme.of(context).dividerColor.withOpacity(0.25),
      );

  @override
  Widget toListTile(BuildContext context, int index, Tx tx,
      {void Function(void Function())? setState}) {
    ZMessage? message;
    try {
      message = aa.messages.items.firstWhere((m) => m.txId == tx.id);
    } on StateError {
      message = null;
    }
    return TxItem(tx, message, index: index);
  }

  @override
  List<ColumnDefinition> columns(BuildContext context) {
    final s = S.of(context);
    return [
      ColumnDefinition(field: 'height', label: s.height, numeric: true),
      ColumnDefinition(field: 'confirmations', label: s.confs, numeric: true),
      ColumnDefinition(field: 'timestamp', label: s.datetime),
      ColumnDefinition(field: 'value', label: s.amount),
      ColumnDefinition(field: 'fullTxId', label: s.txID),
      ColumnDefinition(field: 'address', label: s.address),
      ColumnDefinition(field: 'memo', label: s.memo),
    ];
  }

  @override
  DataRow toRow(BuildContext context, int index, Tx tx) {
    final t = Theme.of(context);
    final color = amountColor(context, tx.value);
    var style = t.textTheme.bodyMedium!.copyWith(color: color);
    style = weightFromAmount(style, tx.value);
    final a = tx.contact ?? centerTrim(tx.address ?? '');
    final m = tx.memo?.let((m) => m.substring(0, min(m.length, 32))) ?? '';

    return DataRow.byIndex(
        index: index,
        cells: [
          DataCell(Text("${tx.height}")),
          DataCell(Text("${tx.confirmations}")),
          DataCell(Text("${txDateFormat.format(tx.timestamp)}")),
          DataCell(Text(decimalToString(tx.value),
              style: style, textAlign: TextAlign.left)),
          DataCell(Text("${tx.txId}")),
          DataCell(Text("$a")),
          DataCell(Text("$m")),
        ],
        onSelectChanged: (_) => gotoTx(context, index));
  }

  @override
  SortConfig2? sortBy(String field) {
    aa.txs.setSortOrder(field);
    return aa.txs.order;
  }

  @override
  Widget? header(BuildContext context) => null;
}

class TxItem extends StatelessWidget {
  final Tx tx;
  final int? index;
  final ZMessage? message;
  TxItem(this.tx, this.message, {this.index});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final contact = tx.contact?.isEmpty ?? true ? '?' : tx.contact!;
    final initial = contact[0];
    final color = amountColor(context, tx.value);

    final av = avatar(initial, incoming: tx.value >= 0);
    final onSurf = theme.colorScheme.onSurface;
    final baseStyle = theme.textTheme.titleLarge!;
    final todayStyle = theme.textTheme.bodySmall;
    final targetSize = todayStyle?.fontSize ?? baseStyle.fontSize;
    final valueStyle = baseStyle.copyWith(
      fontSize: targetSize,
      color: tx.value < 0 ? onSurf : color,
      fontFeatures: const [FontFeature.tabularFigures()],
    );
    final value = Text('${decimalToStringTrim(tx.value)} ZEC', style: valueStyle);
    final trailing = Column(children: [value]);

    // Unified label/icon for both Balance preview and full History
    String displayLabel = (tx.value >= 0) ? 'Received' : 'Sent';
    final addr = tx.address ?? '';
    final isTransparent = addr.startsWith('t');

    return GestureDetector(
        onTap: () {
          if (index != null) gotoTx(context, index!);
        },
        behavior: HitTestBehavior.translucent,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            children: [
              av,
              Gap(15),
              Expanded(
                child: MessageContentWidget(
                  displayLabel,
                  message,
                  tx.memo ?? '',
                  displayLabel: displayLabel,
                  inlineIcon: !isTransparent
                      ? SvgPicture.asset(
                          'assets/icons/shield_check.svg',
                          width: 16,
                          height: 16,
                          colorFilter: ColorFilter.mode(
                            Theme.of(context).colorScheme.onSurface,
                            BlendMode.srcIn,
                          ),
                        )
                      : null,
                  timestamp: tx.timestamp,
                ),
              ),
              SizedBox(width: kTxTrailingWidth, child: Align(alignment: Alignment.centerRight, child: trailing)),
            ],
          ),
        ));
  }
}

class TransactionPage extends StatefulWidget {
  final int txIndex;

  TransactionPage(this.txIndex);

  @override
  State<StatefulWidget> createState() => TransactionState();
}

class TransactionState extends State<TransactionPage> {
  late final s = S.of(context);
  late int idx;

  @override
  void initState() {
    super.initState();
    idx = widget.txIndex;
  }

  Tx get tx => aa.txs.items[idx];

  @override
  Widget build(BuildContext context) {
    final n = aa.txs.items.length;
    return Scaffold(
        appBar: AppBar(title: Text(s.transactionDetails), actions: [
          IconButton(
              onPressed: idx > 0 ? prev : null, icon: Icon(Icons.chevron_left)),
          IconButton(
              onPressed: idx < n - 1 ? next : null,
              icon: Icon(Icons.chevron_right)),
          IconButton(onPressed: open, icon: Icon(Icons.open_in_browser)),
        ]),
        body: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                Gap(16),
                Panel(s.txID, text: tx.fullTxId),
                Gap(8),
                Panel(s.height, text: tx.height.toString()),
                Gap(8),
                Panel(s.confs, text: tx.confirmations.toString()),
                Gap(8),
                Panel(s.timestamp, text: noteDateFormat.format(tx.timestamp)),
                Gap(8),
                Panel(s.amount, text: decimalToString(tx.value)),
                Gap(8),
                Panel(s.address, text: tx.address ?? ''),
                Gap(8),
                Panel(s.contactName,
                    text: tx.contact ?? ''), // Add Contact button
                Gap(8),
                Panel(s.memo, text: tx.memo ?? ''),
                Gap(8),
                ..._memos()
              ],
            ),
          ),
        ));
  }

  List<Widget> _memos() {
    List<Widget> ms = [];
    for (var txm in tx.memos) {
      ms.add(Gap(8));
      ms.add(Panel(s.memo, text: txm.address + '\n' + txm.memo));
    }
    return ms;
  }

  open() {
    openTxInExplorer(tx.fullTxId);
  }

  prev() {
    if (idx > 0) idx -= 1;
    setState(() {});
  }

  next() {
    final n = aa.txs.items.length;
    if (idx < n - 1) idx += 1;
    setState(() {});
  }

  _addContact() async {
    // await addContact(context, ContactT(address: tx.address));
  }
}

void gotoTx(BuildContext context, int index) {
  final state = GoRouterState.of(context);
  // History is nested under /blank; always route via /blank/history
  GoRouter.of(context).go('/blank/history/details?index=$index');
}

void gotoTxById(BuildContext context, int txId, {String? from, int? threadIndex}) {
  final params = <String>['tx=$txId'];
  if (from != null && from.isNotEmpty) params.add('from=$from');
  if (threadIndex != null) params.add('thread=$threadIndex');
  GoRouter.of(context).go('/blank/history/details/byid?${params.join('&')}');
}

class TransactionByIdPage extends StatefulWidget {
  final int txId;
  final String? from;
  final int? threadIndex;

  TransactionByIdPage(this.txId, {this.from, this.threadIndex});

  @override
  State<StatefulWidget> createState() => TransactionByIdState();
}

class TransactionByIdState extends State<TransactionByIdPage> {
  late int _txId;
  bool _requested = false;
  String? _from;
  int? _threadIndex;

  @override
  void initState() {
    super.initState();
    _txId = widget.txId;
    _from = widget.from;
    _threadIndex = widget.threadIndex;
  }

  void _ensureTxs() {
    if (_requested) return;
    _requested = true;
    Future(() async {
      try {
        aa.txs.read(aa.height);
      } catch (_) {}
    });
  }

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    return Observer(builder: (context) {
      // Track observables so this rebuilds when the tx list updates
      aa.txs.items; // depend on items list changes
      aaSequence.seqno; // global refresh ticks
      syncStatus2.changed; // sync updates
      final idx = aa.txs.indexOfTxId(_txId);
      if (idx < 0) {
        _ensureTxs();
        return Scaffold(
          appBar: AppBar(title: Text(s.transactionDetails)),
          body: const Center(child: CircularProgressIndicator()),
        );
      }
      final tx = aa.txs.items[idx];
      return Scaffold(
          appBar: AppBar(title: Text(s.transactionDetails), leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () {
              if (_from == 'messages' && _threadIndex != null) {
                // Return to the exact thread details view
                GoRouter.of(context).go('/messages/details?index=${_threadIndex}');
              } else {
                // Default back: close details and return to history list
                GoRouter.of(context).go('/blank/history');
              }
            },
          ), actions: [
            IconButton(onPressed: idx > 0 ? () => setState(() { _txId = aa.txs.items[idx - 1].id; }) : null, icon: Icon(Icons.chevron_left)),
            IconButton(onPressed: idx < aa.txs.items.length - 1 ? () => setState(() { _txId = aa.txs.items[idx + 1].id; }) : null, icon: Icon(Icons.chevron_right)),
            IconButton(onPressed: () => openTxInExplorer(tx.fullTxId), icon: Icon(Icons.open_in_browser)),
          ]),
          body: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  Gap(16),
                  Panel(s.txID, text: tx.fullTxId),
                  Gap(8),
                  Panel(s.height, text: tx.height.toString()),
                  Gap(8),
                  Panel(s.confs, text: (tx.confirmations ?? 0).toString()),
                  Gap(8),
                  Panel(s.timestamp, text: noteDateFormat.format(tx.timestamp)),
                  Gap(8),
                  Panel(s.amount, text: decimalToString(tx.value)),
                  Gap(8),
                  Panel(s.address, text: tx.address ?? ''),
                  Gap(8),
                  Panel(s.contactName, text: tx.contact ?? ''),
                  Gap(8),
                  Panel(s.memo, text: tx.memo ?? ''),
                  Gap(8),
                  ..._memos(tx)
                ],
              ),
            ),
          ));
    });
  }

  List<Widget> _memos(Tx tx) {
    List<Widget> ms = [];
    for (var txm in tx.memos) {
      ms.add(Gap(8));
      ms.add(Panel(S.of(context).memo, text: txm.address + '\n' + txm.memo));
    }
    return ms;
  }
}
