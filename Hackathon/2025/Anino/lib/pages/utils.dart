import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:typed_data';
import 'dart:ui';

import 'package:YWallet/main.dart';
import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:binary/binary.dart';
import 'package:collection/collection.dart';
import 'package:another_flushbar/flushbar_helper.dart';
import 'package:decimal/decimal.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_palette/flutter_palette.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:key_guardmanager/key_guardmanager.dart';
import 'package:local_auth/local_auth.dart';
import 'package:logger/logger.dart';
import 'package:path_provider/path_provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:reflectable/reflectable.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:warp_api/data_fb_generated.dart';
import 'package:warp_api/warp_api.dart';
import 'package:path/path.dart' as p;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

import '../accounts.dart';
import '../appsettings.dart';
import '../coin/coins.dart';
import '../generated/intl/messages.dart';
import '../router.dart';
import '../theme/zashi_tokens.dart';
import '../store2.dart';
import 'widgets.dart';

var logger = Logger();

const APP_NAME = "YWallet";
const ZECUNIT = 100000000.0;
const ZECUNIT_INT = 100000000;
const MAX_PRECISION = 8;

final DateFormat noteDateFormat = DateFormat("yy-MM-dd HH:mm");
final DateFormat txDateFormat = DateFormat("MM-dd HH:mm");
final DateFormat msgDateFormat = DateFormat("MM-dd HH:mm");
final DateFormat msgDateFormatFull = DateFormat("yy-MM-dd HH:mm:ss");

class Amount {
  int value;
  bool deductFee;
  Amount(this.value, this.deductFee);

  @override
  String toString() => 'Amount($value, $deductFee)';
}

int decimalDigits(bool fullPrec) => fullPrec ? MAX_PRECISION : 3;
String decimalFormat(double x, int decimalDigits, {String symbol = ''}) {
  return NumberFormat.currency(
    locale: Platform.localeName,
    decimalDigits: decimalDigits,
    symbol: symbol,
  ).format(x).trimRight();
}

String decimalToString(double x) =>
    decimalFormat(x, decimalDigits(appSettings.fullPrec));

// Formats up to 8 decimals with no forced trailing zeros, e.g., 1, 1.2, 1.23456789
String decimalToStringTrim(double x) {
  final locale = Platform.localeName;
  final formatter = NumberFormat('#,##0.########', locale);
  return formatter.format(x);
}

Future<bool> showMessageBox2(BuildContext context, String title, String content,
    {String? label, bool dismissable = true}) async {
  final s = S.of(context);
  final t = Theme.of(context);

  void close(bool res) {
    GoRouter.of(context).pop<bool>(res);
  }

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
              label,
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

  final res = await showDialog<bool>(
        context: context,
        barrierDismissible: false,
        builder: (context) => AlertDialog(
          title: Text(title, style: titleStyle),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(content, style: bodyStyle),
              const SizedBox(height: 16),
              if (dismissable)
                primaryButton(label: label ?? s.ok, onTap: () => close(true)),
            ],
          ),
          actions: const [],
        ),
      ) ??
      false;
  return res;
}

mixin WithLoadingAnimation<T extends StatefulWidget> on State<T> {
  bool loading = false;

  Widget wrapWithLoading(Widget child) {
    return LoadingWrapper(loading, child: child);
  }

  Future<U> load<U>(Future<U> Function() calc) async {
    try {
      setLoading(true);
      return await calc();
    } finally {
      setLoading(false);
    }
  }

  setLoading(bool v) {
    if (mounted) setState(() => loading = v);
  }
}

Future<void> showSnackBar(String msg) async {
  final bar = FlushbarHelper.createInformation(
      message: msg, duration: Duration(seconds: 4));
  await bar.show(rootNavigatorKey.currentContext!);
}

void openTxInExplorer(String txId) {
  final settings = CoinSettingsExtension.load(aa.coin);
  final url = settings.resolveBlockExplorer(aa.coin);
  launchUrl(Uri.parse("$url/$txId"), mode: LaunchMode.inAppWebView);
}

String? addressValidator(String? v) {
  final s = S.of(rootNavigatorKey.currentContext!);
  if (v == null || v.isEmpty) return s.addressIsEmpty;
  try {
    WarpApi.parseTexAddress(aa.coin, v);
    return null;
  } on String {}
  final valid = WarpApi.validAddress(aa.coin, v);
  if (!valid) return s.invalidAddress;
  return null;
}

String? paymentURIValidator(String? v) {
  final s = S.of(rootNavigatorKey.currentContext!);
  if (v == null || v.isEmpty) return s.required;
  if (WarpApi.decodePaymentURI(aa.coin, v!) == null) return s.invalidPaymentURI;
  return null;
}

ColorPalette getPalette(Color color, int n) => ColorPalette.polyad(
      color,
      numberOfColors: max(n, 1),
      hueVariability: 15,
      saturationVariability: 10,
      brightnessVariability: 10,
    );

int numPoolsOf(int v) => Uint8(v).bitsSet;

int poolOf(int v) {
  switch (v) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 4:
      return 2;
    default:
      return 0;
  }
}

Future<bool> authBarrier(BuildContext context,
    {bool dismissable = false}) async {
  final s = S.of(context);
  while (true) {
    final authed = await authenticate(context, s.pleaseAuthenticate);
    if (authed) return true;
    if (dismissable) return false;
  }
}

