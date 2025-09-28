import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../theme/zashi_tokens.dart';

import '../../generated/intl/messages.dart';
import '../../appsettings.dart';
import '../../store2.dart';
import '../../accounts.dart';
import '../../coin/coins.dart';
import '../utils.dart';
import 'balance.dart';
import 'sync_status.dart';
import 'qr_address.dart';
import '../scan.dart';
import '../splash.dart';
import '../tx.dart';
import '../../tablelist.dart';
import '../tx.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Observer(builder: (context) {
      final key = ValueKey(aaSequence.seqno);
      return HomePageInner(key: key);
    });
  }
}

class HomePageInner extends StatefulWidget {
  HomePageInner({super.key});
  @override
  State<StatefulWidget> createState() => _HomeState();
}

class _HomeState extends State<HomePageInner> {
  final key = GlobalKey<BalanceState>();
  int addressMode = coins[aa.coin].defaultAddrMode;

  @override
  void initState() {
    super.initState();
    syncStatus2.update();
    _injectMockIfEmpty();
  }

  void _injectMockIfEmpty() {
    if (aa.txs.items.isNotEmpty) return;
    // No-op here if already populated. TxPage will inject mocks when history opens.
  }

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    return Scaffold(
        body: SingleChildScrollView(
          child: Center(
            child: Observer(
              builder: (context) {
                aaSequence.seqno;
                aa.poolBalances;
                syncStatus2.changed;

                final bool isWatchOnly = !aa.canPay;
                return AnimatedSwitcher(
                  // Lengthen further for a clearer crossfade
                  duration: const Duration(milliseconds: 480),
                  switchInCurve: Curves.easeInOutCubic,
                  switchOutCurve: Curves.easeInOutCubic,
                  layoutBuilder: (currentChild, previousChildren) {
                    return Stack(
                      alignment: Alignment.topCenter,
                      children: <Widget>[
                        // Render previous below, current above, to get a true crossfade
                        ...previousChildren,
                        if (currentChild != null) currentChild,
                      ],
                    );
                  },
                  child: KeyedSubtree(
                    // Preserve subtree to avoid sudden rebuilds during switch
                    key: ValueKey<int>(aa.id),
                    child: Column(
                    children: [
                      if (syncStatus2.isRescan && !syncStatus2.isSynced)
                        SyncStatusWidget(),
                      if (syncStatus2.isRescan && !syncStatus2.isSynced)
                        Gap(8),
                      Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16),
                          child: Column(children: [
                          if (isWatchOnly)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Theme.of(context).colorScheme.secondary.withOpacity(0.12),
                                      borderRadius: BorderRadius.circular(999),
                                      border: Border.all(color: Theme.of(context).colorScheme.secondary.withOpacity(0.6)),
                                    ),
                                    child: Text('Watch-Only', style: Theme.of(context).textTheme.labelMedium?.copyWith(color: Theme.of(context).colorScheme.onSurface)),
                                  ),
                                ],
                              ),
                            ),
                          // Balance block first
                          BalanceWidget(
                            addressMode,
                            key: key,
                          ),
                          Gap(24),
                          // Catalog-styled quick actions under rate line (responsive width)
                          Builder(builder: (context) {
                            final screenWidth = MediaQuery.of(context).size.width;
                            const horizontalPadding = 32.0; // matches symmetric(horizontal:16)
                            const gap = 6.0; // 50% tighter than before
                            final available = screenWidth - horizontalPadding;
                            if (isWatchOnly) {
                              final tileSize = available.clamp(72.0, 96.0).toDouble();
                              return Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  _QuickActionTile(
                                    label: 'Receive',
                                    asset: 'assets/icons/receive_quick.svg',
                                    onTap: () => GoRouter.of(context).push('/account/receive'),
                                    tileSize: tileSize,
                                  ),
                                ],
                              );
                            } else {
                              final tileSize = ((available - 3 * gap) / 4).clamp(72.0, 96.0).toDouble();
                              return Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  _QuickActionTile(
                                    label: 'Receive',
                                    asset: 'assets/icons/receive_quick.svg',
                                    onTap: () => GoRouter.of(context).push('/account/receive'),
                                    tileSize: tileSize,
                                  ),
                                  const Gap(gap),
                                  _QuickActionTile(
                                    label: s.send,
                                    asset: 'assets/icons/send_quick.svg',
                                    onTap: () => GoRouter.of(context).push('/account/quick_send'),
                                    tileSize: tileSize,
                                  ),
                                  const Gap(gap),
                                  _QuickActionTile(
                                    label: 'Scan',
                                    asset: 'assets/icons/scan_quick.svg',
                                    onTap: () { scanQRCode(context); },
                                    tileSize: tileSize,
                                  ),
                                  const Gap(gap),
                                  _QuickActionTile(
                                    label: s.more,
                                    asset: 'assets/icons/more_quick.svg',
                                    onTap: () => GoRouter.of(context).go('/more'),
                                    tileSize: tileSize,
                                  ),
                                ],
                              );
                            }
                          }),
                          // Reduce spacing under quick actions by 15px
                          const Gap(30),
                          // Heading above transaction history with right-aligned "See all >" pill
                          Builder(
                            builder: (context) {
                              final t = Theme.of(context);
                              final zashi = t.extension<ZashiThemeExt>();
                              final color = zashi?.balanceAmountColor ?? const Color(0xFFBDBDBD);
                              final base = t.textTheme.bodyMedium ?? t.textTheme.titleMedium ?? t.textTheme.bodySmall;
                              final sized = (base?.fontSize != null)
                                  ? base!.copyWith(fontSize: base.fontSize! * 1.15, fontWeight: FontWeight.w700)
                                  : (base ?? const TextStyle(fontWeight: FontWeight.w700));
                              final style = sized.copyWith(color: color);
                              final txTextColor = zashi?.balanceAmountColor ?? t.colorScheme.onSurface;
                              final borderColor = zashi?.quickBorderColor ?? t.dividerColor;
                              // Flat fill to match transaction receive icon style (non‑gradient)
                              final flatFill = t.colorScheme.onSurface.withOpacity(0.12);
                              return Row(
                                children: [
                                  Expanded(child: Text('Transactions', style: style)),
                                  SizedBox(
                                    width: kTxTrailingWidth,
                                    child: Align(
                                      alignment: Alignment.centerRight,
                                      child: Transform.scale(
                                        scale: 0.8,
                                        child: Material(
                                          color: Colors.transparent,
                                          shape: const StadiumBorder(),
                                          child: Ink(
                                            decoration: BoxDecoration(
                                              color: flatFill,
                                              borderRadius: BorderRadius.circular(999),
                                              border: Border.all(color: borderColor),
                                            ),
                                            child: InkWell(
                                              borderRadius: BorderRadius.circular(999),
                                              onTap: () => GoRouter.of(context).go('/blank/history'),
                                              child: Padding(
                                                // Reduce vertical padding by 5px
                                                padding: const EdgeInsets.symmetric(horizontal: 7.1, vertical: 5.4),
                                                child: Row(
                                                  mainAxisSize: MainAxisSize.min,
                                                  mainAxisAlignment: MainAxisAlignment.center,
                                                  crossAxisAlignment: CrossAxisAlignment.center,
                                                  children: [
                                                    // Further reduce left spacer for tighter centering
                                                    SizedBox(width: ((base?.fontSize ?? 14.0) * 1.20) * 0.25),
                                                    Text(
                                                      'See all',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(fontWeight: FontWeight.w700, color: txTextColor),
                                                    ),
                                                    const SizedBox(width: 2),
                                                    Icon(
                                                      Icons.chevron_right,
                                                      size: (base?.fontSize ?? 14.0) * 1.20,
                                                      color: txTextColor,
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            },
                          ),
                          const Gap(6),
                          // Embedded History preview under quick menu (limit to 5 most recent)
                          Builder(builder: (context) {
                            final txs = aa.txs.items;
                            if (txs.isEmpty) {
                              return Padding(
                                padding: const EdgeInsets.symmetric(vertical: 8),
                                child: Text(
                                  'No transactions yet',
                                  style: Theme.of(context).textTheme.bodyMedium,
                                ),
                              );
                            }
                            return ListView.separated(
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemCount: txs.length.clamp(0, 5),
                              separatorBuilder: (context, __) => Divider(
                                height: 8,
                                thickness: 0.5,
                                color: Theme.of(context).dividerColor.withOpacity(0.25),
                              ),
                              itemBuilder: (context, i) {
                                final tx = txs[i];
                                return TxItem(tx, null, index: i);
                              },
                            );
                          }),
                        ])),
                    ],
                  )),
                );
              },
            ),
          ),
        ));
  }

