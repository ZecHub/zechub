import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'dart:ui' show FontFeature;
import 'package:flutter_mobx/flutter_mobx.dart';

import '../../appsettings.dart';
import '../../theme/zashi_tokens.dart';
import '../../store2.dart';
import '../../accounts.dart';
import '../../coin/coins.dart';
import '../utils.dart';

class BalanceWidget extends StatefulWidget {
  final int mode;
  final void Function()? onMode;
  BalanceWidget(this.mode, {this.onMode, super.key});
  @override
  State<StatefulWidget> createState() => BalanceState();
}

class BalanceState extends State<BalanceWidget> {
  @override
  void initState() {
    super.initState();
    Future(marketPrice.update);
  }

  String _formatFiat(double x) =>
      decimalFormat(x, 2, symbol: appSettings.currency);

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final mode = widget.mode;

    final color = mode == 0
        ? t.colorScheme.secondary
        : mode == 1
            ? t.colorScheme.primaryContainer
            : t.colorScheme.primary;

    return Observer(builder: (context) {
      aaSequence.settingsSeqno;
      aa.height;
      aa.currency;
      appStore.flat;
      appStore.hideBalances;

      // Only obey manual eyeball toggle; ignore tilt-to-hide (disabled)
      final hideBalance = false;
      if (hideBalance) return SizedBox();

      final c = coins[aa.coin];
      final balHi = decimalFormat((balance ~/ 100000) / 1000.0, 3);
      final balLo = (balance % 100000).toString().padLeft(5, '0');
      final fiat = marketPrice.price;
      final balFiat = fiat?.let((fx) => balance * fx / ZECUNIT);
      final txtFiat = fiat?.let(_formatFiat);
      final txtBalFiat = balFiat?.let(_formatFiat);

      final shouldHide = appStore.hideBalances;
      final balanceWidget = shouldHide
          ? RichText(
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
                TextSpan(
                  text: '---',
                  style: t.textTheme.displaySmall?.copyWith(
                    color: const Color(0xFFBDBDBD),
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
                TextSpan(
                  text: '-----',
                  style: t.textTheme.titleMedium?.copyWith(
                    color: const Color(0xFFBDBDBD),
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
              ], style: t.textTheme.bodyMedium),
            )
          : RichText(
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
          WidgetSpan(child: SizedBox(width: 6)),
          TextSpan(
            text: balHi,
            style: t.textTheme.displaySmall?.copyWith(
              color: const Color(0xFFBDBDBD),
              fontFeatures: const [FontFeature.tabularFigures()],
            ),
          ),
          TextSpan(
            text: balLo,
            style: t.textTheme.titleMedium?.copyWith(
              color: const Color(0xFFBDBDBD),
              fontFeatures: const [FontFeature.tabularFigures()],
            ),
          ),
        ], style: t.textTheme.bodyMedium),
      );
      final ob = otherBalance;

      return GestureDetector(
        onTap: widget.onMode,
        child: Column(
          children: [
            ob > 0
                ? InputDecorator(
                    decoration: InputDecoration(
                        label: Text('+ ${amountToString2(ob)}'),
                        border: OutlineInputBorder(
                            borderSide: BorderSide(color: t.primaryColor),
                            borderRadius: BorderRadius.circular(8))),
                    child: balanceWidget)
                : balanceWidget,
            SizedBox(height: 12),
            if ((txtBalFiat != null || txtFiat != null))
              Builder(builder: (context) {
                final zashi = Theme.of(context).extension<ZashiThemeExt>();
                final balanceColor = zashi?.balanceAmountColor ?? const Color(0xFFBDBDBD);
                final smallStyle = t.textTheme.bodyMedium?.copyWith(color: balanceColor);
                return Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (txtBalFiat != null)
                      Text(shouldHide ? 'USD---' : txtBalFiat, style: smallStyle),
                    if (txtBalFiat != null && txtFiat != null) ...[
                      const SizedBox(width: 12),
                      Text('|', style: smallStyle),
                      const SizedBox(width: 12),
                    ],
                    if (txtFiat != null)
                      Text('1 ${c.ticker} = $txtFiat', style: smallStyle),
                  ],
                );
              }),
          ],
        ),
      );
    });
  }

  bool hide(bool flat) => false;

  int get balance {
    switch (widget.mode) {
      case 0:
      case 4:
        return totalBalance;
      case 1:
        return aa.poolBalances.transparent;
      case 2:
        return aa.poolBalances.sapling;
      case 3:
        return aa.poolBalances.orchard;
    }
    throw 'Unreachable';
  }

  int get totalBalance =>
      aa.poolBalances.transparent +
      aa.poolBalances.sapling +
      aa.poolBalances.orchard;

  int get otherBalance => totalBalance - balance;
}
