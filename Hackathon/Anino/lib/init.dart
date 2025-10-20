import 'dart:io';

import 'accounts.dart';
import 'appsettings.dart';
import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:warp_api/warp_api.dart';
import 'package:window_manager/window_manager.dart';
import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'theme/zashi_tokens.dart';

import 'coin/coins.dart';
import 'generated/intl/messages.dart';
import 'main.dart';
import 'pages/utils.dart';
import 'router.dart';

Future<void> initCoins() async {
  final dbPath = await getDbPath();
  Directory(dbPath).createSync(recursive: true);
  for (var coin in coins) {
    coin.init(dbPath);
  }
}

Future<void> restoreWindow() async {
  if (isMobile()) return;
  await windowManager.ensureInitialized();
  // Prevent the window from being closed by the OS implicitly (Wayland/WM quirks)
  // so the app doesn't exit unexpectedly when detached/backgrounded.
  await windowManager.setPreventClose(true);

  final prefs = await SharedPreferences.getInstance();
  final width = prefs.getDouble('width');
  final height = prefs.getDouble('height');
  // Optional phone preview override via env, e.g. YW_PHONE_PREVIEW=iphone13
  Size? previewSize;
  final preview = Platform.environment['YW_PHONE_PREVIEW']?.toLowerCase();
  if (preview == 'iphone13') {
    previewSize = const Size(390, 844);
  } else if (preview == 'iphone14pro') {
    previewSize = const Size(393, 852);
  }

  // Default to a common phone-like size when no size has been saved yet
  final defaultSize = const Size(390, 780); // phone-like, realistic height
  final desired = previewSize ??
      (width != null && height != null ? Size(width, height) : defaultSize);
  // Clamp to a reasonable phone preview range; if preview is set, honor exact height
  final clamped = previewSize != null
      ? Size((desired.width).clamp(320.0, 430.0).toDouble(), previewSize.height)
      : Size(
          (desired.width).clamp(320.0, 430.0).toDouble(),
          (desired.height).clamp(700.0, 820.0).toDouble(),
        );
  WindowOptions windowOptions = WindowOptions(
    center: true,
    size: clamped,
    backgroundColor: Colors.transparent,
    skipTaskbar: false,
    titleBarStyle:
        Platform.isMacOS ? TitleBarStyle.hidden : TitleBarStyle.normal,
  );
  windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.setSize(clamped);
    await windowManager.show();
    await windowManager.focus();
    // Nudge to front on some compositors
    await windowManager.setAlwaysOnTop(true);
    await Future.delayed(const Duration(milliseconds: 150));
    await windowManager.setAlwaysOnTop(false);
    // Persist the clamped size so subsequent launches use the phone-like height
    await prefs.setDouble('width', clamped.width);
    await prefs.setDouble('height', clamped.height);
  });
  // Some Wayland compositors ignore initial focus; try again after first frame
  WidgetsBinding.instance.addPostFrameCallback((_) async {
    try {
      await windowManager.show();
      await windowManager.focus();
      await windowManager.setAlwaysOnTop(true);
      await Future.delayed(const Duration(milliseconds: 400));
      await windowManager.setAlwaysOnTop(false);
    } catch (_) {}
  });
  windowManager.addListener(_OnWindow());
}

class _OnWindow extends WindowListener {
  @override
  void onWindowResized() async {
    final s = await windowManager.getSize();
    final prefs = await SharedPreferences.getInstance();
    prefs.setDouble('width', s.width);
    prefs.setDouble('height', s.height);
  }

  @override
  void onWindowClose() async {
    // On desktop, prevent-close is enabled. Intercept the close event
    // so the app does not immediately shut down when backgrounded.
    await windowManager.hide();
  }
}

void initNotifications() {
  AwesomeNotifications().initialize(
      'resource://drawable/res_notification',
      [
        NotificationChannel(
          channelKey: APP_NAME,
          channelName: APP_NAME,
          channelDescription: 'Notification channel for $APP_NAME',
          defaultColor: Color(0xFFB3F0FF),
          ledColor: Colors.white,
        )
      ],
      debug: false);
}

class App extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return Observer(builder: (context) {
      try {
        aaSequence.settingsSeqno;
        // Guard against invalid/unknown palette names in persisted settings
        // which would make Enum.values.byName throw and crash the build.
        FlexScheme scheme;
        try {
          scheme = FlexScheme.values.byName(appSettings.palette.name);
        } catch (_) {
          scheme = FlexScheme.mandyRed; // fallback to our default
        }
        final baseTheme = appSettings.palette.dark
            ? FlexThemeData.dark(scheme: scheme)
            : FlexThemeData.light(scheme: scheme);
        final theme = baseTheme.copyWith(
          useMaterial3: true,
          dataTableTheme: DataTableThemeData(
            headingRowColor: MaterialStateColor.resolveWith(
              (_) => baseTheme.highlightColor,
            ),
          ),
        );
      final zashiLight = ZashiThemeExt(
        tileRadius: 22,
        tilePadding: 14,
        quickGradTop: const Color(0xFFF4F4F4),
        quickGradBottom: const Color(0xFFE7E7E7),
        quickBorderColor: const Color(0x22000000),
        balanceAmountColor: const Color(0xFFBDBDBD),
      );
      final zashiDark = ZashiThemeExt(
        tileRadius: 22,
        tilePadding: 14,
        quickGradTop: const Color(0xFF3A3737),
        quickGradBottom: const Color(0xFF232121),
        quickBorderColor: const Color(0x33000000),
        balanceAmountColor: const Color(0xFFBDBDBD),
      );
      // Optional in-app device preview (desktop only) to force logical size (e.g., iPhone 13: 390x844)
      Size? _envPreviewSize() {
        final p = Platform.environment['YW_PHONE_PREVIEW']?.toLowerCase();
        if (p == 'iphone13') return const Size(390, 844);
        if (p == 'iphone14pro') return const Size(393, 852);
        return null;
      }

      return MaterialApp.router(
        locale: Locale(appSettings.language),
        title: APP_NAME,
        debugShowCheckedModeBanner: false,
        theme: theme.copyWith(extensions: [zashiLight]),
        darkTheme: theme.copyWith(extensions: [zashiDark]),
        scaffoldMessengerKey: rootScaffoldMessengerKey,
        scrollBehavior: _DesktopTouchScrollBehavior(),
        builder: (context, child) {
          final size = _envPreviewSize();
          if (size != null && !isMobile() && child != null) {
            final mq = MediaQuery.of(context);
            final mqData = mq.copyWith(
              size: size,
              // Keep other metrics; we only force logical width/height
            );
            return Center(
              child: MediaQuery(
                data: mqData,
                child: SizedBox(width: size.width, height: size.height, child: child),
              ),
            );
          }
          return child ?? const SizedBox.shrink();
        },
        localizationsDelegates: [
          S.delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
          FormBuilderLocalizations.delegate,
        ],
        supportedLocales: [
          Locale('en'),
          Locale('es'),
          Locale('pt'),
          Locale('fr'),
        ],
        routerConfig: router,
      );
      } catch (e, st) {
        // Surface the real error to the console instead of the generic Observer message
        debugPrint('Observer build error (App root): ' + e.toString() + '\n' + st.toString());
        return MaterialApp(
          home: Scaffold(
            body: Center(
              child: Text('Something went wrong starting the app.'),
            ),
          ),
        );
      }
    });
  }
}

class _DesktopTouchScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.stylus,
        PointerDeviceKind.unknown,
      };
}
