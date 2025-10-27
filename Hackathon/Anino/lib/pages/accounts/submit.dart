import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:warp_api/warp_api.dart';
import 'package:flutter/services.dart' show rootBundle;
import '../../store2.dart';

import '../../accounts.dart';
import '../../generated/intl/messages.dart';
import '../utils.dart';
import '../widgets.dart';
import 'send.dart' show SendContext;
import '../../theme/zashi_tokens.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SubmitTxPage extends StatefulWidget {
  final String? txPlan;
  final String? txBin;
  final String? fakeTxId;
  SubmitTxPage({this.txPlan, this.txBin, this.fakeTxId});
  @override
  State<StatefulWidget> createState() => _SubmitTxState();
}

class _SubmitTxState extends State<SubmitTxPage> {
  String? txId;
  String? error;

  @override
  void initState() {
    super.initState();
    // Debug preview: show the "Sent" state with a provided fake txid
    if (widget.fakeTxId != null) {
      txId = widget.fakeTxId;
      return;
    }
    // If neither a tx plan nor a raw tx is provided, this page is used for
    // design/debug preview. In that case, skip broadcasting and keep the
    // indefinite spinner visible.
    if (widget.txPlan == null && widget.txBin == null) {
      return;
    }
    Future(() async {
      // Pause background sync to free CPU/IO during proving and broadcast
      try { syncStatus2.setPause(true); } catch (_) {}
      try {
        // Lazy prover initialization to avoid signing failures if Splash hasn't run yet
        try {
          final spend = await rootBundle.load('assets/sapling-spend.params');
          final output = await rootBundle.load('assets/sapling-output.params');
          WarpApi.initProver(spend.buffer.asUint8List(), output.buffer.asUint8List());
          appStore.proverReady = true;
        } catch (_) {}
        String? txIdJs;
        // Phase 1: sign only (faster feedback and parallelizable with UI)
        String? signedTx;
        if (widget.txPlan != null) {
          try {
            signedTx = await WarpApi.signOnly(aa.coin, aa.id, widget.txPlan!);
          } on String catch (e) {
            if (e.contains('Prover not initialized')) {
              try {
                final spend = await rootBundle.load('assets/sapling-spend.params');
                final output = await rootBundle.load('assets/sapling-output.params');
                WarpApi.initProver(spend.buffer.asUint8List(), output.buffer.asUint8List());
                appStore.proverReady = true;
                signedTx = await WarpApi.signOnly(aa.coin, aa.id, widget.txPlan!);
              } on String catch (e2) {
                throw e2;
              }
            } else {
              throw e;
            }
          }
        } else if (widget.txBin != null) {
          signedTx = widget.txBin;
        }
        // Phase 2: broadcast signed transaction, then get txid
        if (signedTx != null) {
          txIdJs = WarpApi.broadcast(aa.coin, signedTx);
          txId = jsonDecode(txIdJs);
        }
      } on String catch (e) {
        error = e;
      } finally {
        // Resume background sync after send path completes
        try { syncStatus2.setPause(false); } catch (_) {}
      }
      if (!mounted) return;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    final t = Theme.of(context);
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: null,
      body: Center(
          child: txId != null
              ? Builder(builder: (context) {
                  final t = Theme.of(context);
                  // Destination address preview (prefer live SendContext if present)
                  String? full = '';
                  try {
                    full = SendContext.instance?.address;
                  } catch (_) {}
                  full = (full ?? '').trim();
                  const sampleUa =
                      'u1k90h4m6k6y3xq2l7p0d8z6k3w7c5v9t2a0m5n8r4s1u3y2x5m9q7';
                  final src = full!.isNotEmpty ? full : sampleUa;
                  final int cut = src.length > 20 ? 20 : src.length;
                  final previewAddr = src.substring(0, cut) + '...';

                  return Stack(children: [
                    // Top gradient overlay: #F2B628 (semi-transparent) → background, fade by ~1/3 height
                    Positioned.fill(
                        child: IgnorePointer(
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              const Color(0x0DF2B628), // ~5% alpha
                              t.colorScheme.background.withOpacity(0.0),
                              t.colorScheme.background,
                            ],
                            stops: const [0.0, 0.22, 0.55], // longer, gentler fade toward Sent text area
                          ),
                        ),
                      ),
                    )),
                    Align(
                        alignment: Alignment.topCenter,
                        child: Padding(
                          padding: EdgeInsets.only(
                              top: MediaQuery.of(context).padding.top + kToolbarHeight + 22),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                            SizedBox(
                              width: 49 + (49 - (49 * 0.15)),
                              height: 49,
                              child: Stack(
                                clipBehavior: Clip.none,
                                children: [
                                  Positioned(
                                    left: 0,
                                    top: 0,
                                    child: Container(
                                      width: 49,
                                      height: 49,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: const Color(0xFFF4B728),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.black.withOpacity(0.94),
                                            blurRadius: 8,
                                            offset: Offset(0, 3),
                                            spreadRadius: 0,
                                          ),
                                        ],
                                      ),
                                      alignment: Alignment.center,
                                      child: ClipOval(
                                        child: Transform.scale(
                                          scale: 1.496,
                                          child: SvgPicture.network(
                                            'https://z.cash/wp-content/uploads/2023/11/Secondary-Brandmark-Black.svg',
                                            fit: BoxFit.contain,
                                            semanticsLabel: 'Zcash brandmark',
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Positioned(
                                    left: 49 - (49 * 0.15),
                                    top: 0,
                                    child: SizedBox(
                                      width: 49,
                                      height: 49,
                                      child: Center(
                                        child: Stack(
                                          alignment: Alignment.center,
                                          children: [
                                            Container(
                                              width: 49,
                                              height: 49,
                                              decoration: BoxDecoration(
                                                shape: BoxShape.circle,
                                                color: const Color(0xFF2E2C2C),
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: Colors.black.withOpacity(0.94),
                                                    blurRadius: 8,
                                                    offset: Offset(0, 3),
                                                    spreadRadius: 0,
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Icon(
                                              Icons.check,
                                              size: 37,
                                              color: Theme.of(context).colorScheme.onPrimary,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                          ),
                        )),
                    Align(
                        alignment: Alignment.center,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text('Sent!',
                                style: t.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w600)),
                            const Gap(8),
                            Text('Your coins were successfully sent to', style: t.textTheme.bodySmall),
                            const Gap(4),
                            Text(previewAddr, style: t.textTheme.bodySmall),
                            const Gap(12),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              child: Align(
                                alignment: Alignment.center,
                                child: FractionallySizedBox(
                                  widthFactor: 0.48,
                                  child: SizedBox(
                                    height: 48,
                                    child: Material(
                                      color: const Color(0xFF2E2C2C),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(14),
                                      ),
                                      child: InkWell(
                                        borderRadius: BorderRadius.circular(14),
                                        onTap: _openTx,
                                        child: Center(
                                          child: Text(
                                            s.openInExplorer,
                                            style: (t.textTheme.titleSmall ?? const TextStyle()).copyWith(
                                              fontFamily: t.textTheme.displaySmall?.fontFamily,
                                              fontWeight: FontWeight.w600,
                                              color: t.colorScheme.onSurface,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        )),
                    Positioned(
                        left: 0,
                        right: 0,
                        bottom: 26,
                        child: Align(
                          alignment: Alignment.center,
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: FractionallySizedBox(
                              widthFactor: 0.96,
                              child: SizedBox(
                                height: 48,
                                child: Material(
                                  color: (t.extension<ZashiThemeExt>()?.balanceAmountColor) ?? const Color(0xFFBDBDBD),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                  child: InkWell(
                                    borderRadius: BorderRadius.circular(14),
                                    onTap: _closeToBalance,
                                    child: Center(
                                      child: Text(
                                        'Close',
                                        style: (t.textTheme.titleSmall ?? const TextStyle()).copyWith(
                                          fontFamily: t.textTheme.displaySmall?.fontFamily,
                                          fontWeight: FontWeight.w600,
                                          color: t.colorScheme.background,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        )),
                  ]);
                })
              : error != null
                  ? Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Jumbotron(error!,
                            title: s.error, severity: Severity.Error)
                      ],
                    )
                  : Builder(builder: (context) {
                      String? full = '';
                      try {
                        full = SendContext.instance?.address;
                      } catch (_) {}
                      full = (full ?? '').trim();
                      const sampleUa =
                          'u1k90h4m6k6y3xq2l7p0d8z6k3w7c5v9t2a0m5n8r4s1u3y2x5m9q7';
                      final src = full!.isNotEmpty ? full : sampleUa;
                      final int cut = src.length > 20 ? 20 : src.length;
                      final previewAddr = src.substring(0, cut) + '...';
                      return Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          // Badge removed per request
                          BeatPulse(
                              color: const Color(0xFFF4B728),
                              size: 200,
                              duration:
                                  const Duration(milliseconds: 1400)),
                          const Gap(8),
                          SendingEllipses(
                              style: t.textTheme.titleLarge
                                  ?.copyWith(fontWeight: FontWeight.w600),
                              duration: const Duration(milliseconds: 2400)),
                          const Gap(8),
                          Text('Your ZEC is being sent to',
                              style: t.textTheme.bodySmall),
                          const Gap(4),
                          Text(previewAddr, style: t.textTheme.bodySmall),
                        ],
                      );
                    })),
    );
  }

  _openTx() {
    openTxInExplorer(txId!);
  }

  ok() {
    GoRouter.of(context).pop();
  }

  _closeToBalance() {
    // If launched from a thread, return to that thread; else default to account
    final sc = SendContext.instance;
    try {
      if (sc?.fromThread == true && sc?.threadIndex != null) {
        GoRouter.of(context).go('/messages/details?index=${sc!.threadIndex}');
        return;
      }
    } catch (_) {}
    GoRouter.of(context).go('/account');
  }
}

// _ZecOrangeBadge removed

class ExportUnsignedTxPage extends StatelessWidget {
  final String data;
  ExportUnsignedTxPage(this.data);

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(s.unsignedTx), actions: [
        IconButton(onPressed: () => export(context), icon: Icon(Icons.save))
      ]),
      body: AnimatedQR.init(s.rawTransaction, s.scanQrCode, data),
    );
  }

  export(BuildContext context) async {
    final s = S.of(context);
    await saveFile(data, 'tx.raw', s.rawTransaction);
  }
}

class BeatPulse extends StatefulWidget {
  final Color color;
  final double size;
  final Duration duration;
  const BeatPulse({super.key, required this.color, required this.size, required this.duration});

  @override
  State<BeatPulse> createState() => _BeatPulseState();
}

class _BeatPulseState extends State<BeatPulse> with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _travelController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(vsync: this, duration: widget.duration)..repeat(reverse: true);
    _travelController = AnimationController(vsync: this, duration: widget.duration)..repeat();
  }

  @override
  void didUpdateWidget(covariant BeatPulse oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.duration != widget.duration) {
      _pulseController.duration = widget.duration;
      _travelController.duration = widget.duration;
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _travelController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final double dotSize = widget.size * 0.18;
    return SizedBox(
        width: widget.size,
        height: widget.size,
        child: AnimatedBuilder(
            animation: Listenable.merge([_pulseController, _travelController]),
            builder: (context, _) {
              final double tPulse = Curves.easeInOut.transform(_pulseController.value);
              final double s1 = 0.75 + (1.20 - 0.75) * tPulse;
              final double s2 = 0.75 + (1.20 - 0.75) * (1.0 - tPulse);

              final double padding = widget.size * 0.02; // push dots closer to edges
              final double centerY = widget.size / 2;
              final double leftCX = padding + (dotSize / 2);
              final double rightCX = widget.size - padding - (dotSize / 2);

              final double tTravel = Curves.easeInOut.transform(_travelController.value);
              final double travelCX = leftCX + (rightCX - leftCX) * tTravel;
              final double travelSize = dotSize * 0.40;

              return Stack(children: [
                // Left pulsing dot
                Positioned(
                    left: leftCX - (dotSize * s1) / 2,
                    top: centerY - (dotSize * s1) / 2,
                    width: dotSize * s1,
                    height: dotSize * s1,
                    child: _Dot(color: widget.color, size: dotSize * s1)),
                // Right pulsing dot
                Positioned(
                    left: rightCX - (dotSize * s2) / 2,
                    top: centerY - (dotSize * s2) / 2,
                    width: dotSize * s2,
                    height: dotSize * s2,
                    child: _Dot(color: widget.color, size: dotSize * s2)),
                // Traveling glowing dot
                Positioned(
                    left: travelCX - (travelSize / 2),
                    top: centerY - (travelSize / 2),
                    width: travelSize,
                    height: travelSize,
                    child: DecoratedBox(
                        decoration: BoxDecoration(
                            color: widget.color,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                  color: widget.color.withOpacity(0.6),
                                  blurRadius: travelSize * 1.2,
                                  spreadRadius: travelSize * 0.15)
                            ])))
              ]);
            }));
  }
}

class _Dot extends StatelessWidget {
  final Color color;
  final double size;
  const _Dot({required this.color, required this.size});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}

/// A single centered glowing orb with a gentle pulse.
class CenterGlow extends StatefulWidget {
  final Color color;
  final double size;
  final Duration duration;
  const CenterGlow({super.key, required this.color, required this.size, this.duration = const Duration(milliseconds: 1400)});

  @override
  State<CenterGlow> createState() => _CenterGlowState();
}

class _CenterGlowState extends State<CenterGlow> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: widget.duration)..repeat(reverse: true);

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          final double t = Curves.easeInOut.transform(_controller.value); // 0..1
          final double scale = 0.94 + (1.06 - 0.94) * t;
          final double glowBlur = widget.size * (0.55 + 0.25 * t);
          final double glowSpread = widget.size * (0.06 + 0.04 * t);
          final Color glowColor = widget.color.withOpacity(0.70 + 0.15 * t);
          return Center(
            child: Transform.scale(
              scale: scale,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: widget.color,
                  boxShadow: [
                    BoxShadow(color: glowColor, blurRadius: glowBlur, spreadRadius: glowSpread),
                  ],
                ),
                child: SizedBox(width: widget.size * 0.25, height: widget.size * 0.25),
              ),
            ),
          );
        },
      ),
    );
  }
}

class SendingEllipses extends StatefulWidget {
  final TextStyle? style;
  final Duration duration;
  const SendingEllipses({super.key, this.style, this.duration = const Duration(milliseconds: 1200)});

  @override
  State<SendingEllipses> createState() => _SendingEllipsesState();
}

class _SendingEllipsesState extends State<SendingEllipses> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: widget.duration)..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  double _pulse(double phase, double start, double span) {
    final double t = (phase - start) / span;
    if (t < 0 || t > 1) return 0.0;
    // Triangle wave 0→1→0 over the interval
    return t < 0.5 ? t * 2.0 : (1.0 - t) * 2.0;
  }

