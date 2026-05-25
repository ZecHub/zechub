import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:warp_api/warp_api.dart';

import '../../accounts.dart';
import '../../appsettings.dart';
import '../../generated/intl/messages.dart';
import '../utils.dart';
import 'qr_address.dart';
import '../../theme/zashi_tokens.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ReceiveQrPage extends StatelessWidget {
  const ReceiveQrPage({super.key});

  @override
  Widget build(BuildContext context) {
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
            'RECEIVE ZEC',
            style: reduced,
          );
        }),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const ReceiveAddressPanels(),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          child: const _PrivacyHintBanner(),
        ),
      ),
    );
  }
}


class ReceiveAddressPanels extends StatefulWidget {
  const ReceiveAddressPanels({super.key});

  @override
  State<ReceiveAddressPanels> createState() => _ReceiveAddressPanelsState();
}

class _ReceiveAddressPanelsState extends State<ReceiveAddressPanels> {
  int _expandedIndex = 0; // 0: shielded (unified), 1: transparent

  void _setExpanded(int index) => setState(() => _expandedIndex = index);

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    return Observer(builder: (context) {
      // Touch reactive fields so MobX rebuilds when account/addresses change
      aa.diversifiedAddress;

      final uaType = coinSettings.uaType;
      final unified = aa.id == 0 ? '' : WarpApi.getAddress(aa.coin, aa.id, uaType);
      final transparent = aa.id == 0 ? '' : WarpApi.getAddress(aa.coin, aa.id, 1);

      return Column(
        children: [
          _AddressPanel(
            icon: Icons.shield_outlined,
            title: 'Zcash Shielded Address',
            subtitle: 'Rotates every time you use it',
            address: aa.diversifiedAddress,
            expanded: _expandedIndex == 0,
            onTap: () => _setExpanded(0),
            onInfo: () => _showInfo(
              context,
              'Zcash Shielded Address (Rotating)',
              '- Use this address to receive and store your ZEC privately. Transparent and shielded ZEC sent to this address will be received and stored as shielded ZEC.\n\n'
              '- A new Zcash Shielded Address is generated each time you open the Receive screen.\n\n'
              '- All transactions sent to your rotating Shielded Addresses will remain part of one wallet balance under the same seed phrase.\n\n'
              '- While we recommend using a new address every time, each unique address can be reused.',
            ),
            onCopy: () {
              _copy(context, aa.diversifiedAddress);
              aa.updateDivisified();
            },
            onQr: () {
              aa.updateDivisified();
              final addr = aa.diversifiedAddress;
              if (addr.isNotEmpty) _showQr(context, 'Zcash Shielded Address', addr);
            },
            onRequest: () => _requestShielded(context),
            containerColor: t.colorScheme.surfaceVariant,
          ),
          const Gap(12),
          _AddressPanel(
            icon: Icons.account_balance_wallet_outlined,
            title: 'Zcash Transparent Address',
            subtitle: transparent.length > 20
                ? (transparent.substring(0, 20) + '...')
                : transparent,
            address: transparent,
            expanded: _expandedIndex == 1,
            onTap: () => _setExpanded(1),
            onInfo: () => _showInfo(
              context,
              'Zcash Transparent Address (Static)',
              '- This address type works just like a Bitcoin address and offers NO PRIVACY. The details of transactions sent to this address will be public and visible on the blockchain.\n\n'
              '- It is not recommended to use this address type unless the wallet or exchange from which ZEC is being sent does not support sending funds to shielded Zcash addresses.\n\n'
              '- To protect your privacy, Anino will guide you to shield any transparent ZEC you receive with just one tap.\n\n'
              "- You won't be able to spend your transparent ZEC until you shield it.",
            ),
            onCopy: () => _copy(context, transparent),
            onQr: () => _showQr(context, 'Transparent Address', transparent),
            onRequest: () => _requestTransparent(context),
            containerColor: t.colorScheme.surfaceVariant,
          ),
        ],
      );
    });
  }

  void _copy(BuildContext context, String value) {
    if (value.isEmpty) return;
    Clipboard.setData(ClipboardData(text: value));
    final s = S.of(context);
    showSnackBar(s.addressCopiedToClipboard);
  }

  void _showQr(BuildContext context, String title, String value) {
    // Fallback to current UA if the provided value is empty
    final text = value.isNotEmpty
        ? value
        : (aa.id == 0 ? '' : WarpApi.getAddress(aa.coin, aa.id, coinSettings.uaType));
    if (text.isEmpty) return;
    final qrUri = Uri(path: '/showqr', queryParameters: {'title': title, 'addr': text});
    GoRouter.of(context).push(qrUri.toString(), extra: text);
  }

  void _requestShielded(BuildContext context) {
    // Rotate a new shielded address, then open Request flow with diversified UA (mode=4)
    try { aa.updateDivisified(); } catch (_) {}
    GoRouter.of(context).push('/account/request?mode=4');
  }

  void _requestTransparent(BuildContext context) {
    // Open Request flow for transparent address (mode=1) — no memo textbox
    GoRouter.of(context).push('/account/request?mode=1');
  }

  void _showInfo(BuildContext context, String title, String msg) {
    // For Shielded and Transparent info, render styled bullets with leading icon, matching ERROR modal style
    final bool isShieldedInfo = title.startsWith('Zcash Shielded Address');
    final bool isTransparentInfo = title.startsWith('Zcash Transparent Address');
    final bool useStyled = isShieldedInfo || isTransparentInfo;
    if (!useStyled) {
      showMessageBox2(context, title, msg);
      return;
    }

    final t = Theme.of(context);
    final zashi = t.extension<ZashiThemeExt>();
    final balanceTextColor = zashi?.balanceAmountColor ?? const Color(0xFFBDBDBD);
    final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
    final titleBase = t.textTheme.titleLarge ?? const TextStyle();
    final bodyBase = t.textTheme.bodyMedium ?? const TextStyle();
    final titleStyle = titleBase.copyWith(
      color: balanceTextColor,
      fontFamily: balanceFontFamily,
      fontWeight: FontWeight.w400,
    );
    final bodyStyle = bodyBase.copyWith(
      color: balanceTextColor,
      fontFamily: balanceFontFamily,
      fontWeight: FontWeight.w400,
    );

    // Normalize incoming lines to bullet items
    final List<String> bullets = msg
        .split('\n')
        .map((s) => s.trim())
        .where((s) => s.isNotEmpty)
        .map((s) => s.replaceFirst(RegExp(r'^-\s*'), ''))
        .toList();

    Widget buildBullet(String text) => Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('•', style: bodyStyle),
              const SizedBox(width: 8),
              Expanded(child: Text(text, style: bodyStyle)),
            ],
          ),
        );

    // Leading icon from card with styled circular shadow
    const Color _orangeBase = Color(0xFFC99111); // same orange used on shielded card
    Widget leadingIcon;
    if (isShieldedInfo) {
      leadingIcon = Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.transparent,
          boxShadow: [
            BoxShadow(
              color: _orangeBase.withOpacity(0.25),
              blurRadius: 2.5,
              spreadRadius: 0.05,
              offset: Offset.zero,
            ),
          ],
        ),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Center(
              child: SvgPicture.asset(
                'assets/icons/zec_glyph.svg',
                width: 22,
                height: 22,
                colorFilter: ColorFilter.mode(t.colorScheme.onSurface, BlendMode.srcIn),
              ),
            ),
            Positioned(
              right: -2,
              bottom: -2,
              child: Icon(
                Icons.shield,
                size: 12,
                color: t.colorScheme.onSurface.withOpacity(0.95),
              ),
            ),
          ],
        ),
      );
    } else {
      // Transparent: same icon without shield overlay, white circular shadow matching intensity/shape
      leadingIcon = Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.transparent,
          boxShadow: [
            BoxShadow(
              color: Colors.white.withOpacity(0.25),
              blurRadius: 2.5,
              spreadRadius: 0.05,
              offset: Offset.zero,
            ),
          ],
        ),
        child: Center(
          child: SvgPicture.asset(
            'assets/icons/zec_glyph.svg',
            width: 22,
            height: 22,
            colorFilter: ColorFilter.mode(t.colorScheme.onSurface, BlendMode.srcIn),
          ),
        ),
      );
    }

    final Color primaryFill = balanceTextColor;
    final BorderRadius radius = BorderRadius.circular(14);
    Widget primaryButton({required String label, required VoidCallback onTap}) {
      return SizedBox(
        width: double.infinity,
        height: 48,
        child: Material(
          color: primaryFill,
          shape: RoundedRectangleBorder(borderRadius: radius),
          child: InkWell(
            borderRadius: radius,
            onTap: onTap,
            child: Center(
              child: Text(
                S.of(context).ok,
                style: (t.textTheme.titleSmall ?? const TextStyle()).copyWith(
                  fontFamily: balanceFontFamily,
                  fontWeight: FontWeight.w600,
                  color: t.colorScheme.background,
                ),
              ),
            ),
          ),
        ),
      );
    }

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        titlePadding: const EdgeInsets.fromLTRB(24, 20, 24, 0),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Icon above, upper-left
            leadingIcon,
            const SizedBox(height: 8),
            Text(title, style: titleStyle),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final b in bullets) buildBullet(b),
            const SizedBox(height: 16),
            primaryButton(label: S.of(context).ok, onTap: () => GoRouter.of(context).pop(true)),
          ],
        ),
        actions: const [],
      ),
    );
  }
}

