import 'dart:async';
import 'dart:typed_data';
import 'package:image/image.dart' as img;
import 'package:zxing2/qrcode.dart' as zxing;
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:warp_api/warp_api.dart';

import '../generated/intl/messages.dart';
import 'utils.dart';
import 'dart:async';

class ScanQRCodePage extends StatefulWidget {
  final bool Function(String code) onCode;
  final String? Function(String? code)? validator;
  ScanQRCodePage(ScanQRContext context)
      : onCode = context.onCode,
        validator = context.validator;
  @override
  State<StatefulWidget> createState() => _ScanQRCodeState();
}

class _ScanQRCodeState extends State<ScanQRCodePage> {
  final formKey = GlobalKey<FormBuilderState>();
  final controller = TextEditingController();
  var scanned = false;
  StreamSubscription<BarcodeCapture>? ss;

  @override
  void dispose() {
    ss?.cancel();
    ss = null;
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final s = S.of(context);
    return Scaffold(
        appBar: AppBar(title: Text(s.scanQrCode), actions: [
          if (isMobile())
            IconButton(onPressed: _open, icon: Icon(Icons.open_in_new)),
          IconButton(onPressed: _ok, icon: Icon(Icons.check)),
        ]),
        body: FormBuilder(
            key: formKey,
            child: Column(children: [
              Expanded(child: _buildScanner()),
              Gap(16),
              FormBuilderTextField(
                  name: 'qr',
                  decoration: InputDecoration(label: Text(s.qr)),
                  controller: controller,
                  validator: widget.validator),
            ])));
  }

  Widget _buildScanner() {
    // Use live camera on mobile and macOS where plugin is registered; on Linux/Windows fallback to file open
    if (isMobile() || Platform.isMacOS) {
      return MobileScanner(onDetect: _onScan);
    }
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Camera not available on this platform. Open an image to scan.',
            textAlign: TextAlign.center,
          ),
          const Gap(12),
          FilledButton.icon(
            onPressed: _open,
            icon: const Icon(Icons.folder_open),
            label: const Text('Open Image'),
          ),
        ],
      ),
    );
  }

  _onScan(BarcodeCapture capture) {
    if (scanned) return;
    final List<Barcode> barcodes = capture.barcodes;
    for (final barcode in barcodes) {
      final text = barcode.rawValue;
      if (text != null) {
        controller.text = text;
        final form = formKey.currentState!;
        if (form.validate()) {
          scanned = true;
          if (widget.onCode(text)) GoRouter.of(context).pop();
          return;
        }
      }
    }
  }

  _open() async {
    final file = await pickFile();
    logger.d('open');
    if (file == null) return;
    final path = file.files[0].path!;
    try {
      // Try using MobileScanner's file analyze on supported platforms
      if (isMobile() || Platform.isMacOS) {
        final c = MobileScannerController();
        c.analyzeImage(path);
        ss = c.barcodes.listen(_onScan);
        return;
      }
    } catch (_) {}
    // Fallback: decode QR from still image using zxing2
    try {
      final decoded = await _decodeQrFromFile(path);
      if (decoded != null) {
        controller.text = decoded;
        final form = formKey.currentState!;
        if (form.validate()) {
          scanned = true;
          if (widget.onCode(decoded)) GoRouter.of(context).pop();
        }
      }
    } catch (e) {
      logger.e('QR decode failed: $e');
    }
  }

  Future<String?> _decodeQrFromFile(String path) async {
    try {
      final bytes = await File(path).readAsBytes();
      final decodedImage = img.decodeImage(bytes);
      if (decodedImage == null) return null;
      final luminances = Uint8List(decodedImage.width * decodedImage.height);
      int i = 0;
      for (int y = 0; y < decodedImage.height; y++) {
        for (int x = 0; x < decodedImage.width; x++) {
          final p = decodedImage.getPixel(x, y);
          final r = p.r;
          final g = p.g;
          final b = p.b;
          // Greyscale luma
          luminances[i++] = ((r * 299 + g * 587 + b * 114) / 1000).round();
        }
      }
      // Build ARGB Int32List as expected by RGBLuminanceSource(width,height,pixels)
      final pixels = Int32List(decodedImage.width * decodedImage.height);
      for (int y = 0; y < decodedImage.height; y++) {
        for (int x = 0; x < decodedImage.width; x++) {
          final p = decodedImage.getPixel(x, y);
          final a = p.a.toInt();
          final r = p.r.toInt();
          final g = p.g.toInt();
          final b = p.b.toInt();
          pixels[y * decodedImage.width + x] = (a << 24) | (r << 16) | (g << 8) | b;
        }
      }
      final source = zxing.RGBLuminanceSource(decodedImage.width, decodedImage.height, pixels);
      final bitmap = zxing.BinaryBitmap(zxing.HybridBinarizer(source));
      final reader = zxing.QRCodeReader();
      final result = reader.decode(bitmap);
      return result.text;
    } catch (_) {
      return null;
    }
  }

  _ok() {
    if (formKey.currentState!.validate()) {
      if (widget.onCode(controller.text)) GoRouter.of(context).pop();
    }
  }
}

class MultiQRReader extends StatefulWidget {
  final void Function(String?)? onChanged;
  MultiQRReader({this.onChanged});
  @override
  State<StatefulWidget> createState() => _MultiQRReaderState();
}

class _MultiQRReaderState extends State<MultiQRReader> {
  final Set<String> fragments = {};
  double value = 0.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        LinearProgressIndicator(value: value, minHeight: 40),
        Expanded(
          child: MobileScanner(
            onDetect: _onScan,
          ),
        ),
      ],
    );
  }

  _onScan(BarcodeCapture capture) {
    final List<Barcode> barcodes = capture.barcodes;
    for (final barcode in barcodes) {
      final text = barcode.rawValue;
      if (text == null) return;
      if (!fragments.contains(text)) {
        fragments.add(text);
        final res = WarpApi.mergeData(text);
        if (res.data?.isEmpty != false) {
          logger.d('${res.progress} ${res.total}');
          setState(() {
            value = res.progress / res.total;
          });
        } else {
          final decoded =
              utf8.decode(ZLibCodec().decode(base64Decode(res.data!)));
          widget.onChanged?.call(decoded);
        }
      }
    }
  }
}

Future<String> scanQRCode(
  BuildContext context, {
  bool multi = false,
  String? Function(String? code)? validator,
}) {
  final completer = Completer<String>();
  bool onCode(String c) {
    completer.complete(c);
    return true;
  }

  GoRouter.of(context)
      .push('/scan', extra: ScanQRContext(onCode, validator: validator));
  return completer.future;
}

class ScanQRContext {
  final bool Function(String) onCode;
  final String? Function(String? code)? validator;
  final bool multi;
  ScanQRContext(this.onCode, {this.validator, this.multi = false});
}
