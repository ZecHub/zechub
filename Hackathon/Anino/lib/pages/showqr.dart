import 'dart:io';
import 'dart:ui';
import 'dart:typed_data';
import 'package:flutter/rendering.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:gap/gap.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../generated/intl/messages.dart';
import 'utils.dart';
import '../accounts.dart';
import '../coin/coins.dart';
import '../theme/zashi_tokens.dart';

class ShowQRPage extends StatefulWidget {
  final String title;
  final String text;
  ShowQRPage({required this.title, required this.text});

  @override
  State<ShowQRPage> createState() => _ShowQRPageState();
}

class _ShowQRPageState extends State<ShowQRPage> {
  bool _expanded = false;
  final GlobalKey _qrBoundaryKey = GlobalKey();
  Uint8List? _cachedQrPng;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _ensureQrPng(widget.text);
    });
  }

  @override
  void didUpdateWidget(covariant ShowQRPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text) {
      _cachedQrPng = null;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _ensureQrPng(widget.text);
      });
    }
  }

  Future<Uint8List> _ensureQrPng(String data) async {
    if (_cachedQrPng != null) return _cachedQrPng!;
    // Snapshot only: wait inside _captureQrPngFromBoundary until ready, then return
    final captured = await _captureQrPngFromBoundary();
    _cachedQrPng = captured;
    return captured;
  }

  Future<Uint8List> _captureQrPngFromBoundary() async {
    final boundary = _qrBoundaryKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) {
      throw Exception('QR boundary not ready');
    }
    // Wait up to ~3 seconds for a stable first paint (AnimatedSwitcher fade-in, glyph load, etc.)
    for (int i = 0; i < 60; i++) {
      if (!boundary.debugNeedsPaint) break;
      await Future.delayed(const Duration(milliseconds: 50));
    }
    final double dpr = MediaQuery.of(context).devicePixelRatio;
    final image = await boundary.toImage(pixelRatio: dpr.clamp(1.0, 3.0));
    final ByteData? byteData = await image.toByteData(format: ImageByteFormat.png);
    if (byteData == null) {
      throw Exception('Failed to encode QR snapshot');
    }
    return byteData.buffer.asUint8List();
  }

  Future<void> _waitForStableFile(File file) async {
    int last = -1;
    for (int i = 0; i < 10; i++) {
      try {
        final len = await file.length();
        if (len > 0 && len == last) return;
        last = len;
      } catch (_) {}
      await Future.delayed(const Duration(milliseconds: 50));
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    final theme = Theme.of(context);
    final address = widget.text;
    final qrSize = MediaQuery.of(context).size.width * 0.66;
    // Vertical centering via LayoutBuilder (no manual shift)
    // Center glyph colorized (replacing embedded asset)

    return Scaffold(
      appBar: AppBar(
        leadingWidth: 44,
        leading: Padding(
          padding: const EdgeInsets.only(left: 8),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(5),
                onTap: () => Navigator.of(context).pop(),
                child: SizedBox(
                  width: 33,
                  height: 33,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: const Center(child: Icon(Icons.close, size: 20)),
                  ),
                ),
              ),
            ),
          ),
        ),
        title: null,
        centerTitle: false,
      ),
      bottomNavigationBar: null,
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Column(
              mainAxisSize: MainAxisSize.max,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 8),
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () => _showFullscreenQr(address),
                          child: RepaintBoundary(
                            key: _qrBoundaryKey,
                            child: Container(
                              decoration: BoxDecoration(
                                color: theme.colorScheme.surface,
                                borderRadius: BorderRadius.circular(24),
                              ),
                              padding: const EdgeInsets.all(16),
                              child: Center(
                                child: Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    Container(
                                      width: qrSize * 0.7 * 1.35,
                                      height: qrSize * 0.7 * 1.35,
                                      decoration: BoxDecoration(
                                        color: Colors.transparent,
                                        borderRadius: BorderRadius.circular(6),
                                        border: Border.all(color: Colors.white.withOpacity(0.2), width: 1.0),
                                      ),
                                    ),
                                    QrImage(
                                      data: address,
                                      size: qrSize * 0.7,
                                      backgroundColor: Colors.white,
                                    ),
                                    Container(
                                      width: 48,
                                      height: 48,
                                      decoration: const BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: Color(0xFFF4B728),
                                      ),
                                      alignment: Alignment.center,
                                      child: SvgPicture.asset(
                                        'assets/icons/zec_glyph.svg',
                                        width: 28,
                                        height: 28,
                                        theme: const SvgTheme(currentColor: Colors.white),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        const Gap(16),
                        _ShieldedBadge(),
                        const Gap(12),
                        Text(
                          widget.title,
                          style: (theme.textTheme.titleLarge ?? const TextStyle()).copyWith(
                            fontFamily: theme.textTheme.displaySmall?.fontFamily,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const Gap(8),
                        GestureDetector(
                          onTap: () => setState(() => _expanded = !_expanded),
                          onLongPress: () {
                            Clipboard.setData(ClipboardData(text: address));
                            showSnackBar(s.textCopiedToClipboard(widget.title));
                          },
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: AnimatedSize(
                              duration: const Duration(milliseconds: 200),
                              curve: Curves.easeInOut,
                              child: Text(
                                address,
                                maxLines: _expanded ? null : 2,
                                overflow: _expanded ? TextOverflow.visible : TextOverflow.ellipsis,
                                textAlign: TextAlign.start,
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Builder(builder: (context) {
                        final t2 = Theme.of(context);
                        final String? balanceFontFamily = t2.textTheme.displaySmall?.fontFamily;
                        final Color balanceCursorColor =
                            t2.extension<ZashiThemeExt>()?.balanceAmountColor ?? const Color(0xFFBDBDBD);
                        return Align(
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
                                  onTap: () => _shareQr(address, widget.title, context),
                                  child: Center(
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        const Icon(Icons.share, color: Colors.black),
                                        const SizedBox(width: 8),
                                        Text(
                                          'Share QR Code',
                                          style: (t2.textTheme.titleSmall ?? const TextStyle()).copyWith(
                                            fontFamily: balanceFontFamily,
                                            fontWeight: FontWeight.w600,
                                            color: t2.colorScheme.background,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        );
                      }),
                      const Gap(8),
                      Align(
                        alignment: Alignment.center,
                        child: FractionallySizedBox(
                          widthFactor: 0.96,
                          child: SizedBox(
                            height: 48,
                            child: TextButton.icon(
                              onPressed: () {
                                Clipboard.setData(ClipboardData(text: address));
                                showSnackBar(s.textCopiedToClipboard(widget.title));
                              },
                              style: TextButton.styleFrom(
                                foregroundColor: Colors.white,
                                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(14))),
                              ),
                              icon: const Icon(Icons.copy, color: Colors.white),
                              label: const Text('Copy Address', style: TextStyle(color: Colors.white)),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Future<void> _shareQr(String data, String title, BuildContext originContext) async {
    final Uint8List bytes = await _ensureQrPng(data);
    await shareQrImage(originContext, data: data, title: title, pngBytes: bytes);
  }

  Future<void> _showFullscreenQr(String data) async {
    final size = MediaQuery.of(context).size.width - 44;
    await showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context) => Dialog(
        insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 64),
        backgroundColor: Colors.transparent,
        child: Stack(
          children: [
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () => Navigator.of(context).pop(),
                child: const SizedBox.shrink(),
              ),
            ),
            Center(
              child: Container(
                color: Colors.white,
                padding: const EdgeInsets.all(6),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    QrImage(
                      data: data,
                      size: size,
                      backgroundColor: Colors.white,
                    ),
                    Container(
                      width: 64,
                      height: 64,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Color(0xFFF4B728),
                      ),
                      alignment: Alignment.center,
                      child: SvgPicture.asset(
                        'assets/icons/zec_glyph.svg',
                        width: 36,
                        height: 36,
                        theme: const SvgTheme(currentColor: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ShieldedBadge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    // Match the Shielded card accent (Receive page): use the same orange for outline,
    // a lighter shade for fill, and white content (same as card title color).
    const Color shieldedAccent = Color(0xFFC99111); // from Receive page gradient base
    // Even darker fill: 70% toward the accent
    final Color fill = Color.lerp(Colors.white, shieldedAccent, 0.70)!;
    final Color outline = shieldedAccent;
    final Color content = Colors.white;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(50),
        border: Border.all(color: outline),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.gpp_good, size: 18, color: content),
          const Gap(8),
          Text('Private', style: t.textTheme.labelMedium?.copyWith(color: content)),
        ],
      ),
    );
  }
}

Future<void> saveQRImage(String data, String title) async {
  final code = QrCode.fromData(data: data, errorCorrectLevel: QrErrorCorrectLevel.L);
  code.make();

  const int pixelsPerModule = 10;
  const int margin = 32;
  final int modules = code.moduleCount;
  final int imageSize = modules * pixelsPerModule + margin * 2;

  final recorder = PictureRecorder();
  final canvas = Canvas(recorder);

  final Paint whitePaint = Paint()
    ..color = Colors.white
    ..style = PaintingStyle.fill;
  final Paint blackPaint = Paint()
    ..color = Colors.black
    ..style = PaintingStyle.fill;

  canvas.drawRect(Rect.fromLTWH(0, 0, imageSize.toDouble(), imageSize.toDouble()), whitePaint);
  canvas.translate(margin.toDouble(), margin.toDouble());

  for (int y = 0; y < modules; y++) {
    for (int x = 0; x < modules; x++) {
      if (code.isDark(x, y)) {
        canvas.drawRect(
          Rect.fromLTWH(
            (x * pixelsPerModule).toDouble(),
            (y * pixelsPerModule).toDouble(),
            pixelsPerModule.toDouble(),
            pixelsPerModule.toDouble(),
          ),
          blackPaint,
        );
      }
    }
  }

  final image = await recorder.endRecording().toImage(imageSize, imageSize);
  final ByteData? byteData = await image.toByteData(format: ImageByteFormat.png);
  final Uint8List pngBytes = byteData!.buffer.asUint8List();
  await saveFileBinary(pngBytes, 'qr.png', title);
}

Future<Uint8List> _generateQrPngBytes(String data) async {
  final painter = QrPainter(
    data: data,
    version: QrVersions.auto,
    errorCorrectionLevel: QrErrorCorrectLevel.L,
    gapless: true,
    color: Colors.black,
    emptyColor: Colors.white,
  );
  final ByteData? imageData = await painter.toImageData(512, format: ImageByteFormat.png);
  return imageData!.buffer.asUint8List();
}