class _PrivacyHintBanner extends StatelessWidget {
  const _PrivacyHintBanner({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final String? balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Center(child: Icon(Icons.gpp_good, color: t.colorScheme.onSurface, size: 20)),
        const SizedBox(height: 6),
        Text(
          'For privacy, always use a shielded address.',
          textAlign: TextAlign.center,
          style: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(
            fontFamily: balanceFontFamily,
            color: t.colorScheme.onSurface,
          ),
        ),
      ],
    );
  }
}

class _AddressPanel extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final String address;
  final bool expanded;
  final VoidCallback onTap;
  final VoidCallback onInfo;
  final VoidCallback onCopy;
  final VoidCallback onQr;
  final VoidCallback onRequest;
  final Color? containerColor;
  bool get isShielded => title.toLowerCase().contains('shielded');

  const _AddressPanel({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.address,
    required this.expanded,
    required this.onTap,
    required this.onInfo,
    required this.onCopy,
    required this.onQr,
    required this.onRequest,
    this.containerColor,
  });

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final fg = t.colorScheme.onSurface;
    final muted = t.colorScheme.onSurfaceVariant;
    final zashi = t.extension<ZashiThemeExt>();
    final balanceTextColor = zashi?.balanceAmountColor ?? const Color(0xFFBDBDBD);
    final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
    // Orange-only gradient based on provided #ECAB14, darkened by ~15%
    const orangeBase = Color(0xFFC99111); // ~15% darker than #ECAB14
    const orangeDark = Color(0xFFA1740D); // previous dark (~25%) darkened by ~15%

    final panelRadius = BorderRadius.circular(16);
    return Material(
      color: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: panelRadius),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
      onTap: onTap,
      borderRadius: panelRadius,
      customBorder: RoundedRectangleBorder(borderRadius: panelRadius),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          gradient: isShielded
              ? LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: const [orangeDark, orangeBase],
                  stops: const [0.0, 1.0],
                )
              : null,
          color: isShielded ? null : (containerColor ?? t.colorScheme.surface),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Use Zashi-style: ZEC round glyph with shield overlay for shielded
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x33000000),
                        blurRadius: 8,
                        spreadRadius: 0.5,
                        offset: Offset.zero,
                      ),
                    ],
                    color: Colors.transparent,
                  ),
                  child: Stack(
                    clipBehavior: Clip.none,
                    children: [
                      Center(
                        child: SvgPicture.asset(
                          'assets/icons/zec_glyph.svg',
                          width: 28,
                          height: 28,
                          colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                        ),
                      ),
                      if (isShielded)
                        Positioned(
                          right: -1,
                          bottom: -1,
                          child: Container(
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Color(0x33000000),
                                  blurRadius: 6,
                                  offset: Offset.zero,
                                ),
                              ],
                            ),
                            child: Icon(
                              Icons.shield,
                              size: 14,
                              color: Colors.white.withOpacity(0.95),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                const Gap(12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: (t.textTheme.titleMedium ?? const TextStyle()).copyWith(
                          fontFamily: balanceFontFamily,
                          color: Colors.white,
                        ),
                      ),
                      const Gap(4),
                      Text(
                        subtitle,
                        style: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(
                          fontFamily: balanceFontFamily,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Material(
                    color: Colors.transparent,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    clipBehavior: Clip.antiAlias,
                    child: InkWell(
                      onTap: onInfo,
                      borderRadius: BorderRadius.circular(8),
                      child: Center(
                        child: SvgPicture.string(
                          _INFO_THIN_GLYPH,
                          width: 16,
                          height: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            ClipRect(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 360),
                switchInCurve: Curves.easeInOutCubic,
                switchOutCurve: Curves.easeInOutCubic,
                transitionBuilder: (child, anim) {
                  final fade = FadeTransition(opacity: anim, child: child);
                  return SizeTransition(sizeFactor: anim, axisAlignment: -1.0, child: fade);
                },
                child: expanded
                    ? Column(
                        key: const ValueKey('actions-visible'),
                        children: [
                          const Gap(12),
                          Row(
                            children: [
                              Expanded(
                                child: _SquareActionButton(
                                  onPressed: onCopy,
                                  iconWidget: SvgPicture.string(
                                    _ZASHI_COPY_GLYPH,
                                    width: 36,
                                    height: 36,
                                    alignment: Alignment.center,
                                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                                  ),
                                  label: 'Copy',
                                  labelStyle: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(
                                    fontFamily: balanceFontFamily,
                                    color: Colors.white,
                                  ),
                                  fillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.12)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.08) ??
                                          t.colorScheme.surface),
                                  hoverFillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.18)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.15) ??
                                          t.colorScheme.surface),
                                  verticalPadding: 6,
                                  spacing: 0,
                                  iconTopPadding: 0,
                                  labelBottomPadding: 0,
                                  iconHeightFactor: 1.0,
                                  labelOffsetY: -6,
                                  iconOffsetX: 8,
                                  iconOffsetY: 8,
                                  iconBoxSize: 36,
                                  iconVisualSize: 36,
                                  iconPadding: EdgeInsets.zero,
                                ),
                              ),
                              const Gap(8),
                              Expanded(
                                child: _SquareActionButton(
                                  onPressed: onQr,
                                  iconWidget: SvgPicture.string(
                                    _ZASHI_QR_GLYPH,
                                    width: 36,
                                    height: 36,
                                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                                  ),
                                  label: 'QR Code',
                                  labelStyle: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(
                                    fontFamily: balanceFontFamily,
                                    color: Colors.white,
                                  ),
                                  fillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.12)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.08) ??
                                          t.colorScheme.surface),
                                  hoverFillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.18)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.15) ??
                                          t.colorScheme.surface),
                                  verticalPadding: 6,
                                  spacing: 0,
                                  iconTopPadding: 0,
                                  labelBottomPadding: 0,
                                  iconHeightFactor: 1.0,
                                  labelOffsetY: -6,
                                ),
                              ),
                              const Gap(8),
                              Expanded(
                                child: _SquareActionButton(
                                  onPressed: onRequest,
                                  iconWidget: Transform.scale(
                                    scale: 1.25,
                                    child: SvgPicture.string(
                                      _ZASHI_REQUEST_GLYPH,
                                      width: 36,
                                      height: 36,
                                      alignment: Alignment.center,
                                      colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                                    ),
                                  ),
                                  label: 'Request',
                                  labelStyle: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(
                                    fontFamily: balanceFontFamily,
                                    color: Colors.white,
                                  ),
                                  fillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.12)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.08) ??
                                          t.colorScheme.surface),
                                  hoverFillColor: isShielded
                                      ? const Color(0xFFFFF2CC).withOpacity(0.18)
                                      : (Color.lerp(containerColor ?? t.colorScheme.surface, Colors.white, 0.15) ??
                                          t.colorScheme.surface),
                                  verticalPadding: 6,
                                  spacing: 0,
                                  iconTopPadding: 0,
                                  labelBottomPadding: 0,
                                  iconHeightFactor: 1.0,
                                  labelOffsetY: -6,
                                  iconOffsetX: 8,
                                  iconOffsetY: 8,
                                  iconBoxSize: 36,
                                  iconVisualSize: 36,
                                  iconPadding: EdgeInsets.zero,
                                ),
                              ),
                            ],
                          ),
                        ],
                      )
                    : const SizedBox(key: ValueKey('actions-hidden')),
              ),
            ),
          ],
        ),
      ),
    ),
    );
  }
}