  _send(bool custom) async {
    final protectSend = appSettings.protectSend;
    if (protectSend) {
      final authed = await authBarrier(context, dismissable: true);
      if (!authed) return;
    }
    final c = custom ? 1 : 0;
    GoRouter.of(context).push('/account/quick_send?custom=$c');
  }

  _backup() {
    GoRouter.of(context).push('/more/backup');
  }
}

class _QuickActionTile extends StatelessWidget {
  final String label;
  final String asset;
  final VoidCallback onTap;
  final double? tileSize;
  const _QuickActionTile({required this.label, required this.asset, required this.onTap, this.tileSize});

  @override
  Widget build(BuildContext context) {
    final onSurf = Theme.of(context).colorScheme.onSurface;
    final zashi = Theme.of(context).extension<ZashiThemeExt>()!;
    final radius = zashi.tileRadius;
    final size = tileSize ?? 96.0;
    final gradTop = zashi.quickGradTop;
    final gradBottom = zashi.quickGradBottom;
    final borderColor = zashi.quickBorderColor;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: SizedBox(
        width: size,
        height: size,
        child: Material(
          color: Colors.transparent,
          elevation: 1.5,
          shadowColor: isDark ? Colors.black54 : Colors.black12,
          borderRadius: BorderRadius.circular(radius),
          child: Ink(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [gradTop, gradBottom],
              ),
              borderRadius: BorderRadius.circular(radius),
              border: Border.all(color: borderColor),
              boxShadow: [
                BoxShadow(
                  color: isDark ? Colors.black.withOpacity(0.25) : Colors.black.withOpacity(0.12),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(radius),
              onTap: onTap,
              child: Padding(
                padding: EdgeInsets.symmetric(
                  vertical: (zashi.tilePadding - 4).clamp(0, double.infinity),
                  horizontal: zashi.tilePadding,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    SvgPicture.asset(
                      asset,
                      width: asset.contains('scan_quick') ? 36 : 32,
                      height: asset.contains('scan_quick') ? 36 : 32,
                      colorFilter: ColorFilter.mode(onSurf, BlendMode.srcIn),
                    ),
                    const SizedBox(height: 6),
                    LayoutBuilder(builder: (context, box) {
                      // Responsive label: keep as large as possible until it would ellipsize,
                      // then step down font size to fit.
                      final base = Theme.of(context).textTheme.labelSmall;
                      final candidates = <double?>[
                        base?.fontSize,
                        (base?.fontSize != null) ? base!.fontSize! * 0.9 : null,
                        (base?.fontSize != null) ? base!.fontSize! * 0.8 : null,
                        (base?.fontSize != null) ? base!.fontSize! * 0.7 : null,
                      ].whereType<double>().toList();
                      Text? fitted;
                      for (final fs in candidates) {
                        final tp = TextPainter(
                          text: TextSpan(text: label, style: base?.copyWith(fontSize: fs)),
                          maxLines: 1,
                          textDirection: TextDirection.ltr,
                        )..layout(maxWidth: box.maxWidth);
                        if (!tp.didExceedMaxLines) {
                          fitted = Text(
                            label,
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: base?.copyWith(fontSize: fs, color: onSurf.withOpacity(0.9)),
                          );
                          break;
                        }
                      }
                      return fitted ?? Text(
                        label,
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: base?.copyWith(color: onSurf.withOpacity(0.9)),
                      );
                    }),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
