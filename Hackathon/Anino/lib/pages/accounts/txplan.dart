import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'dart:ui' show FontFeature, TextPosition, TextRange;
import 'package:warp_api/data_fb_generated.dart';
import 'package:warp_api/warp_api.dart';

import '../../appsettings.dart';
import '../../store2.dart';
import '../../theme/zashi_tokens.dart';
import 'send.dart' show SendContext;
import '../utils.dart';
import '../../accounts.dart';
import '../../coin/coins.dart';
import '../../generated/intl/messages.dart';

class TxPlanPage extends StatefulWidget {
  final bool signOnly;
  final String plan;
  final String tab;
  TxPlanPage(this.plan, {required this.tab, this.signOnly = false});

  @override
  State<StatefulWidget> createState() => _TxPlanState();
}

class _TxPlanState extends State<TxPlanPage> with WithLoadingAnimation {
  late final s = S.of(context);
  bool _addrExpanded = false;
  bool _msgExpanded = false;
  final GlobalKey _contentKey = GlobalKey();
  bool _contentTooTall = false;

  @override
  void initState() {
    super.initState();
    Future(marketPrice.update);
  }

  @override
  Widget build(BuildContext context) {
    final report = WarpApi.transactionReport(aa.coin, widget.plan);
    final txplan = TxPlanWidget(widget.plan, report,
        signOnly: widget.signOnly, onSend: sendOrSign);
    return Scaffold(
        appBar: AppBar(
          title: Builder(builder: (context) {
            final t = Theme.of(context);
            final base = t.appBarTheme.titleTextStyle ??
                t.textTheme.titleLarge ??
                t.textTheme.titleMedium ??
                t.textTheme.bodyMedium;
            final reduced = (base?.fontSize != null)
                ? base!.copyWith(fontSize: base.fontSize! * 0.75)
                : base;
            return Text(
              'CONFIRMATION',
              style: reduced,
            );
          }),
          centerTitle: true,
          leadingWidth: 64,
          leading: Builder(builder: (context) {
            final t = Theme.of(context);
            final bg = const Color(0xFF2E2C2C).withOpacity(0.60);
            const double boxSize = 36;
            const double iconSize = 24;
            return Padding(
              padding: const EdgeInsets.only(left: 12),
              child: UnconstrainedBox(
                alignment: Alignment.centerLeft,
                child: InkWell(
                  borderRadius: BorderRadius.circular(12),
                  onTap: () {
                    final sc = SendContext.instance;
                    if (sc?.fromThread == true && sc?.threadIndex != null) {
                      GoRouter.of(context).go('/messages/details?index=${sc!.threadIndex}');
                    } else {
                      GoRouter.of(context).pop();
                    }
                  },
                  child: SizedBox(
                    width: boxSize,
                    height: boxSize,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        color: bg,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Icon(
                          Icons.close,
                          size: iconSize,
                          color: t.colorScheme.onPrimary,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          }),
          actions: const [],
        ),
        body: SafeArea(
            child: wrapWithLoading(Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: LayoutBuilder(builder: (context, constraints) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    final ctx = _contentKey.currentContext;
                    final size = ctx?.size;
                    if (size != null) {
                      final tooTall = size.height > constraints.maxHeight;
                      if (mounted && tooTall != _contentTooTall) {
                        setState(() => _contentTooTall = tooTall);
                      }
                    }
                  });
                  final scrollable = _msgExpanded || _addrExpanded || _contentTooTall;
                  return SingleChildScrollView(
                    physics: scrollable
                        ? const ClampingScrollPhysics()
                        : const NeverScrollableScrollPhysics(),
                    child: Column(key: _contentKey,
          children: [
            const Gap(22),
            Padding(
              padding: const EdgeInsets.only(top: 0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(
                    // Composite width = diameter + (diameter - overlap)
                    width: 49 + (49 - (49 * 0.15)),
                    height: 49,
                    child: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        // Gold circle on the left
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
                                // Reduce by another ~12% from 1.7 → ≈1.496
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
                        // Send circle on the right (rendered last so it overlaps on top)
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
                                  // Background circle anchored to icon center
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
                                  // Icon (no offset now that SVG is origin-centered)
                                  SvgPicture.asset(
                                    'assets/icons/send_quick.svg',
                                    width: 37,
                                    height: 37,
                                    fit: BoxFit.contain,
                                    alignment: Alignment.center,
                                    colorFilter: ColorFilter.mode(
                                      Theme.of(context).colorScheme.onPrimary,
                                      BlendMode.srcIn,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Gap(8),
                  Builder(builder: (context) {
                    final t = Theme.of(context);
                    final base = t.appBarTheme.titleTextStyle ??
                        t.textTheme.titleLarge ??
                        t.textTheme.titleMedium ??
                        t.textTheme.bodyMedium;
                    final effective = base ?? const TextStyle();
                    final fs = effective.fontSize;
                    final style = fs != null
                        ? effective.copyWith(fontSize: fs * 0.7425)
                        : effective;
                    final color = t.appBarTheme.titleTextStyle?.color ?? style.color;
                    return Text('Sending', style: style.copyWith(color: color));
                  }),
                  const Gap(2),
                  Builder(builder: (context) {
                    // Amount to send: prefer the original send context; fallback to report outputs
                    int? sendZats = SendContext.instance?.amount.value;
                    if (sendZats == null || sendZats <= 0) {
                      final outs = report.outputs;
                      if (outs != null) {
                        try {
                          sendZats = outs.fold<int>(0, (s, o) => s + (o.amount ?? 0));
                        } catch (_) {
                          sendZats = 0;
                        }
                      } else {
                        sendZats = 0;
                      }
                    }

                    final t = Theme.of(context);
                    // Match Balance tab formatting: big 3 decimals, small 5 trailing digits
                    final balHi = decimalFormat((sendZats! ~/ 100000) / 1000.0, 3);
                    final balLo = (sendZats % 100000).toString().padLeft(5, '0');

                    // Ensure trailing five digits are smaller than the leading part
                    final Color amtColor = const Color(0xFFBDBDBD);
                    final TextStyle bigStyle = (t.textTheme.displaySmall ?? const TextStyle()).copyWith(
                      color: amtColor,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    );
                    final double bigSize = bigStyle.fontSize ?? 28;
                    final TextStyle smallStyleDigits = bigStyle.copyWith(
                      fontSize: bigSize * 0.70, // visibly smaller than the leading part
                    );

                    final amountWidget = RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(children: [
                        WidgetSpan(
                          alignment: PlaceholderAlignment.baseline,
                          baseline: TextBaseline.alphabetic,
                          child: Transform.translate(
                            offset: const Offset(0, -6),
                            child: SizedBox(
                              width: 28,
                              height: 28,
                              child: SvgPicture.asset(
                                'assets/icons/zec_glyph.svg',
                                width: 28,
                                height: 28,
                                colorFilter: const ColorFilter.mode(Color(0xFFBDBDBD), BlendMode.srcIn),
                              ),
                            ),
                          ),
                        ),
                        const WidgetSpan(child: SizedBox(width: 6)),
                        TextSpan(text: balHi, style: bigStyle),
                        TextSpan(text: balLo, style: smallStyleDigits),
                      ], style: t.textTheme.bodyMedium),
                    );

                    // Fiat line below amount: only show the USD value centered
                    // Prefer the FX snapshot captured while entering the amount
                    final fx = SendContext.instance?.amount.value != null
                        ? (SendContext.instance?.let((sc) => sc.fx) ?? marketPrice.price)
                        : marketPrice.price;
                    final sz = sendZats ?? 0;
                    final sendFiat = fx?.let((f) => sz * f / ZECUNIT);
                    // If FX snapshot exists and USD was the input, sendFiat should round to 2 decimals consistently
                    String? txtSendFiat = sendFiat?.let((x) => decimalFormat(x, 2, symbol: appSettings.currency));
                    final zashi = Theme.of(context).extension<ZashiThemeExt>();
                    final balanceColor = zashi?.balanceAmountColor ?? const Color(0xFFBDBDBD);
                    final smallStyle = t.textTheme.bodyMedium?.copyWith(color: balanceColor);

                    return Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        amountWidget,
                        if (txtSendFiat != null) ...[
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(txtSendFiat, style: smallStyle),
                            ],
                          ),
                        ],
                      ],
                    );
                  }),
                ],
              ),
            ),
            // Keep vertical rhythm consistent:
            // Gap between amount and USD is 12; mirror that before the info box
            const Gap(24),
            Builder(builder: (context) {
              final t = Theme.of(context);
              final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
              const addressFillColor = Color(0xFF2E2C2C);
              final cursorColor = t.extension<ZashiThemeExt>()?.balanceAmountColor ?? const Color(0xFFBDBDBD);
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Align(
                  alignment: Alignment.center,
                  child: FractionallySizedBox(
                    widthFactor: 0.96,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Transaction Details',
                          style: t.textTheme.titleSmall?.copyWith(fontFamily: balanceFontFamily),
                        ),
                        const Gap(12),
                        // Collapsible destination address inside an informational box
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(14),
                            onTap: () => setState(() => _addrExpanded = !_addrExpanded),
                            child: Container(
                              decoration: BoxDecoration(
                                color: addressFillColor,
                                borderRadius: BorderRadius.circular(14),
                              ),
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                              child: Builder(builder: (context) {
                                // Determine destination address from send context, fallback to report
                                String? full = SendContext.instance?.address;
                                if (full == null || full.isEmpty) {
                                  final outs = report.outputs;
                                  if (outs != null && outs.isNotEmpty) {
                                    full = outs.first.address;
                                  }
                                }
                                full ??= '';
                                final trimmed = full.trim();
                                final textStyle = (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                                  fontFamily: balanceFontFamily,
                                  color: t.colorScheme.onSurface,
                                );
                                final monoStyle = GoogleFonts.jetBrainsMono(
                                  textStyle: t.textTheme.bodyMedium,
                                  fontFeatures: const [
                                    FontFeature.tabularFigures(),
                                    FontFeature.slashedZero(),
                                  ],
                                  color: t.colorScheme.onSurface,
                                );
                                return Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      children: [
                                        Expanded(
                                          child: Text(
                                            'Sending to',
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: textStyle,
                                          ),
                                        ),
                                        // Contact name (if the destination address is a saved contact)
                                        Builder(builder: (context) {
                                          String? contactName = SendContext.instance?.display?.trim();
                                          try {
                                            // If no display passed, fallback to contacts lookup by address
                                            if ((contactName ?? '').isEmpty) {
                                              for (final c in contacts.contacts) {
                                                final addr = (c.address ?? '').trim();
                                                if (addr == trimmed) {
                                                  contactName = (c.name ?? '').trim();
                                                  break;
                                                }
                                              }
                                            }
                                          } catch (_) {}
                                          final bool showContact = (contactName ?? '').isNotEmpty;
                                          if (!showContact) return const SizedBox.shrink();
                                          return Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              const SizedBox(width: 8),
                                              ConstrainedBox(
                                                constraints: const BoxConstraints(maxWidth: 160),
                                                child: Text(
                                                  contactName!,
                                                  maxLines: 1,
                                                  overflow: TextOverflow.ellipsis,
                                                  style: textStyle,
                                                  textAlign: TextAlign.right,
                                                ),
                                              ),
                                              const SizedBox(width: 8),
                                            ],
                                          );
                                        }),
                                        AnimatedRotation(
                                          duration: const Duration(milliseconds: 180),
                                          turns: _addrExpanded ? 0.5 : 0.0,
                                          child: Icon(
                                            Icons.expand_more,
                                            color: t.colorScheme.onSurface,
                                          ),
                                        ),
                                      ],
                                    ),
                                    AnimatedCrossFade(
                                      duration: const Duration(milliseconds: 180),
                                      firstChild: const SizedBox.shrink(),
                                      secondChild: Padding(
                                        padding: const EdgeInsets.only(top: 8),
                                        child: Text(
                                          trimmed,
                                          style: monoStyle,
                                          softWrap: true,
                                        ),
                                      ),
                                      crossFadeState: _addrExpanded
                                          ? CrossFadeState.showSecond
                                          : CrossFadeState.showFirst,
                                    ),
                                  ],
                                );
                              }),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }),
            const Gap(12),
            // Summary box: Amount / Fee / Total (non-collapsible)
            Builder(builder: (context) {
              final t = Theme.of(context);
              final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
              const fill = Color(0xFF2E2C2C);

              // Compute send amount from SendContext, fallback to report.outputs
              int sendZats = SendContext.instance?.amount.value ?? 0;
              if (sendZats <= 0) {
                final outs = report.outputs;
                if (outs != null) {
                  try {
                    sendZats = outs.fold<int>(0, (s, o) => s + (o.amount ?? 0));
                  } catch (_) {
                    sendZats = 0;
                  }
                }
              }
              final int feeZats = report.fee ?? 0;
              final int totalZats = sendZats + feeZats;

              // Match the CONFIRMATION title font family for labels and values
              final TextStyle? appBarTitle = t.appBarTheme.titleTextStyle ??
                  t.textTheme.titleLarge ??
                  t.textTheme.titleMedium ??
                  t.textTheme.bodyMedium;
              final String? confirmFontFamily = appBarTitle?.fontFamily;

              final TextStyle labelStyle = (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                fontFamily: confirmFontFamily ?? balanceFontFamily,
                color: t.colorScheme.onSurface,
              );
              final TextStyle valueStyle = (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                fontFamily: confirmFontFamily ?? balanceFontFamily,
                color: t.colorScheme.onSurface,
              );
              final TextStyle valueBold = valueStyle.copyWith(fontWeight: FontWeight.w700);

              Widget valueRich(int zats, {bool bold = false}) {
                // Split into big first three decimals and smaller trailing five
                final String hi = decimalFormat((zats ~/ 100000) / 1000.0, 3);
                final String lo = (zats % 100000).toString().padLeft(5, '0');
                final TextStyle big = (bold ? valueBold : valueStyle).copyWith(
                  fontFeatures: const [FontFeature.tabularFigures()],
                );
                final double base = big.fontSize ?? 14;
                final TextStyle small = big.copyWith(fontSize: base * 0.75);
                return Align(
                  alignment: Alignment.centerRight,
                  child: RichText(
                    text: TextSpan(children: [
                      TextSpan(text: hi, style: big),
                      TextSpan(text: lo, style: small),
                    ]),
                    textAlign: TextAlign.right,
                  ),
                );
              }

              Widget row(String left, int zats, {bool bold = false}) => Row(
                    children: [
                      Expanded(child: Text(left, style: bold ? labelStyle.copyWith(fontWeight: FontWeight.w700) : labelStyle)),
                      valueRich(zats, bold: bold),
                    ],
                  );

              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Align(
                  alignment: Alignment.center,
                  child: FractionallySizedBox(
                    widthFactor: 0.96,
                    child: Container(
                      decoration: BoxDecoration(
                        color: fill,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                      child: Column(
                        children: [
                          row('Amount', sendZats),
                          const Gap(8),
                          row('Fee', feeZats),
                          const Gap(8),
                          row('Total', totalZats, bold: true),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            }),
            const Gap(12),
            // Message box: displays memo/message from send flow; collapsible like "Sending to"
            Builder(builder: (context) {
              final t = Theme.of(context);
              final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
              const fill = Color(0xFF2E2C2C);

              // Use the same font family as the CONFIRMATION title where possible
              final TextStyle? appBarTitle = t.appBarTheme.titleTextStyle ??
                  t.textTheme.titleLarge ??
                  t.textTheme.titleMedium ??
                  t.textTheme.bodyMedium;
              final String? confirmFontFamily = appBarTitle?.fontFamily;

              // Memo/message from the send flow
              final String memoText = (SendContext.instance?.memo?.memo ?? '').trim();
              final bool hasMemo = memoText.isNotEmpty;

              // Match collapsed height of the "Sending to" box:
              // 14 (top) + 14 (bottom) + max(text line height, chevron icon size 24)
              final double baseFs = (t.textTheme.bodyMedium?.fontSize ?? 14);
              final double lineHeightFactor = (t.textTheme.bodyMedium?.height ?? 1.0);
              final double oneLineHeight = baseFs * lineHeightFactor;
              const double chevronSize = 24.0;
              final double collapsedMinHeight = 28 + (oneLineHeight > chevronSize ? oneLineHeight : chevronSize);

              final TextStyle previewStyle = (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                fontFamily: confirmFontFamily ?? balanceFontFamily,
                color: t.colorScheme.onSurface,
              );
              final TextStyle fullStyle = previewStyle;

              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Align(
                  alignment: Alignment.center,
                  child: FractionallySizedBox(
                    widthFactor: 0.96,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Message',
                          style: t.textTheme.titleSmall?.copyWith(fontFamily: balanceFontFamily),
                        ),
                        const Gap(12),
                        if (!hasMemo)
                          Container(
                            decoration: BoxDecoration(
                              color: fill,
                              borderRadius: BorderRadius.circular(14),
                            ),
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            constraints: BoxConstraints(minHeight: collapsedMinHeight),
                          )
                        else
                          LayoutBuilder(builder: (context, constraints) {
                            const double chevronSize = 24.0;
                            // Compute the visible prefix end index for a single-line preview at a given width
                            int computeEndIndex(String text, TextStyle style, double maxWidth) {
                              if (text.isEmpty) return 0;
                              final TextPainter tp = TextPainter(
                                text: TextSpan(text: text, style: style),
                                textDirection: Directionality.of(context),
                              );
                              tp.layout(maxWidth: maxWidth);
                              final TextRange firstLine = tp.getLineBoundary(const TextPosition(offset: 0));
                              final int cut = firstLine.end;
                              return cut.clamp(0, text.length);
                            }

                            // Determine if the memo overflows when using the full row width (no chevron)
                            final int cutFullWidth = computeEndIndex(memoText, previewStyle, constraints.maxWidth);
                            final bool expandable = cutFullWidth < memoText.length;

                            // For preview splitting, reserve space only when we actually render the chevron
                            final double previewWidth = expandable
                                ? (constraints.maxWidth - chevronSize).clamp(0.0, constraints.maxWidth)
                                : constraints.maxWidth;
                            final int cutIndex = computeEndIndex(memoText, previewStyle, previewWidth);
                            final String previewPrefix = (cutIndex <= memoText.length)
                                ? memoText.substring(0, cutIndex)
                                : memoText;
                            final String remainder = (cutIndex < memoText.length)
                                ? memoText.substring(cutIndex)
                                : '';

                            final Widget box = Container(
                              decoration: BoxDecoration(
                                color: fill,
                                borderRadius: BorderRadius.circular(14),
                              ),
                              width: double.infinity,
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.center,
                                    children: [
                                      Expanded(
                                        child: _msgExpanded
                                            ? Text(
                                                previewPrefix,
                                                maxLines: 1,
                                                style: previewStyle,
                                              )
                                            : Text(
                                                memoText,
                                                maxLines: 1,
                                                overflow: TextOverflow.ellipsis,
                                                style: previewStyle,
                                              ),
                                      ),
                                      if (expandable)
                                        AnimatedRotation(
                                          duration: const Duration(milliseconds: 180),
                                          turns: _msgExpanded ? 0.5 : 0.0,
                                          child: Icon(
                                            Icons.expand_more,
                                            color: t.colorScheme.onSurface,
                                          ),
                                        ),
                                    ],
                                  ),
                                  if (expandable)
                                    AnimatedCrossFade(
                                      duration: const Duration(milliseconds: 180),
                                      firstChild: const SizedBox.shrink(),
                                      secondChild: remainder.isEmpty
                                          ? const SizedBox.shrink()
                                          : Text(
                                              remainder,
                                              style: fullStyle,
                                              softWrap: true,
                                            ),
                                      crossFadeState: _msgExpanded
                                          ? CrossFadeState.showSecond
                                          : CrossFadeState.showFirst,
                                    ),
                                ],
                              ),
                            );

                            // Wrap with InkWell only if expandable (otherwise no chevron and not tappable)
                            final Widget material = Material(
                              color: Colors.transparent,
                              child: expandable
                                  ? InkWell(
                                      borderRadius: BorderRadius.circular(14),
                                      onTap: () => setState(() => _msgExpanded = !_msgExpanded),
                                      child: box,
                                    )
                                  : box,
                            );

                            return material;
                          }),
                      ],
                    ),
                  ),
                ),
              );
            }),
            // Table removed per request
            const Gap(27),
            if (aa.canPay && !txplan.invalidPrivacy)
              Builder(builder: (context) {
                final t = Theme.of(context);
                final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
                final Color balanceCursorColor =
                    t.extension<ZashiThemeExt>()?.balanceAmountColor ?? const Color(0xFFBDBDBD);
                // Match AppBar 'CONFIRMATION' reduced title size for the Send button text
                final baseTitle = t.appBarTheme.titleTextStyle ??
                    t.textTheme.titleLarge ??
                    t.textTheme.titleMedium ??
                    t.textTheme.bodyMedium;
                final reducedTitle = (baseTitle?.fontSize != null)
                    ? baseTitle!.copyWith(fontSize: baseTitle.fontSize! * 0.75)
                    : baseTitle;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Align(
                    alignment: Alignment.center,
                    child: FractionallySizedBox(
                      widthFactor: 0.96,
                      child: SizedBox(
                        height: 48,
                        child: Material(
                          color: balanceCursorColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(14),
                            onTap: () => sendOrSign(context),
                            child: Center(
                              child: Text(
                                'Send',
                                style: (reducedTitle ?? const TextStyle()).copyWith(
                                  fontFamily: balanceFontFamily,
                                  fontWeight: FontWeight.w600,
                                  color: Theme.of(context).colorScheme.background,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }),
          ],
        ),
      );
    }),
  )),
),
);
  }

  send(BuildContext context) {
    // Navigate immediately; heavy work (proving/broadcast) happens on SubmitTxPage
    Future.microtask(() =>
        GoRouter.of(context).go('/${widget.tab}/submit_tx', extra: widget.plan));
  }

  exportRaw(BuildContext context) {
    GoRouter.of(context).go('/account/export_raw_tx', extra: widget.plan);
  }

  Future<void> sendOrSign(BuildContext context) async {
    if (widget.signOnly) {
      await sign(context);
    } else {
      send(context);
    }
  }

  sign(BuildContext context) async {
    try {
      await load(() async {
        final txBin = await WarpApi.signOnly(aa.coin, aa.id, widget.plan);
        GoRouter.of(context).go('/more/cold/signed', extra: txBin);
      });
    } on String catch (error) {
      await showMessageBox2(context, s.error, error);
    }
  }
}

class TxPlanWidget extends StatelessWidget {
  final String plan;
  final TxReport report;
  final bool signOnly;
  final Future<void> Function(BuildContext context)? onSend;

