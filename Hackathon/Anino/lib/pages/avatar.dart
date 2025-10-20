import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/zashi_tokens.dart';

final colors = [
  const Color(0xFF1DE9B6),
  const Color(0xFFCDDC39),
  const Color(0xFFAA00FF),
  const Color(0xFF2196F3),
  const Color(0xFF689F38),
  const Color(0xFF388E3C),
  const Color(0xFFF57C00),
  const Color(0xFFFFA000),
  const Color(0xFFFBC02D),
  const Color(0xFFFFEA00),
  const Color(0xFFE64A19),
  const Color(0xFF5D4037),
  const Color(0xFF7E57C2),
  const Color(0xFF2196F3),
  const Color(0xFFAA00FF),
  const Color(0xFF2196F3),
  const Color(0xFF00B0FF),
  const Color(0xFF00E5FF),
  const Color(0xFFAA00FF),
  const Color(0xFF2196F3),
  const Color(0xFF64DD17),
  const Color(0xFFAEEA00),
  const Color(0xFFAA00FF),
  const Color(0xFFFFAB00),
  const Color(0xFFAA00FF),
  const Color(0xFF2196F3),
];

final defaultColor = const Color(0xFF717171);

Color initialToColor(String s) {
  final i = s.toUpperCase().codeUnitAt(0);
  if (i >= 65 && i < 91) {
    return colors[i - 65];
  }
  return defaultColor;
}

Widget avatar(String initial, {bool incoming = false, double radius = 16.0}) => Builder(builder: (context) {
      final isIncoming = incoming;
      final theme = Theme.of(context);
      final onSurf = theme.colorScheme.onSurface;
      final zashi = theme.extension<ZashiThemeExt>();
      final bg = zashi != null
          ? Color.lerp(zashi.quickGradTop, zashi.quickGradBottom, 0.5)!
          : initialToColor(initial);
      return CircleAvatar(
        backgroundColor: bg,
        radius: radius,
        child: isIncoming
            ? SvgPicture.string(
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16.25 4.639 A 8.5 8.5 0 1 1 7.75 4.639" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M12 9.4 V14.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M12 14.6 L10.6 13.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M12 14.6 L13.4 13.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
                colorFilter: ColorFilter.mode(onSurf, BlendMode.srcIn),
              )
            : SvgPicture.string(
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16.25 4.639 A 8.5 8.5 0 1 1 7.75 4.639" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M12 14.6 V9.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M12 9.4 L10.6 10.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M12 9.4 L13.4 10.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
                colorFilter: ColorFilter.mode(onSurf, BlendMode.srcIn),
              ),
      );
    });
