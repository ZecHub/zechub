import 'dart:async';
import 'dart:ffi';
import 'dart:isolate';
import 'dart:math';

import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:get_it/get_it.dart';
import 'package:mobx/mobx.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:warp_api/data_fb_generated.dart';
import 'package:warp_api/warp_api.dart';

import 'appsettings.dart';
import 'pages/utils.dart';
import 'accounts.dart';
import 'coin/coins.dart';
import 'generated/intl/messages.dart';

part 'store2.g.dart';
part 'store2.freezed.dart';

var appStore = AppStore();
// Global optimistic echo messages to render pending chat items in lists
final optimisticEchoes = ObservableList<ZMessage>.of([]);

class AppStore = _AppStore with _$AppStore;

abstract class _AppStore with Store {
  bool initialized = false;
  String dbPassword = '';

  @observable
  bool flat = false;

  @observable
  bool proverReady = false;

  @observable
  bool hideBalances = false;

  @action
  Future<void> setHideBalances(bool value) async {
    hideBalances = value;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('hide_balances', value);
    } catch (_) {}
  }
}

final syncProgressPort2 = ReceivePort();
final syncProgressStream = syncProgressPort2.asBroadcastStream();

void initSyncListener() {
  syncProgressStream.listen((e) {
    if (e is List<int>) {
      final progress = Progress(e);
      syncStatus2.setProgress(progress);
      final b = progress.balances?.unpack();
      if (b != null) aa.poolBalances = b;
      logger.d(progress.balances);
    }
  });
}

Timer? syncTimer;

Future<void> startAutoSync() async {
  if (syncTimer == null) {
    await syncStatus2.update();
    await syncStatus2.sync(false, auto: true);
    syncTimer = Timer.periodic(Duration(seconds: 15), (timer) {
      syncStatus2.sync(false, auto: true);
      aa.updateDivisified();
    });
  }
}

void _cancelAutoSyncTimer() {
  syncTimer?.cancel();
  syncTimer = null;
}

void _rescheduleAutoSyncAfter(Duration delay) {
  _cancelAutoSyncTimer();
  // Schedule the next auto-sync tick after the specified delay,
  // then continue with the normal 15s cadence.
  syncTimer = Timer(delay, () {
    syncStatus2.sync(false, auto: true);
    syncTimer = Timer.periodic(Duration(seconds: 15), (timer) {
      syncStatus2.sync(false, auto: true);
      aa.updateDivisified();
    });
  });
}

Future<void> triggerManualSync() async {
  // Ensure there is no overlapping auto tick while a manual sync runs
  _cancelAutoSyncTimer();
  // If already syncing, just reschedule auto-sync and exit
  if (syncStatus2.syncing) {
    _rescheduleAutoSyncAfter(Duration(seconds: 15));
    return;
  }
  // Manual action explicitly unpauses sync if it had been auto-paused
  if (syncStatus2.paused) syncStatus2.setPause(false);
  await syncStatus2.sync(false);
  // Resume auto-sync 15s after manual completes
  _rescheduleAutoSyncAfter(Duration(seconds: 15));
}

var syncStatus2 = SyncStatus2();

class SyncStatus2 = _SyncStatus2 with _$SyncStatus2;

abstract class _SyncStatus2 with Store {
  int startSyncedHeight = 0;
  bool isRescan = false;
  ETA eta = ETA();

  @observable
  bool connected = true;

  @observable
  int syncedHeight = 0;

  @observable
  int? latestHeight;

  @observable
  DateTime? timestamp;

  @observable
  bool syncing = false;

  @observable
  bool paused = false;

  @observable
  int downloadedSize = 0;

  @observable
  int trialDecryptionCount = 0;

  // Whether to show the app-bar sync percentage banner for the current session
  // Gated by: (1) restore trigger, or (2) behind by ~1 month of blocks
  @observable
  bool showSyncBanner = false;