  TxPlanWidget(this.plan, this.report, {required this.signOnly, this.onSend});

  // factory TxPlanWidget.fromPlan(String plan, {bool signOnly = false}) {
  //   final report = WarpApi.transactionReport(aa.coin, plan);
  //   return TxPlanWidget(plan, report, signOnly: signOnly);
  // }

  get invalidPrivacy => report.privacyLevel < appSettings.minPrivacyLevel;

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    final t = Theme.of(context);
    final c = coins[aa.coin];
    final supportsUA = c.supportsUA;
    final rows = report.outputs!.map((e) {
      final style = _styleOfAddress(e.address!, t);
      return DataRow(cells: [
        DataCell(Text('${centerTrim(e.address!)}', style: style)),
        DataCell(Text('${poolToString(s, e.pool)}', style: style)),
        DataCell(Text('${amountToString2(e.amount, digits: MAX_PRECISION)}',
            style: style)),
      ]);
    }).toList();

    return Column(children: [
      Row(children: [
        Expanded(
            child: DataTable(
                headingRowHeight: 32,
                columnSpacing: 32,
                columns: [
                  DataColumn(label: Text(s.address)),
                  DataColumn(label: Text(s.pool)),
                  DataColumn(label: Expanded(child: Text(s.amount))),
                ],
                rows: rows))
      ]),
      Divider(
        height: 16,
        thickness: 2,
        color: t.primaryColor,
      ),
      ListTile(
          visualDensity: VisualDensity.compact,
          title: Text(s.transparentInput),
          trailing: Text(
              amountToString2(report.transparent, digits: MAX_PRECISION),
              style: TextStyle(color: t.primaryColor))),
      ListTile(
          visualDensity: VisualDensity.compact,
          title: Text(s.saplingInput),
          trailing:
              Text(amountToString2(report.sapling, digits: MAX_PRECISION))),
      if (supportsUA)
        ListTile(
            visualDensity: VisualDensity.compact,
            title: Text(s.orchardInput),
            trailing:
                Text(amountToString2(report.orchard, digits: MAX_PRECISION))),
      ListTile(
          visualDensity: VisualDensity.compact,
          title: Text(s.netSapling),
          trailing: Text(
              amountToString2(report.netSapling, digits: MAX_PRECISION),
              style: TextStyle(color: t.primaryColor))),
      if (supportsUA)
        ListTile(
            visualDensity: VisualDensity.compact,
            title: Text(s.netOrchard),
            trailing: Text(
                amountToString2(report.netOrchard, digits: MAX_PRECISION),
                style: TextStyle(color: t.primaryColor))),
      ListTile(
          visualDensity: VisualDensity.compact,
          title: Text(s.fee),
          trailing: Text(amountToString2(report.fee, digits: MAX_PRECISION),
              style: TextStyle(color: t.primaryColor))),
      privacyToString(context, report.privacyLevel,
          canSend: !invalidPrivacy, onSend: onSend)!,
      Gap(16),
      if (invalidPrivacy)
        Text(s.privacyLevelTooLow, style: t.textTheme.bodyLarge),
    ]);
  }