class _SquareActionButton extends StatefulWidget {
  final VoidCallback onPressed;
  final IconData? icon;
  final Widget? iconWidget;
  final String label;
  final TextStyle? labelStyle;
  final Color? borderColor;
  final Color? fillColor;
  final Color? hoverFillColor;
  final double verticalPadding;
  final double spacing;
  final double iconOffsetY;
  final double iconOffsetX;
  final double iconHeightFactor;
  final double labelOffsetY;
  final double iconTopPadding;
  final double labelBottomPadding;
  final AlignmentGeometry iconAlignment;
  final double iconBoxSize;
  final double iconVisualSize;
  final EdgeInsets iconPadding;

  const _SquareActionButton({
    required this.onPressed,
    this.icon,
    this.iconWidget,
    required this.label,
    this.labelStyle,
    this.borderColor,
    this.fillColor,
    this.hoverFillColor,
    this.verticalPadding = 14,
    this.spacing = 2,
    this.iconOffsetY = 0,
    this.iconOffsetX = 0,
    this.iconHeightFactor = 1.0,
    this.labelOffsetY = 0,
    this.iconTopPadding = 0,
    this.labelBottomPadding = 0,
    this.iconAlignment = Alignment.center,
    this.iconBoxSize = 36,
    this.iconVisualSize = 18,
    this.iconPadding = EdgeInsets.zero,
  });

