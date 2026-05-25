import 'dart:async';

import 'package:decimal/decimal.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:warp_api/warp_api.dart';

import 'package:YWallet/src/rust/frb_generated.dart';
import 'package:flutter/services.dart' show rootBundle;

import 'appsettings.dart';
import 'accounts.dart';
import 'store2.dart';
import 'main.reflectable.dart';
import 'coin/coins.dart';
import './pages/utils.dart';

import 'init.dart';
import 'pages/vote/vote_data.dart';

const ZECUNIT = 100000000.0;
// ignore: non_constant_identifier_names
var ZECUNIT_DECIMAL = Decimal.parse('100000000');
const mZECUNIT = 100000;

final GlobalKey<NavigatorState> navigatorKey = new GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await RustLib.init();
  await electionStore.init();
  initializeReflectable();
  await restoreSettings();
  await initCoins();
  await restoreWindow();
  initNotifications();
  final prefs = await SharedPreferences.getInstance();
  final dbPath = await getDbPath();
  print("db path $dbPath");
  await recoverDb(prefs, dbPath);
  // Initialize ZK prover parameters early to avoid signing failures
  try {
    final spend = await rootBundle.load('assets/sapling-spend.params');
    final output = await rootBundle.load('assets/sapling-output.params');
    WarpApi.initProver(spend.buffer.asUint8List(), output.buffer.asUint8List());
    appStore.proverReady = true;
  } catch (_) {}
  // Ensure wallets are initialized before any account checks to avoid FFI panics
  for (var c in coins) {
    try {
      WarpApi.setDbPasswd(c.coin, appStore.dbPassword);
      WarpApi.initWallet(c.coin, c.dbFullPath);
      // Ensure Lightwalletd URL is configured at startup (desktop path bypasses Splash)
      try {
        final settings = CoinSettingsExtension.load(c.coin);
        String url = '';
        final builtins = c.lwd;
        final idx = settings.lwd.index;
        final custom = settings.lwd.customURL.trim();
        if (idx >= 0 && idx < builtins.length) {
          url = builtins[idx].url;
        } else if (custom.isNotEmpty) {
          url = custom;
        } else if (builtins.isNotEmpty) {
          // Persist default to index 0 so future loads remember it
          settings.lwd.index = 0;
          settings.save(c.coin);
          url = builtins.first.url;
        }
        if (url.isNotEmpty) {
          // Debug print mirrors splash for troubleshooting
          // ignore: avoid_print
          print('[init] main.updateLWD coin=${c.coin} url=$url');
          WarpApi.updateLWD(c.coin, url);
        }
      } catch (_) {}
    } catch (_) {}
  }
  // Restore active account so the wallet shows immediately without a splash route
  try {
    final a = ActiveAccount2.fromPrefs(prefs);
    if (a != null) {
      setActiveAccount(a.coin, a.id);
      aa.update(syncStatus2.latestHeight);
    }
  } catch (_) {}
  // Ensure sync progress events are listened to on desktop startup (no Splash route)
  initSyncListener();
  // Ensure desktop instances begin syncing immediately on launch.
  // We kick off a manual sync on the first frame to bypass the
  // "auto > 1 month behind" gating and then resume the normal
  // 15s auto-sync cadence.
  if (!isMobile()) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Future(() => triggerManualSync());
    });
  }
  runApp(App());
}

Future<void> restoreSettings() async {
  final prefs = await SharedPreferences.getInstance();
  appSettings = AppSettingsExtension.load(prefs);
  // Load persisted hide balances preference (defaults to false if absent)
  try {
    final hb = prefs.getBool('hide_balances');
    if (hb != null) {
      appStore.hideBalances = hb;
    }
  } catch (_) {}
}

Future<void> recoverDb(SharedPreferences prefs, String dbPath) async {
  final backupPath = prefs.getString('backup');
  if (backupPath == null) return;
  await prefs.remove('backup');
  for (var c in coins) {
    await c.delete();
  }
  final dbDir = await getDbPath();
  WarpApi.unzipBackup(backupPath, dbDir);
}

final GlobalKey<ScaffoldMessengerState> rootScaffoldMessengerKey =
    GlobalKey<ScaffoldMessengerState>();