  @computed
  int get changed {
    connected;
    syncedHeight;
    latestHeight;
    syncing;
    paused;
    return DateTime.now().microsecondsSinceEpoch;
  }

  bool get isSynced {
    final sh = syncedHeight;
    final lh = latestHeight;
    return lh != null && sh >= lh;
  }

  // Approximate number of blocks in one month (30 days * 24h * 60m * 4/5 blocks/min)
  int get oneMonthBlockThreshold => 30 * 24 * 60 * 4 ~/ 5;

  @computed
  int? get bannerPercent {
    // Depend on ETA checkpoints to ensure reactivity during sync
    final end = eta.endHeight;
    final start = eta.start?.height ?? startSyncedHeight;
    final current = eta.current?.height ?? syncedHeight;
    final total = end - start;
    if (total <= 0) return 0;
    if (current >= end) return 100;
    final advanced = current - start;
    if (advanced <= 0) return 0;
    final pct = (advanced * 100.0) / total;
    final floorPct = pct.floor();
    final clamped = floorPct == 0 ? 1 : floorPct.clamp(1, 99);
    return clamped;
  }

  int? get confirmHeight {
    final lh = latestHeight;
    if (lh == null) return null;
    final ch = lh - appSettings.anchorOffset;
    return max(ch, 0);
  }

  @action
  void reset() {
    isRescan = false;
    syncedHeight = WarpApi.getDbHeight(aa.coin).height;
    syncing = false;
    paused = false;
    showSyncBanner = false;
  }

  @action
  Future<void> update() async {
    try {
      // Ensure Lightwalletd URL is configured for the active coin before querying heights
      try {
        final c = coins[aa.coin];
        final settings = CoinSettingsExtension.load(aa.coin);
        String url = '';
        final idx = settings.lwd.index;
        final custom = settings.lwd.customURL.trim();
        if (idx >= 0 && idx < c.lwd.length) {
          url = c.lwd[idx].url;
        } else if (custom.isNotEmpty) {
          url = custom;
        } else if (c.lwd.isNotEmpty) {
          settings.lwd.index = 0;
          settings.save(aa.coin);
          url = c.lwd.first.url;
        }
        if (url.isNotEmpty) {
          WarpApi.updateLWD(aa.coin, url);
        }
      } catch (_) {}
      final lh = latestHeight;
      latestHeight = await WarpApi.getLatestHeight(aa.coin);
      if (lh == null && latestHeight != null) aa.update(latestHeight);
      connected = true;
    } on String catch (e) {
      logger.d(e);
      connected = false;
    }
    syncedHeight = WarpApi.getDbHeight(aa.coin).height;
  }