  TextStyle? _styleOfAddress(String address, ThemeData t) {
    final a = WarpApi.receiversOfAddress(aa.coin, address);
    return a == 1 ? TextStyle(color: t.primaryColor) : null;
  }
}

class _ZcashZPainter extends CustomPainter {
  final Color zColor;
  final Color notchColor;

  _ZcashZPainter({required this.zColor, required this.notchColor});

  @override
  void paint(Canvas canvas, Size size) {
    // Draw a bold, constant-thickness Z with centered pill notches
    final double w = size.width;
    final double h = size.height;

    // Clip to the circular badge so strokes never protrude outside
    final double r = (w < h ? w : h) / 2.0 - 2.0; // minus border
    final Path clipCircle = Path()
      ..addOval(Rect.fromCircle(center: Offset(w / 2, h / 2), radius: r));
    canvas.save();
    canvas.clipPath(clipCircle);

    // Thickness and placement
    final double stroke = h * 0.20; // overall thickness of the Z
    final double margin = r * 0.55; // inset from left/right edges
    final double topY = h * 0.33;
    final double bottomY = h * 0.67;

    // Z path rendered as a stroked polyline
    final Path path = Path()
      ..moveTo(margin, topY)
      ..lineTo(w - margin, topY)
      ..lineTo(margin, bottomY)
      ..lineTo(w - margin, bottomY);

    final Paint strokePaint = Paint()
      ..color = zColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.butt
      ..strokeJoin = StrokeJoin.miter;
    canvas.drawPath(path, strokePaint);

    // Carve small pill notches in the top/bottom bars (negative space)
    final Paint notchPaint = Paint()
      ..color = notchColor
      ..style = PaintingStyle.fill;

    final double notchWidth = stroke * 0.65;
    final double notchHeight = stroke * 0.38;
    final RRect topNotch = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: Offset(w / 2, topY),
        width: notchWidth,
        height: notchHeight,
      ),
      Radius.circular(notchHeight * 0.5),
    );
    final RRect bottomNotch = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: Offset(w / 2, bottomY),
        width: notchWidth,
        height: notchHeight,
      ),
      Radius.circular(notchHeight * 0.5),
    );
    canvas.drawRRect(topNotch, notchPaint);
    canvas.drawRRect(bottomNotch, notchPaint);

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _ZcashZPainter oldDelegate) {
    return oldDelegate.zColor != zColor || oldDelegate.notchColor != notchColor;
  }
}

String poolToString(S s, int pool) {
  switch (pool) {
    case 0:
      return s.transparent;
    case 1:
      return s.sapling;
  }
  return s.orchard;
}

Widget? privacyToString(BuildContext context, int privacyLevel,
    {required bool canSend,
    Future<void> Function(BuildContext context)? onSend}) {
  final m = S
      .of(context)
      .privacy(getPrivacyLevel(context, privacyLevel).toUpperCase());
  final colors = [Colors.red, Colors.orange, Colors.yellow, Colors.green];
  return getColoredButton(context, m, colors[privacyLevel],
      canSend: canSend, onSend: onSend);
}

ElevatedButton getColoredButton(BuildContext context, String text, Color color,
    {required bool canSend,
    Future<void> Function(BuildContext context)? onSend}) {
  var foregroundColor =
      color.computeLuminance() > 0.5 ? Colors.black : Colors.white;

  final doSend = () => onSend?.call(context);
  return ElevatedButton(
      onLongPress: doSend,
      onPressed: canSend ? doSend : null,
      child: Text(text),
      style: ElevatedButton.styleFrom(
          backgroundColor: color, foregroundColor: foregroundColor));
}