  @override
  Widget build(BuildContext context) {
    final TextStyle baseStyle = widget.style ??
        Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w600) ??
        const TextStyle(fontWeight: FontWeight.w600);
    return AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          final double phase = _controller.value; // 0..1
          const double span = 1.0 / 3.0;
          final double p1 = _pulse(phase, 0.0, span);
          final double p2 = _pulse(phase, span, span);
          final double p3 = _pulse(phase, span * 2.0, span);

          Widget dot(double p) {
            final double opacity = 0.35 + 0.65 * p;
            return Opacity(opacity: opacity, child: Text('.', style: baseStyle));
          }

          return RichText(
              textAlign: TextAlign.center,
              text: TextSpan(style: baseStyle, children: [
                const TextSpan(text: 'Sending'),
                WidgetSpan(
                    alignment: PlaceholderAlignment.baseline,
                    baseline: TextBaseline.alphabetic,
                    child: dot(p1)),
                WidgetSpan(
                    alignment: PlaceholderAlignment.baseline,
                    baseline: TextBaseline.alphabetic,
                    child: dot(p2)),
                WidgetSpan(
                    alignment: PlaceholderAlignment.baseline,
                    baseline: TextBaseline.alphabetic,
                    child: dot(p3)),
              ]));
        });
  }
}
