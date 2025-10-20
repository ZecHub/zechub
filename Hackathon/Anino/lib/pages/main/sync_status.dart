import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;

import '../../generated/intl/messages.dart';
import '../../store2.dart';
import '../utils.dart';

class SyncStatusWidget extends StatefulWidget {
  SyncStatusState createState() => SyncStatusState();
}

class SyncStatusState extends State<SyncStatusWidget> {
  var display = 0;

  @override
  void initState() {
    super.initState();
    Future(() async {
      await syncStatus2.update();
      await startAutoSync();
    });
  }

  String getSyncText(int syncedHeight) {
    final s = S.of(context);
    if (!syncStatus2.connected) return s.connectionError;
    final latestHeight = syncStatus2.latestHeight;
    if (latestHeight == null) return '';

    if (syncStatus2.paused) return s.syncPaused;
    if (!syncStatus2.syncing) return syncedHeight.toString();

    final timestamp = syncStatus2.timestamp?.let(timeago.format) ?? s.na;
    final downloadedSize = syncStatus2.downloadedSize;
    final trialDecryptionCount = syncStatus2.trialDecryptionCount;

    final remaining = syncStatus2.eta.remaining;
    final percent = syncStatus2.eta.progress;
    final downloadedSize2 = NumberFormat.compact().format(downloadedSize);
    final trialDecryptionCount2 =
        NumberFormat.compact().format(trialDecryptionCount);

    switch (display) {
      case 0:
        return '$syncedHeight / $latestHeight';
      case 1:
        final m = syncStatus2.isRescan ? s.rescan : s.catchup;
        return '$m $percent %';
      case 2:
        return remaining != null ? '$remaining...' : '';
      case 3:
        return timestamp;
      case 4:
        return '${syncStatus2.eta.timeRemaining}';
      case 5:
        return '\u{2193} $downloadedSize2';
      case 6:
        return '\u{2192} $trialDecryptionCount2';
    }
    throw Exception('Unreachable');
  }

  @override
  Widget build(BuildContext context) {
    return Observer(builder: (context) {
      final t = Theme.of(context);
      // Depend on MobX observables so this widget rebuilds during sync/rewind
      final _ = syncStatus2.changed;
      // Only show during rescan/rewind sessions and until latest is reached
      final showPill = syncStatus2.isRescan && !syncStatus2.isSynced;
      if (!showPill) return const SizedBox.shrink();

      final syncedHeight = syncStatus2.syncedHeight;
      final text = getSyncText(syncedHeight);
      final syncing = syncStatus2.syncing;
      final syncStyle = syncing
          ? t.textTheme.bodySmall!
          : t.textTheme.bodyMedium!.apply(color: t.primaryColor);
      final Widget inner = GestureDetector(
          onTap: _onSync,
          child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Container(
                  color: t.colorScheme.surface,
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(text, style: syncStyle),
                      const SizedBox(width: 8),
                      _InfoIcon(onTap: _showWhyModal),
                    ],
                  ))));
      final value = syncStatus2.eta.progress?.let((x) => x.toDouble() / 100.0);
      return SizedBox(
        height: 50,
        child: Stack(
          children: <Widget>[
            if (value != null)
              SizedBox.expand(
                child: LinearProgressIndicator(
                  value: value,
                ),
              ),
            Center(child: inner),
          ],
        ),
      );
    });
  }

  _onSync() {
    if (syncStatus2.syncing) {
      setState(() {
        display = (display + 1) % 7;
      });
    } else {
      if (syncStatus2.paused) syncStatus2.setPause(false);
      Future(() => syncStatus2.sync(false));
    }
  }

  void _showWhyModal() {
    final ctx = context;
    showMessageBox2(
      ctx,
      'Why isn\'t my sync status updating?',
      'If your wallet appears stuck at a certain block height, it is still syncing as long as the pulsing cycle icon is visible in the top right. Older wallets may take up to 24 hours to finish syncing. If you do not want to wait, you can create a new wallet here and transfer your ZEC balance to it.',
      label: 'OK',
      dismissable: true,
    );
  }
}

class _InfoIcon extends StatelessWidget {
  final VoidCallback onTap;
  const _InfoIcon({required this.onTap});

  @override
  Widget build(BuildContext context) {
    final Color grey = const Color(0xFF4A4A4A);
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        width: 20,
        height: 20,
        decoration: BoxDecoration(
          color: grey,
          shape: BoxShape.circle,
        ),
        alignment: Alignment.center,
        child: const Text(
          'i',
          style: TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