Future<bool> authenticate(BuildContext context, String reason) async {
  final s = S.of(context);
  if (!isMobile()) {
    if (appStore.dbPassword.isEmpty) return true;
    final formKey = GlobalKey<FormBuilderState>();
    final passwdController = TextEditingController();
    final authed = await showAdaptiveDialog<bool>(
            context: context,
            builder: (context) {
              return AlertDialog.adaptive(
                title: Text(s.pleaseAuthenticate),
                content: Card(
                    child: FormBuilder(
                        key: formKey,
                        child: FormBuilderTextField(
                          name: 'passwd',
                          decoration:
                              InputDecoration(label: Text(s.databasePassword)),
                          controller: passwdController,
                          validator: FormBuilderValidators.compose([
                            FormBuilderValidators.required(),
                            (v) => v != appStore.dbPassword
                                ? s.invalidPassword
                                : null,
                          ]),
                          obscureText: true,
                        ))),
                actions: [
                  IconButton(
                      onPressed: () => GoRouter.of(context).pop(false),
                      icon: Icon(Icons.cancel)),
                  IconButton(
                      onPressed: () {
                        if (formKey.currentState!.validate())
                          GoRouter.of(context).pop(true);
                      },
                      icon: Icon(Icons.check)),
                ],
              );
            }) ??
        false;
    return authed;
  }

  final localAuth = LocalAuthentication();
  try {
    final bool didAuthenticate;
    if (Platform.isAndroid && !await localAuth.canCheckBiometrics) {
      didAuthenticate = await KeyGuardmanager.authStatus == "true";
    } else {
      didAuthenticate = await localAuth.authenticate(
          localizedReason: reason, options: AuthenticationOptions());
    }
    if (didAuthenticate) {
      return true;
    }
  } on PlatformException catch (e) {
    await showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) => AlertDialog(
            title: Text(S.of(context).noAuthenticationMethod),
            content: Text(e.message ?? '')));
  }
  return false;
}

void handleAccel(AccelerometerEvent event) {
  final n = sqrt(event.x * event.x + event.y * event.y + event.z * event.z);
  final inclination = acos(event.z / n) / pi * 180 * event.y.sign;
  final flat = inclination < 20
      ? true
      : inclination > 40
          ? false
          : null;
  flat?.let((f) {
    if (f != appStore.flat) appStore.flat = f;
  });
}

double getScreenSize(BuildContext context) {
  final size = MediaQuery.of(context).size;
  return min(size.height - 200, size.width);
}

Future<FilePickerResult?> pickFile() async {
  if (isMobile()) {
    await FilePicker.platform.clearTemporaryFiles();
  }
  final result = await FilePicker.platform.pickFiles();
  return result;
}

Future<void> saveFileBinary(
    List<int> data, String filename, String title) async {
  if (isMobile()) {
    final context = rootNavigatorKey.currentContext!;
    Size size = MediaQuery.of(context).size;
    final tempDir = await getTempPath();
    final path = p.join(tempDir, filename);
    final xfile = XFile(path);
    final file = File(path);
    await file.writeAsBytes(data);
    await Share.shareXFiles([xfile],
        subject: title,
        sharePositionOrigin: Rect.fromLTWH(0, 0, size.width, size.height / 2));
  } else {
    final fn = await FilePicker.platform
        .saveFile(dialogTitle: title, fileName: filename);
    if (fn != null) {
      final file = File(fn);
      await file.writeAsBytes(data);
    }
  }
}

Future<void> shareQrImage(BuildContext originContext,
    {required String data, required String title, Uint8List? pngBytes}) async {
  Rect? shareOrigin;
  try {
    final box = originContext.findRenderObject() as RenderBox?;
    if (box != null) {
      final offset = box.localToGlobal(Offset.zero);
      shareOrigin = offset & box.size;
    }
  } catch (_) {}

  final String subject = 'Hi, scan this QR code to send me a ZEC payment!';
  final String body = 'Hey! You can scan this QR code to send me a ZEC payment, or just copy and paste my address below.\n\n'
      'Address: ' + data + '\n\n---';

  try {
    final Uint8List bytes;
    if (pngBytes != null) {
      bytes = pngBytes;
    } else {
      final painter = QrPainter(
        data: data,
        version: QrVersions.auto,
        errorCorrectionLevel: QrErrorCorrectLevel.L,
        gapless: true,
        color: Colors.black,
        emptyColor: Colors.white,
      );
      final ByteData? imageData =
          await painter.toImageData(640, format: ImageByteFormat.png);
      bytes = imageData!.buffer.asUint8List();
    }

    final filename = 'YWallet_QR_${DateTime.now().millisecondsSinceEpoch}.png';

    if (Platform.isAndroid || Platform.isIOS) {
      final tempDir = await getTemporaryDirectory();
      final tempPath = p.join(tempDir.path, filename);
      final tmp = File(tempPath + '.part');
      await tmp.writeAsBytes(bytes, flush: true);
      final file = File(tempPath);
      try {
        if (await file.exists()) await file.delete();
      } catch (_) {}
      await tmp.rename(file.path);
      try {
        await Share.shareXFiles(
          [XFile(file.path, mimeType: 'image/png')],
          text: body,
          subject: subject,
          sharePositionOrigin: shareOrigin,
        );
      } catch (_) {}
      return;
    }

    // Desktop platforms: save to Pictures or sensible default, prompt/open
    final picturesDir = Platform.isLinux
        ? (() {
            final home = Platform.environment['HOME'] ?? '';
            final dir = Directory(p.join(home, 'Pictures'));
            if (!dir.existsSync()) dir.createSync(recursive: true);
            return dir;
          })()
        : await getApplicationDocumentsDirectory();
    final outPath = p.join(picturesDir.path, filename);
    final outTmp = File(outPath + '.part');
    await outTmp.writeAsBytes(bytes, flush: true);
    final outFile = File(outPath);
    try {
      if (await outFile.exists()) await outFile.delete();
    } catch (_) {}
    await outTmp.rename(outFile.path);

    if (Platform.isLinux || Platform.isMacOS) {
      try {
        await Process.run(Platform.isMacOS ? 'open' : 'xdg-open', [outFile.path]);
      } catch (_) {}
      try {
        await Clipboard.setData(ClipboardData(text: data));
      } catch (_) {}
      return;
    }

    try {
      await Share.shareXFiles(
        [XFile(outFile.path, mimeType: 'image/png')],
        text: body,
        subject: subject,
        sharePositionOrigin: shareOrigin,
      );
    } catch (_) {}
  } catch (_) {
    await showSnackBar('Unable to share QR');
  }
}