  @action
  Future<void> sync(bool rescan, {bool auto = false}) async {
    logger.d('R/A/P/S $rescan $auto $paused $syncing');
    if (paused) return;
    if (syncing) return;
    try {
      await update();
      final lh = latestHeight;
      if (lh == null) return;
      // Determine how far behind we are and gate the banner accordingly
      final gap = lh - syncedHeight;
      if (gap >= oneMonthBlockThreshold) {
        showSyncBanner = true;
      }
      // don't auto sync more than 1 month of data
      if (!rescan && auto && gap > oneMonthBlockThreshold) {
        paused = true;
        return;
      }
      if (isSynced) return;
      syncing = true;
      isRescan = rescan;
      _updateSyncedHeight();
      // Capture the session start height for progress calculation
      startSyncedHeight = syncedHeight;
      // Re-initialize ETA from this session start so progress reflects this run
      eta.begin(latestHeight!);
      eta.checkpoint(syncedHeight, DateTime.now());

      final preBalance = AccountBalanceSnapshot(
          coin: aa.coin, id: aa.id, balance: aa.poolBalances.total);
      // This may take a long time. While it runs, poll DB height as a fallback to ensure UI updates
      final poller = Timer.periodic(Duration(seconds: 1), (_) {
        try {
          final h = WarpApi.getDbHeight(aa.coin).height;
          if (h > syncedHeight) {
            syncedHeight = h;
            eta.checkpoint(syncedHeight, DateTime.now());
          }
        } catch (_) {}
      });
      await WarpApi.warpSync(
          aa.coin,
          aa.id,
          !appSettings.nogetTx,
          appSettings.anchorOffset,
          coinSettings.spamFilter ? 50 : 1000000,
          syncProgressPort2.sendPort.nativePort);

      aa.update(latestHeight);
      contacts.fetchContacts();
      marketPrice.update();
      final postBalance = AccountBalanceSnapshot(
          coin: aa.coin, id: aa.id, balance: aa.poolBalances.total);
      if (preBalance.sameAccount(postBalance) &&
          preBalance.balance != postBalance.balance) {
        try {
          if (GetIt.I.isRegistered<S>()) {
            S s = GetIt.I.get<S>();
            final ticker = coins[aa.coin].ticker;
            if (preBalance.balance < postBalance.balance) {
              final amount =
                  amountToString2(postBalance.balance - preBalance.balance);
              showLocalNotification(
                id: latestHeight!,
                title: s.incomingFunds,
                body: s.received(amount, ticker),
              );
            } else {
              final amount =
                  amountToString2(preBalance.balance - postBalance.balance);
              showLocalNotification(
                id: latestHeight!,
                title: s.paymentMade,
                body: s.spent(amount, ticker),
              );
            }
          }
        } catch (e) {
          logger.d('Notification error: $e');
        }
      }
    } on String catch (e) {
      logger.d(e);
      showSnackBar(e);
    } finally {
      try {
        // Stop fallback poller if it exists
        // ignore: empty_catches
      } catch (_) {}
      // Defensive cancel in case poller is still active
      try { (syncTimer as dynamic); } catch (_) {}
      try { /* poller might be out of scope */ } catch (_) {}
      // end ETA and mark not syncing
      syncing = false;
      // If this session was a rescan/rewind and we've reached latest, stop showing the pill
      if (isRescan && isSynced) {
        isRescan = false;
      }
      eta.end();
    }
  }

  @action
  Future<void> rescan(int height) async {
    WarpApi.rescanFrom(aa.coin, height);
    _updateSyncedHeight();
    paused = false;
    await sync(true);
  }

  @action
  void setPause(bool v) {
    paused = v;
  }

  @action
  void setProgress(Progress progress) {
    trialDecryptionCount = progress.trialDecryptions;
    syncedHeight = progress.height;
    downloadedSize = progress.downloaded;
    if (progress.timestamp > 0)
      timestamp =
          DateTime.fromMillisecondsSinceEpoch(progress.timestamp * 1000);
    eta.checkpoint(syncedHeight, DateTime.now());
    // Compute completion based on latest height vs current db height
    int? percent;
    final lh = latestHeight;
    if (lh != null) {
      final start = startSyncedHeight;
      final total = lh - start;
      if (total > 0) {
        if (syncedHeight >= lh) {
          percent = 100;
        } else {
          final advanced = syncedHeight - start;
          if (advanced > 0) {
            final pct = (advanced * 100.0) / total;
            final pf = pct.floor();
            percent = pf == 0 ? 1 : pf.clamp(1, 99);
          } else {
            percent = 0;
          }
        }
      } else {
        percent = 0;
      }
    }
    if (percent != null && percent >= 100) {
      showSyncBanner = false;
    }
  }

  // Explicit trigger to display the banner after an account restore
  @action
  void triggerBannerForRestore() {
    showSyncBanner = true;
  }

  void _updateSyncedHeight() {
    final h = WarpApi.getDbHeight(aa.coin);
    syncedHeight = h.height;
    timestamp = (h.timestamp != 0)
        ? DateTime.fromMillisecondsSinceEpoch(h.timestamp * 1000)
        : null;
    // Initialize ETA checkpoints if missing so progress can advance from 0%
    if (!eta.running && latestHeight != null) {
      eta.begin(latestHeight!);
      eta.checkpoint(syncedHeight, DateTime.now());
    }
  }
}