  Future<Offset> _measureIfDebug(Widget? iconWidget) async => Offset.zero;

  @override
  State<_SquareActionButton> createState() => _SquareActionButtonState();
}

class _SquareActionButtonState extends State<_SquareActionButton> {
  bool _hover = false;
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final radius = BorderRadius.circular(11);
    final Color baseFill = widget.fillColor ?? t.colorScheme.surface.withOpacity(0.14);
    final Color hoverFill = widget.hoverFillColor ?? (Color.lerp(baseFill, Colors.white, 0.10) ?? baseFill);
    final Color effectiveFill = (_hover || _pressed) ? hoverFill : baseFill;
    return Material(
      color: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: radius),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: widget.onPressed,
        borderRadius: radius,
        customBorder: RoundedRectangleBorder(borderRadius: radius),
        splashColor: Colors.white.withOpacity(0.14),
        highlightColor: Colors.white.withOpacity(0.10),
        onHover: (h) => setState(() => _hover = h),
        onHighlightChanged: (p) => setState(() => _pressed = p),
        child: Container(
          padding: EdgeInsets.only(top: widget.verticalPadding, bottom: widget.verticalPadding),
          decoration: BoxDecoration(
            color: effectiveFill,
            borderRadius: radius,
          ),
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: EdgeInsets.only(top: widget.iconTopPadding),
                  child: Align(
                    alignment: widget.iconAlignment,
                    heightFactor: widget.iconHeightFactor,
                    child: SizedBox(
                      width: widget.iconBoxSize,
                      height: widget.iconBoxSize,
                      child: Padding(
                        padding: widget.iconPadding,
                        child: _CenteredGlyph(
                          child: widget.iconWidget ?? Icon(
                            widget.icon,
                            size: widget.iconVisualSize,
                            color: widget.labelStyle?.color ?? t.colorScheme.onSurface,
                          ),
                          boxSize: widget.iconBoxSize,
                          initialOffset: Offset(widget.iconOffsetX, widget.iconOffsetY),
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: widget.spacing),
                Padding(
                  padding: EdgeInsets.only(bottom: widget.labelBottomPadding),
                  child: Transform.translate(
                    offset: Offset(0, widget.labelOffsetY),
                    child: Text(widget.label, style: widget.labelStyle),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CenteredGlyph extends StatefulWidget {
  final Widget child;
  final double boxSize;
  final Offset initialOffset;
  const _CenteredGlyph({required this.child, required this.boxSize, required this.initialOffset});
  @override
  State<_CenteredGlyph> createState() => _CenteredGlyphState();
}

class _CenteredGlyphState extends State<_CenteredGlyph> {
  @override
  Widget build(BuildContext context) {
    // For now, just apply the provided initialOffset (computed manually or via log),
    // keeping this wrapper so we can swap in auto-measure later without changing layout.
    return Center(child: Transform.translate(offset: widget.initialOffset, child: widget.child));
  }
}

// Exact Zashi QR glyph used in SEND page chips
const String _ZASHI_QR_GLYPH =
    '<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g transform="translate(0.5,0.5)">\n'
    '    <path d="M13.833 18H18V22.167M10.508 18H10.5M14.675 22.167H14.667M18.008 25.5H18M25.508 18H25.5M10.5 22.167H11.75M20.917 18H22.583M10.5 25.5H14.667M18 9.667V14.667M22.667 25.5H24.167C24.633 25.5 24.867 25.5 25.045 25.409C25.202 25.329 25.329 25.202 25.409 25.045C25.5 24.867 25.5 24.633 25.5 24.167V22.667C25.5 22.2 25.5 21.967 25.409 21.788C25.329 21.632 25.202 21.504 25.045 21.424C24.867 21.333 24.633 21.333 24.167 21.333H22.667C22.2 21.333 21.967 21.333 21.788 21.424C21.632 21.504 21.504 21.632 21.424 21.788C21.333 21.967 21.333 22.2 21.333 22.667V24.167C21.333 24.633 21.333 24.867 21.424 25.045C21.504 25.202 21.632 25.329 21.788 25.409C21.967 25.5 22.2 25.5 22.667 25.5ZM22.667 14.667H24.167C24.633 14.667 24.867 14.667 25.045 14.576C25.202 14.496 25.329 14.368 25.409 14.212C25.5 14.033 25.5 13.8 25.5 13.333V11.833C25.5 11.367 25.5 11.133 25.409 10.955C25.329 10.798 25.202 10.671 25.045 10.591C24.867 10.5 24.633 10.5 24.167 10.5H22.667C22.2 10.5 21.967 10.5 21.788 10.591C21.632 10.671 21.504 10.798 21.424 10.955C21.333 11.133 21.333 11.367 21.333 11.833V13.333C21.333 13.8 21.333 14.033 21.424 14.212C21.504 14.368 21.632 14.496 21.788 14.576C21.967 14.667 22.2 14.667 22.667 14.667ZM11.833 14.667H13.333C13.8 14.667 14.033 14.667 14.212 14.576C14.368 14.496 14.496 14.368 14.576 14.212C14.667 14.033 14.667 13.8 14.667 13.333V11.833C14.667 11.367 14.667 11.133 14.576 10.955C14.496 10.798 14.368 10.671 14.212 10.591C14.033 10.5 13.8 10.5 13.333 10.5H11.833C11.367 10.5 11.133 10.5 10.955 10.591C10.798 10.798 10.671 10.955 10.591 10.955C10.5 11.133 10.5 11.367 10.5 11.833V13.333C10.5 13.8 10.5 14.033 10.591 14.212C10.671 14.368 10.798 14.496 10.955 14.576C11.133 14.667 11.367 14.667 11.833 14.667Z" stroke="#231F20" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="miter" fill="none"/>\n'
    '  </g>\n'
    '</svg>';

// Exact Zashi COPY glyph (sourced from SEND page style)
const String _ZASHI_COPY_GLYPH =
    '<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g transform="translate(1.8,1.8)">\n'
    '    <path d="M4.167 10C3.545 10 3.235 10 2.99 9.898C2.663 9.763 2.404 9.503 2.268 9.177C2.167 8.932 2.167 8.621 2.167 8V3.466C2.167 2.72 2.167 2.346 2.312 2.061C2.44 1.81 2.644 1.606 2.895 1.478C3.18 1.333 3.553 1.333 4.3 1.333H8.833C9.455 1.333 9.765 1.333 10.01 1.434C10.337 1.57 10.597 1.829 10.732 2.156C10.833 2.401 10.833 2.712 10.833 3.333M8.967 14.666H13.367C14.113 14.666 14.487 14.666 14.772 14.521C15.023 14.393 15.227 14.189 15.355 13.938C15.5 13.653 15.5 13.28 15.5 12.533V8.133C15.5 7.386 15.5 7.013 15.355 6.728C15.227 6.477 15.023 6.273 14.772 6.145C14.487 6 14.113 6 13.367 6H8.967C8.22 6 7.847 6 7.561 6.145C7.311 6.273 7.107 6.477 6.979 6.728C6.833 7.013 6.833 7.386 6.833 8.133V12.533C6.833 13.28 6.833 13.653 6.979 13.938C7.107 14.189 7.311 14.393 7.561 14.521C7.847 14.666 8.22 14.666 8.967 14.666Z" stroke="#231F20" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>\n'
    '  </g>\n'
    '</svg>';

// Exact Zashi REQUEST glyph (sourced from Zashi receive)
const String _ZASHI_REQUEST_GLYPH =
    '<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g transform="translate(1.8,1.8)">\n'
    '    <path d="M9.186 5.568C8.805 5.84 8.338 6 7.833 6C6.545 6 5.5 4.955 5.5 3.666C5.5 2.378 6.545 1.333 7.833 1.333C8.669 1.333 9.401 1.772 9.814 2.432M4.167 13.391H5.907C6.134 13.391 6.359 13.418 6.579 13.472L8.418 13.919C8.817 14.016 9.233 14.026 9.636 13.947L11.669 13.552C12.206 13.447 12.7 13.19 13.087 12.813L14.525 11.414C14.936 11.015 14.936 10.368 14.525 9.968C14.155 9.609 13.57 9.568 13.151 9.873L11.475 11.096C11.235 11.272 10.943 11.366 10.642 11.366H9.024L10.054 11.366C10.635 11.366 11.105 10.909 11.105 10.344V10.139C11.105 9.67 10.777 9.261 10.309 9.148L8.719 8.761C8.46 8.698 8.195 8.666 7.929 8.666C7.286 8.666 6.121 9.199 6.121 9.199L4.167 10.016M13.5 4.333C13.5 5.622 12.455 6.666 11.167 6.666C9.878 6.666 8.833 5.622 8.833 4.333C8.833 3.044 9.878 2 11.167 2C12.455 2 13.5 3.044 13.5 4.333ZM1.5 9.733L1.5 13.6C1.5 13.973 1.5 14.16 1.573 14.302C1.637 14.428 1.739 14.53 1.864 14.594C2.007 14.666 2.193 14.666 2.567 14.666H3.1C3.473 14.666 3.66 14.666 3.803 14.594C3.928 14.53 4.03 14.428 4.094 14.302C4.167 14.16 4.167 13.973 4.167 13.6V9.733C4.167 9.36 4.167 9.173 4.094 9.03C4.03 8.905 3.928 8.803 3.803 8.739C3.66 8.666 3.473 8.666 3.1 8.666L2.567 8.666C2.193 8.666 2.007 8.666 1.864 8.739C1.739 8.803 1.637 8.905 1.573 9.03C1.5 9.173 1.5 9.36 1.5 9.733Z" stroke="#231F20" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>\n'
    '  </g>\n'
    '</svg>';

// Thin outlined info (vector) for unbolded "i"
const String _INFO_THIN_GLYPH =
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g>\n'
    '    <path d="M10 13.333V10M10 6.667H10.008M18.333 10C18.333 14.602 14.602 18.333 10 18.333C5.398 18.333 1.667 14.602 1.667 10C1.667 5.398 5.398 1.667 10 1.667C14.602 1.667 18.333 5.398 18.333 10Z" stroke="#FFFFFF" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>\n'
    '  </g>\n'
    '</svg>';