int getSpendable(int pools, PoolBalanceT balances) {
  return (pools & 1 != 0 ? balances.transparent : 0) +
      (pools & 2 != 0 ? balances.sapling : 0) +
      (pools & 4 != 0 ? balances.orchard : 0);
}

class MemoData {
  bool reply;
  String subject;
  String memo;
  MemoData(this.reply, this.subject, this.memo);

  MemoData clone() => MemoData(reply, subject, memo);
}

extension ScopeFunctions<T> on T {
  R let<R>(R Function(T) block) => block(this);
}

Future<bool> showConfirmDialog(
    BuildContext context, String title, String body,
    {String? confirmLabel, String? cancelLabel}) async {
  final s = S.of(context);
  final t = Theme.of(context);

  void close(bool res) {
    GoRouter.of(context).pop<bool>(res);
  }

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

  final Color primaryFill = balanceTextColor;
  final Color secondaryFill = const Color(0xFF2E2C2C);
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
              label,
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

  Widget secondaryButton({required String label, required VoidCallback onTap}) {
    // Render as plain tappable text (no box), normal weight, centered
    return Center(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(6),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: bodyStyle.copyWith(
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
    );
  }

  final confirmation = await showDialog<bool>(
        context: context,
        barrierDismissible: false,
        builder: (context) => AlertDialog(
          title: Text(title, style: titleStyle),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(body, style: bodyStyle),
              const SizedBox(height: 16),
              // Cancel on top, OK at the bottom
              secondaryButton(label: cancelLabel ?? s.cancel, onTap: () => close(false)),
              const SizedBox(height: 10),
              primaryButton(label: confirmLabel ?? s.ok, onTap: () => close(true)),
            ],
          ),
          actions: const [],
        ),
      ) ??
      false;
  return confirmation;
}

Decimal parseNumber(String? sn) {
  if (sn == null || sn.isEmpty) return Decimal.zero;
  // There is no API to parse directly from intl string
  final v = NumberFormat.currency(locale: Platform.localeName).parse(sn);
  return Decimal.parse(v.toStringAsFixed(8));
}

int stringToAmount(String? s) {
  final v = parseNumber(s);
  return (ZECUNIT_DECIMAL * v).toBigInt().toInt();
}

String amountToString2(int amount, {int? digits}) {
  final dd = digits ?? decimalDigits(appSettings.fullPrec);
  return decimalFormat(amount / ZECUNIT, dd);
}

Future<void> saveFile(String data, String filename, String title) async {
  await saveFileBinary(utf8.encode(data), filename, title);
}

String centerTrim(String v, {int leading = 2, int length = 16}) {
  if (v.length <= length) return v;
  final e = v.length - length + leading;
  return v.substring(0, leading) + '...' + v.substring(e);
}

// String trailing(String v, int n) {
//   final len = min(n, v.length);
//   return v.substring(v.length - len);
// }

String getPrivacyLevel(BuildContext context, int level) {
  final s = S.of(context);
  final privacyLevels = [s.veryLow, s.low, s.medium, s.high];
  return privacyLevels[level];
}

bool isMobile() => Platform.isAndroid || Platform.isIOS;

Future<String> getDataPath() async {
  String? home;
  if (Platform.isAndroid)
    home = (await getApplicationDocumentsDirectory()).parent.path;
  if (Platform.isWindows) home = Platform.environment['LOCALAPPDATA'];
  if (Platform.isLinux)
    home =
        Platform.environment['XDG_DATA_HOME'] ?? Platform.environment['HOME'];
  if (Platform.isMacOS) home = (await getApplicationSupportDirectory()).path;
  if (Platform.isIOS) home = (await getApplicationDocumentsDirectory()).path;
  final h = home ?? "";
  return h;
}

Future<String> getTempPath() async {
  if (isMobile()) {
    final d = await getTemporaryDirectory();
    return d.path;
  }
  final dataPath = await getDataPath();
  final tempPath = p.join(dataPath, "tmp");
  Directory(tempPath).createSync(recursive: true);
  return tempPath;
}

Future<String> getDbPath() async {
  if (Platform.isIOS) return (await getApplicationDocumentsDirectory()).path;
  final h = await getDataPath();
  return "$h/databases";
}

abstract class HasHeight {
  int height = 0;
}

class Reflector extends Reflectable {
  const Reflector() : super(instanceInvokeCapability);
}

