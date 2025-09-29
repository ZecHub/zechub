import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import '../theme/zashi_tokens.dart';

import '../generated/intl/messages.dart';
// QR/address carousel moved to dedicated Receive page

class BlankPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Blank'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
      child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  _CircleSymbol(
                    asset: 'assets/icons/receive_quick.svg',
                  ),
                  const SizedBox(width: 12),
                  _CircleNav(
                    child: Icon(Icons.history,
                        size: 24,
                        color: Theme.of(context).colorScheme.onSurface),
                    onTap: () => GoRouter.of(context).go('/blank/history'),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Zashi-style balance header (dark style follows theme)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SvgPicture.asset('assets/icons/zec_glyph.svg', width: 28, height: 28,
                      colorFilter: ColorFilter.mode(Theme.of(context).colorScheme.onSurface, BlendMode.srcIn)),
                  const SizedBox(width: 10),
                  Baseline(
                    baseline: 24, // align top area visually with big numerals
                    baselineType: TextBaseline.alphabetic,
                    child: Text(
                      '23.382',
                      style: Theme.of(context).textTheme.displaySmall?.copyWith(
                            color: Theme.of(context).extension<ZashiThemeExt>()!.balanceAmountColor,
                            fontFeatures: const [FontFeature.tabularFigures()],
                          ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.secondary.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: Theme.of(context).colorScheme.secondary.withOpacity(0.6)),
                    ),
                    child: Text('ZEC', style: Theme.of(context).textTheme.labelMedium?.copyWith(color: Theme.of(context).colorScheme.onSurface)),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Receive moved to Balance page next to Send
              // Scan and More moved to Balance page row
            ],
          ),
          const SizedBox(width: 24),
              // QR/address module moved to dedicated page; leave space for future content
              Expanded(child: SizedBox.shrink()),
            ],
          ),
        ),
      ),
    );
  }
}

class _CircleSymbol extends StatelessWidget {
  final String asset;
  final double diameter;
  final double iconSize;
  const _CircleSymbol({required this.asset, this.diameter = 40, this.iconSize = 28});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final onSurf = theme.colorScheme.onSurface;
    final zashi = theme.extension<ZashiThemeExt>();
    final flat = zashi != null
        ? Color.lerp(zashi.quickGradTop, zashi.quickGradBottom, 0.5)!
        : Colors.transparent;
    return Container(
      width: diameter,
      height: diameter,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: flat,
        border: Border.all(color: zashi?.quickBorderColor ?? onSurf.withOpacity(0.25)),
      ),
      alignment: Alignment.center,
      child: SvgPicture.asset(
        asset,
        width: iconSize,
        height: iconSize,
        colorFilter: ColorFilter.mode(onSurf, BlendMode.srcIn),
      ),
    );
  }
}

class _CircleNav extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final double diameter;
  const _CircleNav({required this.child, this.onTap, this.diameter = 40});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final onSurf = theme.colorScheme.onSurface;
    final zashi = theme.extension<ZashiThemeExt>();
    final flat = zashi != null
        ? Color.lerp(zashi.quickGradTop, zashi.quickGradBottom, 0.5)!
        : Colors.transparent;
    final circle = Container(
      width: diameter,
      height: diameter,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: flat,
        border: Border.all(color: zashi?.quickBorderColor ?? onSurf.withOpacity(0.25)),
      ),
      alignment: Alignment.center,
      child: child,
    );
    return InkWell(
      customBorder: const CircleBorder(),
      onTap: onTap,
      child: circle,
    );
  }
}


