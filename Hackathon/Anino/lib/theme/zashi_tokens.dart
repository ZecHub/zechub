import 'package:flutter/material.dart';
import 'dart:ui' show lerpDouble;

/// Zashi-themed tokens exposed to the app via ThemeExtension so UI can
/// consume consistent values without hard-coding constants.
class ZashiThemeExt extends ThemeExtension<ZashiThemeExt> {
  final double tileRadius;
  final double tilePadding;
  final Color quickGradTop;
  final Color quickGradBottom;
  final Color quickBorderColor;
  final Color balanceAmountColor;

  const ZashiThemeExt({
    required this.tileRadius,
    required this.tilePadding,
    required this.quickGradTop,
    required this.quickGradBottom,
    required this.quickBorderColor,
    required this.balanceAmountColor,
  });

  @override
  ZashiThemeExt copyWith({
    double? tileRadius,
    double? tilePadding,
    Color? quickGradTop,
    Color? quickGradBottom,
    Color? quickBorderColor,
    Color? balanceAmountColor,
  }) {
    return ZashiThemeExt(
      tileRadius: tileRadius ?? this.tileRadius,
      tilePadding: tilePadding ?? this.tilePadding,
      quickGradTop: quickGradTop ?? this.quickGradTop,
      quickGradBottom: quickGradBottom ?? this.quickGradBottom,
      quickBorderColor: quickBorderColor ?? this.quickBorderColor,
      balanceAmountColor: balanceAmountColor ?? this.balanceAmountColor,
    );
  }

  @override
  ThemeExtension<ZashiThemeExt> lerp(ThemeExtension<ZashiThemeExt>? other, double t) {
    if (other is! ZashiThemeExt) return this;
    return ZashiThemeExt(
      tileRadius: lerpDouble(tileRadius, other.tileRadius, t) ?? tileRadius,
      tilePadding: lerpDouble(tilePadding, other.tilePadding, t) ?? tilePadding,
      quickGradTop: Color.lerp(quickGradTop, other.quickGradTop, t) ?? quickGradTop,
      quickGradBottom: Color.lerp(quickGradBottom, other.quickGradBottom, t) ?? quickGradBottom,
      quickBorderColor: Color.lerp(quickBorderColor, other.quickBorderColor, t) ?? quickBorderColor,
      balanceAmountColor: Color.lerp(balanceAmountColor, other.balanceAmountColor, t) ?? balanceAmountColor,
    );
  }
}