const reflector = const Reflector();

@reflector
class Note extends HasHeight {
  int id;
  int height;
  int? confirmations;
  DateTime timestamp;
  double value;
  bool orchard;
  bool excluded;
  bool selected;

  factory Note.from(int? latestHeight, int id, int height, DateTime timestamp,
      double value, bool orchard, bool excluded, bool selected) {
    final confirmations = latestHeight?.let((h) => h - height + 1);
    return Note(id, height, confirmations, timestamp, value, orchard, excluded,
        selected);
  }
  factory Note.fromShieldedNote(ShieldedNoteT n) => Note(n.id, n.height, 0,
      toDateTime(n.timestamp), n.value / ZECUNIT, n.orchard, n.excluded, false);

  Note(this.id, this.height, this.confirmations, this.timestamp, this.value,
      this.orchard, this.excluded, this.selected);

  Note get invertExcluded => Note(id, height, confirmations, timestamp, value,
      orchard, !excluded, selected);

  Note clone() => Note(
      id, height, confirmations, timestamp, value, orchard, excluded, selected);
}

@reflector
class Tx extends HasHeight {
  int id;
  int height;
  int? confirmations;
  DateTime timestamp;
  String txId;
  String fullTxId;
  double value;
  String? address;
  String? contact;
  String? memo;
  List<TxMemo> memos;

  factory Tx.from(
    int? latestHeight,
    int id,
    int height,
    DateTime timestamp,
    String txid,
    String fullTxId,
    double value,
    String? address,
    String? contact,
    String? memo,
    List<Memo> memos,
  ) {
    final confirmations = latestHeight?.let((h) => h - height + 1);
    final memos2 =
        memos.map((m) => TxMemo(address: m.address!, memo: m.memo!)).toList();
    return Tx(id, height, confirmations, timestamp, txid, fullTxId, value,
        address, contact, memo, memos2);
  }

  Tx(
      this.id,
      this.height,
      this.confirmations,
      this.timestamp,
      this.txId,
      this.fullTxId,
      this.value,
      this.address,
      this.contact,
      this.memo,
      this.memos);
}

class ZMessage extends HasHeight {
  final int id;
  final int txId;
  final bool incoming;
  final String? fromAddress;
  final String? sender;
  final String recipient;
  final String subject;
  final String body;
  final DateTime timestamp;
  final int height;
  final bool read;

  ZMessage(
      this.id,
      this.txId,
      this.incoming,
      this.fromAddress,
      this.sender,
      this.recipient,
      this.subject,
      this.body,
      this.timestamp,
      this.height,
      this.read);

  ZMessage withRead(bool v) {
    return ZMessage(id, txId, incoming, fromAddress, sender, recipient, subject,
        body, timestamp, height, v);
  }

  String fromto() => incoming
      ? "\u{21e6} ${sender != null ? centerTrim(sender!) : ''}"
      : "\u{21e8} ${centerTrim(recipient)}";
}

class PnL {
  final DateTime timestamp;
  final double price;
  final double amount;
  final double realized;
  final double unrealized;

  PnL(this.timestamp, this.price, this.amount, this.realized, this.unrealized);

  @override
  String toString() {
    return "$timestamp $price $amount $realized $unrealized";
  }
}

Color amountColor(BuildContext context, num a) {
  final theme = Theme.of(context);
  if (a < 0) return Colors.red;
  if (a > 0) return Colors.green;
  return theme.textTheme.bodyLarge!.color!;
}

TextStyle weightFromAmount(TextStyle style, num v) {
  final value = v.abs();
  final coin = coins[aa.coin];
  final style2 = style.copyWith(fontFeatures: [FontFeature.tabularFigures()]);
  if (value >= coin.weights[2])
    return style2.copyWith(fontWeight: FontWeight.w800);
  else if (value >= coin.weights[1])
    return style2.copyWith(fontWeight: FontWeight.w600);
  else if (value >= coin.weights[0])
    return style2.copyWith(fontWeight: FontWeight.w400);
  return style2.copyWith(fontWeight: FontWeight.w200);
}

final DateFormat todayDateFormat = DateFormat("HH:mm");
final DateFormat monthDateFormat = DateFormat("MMMd");
final DateFormat longAgoDateFormat = DateFormat("yy-MM-dd");
final DateFormat monthDayAtTimeFormat = DateFormat("MMM d 'at' h:mm a");

String humanizeDateTime(BuildContext context, DateTime datetime) {
  final messageDate = datetime.toLocal();
  final now = DateTime.now();
  final justNow = now.subtract(Duration(minutes: 1));
  final midnight = DateTime(now.year, now.month, now.day);
  final year = DateTime(now.year, 1, 1);

  String dateString;
  if (justNow.isBefore(messageDate))
    dateString = S.of(context).now;
  else if (midnight.isBefore(messageDate))
    dateString = todayDateFormat.format(messageDate);
  else if (year.isBefore(messageDate))
    dateString = monthDateFormat.format(messageDate);
  else
    dateString = longAgoDateFormat.format(messageDate);
  return dateString;
}

String relativeWhen(DateTime timestamp) {
  final now = DateTime.now();
  final tsLocal = timestamp.toLocal();
  final today = DateTime(now.year, now.month, now.day);
  final dayTs = DateTime(tsLocal.year, tsLocal.month, tsLocal.day);
  final days = today.difference(dayTs).inDays;
  if (days <= 0) return 'Today';
  if (days == 1) return 'Yesterday';
  if (days <= 30) return '$days days ago';
  return monthDayAtTimeFormat.format(tsLocal);
}