class ETA = _ETA with _$ETA;

abstract class _ETA with Store {
  @observable
  int endHeight = 0;
  @observable
  ETACheckpoint? start;
  @observable
  ETACheckpoint? prev;
  @observable
  ETACheckpoint? current;

  @action
  void begin(int height) {
    end();
    endHeight = height;
  }

  @action
  void end() {
    start = null;
    prev = null;
    current = null;
  }

  @action
  void checkpoint(int height, DateTime timestamp) {
    prev = current;
    current = ETACheckpoint(height, timestamp);
    if (start == null) start = current;
  }

  @computed
  int? get remaining {
    return current?.let((c) => endHeight - c.height);
  }

  @computed
  String get timeRemaining {
    final defaultMsg = "Calculating ETA";
    final p = prev;
    final c = current;
    if (p == null || c == null) return defaultMsg;
    if (c.timestamp.millisecondsSinceEpoch ==
        p.timestamp.millisecondsSinceEpoch) return defaultMsg;
    final speed = (c.height - p.height) /
        (c.timestamp.millisecondsSinceEpoch -
            p.timestamp.millisecondsSinceEpoch);
    if (speed == 0) return defaultMsg;
    final eta = (endHeight - c.height) / speed;
    if (eta <= 0) return defaultMsg;
    final duration =
        Duration(milliseconds: eta.floor()).toString().split('.')[0];
    return "ETA: $duration";
  }

  @computed
  bool get running => start != null;

  @computed
  int? get progress {
    if (!running) return null;
    final sh = start!.height;
    final ch = current!.height;
    final total = endHeight - sh;
    if (total <= 0) return 0;
    if (ch >= endHeight) return 100;
    final advanced = ch - sh;
    if (advanced <= 0) return 0;
    final pct = (advanced * 100.0) / total;
    // Show at least 1% once progress has advanced
    final percent = pct.floor();
    return percent == 0 ? 1 : percent.clamp(1, 99);
  }
}

class ETACheckpoint {
  int height;
  DateTime timestamp;

  ETACheckpoint(this.height, this.timestamp);
}

var marketPrice = MarketPrice();

class MarketPrice = _MarketPrice with _$MarketPrice;

abstract class _MarketPrice with Store {
  @observable
  double? price;
  @observable
  DateTime? timestamp;

  @action
  Future<void> update() async {
    final c = coins[aa.coin];
    final fetched = await getFxRate(c.currency, appSettings.currency);
    // Preserve last known price when fetch fails to avoid flicker/hide
    if (fetched != null) {
      price = fetched;
      timestamp = DateTime.now();
    }
  }

  int? lastChartUpdateTime;
}

var contacts = ContactStore();

class ContactStore = _ContactStore with _$ContactStore;

abstract class _ContactStore with Store {
  @observable
  ObservableList<Contact> contacts = ObservableList<Contact>.of([]);

  @action
  void fetchContacts() {
    contacts.clear();
    contacts.addAll(WarpApi.getContacts(aa.coin));
  }

  @action
  void add(Contact c) {
    WarpApi.storeContact(aa.coin, c.id, c.name!, c.address!, true);
    markContactsSaved(aa.coin, false);
    fetchContacts();
  }