Future<double?> getFxRate(String coin, String fiat) async {
  final base = "api.coingecko.com";
  final uri = Uri.https(
      base, '/api/v3/simple/price', {'ids': coin, 'vs_currencies': fiat});
  try {
    final rep = await http.get(uri);
    if (rep.statusCode == 200) {
      final json = convert.jsonDecode(rep.body) as Map<String, dynamic>;
      final p = json[coin][fiat.toLowerCase()];
      return (p is double) ? p : (p as int).toDouble();
    }
  } catch (e) {
    logger.e(e);
  }
  return null;
}

class TimeSeriesPoint<V> {
  final int day;
  final V value;

  TimeSeriesPoint(this.day, this.value);

  @override
  String toString() => '($day, $value)';
}

class AccountBalance {
  final DateTime time;
  final double balance;

  AccountBalance(this.time, this.balance);
  @override
  String toString() => "($time $balance)";
}

List<TimeSeriesPoint<V>> sampleDaily<T, Y, V>(
    Iterable<T> timeseries,
    int start,
    int end,
    int Function(T) getDay,
    Y Function(T) getY,
    V Function(V, Y) accFn,
    V initial) {
  assert(start % DAY_SEC == 0);
  final s = start ~/ DAY_SEC;
  final e = end ~/ DAY_SEC;

  List<TimeSeriesPoint<V>> ts = [];
  var acc = initial;

  var tsIterator = timeseries.iterator;
  var next = tsIterator.moveNext() ? tsIterator.current : null;
  var nextDay = next?.let((n) => getDay(n));

  for (var day = s; day <= e; day++) {
    while (nextDay != null && day == nextDay) {
      // accumulate
      acc = accFn(acc, getY(next!));
      next = tsIterator.moveNext() ? tsIterator.current : null;
      nextDay = next?.let((n) => getDay(n));
    }
    ts.add(TimeSeriesPoint(day, acc));
  }
  return ts;
}

class Quote {
  final DateTime dt;
  final price;

  Quote(this.dt, this.price);
}

class Trade {
  final DateTime dt;
  final qty;

  Trade(this.dt, this.qty);
}

FormFieldValidator<T> composeOr<T>(List<FormFieldValidator<T>> validators) {
  return (v) {
    String? first;
    for (var validator in validators) {
      final res = validator.call(v);
      if (res == null) return null;
      if (first == null) first = res;
    }
    return first;
  };
}

class PoolBitSet {
  static Set<int> toSet(int pools) {
    return List.generate(3, (index) => pools & (1 << index) != 0 ? index : null)
        .whereNotNull()
        .toSet();
  }

  static int fromSet(Set<int> poolSet) => poolSet.map((p) => 1 << p).sum;
}

List<Account> getAllAccounts() =>
    coins.expand((c) => WarpApi.getAccountList(c.coin)).toList();

// Persist and apply custom account order (per coin)
Future<void> saveAccountOrder(List<Account> accounts) async {
  final prefs = await SharedPreferences.getInstance();
  final keys = accounts.map((a) => '${a.coin}:${a.id}').toList();
  await prefs.setStringList('account_order_v1', keys);
}

Future<List<String>> loadAccountOrder() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getStringList('account_order_v1') ?? <String>[];
}

List<Account> applyAccountOrder(List<Account> accounts, List<String> orderKeys) {
  if (orderKeys.isEmpty) return accounts;
  final keyOf = (Account a) => '${a.coin}:${a.id}';
  final map = {for (final a in accounts) keyOf(a): a};
  final ordered = <Account>[];
  for (final key in orderKeys) {
    final a = map.remove(key);
    if (a != null) ordered.add(a);
  }
  // Append any remaining accounts not in saved order, preserving their relative order
  for (final a in accounts) {
    if (!ordered.contains(a)) ordered.add(a);
  }
  return ordered;
}

// Reaction emoji support (global MRU)
const List<String> kDefaultEmojiTokens = <String>[
  ':thumbsup:',
  ':thumbsdown:',
  ':heart:',
  ':smile:',
  ':frown:',
  ':joy:',
  ':tada:',
];

const Map<String, String> kEmojiTokenToChar = <String, String>{
  ':thumbsup:': '👍',
  ':thumbsdown:': '👎',
  ':heart:': '❤️',
  ':smile:': '🙂',
  ':frown:': '☹️',
  ':joy:': '😂',
  ':tada:': '🎉',
  ':fire:': '🔥',
  ':rocket:': '🚀',
  ':eyes:': '👀',
  ':100:': '💯',
  ':clap:': '👏',
  ':thinking:': '🤔',
  ':wave:': '👋',
  ':ok_hand:': '👌',
  ':pray:': '🙏',
  ':star:': '⭐',
  ':skull:': '💀',
  ':poop:': '💩',
  ':sos:': '🆘',
  ':warning:': '⚠️',
  ':sparkles:': '✨',
  ':zzz:': '💤',
  // Smileys
  ':grin:': '😁', ':grinning:': '😀', ':smile_big:': '😄', ':smile_cat:': '😺', ':wink:': '😉', ':blush:': '😊', ':relieved:': '😌', ':kissing_heart:': '😘', ':heart_eyes:': '😍', ':sunglasses:': '😎', ':neutral:': '😐', ':expressionless:': '😑', ':smirk:': '😏', ':unamused:': '😒', ':disappointed:': '😞', ':pensive:': '😔', ':confused:': '😕', ':persevere:': '😣', ':cry:': '😢', ':sob:': '😭', ':angry:': '😠', ':rage:': '😡', ':astonished:': '😲', ':scream:': '😱', ':sleeping:': '😴', ':dizzy_face:': '😵', ':mask:': '😷', ':thermometer_face:': '🤒', ':sneezing_face:': '🤧', ':brain:': '🧠', ':light_bulb:': '💡',
  // Gestures / people
  ':muscle:': '💪', ':facepalm:': '🤦', ':shrug:': '🤷', ':handshake:': '🤝', ':raised_hands:': '🙌', ':folded_hands:': '🙏', ':fingers_crossed:': '🤞', ':vulcan:': '🖖', ':call_me:': '🤙',
  // Nature / weather / plants
  ':sun:': '☀️', ':moon:': '🌙', ':cloud:': '☁️', ':rain:': '🌧️', ':snowflake:': '❄️', ':zap:': '⚡', ':umbrella:': '☔', ':rose:': '🌹', ':tulip:': '🌷', ':cherry_blossom:': '🌸', ':leaf:': '🍃', ':maple_leaf:': '🍁', ':butterfly:': '🦋', ':tree:': '🌳', ':evergreen_tree:': '🌲',
  // Animals
  ':dog:': '🐶', ':cat:': '🐱', ':rabbit:': '🐰', ':bear:': '🐻', ':panda:': '🐼', ':lion:': '🦁', ':tiger:': '🐯', ':horse:': '🐴', ':pig:': '🐷', ':chicken:': '🐔', ':monkey:': '🐵', ':frog:': '🐸', ':fish:': '🐟', ':whale:': '🐳', ':dolphin:': '🐬', ':octopus:': '🐙',
  // Food & drink
  ':pizza:': '🍕', ':burger:': '🍔', ':fries:': '🍟', ':taco:': '🌮', ':hotdog:': '🌭', ':burrito:': '🌯', ':ramen:': '🍜', ':rice:': '🍚', ':doughnut:': '🍩', ':cookie:': '🍪', ':cake:': '🎂', ':chocolate:': '🍫', ':icecream:': '🍨', ':coffee:': '☕', ':beer:': '🍺', ':wine:': '🍷',
  // Activities / sports / awards
  ':soccer:': '⚽', ':basketball:': '🏀', ':baseball:': '⚾', ':football:': '🏈', ':tennis:': '🎾', ':golf:': '⛳', ':trophy:': '🏆', ':medal:': '🎖️', ':running:': '🏃', ':bicyclist:': '🚴', ':swimmer:': '🏊', ':weightlifter:': '🏋️', ':party_popper:': '🎉', ':gift:': '🎁',
  // Travel & places
  ':car:': '🚗', ':taxi:': '🚕', ':bus:': '🚌', ':train:': '🚆', ':airplane:': '✈️', ':helicopter:': '🚁', ':ship:': '🚢', ':anchor:': '⚓', ':house:': '🏠', ':office:': '🏢', ':school:': '🏫', ':hospital:': '🏥', ':bank:': '🏦',
  // Objects / tools / tech / comms
  ':laptop:': '💻', ':phone:': '📱', ':battery:': '🔋', ':camera:': '📷', ':video_camera:': '📹', ':microphone:': '🎤', ':headphones:': '🎧', ':gamepad:': '🎮', ':joystick:': '🕹️', ':wrench:': '🔧', ':hammer:': '🔨', ':screwdriver:': '🪛', ':toolbox:': '🧰', ':hourglass:': '⏳', ':alarm_clock:': '⏰', ':calendar:': '📅', ':paperclip:': '📎', ':pushpin:': '📌', ':pen:': '🖊️', ':pencil:': '✏️', ':book:': '📖', ':books:': '📚', ':newspaper:': '📰', ':memo:': '📝', ':envelope:': '✉️', ':inbox:': '📥', ':outbox:': '📤', ':magnifying_glass:': '🔎', ':lock:': '🔒', ':unlock:': '🔓', ':key:': '🔑', ':shield:': '🛡️', ':package:': '📦', ':box:': '🧰',
  // Symbols / signs
  ':check_mark:': '✔️', ':cross_mark:': '❌', ':plus:': '➕', ':minus:': '➖', ':question:': '❓', ':exclamation:': '❗', ':info:': 'ℹ️', ':recycle:': '♻️', ':no_entry:': '⛔', ':prohibited:': '🚫', ':arrow_left:': '⬅️', ':arrow_right:': '➡️', ':arrow_up:': '⬆️', ':arrow_down:': '⬇️',
};