  @action
  void remove(Contact c) {
    contacts.removeWhere((contact) => contact.id == c.id);
    // Helpers with simple retries to avoid transient "database is locked"
    Future<void> retry(int attempts, Future<void> Function() op) async {
      int i = 0; int delayMs = 120;
      while (true) {
        try { await op(); return; } catch (_) {
          if (++i >= attempts) rethrow;
          await Future.delayed(Duration(milliseconds: delayMs));
          delayMs = (delayMs * 2).clamp(120, 1000);
        }
      }
    }
    // Mark UA and CID blocked to prevent auto-recreation via handshake
    final ua = (c.address ?? '').trim();
    if (ua.isNotEmpty) {
      // ignore errors; best-effort
      // using retry for sqlite busy
      () async { await retry(5, () async { WarpApi.setProperty(aa.coin, 'contact_block_' + ua, '1'); }); }();
    }
    try {
      final cid = WarpApi.getProperty(aa.coin, 'contact_cid_' + c.id.toString()).trim();
      if (cid.isNotEmpty) {
        () async { await retry(5, () async { WarpApi.setProperty(aa.coin, 'cid_block_' + cid, '1'); }); }();
      }
    } catch (_) {}
    () async { await retry(5, () async { WarpApi.storeContact(aa.coin, c.id, c.name!, "", true); }); }();
    markContactsSaved(aa.coin, false);
    fetchContacts();
  }

  @action
  markContactsSaved(int coin, bool v) {
    coinSettings.contactsSaved = true;
    coinSettings.save(coin);
  }
}

class AccountBalanceSnapshot {
  final int coin;
  final int id;
  final int balance;
  AccountBalanceSnapshot({
    required this.coin,
    required this.id,
    required this.balance,
  });

  bool sameAccount(AccountBalanceSnapshot other) =>
      coin == other.coin && id == other.id;

  @override
  String toString() => '($coin, $id, $balance)';
}

@freezed
class SeedInfo with _$SeedInfo {
  const factory SeedInfo({
    required String seed,
    required int index,
  }) = _SeedInfo;
}

@freezed
class TxMemo with _$TxMemo {
  const factory TxMemo({
    required String address,
    required String memo,
  }) = _TxMemo;
}

@freezed
class SwapAmount with _$SwapAmount {
  const factory SwapAmount({
    required String amount,
    required String currency,
  }) = _SwapAmount;
}

@freezed
class SwapQuote with _$SwapQuote {
  const factory SwapQuote({
    required String estimated_amount,
    required String rate_id,
    required String valid_until,
  }) = _SwapQuote;

  factory SwapQuote.fromJson(Map<String, dynamic> json) =>
      _$SwapQuoteFromJson(json);
}

@freezed
class SwapRequest with _$SwapRequest {
  const factory SwapRequest({
    required bool fixed,
    required String rate_id,
    required String currency_from,
    required String currency_to,
    required double amount_from,
    required String address_to,
  }) = _SwapRequest;

  factory SwapRequest.fromJson(Map<String, dynamic> json) =>
      _$SwapRequestFromJson(json);
}

@freezed
class SwapLeg with _$SwapLeg {
  const factory SwapLeg({
    required String symbol,
    required String name,
    required String image,
    required String validation_address,
    required String address_explorer,
    required String tx_explorer,
  }) = _SwapLeg;

  factory SwapLeg.fromJson(Map<String, dynamic> json) =>
      _$SwapLegFromJson(json);
}

@freezed
class SwapResponse with _$SwapResponse {
  const factory SwapResponse({
    required String id,
    required String timestamp,
    required String currency_from,
    required String currency_to,
    required String amount_from,
    required String amount_to,
    required String address_from,
    required String address_to,
  }) = _SwapResponse;

  factory SwapResponse.fromJson(Map<String, dynamic> json) =>
      _$SwapResponseFromJson(json);
}

@freezed
class Election with _$Election {
  const factory Election({
    required int id,
    required String name,
    required int start_height,
    required int end_height,
    required int close_height,
    required String submit_url,
    required String question,
    required List<String> candidates,
    required String status,
  }) = _Election;

  factory Election.fromJson(Map<String, dynamic> json) =>
      _$ElectionFromJson(json);
}

@freezed
class Vote with _$Vote {
  const factory Vote({
    required Election election,
    required List<VoteNoteT> notes,
    int? candidate,
  }) = _Vote;
}