const List<String> kSupportedEmojiTokens = <String>[
  // Core set (always present)
  ':thumbsup:', ':thumbsdown:', ':heart:', ':smile:', ':frown:', ':joy:', ':tada:', ':fire:', ':rocket:', ':eyes:', ':100:', ':clap:', ':thinking:', ':wave:', ':ok_hand:', ':pray:', ':star:', ':skull:', ':poop:', ':sos:', ':warning:', ':sparkles:', ':zzz:',
  // Extras (broader coverage)
  ':grin:', ':grinning:', ':smile_big:', ':smile_cat:', ':wink:', ':blush:', ':relieved:', ':kissing_heart:', ':heart_eyes:', ':sunglasses:', ':neutral:', ':expressionless:', ':smirk:', ':unamused:', ':disappointed:', ':pensive:', ':confused:', ':persevere:', ':cry:', ':sob:', ':angry:', ':rage:', ':astonished:', ':scream:', ':sleeping:', ':dizzy_face:', ':mask:', ':thermometer_face:', ':sneezing_face:', ':brain:', ':light_bulb:',
  ':muscle:', ':facepalm:', ':shrug:', ':handshake:', ':raised_hands:', ':folded_hands:', ':fingers_crossed:', ':vulcan:', ':call_me:',
  ':sun:', ':moon:', ':cloud:', ':rain:', ':snowflake:', ':zap:', ':umbrella:', ':rose:', ':tulip:', ':cherry_blossom:', ':leaf:', ':maple_leaf:', ':butterfly:', ':tree:', ':evergreen_tree:',
  ':dog:', ':cat:', ':rabbit:', ':bear:', ':panda:', ':lion:', ':tiger:', ':horse:', ':pig:', ':chicken:', ':monkey:', ':frog:', ':fish:', ':whale:', ':dolphin:', ':octopus:',
  ':pizza:', ':burger:', ':fries:', ':taco:', ':hotdog:', ':burrito:', ':ramen:', ':rice:', ':doughnut:', ':cookie:', ':cake:', ':chocolate:', ':icecream:', ':coffee:', ':beer:', ':wine:',
  ':soccer:', ':basketball:', ':baseball:', ':football:', ':tennis:', ':golf:', ':trophy:', ':medal:', ':running:', ':bicyclist:', ':swimmer:', ':weightlifter:', ':party_popper:', ':gift:',
  ':car:', ':taxi:', ':bus:', ':train:', ':airplane:', ':helicopter:', ':ship:', ':anchor:', ':house:', ':office:', ':school:', ':hospital:', ':bank:',
  ':laptop:', ':phone:', ':battery:', ':camera:', ':video_camera:', ':microphone:', ':headphones:', ':gamepad:', ':joystick:', ':wrench:', ':hammer:', ':screwdriver:', ':toolbox:', ':hourglass:', ':alarm_clock:', ':calendar:', ':paperclip:', ':pushpin:', ':pen:', ':pencil:', ':book:', ':books:', ':newspaper:', ':memo:', ':envelope:', ':inbox:', ':outbox:', ':magnifying_glass:', ':lock:', ':unlock:', ':key:', ':shield:', ':package:', ':box:',
  ':check_mark:', ':cross_mark:', ':plus:', ':minus:', ':question:', ':exclamation:', ':info:', ':recycle:', ':no_entry:', ':prohibited:', ':arrow_left:', ':arrow_right:', ':arrow_up:', ':arrow_down:',
];

// Category groupings for the big picker
const List<String> kEmojiSmileys = <String>[
  ':smile:', ':frown:', ':joy:', ':eyes:', ':thinking:', ':zzz:', ':grin:', ':grinning:', ':smile_big:', ':smile_cat:', ':wink:', ':blush:', ':relieved:', ':kissing_heart:', ':heart_eyes:', ':sunglasses:', ':neutral:', ':expressionless:', ':smirk:', ':unamused:', ':disappointed:', ':pensive:', ':confused:', ':persevere:', ':cry:', ':sob:', ':angry:', ':rage:', ':astonished:', ':scream:', ':sleeping:', ':dizzy_face:', ':mask:', ':thermometer_face:', ':sneezing_face:'
];
const List<String> kEmojiGestures = <String>[
  ':thumbsup:', ':thumbsdown:', ':clap:', ':wave:', ':ok_hand:', ':pray:', ':muscle:', ':facepalm:', ':shrug:', ':handshake:', ':raised_hands:', ':folded_hands:', ':fingers_crossed:', ':vulcan:', ':call_me:'
];
const List<String> kEmojiSymbols = <String>[
  ':heart:', ':star:', ':100:', ':sos:', ':warning:', ':sparkles:', ':check_mark:', ':cross_mark:', ':plus:', ':minus:', ':question:', ':exclamation:', ':info:', ':recycle:', ':no_entry:', ':prohibited:', ':arrow_left:', ':arrow_right:', ':arrow_up:', ':arrow_down:'
];
const List<String> kEmojiFun = <String>[
  ':tada:', ':fire:', ':rocket:', ':skull:', ':poop:', ':party_popper:', ':gift:'
];

const List<String> kEmojiNature = <String>[
  ':sun:', ':moon:', ':cloud:', ':rain:', ':snowflake:', ':zap:', ':umbrella:', ':rose:', ':tulip:', ':cherry_blossom:', ':leaf:', ':maple_leaf:', ':butterfly:', ':tree:', ':evergreen_tree:'
];

const List<String> kEmojiAnimals = <String>[
  ':dog:', ':cat:', ':rabbit:', ':bear:', ':panda:', ':lion:', ':tiger:', ':horse:', ':pig:', ':chicken:', ':monkey:', ':frog:', ':fish:', ':whale:', ':dolphin:', ':octopus:'
];

const List<String> kEmojiFood = <String>[
  ':pizza:', ':burger:', ':fries:', ':taco:', ':hotdog:', ':burrito:', ':ramen:', ':rice:', ':doughnut:', ':cookie:', ':cake:', ':chocolate:', ':icecream:', ':coffee:', ':beer:', ':wine:'
];

const List<String> kEmojiActivity = <String>[
  ':soccer:', ':basketball:', ':baseball:', ':football:', ':tennis:', ':golf:', ':trophy:', ':medal:', ':running:', ':bicyclist:', ':swimmer:', ':weightlifter:'
];

const List<String> kEmojiTravel = <String>[
  ':car:', ':taxi:', ':bus:', ':train:', ':airplane:', ':helicopter:', ':ship:', ':anchor:', ':house:', ':office:', ':school:', ':hospital:', ':bank:'
];

const List<String> kEmojiObjects = <String>[
  ':laptop:', ':phone:', ':battery:', ':camera:', ':video_camera:', ':microphone:', ':headphones:', ':gamepad:', ':joystick:', ':wrench:', ':hammer:', ':screwdriver:', ':toolbox:', ':hourglass:', ':alarm_clock:', ':calendar:', ':paperclip:', ':pushpin:', ':pen:', ':pencil:', ':book:', ':books:', ':newspaper:', ':memo:', ':envelope:', ':inbox:', ':outbox:', ':magnifying_glass:', ':lock:', ':unlock:', ':key:', ':shield:', ':package:', ':box:'
];

List<String> _unionLists(List<List<String>> lists) {
  final out = <String>[];
  final seen = <String>{};
  for (final l in lists) {
    for (final t in l) {
      if (!seen.contains(t)) { seen.add(t); out.add(t); }
    }
  }
  return out;
}

Map<String, List<String>> emojiCategories() => <String, List<String>>{
  'All': _unionLists([
    kEmojiSmileys, kEmojiGestures, kEmojiNature, kEmojiAnimals, kEmojiFood, kEmojiActivity, kEmojiTravel, kEmojiObjects, kEmojiSymbols, kEmojiFun
  ]),
  'Smileys': kEmojiSmileys,
  'Gestures': kEmojiGestures,
  'Nature': kEmojiNature,
  'Animals': kEmojiAnimals,
  'Food': kEmojiFood,
  'Activity': kEmojiActivity,
  'Travel': kEmojiTravel,
  'Objects': kEmojiObjects,
  'Symbols': kEmojiSymbols,
  'Fun': kEmojiFun,
};

String emojiCharForToken(String token) => kEmojiTokenToChar[token] ?? token;

// Policy filter: allow only a subset of emojis (exclude certain categories)
const Set<String> kEmojiDenyTokens = <String>{
  // Explicit disallowed tokens (extend as dataset grows)
  ':pregnant_man:', ':pregnant_person:', ':man_kiss_man:', ':woman_kiss_woman:', ':kiss_mm:', ':kiss_ww:', ':rainbow_flag:', ':transgender_flag:', ':two_men_holding_hands:', ':two_women_holding_hands:', ':nonbinary:', ':gender_neutral:'
};

bool isEmojiTokenAllowed(String token) {
  try {
    final t = token.trim().toLowerCase();
    if (kEmojiDenyTokens.contains(t)) return false;
    // Heuristic deny by substring for unseen token names as we expand
    const List<String> denySubstrings = [
      'pregnant', 'man_kiss_man', 'woman_kiss_woman', 'kiss_mm', 'kiss_ww', 'two_men', 'two_women', 'rainbow', 'transgender', 'nonbinary', 'gender_neutral'
    ];
    for (final sub in denySubstrings) {
      if (t.contains(sub)) return false;
    }
    return true;
  } catch (_) {
    return true;
  }
}

List<String> filterAllowedTokens(Iterable<String> tokens) {
  final out = <String>[];
  final seen = <String>{};
  for (final tk in tokens) {
    if (tk.isEmpty) continue;
    if (seen.contains(tk)) continue;
    if (!isEmojiTokenAllowed(tk)) continue;
    out.add(tk);
    seen.add(tk);
  }
  return out;
}

Future<List<String>> loadEmojiMRU() async {
  final prefs = await SharedPreferences.getInstance();
  final list = prefs.getStringList('emoji_mru_v1') ?? <String>[];
  final filtered = filterAllowedTokens(list);
  if (filtered.isEmpty) return filterAllowedTokens(kDefaultEmojiTokens);
  return filtered.take(7).toList();
}

Future<List<String>> loadEmojiMRUExtended() async {
  final prefs = await SharedPreferences.getInstance();
  final list = prefs.getStringList('emoji_mru_v1') ?? <String>[];
  final filtered = filterAllowedTokens(list);
  if (filtered.isEmpty) return filterAllowedTokens(kDefaultEmojiTokens).take(16).toList();
  return filtered.take(16).toList();
}

Future<void> updateEmojiMRU(String token) async {
  if (!isEmojiTokenAllowed(token)) return;
  final prefs = await SharedPreferences.getInstance();
  final List<String> list = prefs.getStringList('emoji_mru_v1')?.toList() ?? <String>[];
  list.removeWhere((t) => t == token);
  list.insert(0, token);
  final trimmed = filterAllowedTokens(list).take(16).toList();
  await prefs.setStringList('emoji_mru_v1', trimmed);
}

void showLocalNotification({required int id, String? title, String? body}) {
  AwesomeNotifications().createNotification(
      content: NotificationContent(
    channelKey: APP_NAME,
    id: id,
    title: title,
    body: body,
  ));
}

extension PoolBalanceExtension on PoolBalanceT {
  int get total => transparent + sapling + orchard;
}

String? isValidUA(int uaType) {
  if (uaType == 1) return GetIt.I<S>().invalidAddress;
  return null;
}
