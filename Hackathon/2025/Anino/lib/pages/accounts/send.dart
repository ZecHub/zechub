import 'package:YWallet/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import '../../theme/zashi_tokens.dart';
import 'package:warp_api/data_fb_generated.dart';
import 'package:warp_api/warp_api.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'dart:io' show Platform;
import '../../coin/coins.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import '../../store2.dart';
import 'dart:async';

import '../../accounts.dart';
import '../../appsettings.dart';
import '../../generated/intl/messages.dart';
import '../settings.dart';
import '../utils.dart';
import '../widgets.dart';
import '../main/balance.dart';
import '../main/sync_status.dart';
import '../scan.dart';

class SendContext {
  final String address; // underlying real address
  final int pools;
  final Amount amount;
  final MemoData? memo;
  // Snapshot of the FX rate used when the user entered the fiat amount
  final double? fx;
  // Optional display text to show in the address field (e.g., contact name)
  final String? display;
  // Launched from a Messages thread (enables special routing/read-only UI)
  final bool fromThread;
  // Index of the originating thread (for /messages/details?index=<idx>)
  final int? threadIndex;
  // Conversation id for the thread (base64url without padding)
  final String? threadCid;
  SendContext(this.address, this.pools, this.amount, this.memo, [this.fx, this.display, this.fromThread = false, this.threadIndex, this.threadCid]);
  static SendContext? fromPaymentURI(String puri) {
    final p = WarpApi.decodePaymentURI(aa.coin, puri);
    if (p == null) throw S.of(navigatorKey.currentContext!).invalidPaymentURI;
    return SendContext(
        p.address!, 7, Amount(p.amount, false), MemoData(false, '', p.memo!), marketPrice.price);
  }

  @override
  String toString() {
    return 'SendContext($address, $pools, ${amount.value}, ${memo?.memo}, fx=$fx, display=$display, fromThread=$fromThread, threadIndex=$threadIndex, threadCid=$threadCid)';
  }

  static SendContext? instance;
}

class QuickSendPage extends StatefulWidget {
  final SendContext? sendContext;
  final bool custom;
  final bool single;
  QuickSendPage({this.sendContext, this.custom = false, this.single = true});

  @override
  State<StatefulWidget> createState() => _QuickSendState();
}

class _QuickSendState extends State<QuickSendPage> with WithLoadingAnimation {
  final formKey = GlobalKey<FormBuilderState>();
  final poolKey = GlobalKey<PoolSelectionState>();
  // Removed legacy AmountPicker; ZashiAmountRow manages amount and fiat now
  final memoKey = GlobalKey<InputMemoState>();
  final _sendToTopController = TextEditingController();
  late PoolBalanceT balances =
      WarpApi.getPoolBalances(aa.coin, aa.id, appSettings.anchorOffset, false)
          .unpack();
  String _address = '';
  int _pools = 7;
  Amount _amount = Amount(0, false);
  MemoData _memo =
      MemoData(appSettings.includeReplyTo != 0, '', '');
  String? _contactReplyToUA;
  bool isShielded = false;
  int addressPools = 0;
  bool isTex = false;
  int rp = 0;
  late bool custom;
  String? _addressError;
  bool _addressIsValid = false;
  bool _showAddContactHelp = false;
  Timer? _addContactTimer;

  @override
  void initState() {
    super.initState();
    custom = widget.custom ^ appSettings.customSend;
    // Defer inherited widget access (e.g., S.of(context)) until after first frame
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _didUpdateSendContext(widget.sendContext);
      }
    });
  }

  @override
  void didUpdateWidget(QuickSendPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    balances =
        WarpApi.getPoolBalances(aa.coin, aa.id, appSettings.anchorOffset, false)
            .unpack();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _didUpdateSendContext(widget.sendContext);
    });
  }

  @override
  Widget build(BuildContext context) {
    final customSendSettings = appSettings.customSendSettings;
    final spendable = getSpendable(_pools, balances);
    final numReceivers = numPoolsOf(addressPools);
    // Exact fill to match transaction icon background color
    const addressFillColor = Color(0xFF2E2C2C);
    final t = Theme.of(context);
    final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
    // Revert mini button (chip) styling to YWallet look
    // Slightly lighter than field fill, with subtle themed border
    final chipBgColor = Color.lerp(addressFillColor, Colors.black, 0.06) ?? addressFillColor;
    final chipBorderColor = (t.extension<ZashiThemeExt>()?.quickBorderColor) ?? t.dividerColor.withOpacity(0.20);
    // Cursor color aligned with the ZEC balance text color
    final balanceCursorColor = t.extension<ZashiThemeExt>()?.balanceAmountColor ?? const Color(0xFFBDBDBD);

    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            onPressed: () {
              final sc = widget.sendContext;
              if (sc?.fromThread == true && sc?.threadIndex != null) {
                GoRouter.of(context).go('/messages/details?index=${sc!.threadIndex}');
              } else {
                GoRouter.of(context).pop();
              }
            },
            icon: Icon(Icons.arrow_back),
          ),
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
              S.of(context).send.toUpperCase(),
              style: reduced,
            );
          }),
          centerTitle: true,
          actions: const [],
        ),
        body: wrapWithLoading(SingleChildScrollView(
          child: Column(
            children: [
              SyncStatusWidget(),
              Gap(8),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: FormBuilder(
                  key: formKey,
                  child: Column(
                    children: [
                      BalanceWidget(0),
                      Gap(24),
                      Gap(8),
                      // Centered, 4% narrower container for label + field
                      Align(
                        alignment: Alignment.center,
                        child: FractionallySizedBox(
                          widthFactor: 0.96, // shrink width by 4%
                          child: Stack(
                            clipBehavior: Clip.none,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                Text(
                                  'Send to',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleSmall
                                      ?.copyWith(fontFamily: balanceFontFamily),
                                ),
                                const Gap(8),
                                TextField(
                                  controller: _sendToTopController,
                                  onChanged: (v) => _setAddressFromTop(v),
                                  onSubmitted: (v) => _setAddressFromTop(v),
                                  readOnly: (widget.sendContext?.fromThread ?? false),
                                  cursorColor: balanceCursorColor,
                                  style: (Theme.of(context).textTheme.bodyMedium ?? const TextStyle()).copyWith(
                                    fontFamily: balanceFontFamily,
                                    color: Theme.of(context).colorScheme.onSurface,
                                  ),
                                  decoration: InputDecoration(
                                    hintText: 'Zcash Address',
                                    hintStyle: (Theme.of(context).textTheme.bodyMedium ?? const TextStyle())
                                        .copyWith(
                                      fontFamily: balanceFontFamily,
                                      fontWeight: FontWeight.w400,
                                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                                    ),
                                    filled: true,
                                    fillColor: MaterialStateColor.resolveWith((_) => addressFillColor),
                                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide.none,
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide.none,
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide.none,
                                    ),
                                    errorText: _addressError,
                                    errorStyle: (Theme.of(context).textTheme.bodySmall ?? const TextStyle())
                                        .copyWith(color: Theme.of(context).colorScheme.error),
                                    errorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2),
                                    ),
                                    suffixIcon: Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 8),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          _SuffixChip(
                                            icon: SvgPicture.string(
                                              _ZASHI_CONTACT_GLYPH,
                                              width: 32,
                                              height: 32,
                                              colorFilter: ColorFilter.mode(t.colorScheme.onSurface, BlendMode.srcIn),
                                            ),
                                            backgroundColor: chipBgColor,
                                            borderColor: chipBorderColor,
                                            onTap: () async {
                                              if ((widget.sendContext?.fromThread ?? false)) {
                                                // In thread-launched mode, do not change destination
                                                return;
                                              }
                                              if (_addressIsValid && _address.isNotEmpty) {
                                                GoRouter.of(context).push('/contacts/add', extra: _address);
                                              } else {
                                                final c = await GoRouter.of(context)
                                                    .push<Contact>('/account/quick_send/contacts');
                                                final addr = c?.address;
                                                if (addr != null) _setAddressFromTop(addr);
                                              }
                                            },
                                          ),
                                          const SizedBox(width: 8),
                                          _SuffixChip(
                                            icon: SvgPicture.string(
                                              _ZASHI_QR_GLYPH,
                                              width: 32,
                                              height: 32,
                                              colorFilter: ColorFilter.mode(t.colorScheme.onSurface, BlendMode.srcIn),
                                            ),
                                            backgroundColor: chipBgColor,
                                            borderColor: chipBorderColor,
                                            onTap: () async {
                                              if ((widget.sendContext?.fromThread ?? false)) {
                                                return;
                                              }
                                              final text = await scanQRCode(context, validator: addressValidator);
                                              _setAddressFromTop(text);
                                            },
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                const Gap(8),
                                // Helper is overlayed instead of inline (see Positioned overlay below)
                                const SizedBox(height: 0),
                                const Gap(12),
                                Text(
                                  'Amount',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleSmall
                                      ?.copyWith(fontFamily: balanceFontFamily),
                                ),
                                const Gap(8),
                                ZashiAmountRow(
                                  initialAmount: _amount.value,
                                  fiatCode: appSettings.currency,
                                  availableZatoshis: spendable,
                                  onAmountChanged: (int value) {
                                    setState(() {
                                      _amount = Amount(value, _amount.deductFee);
                                      if (value > 0 && (_address.isEmpty)) {
                                        _addressError = 'Enter Zcash Address';
                                      } else if (value == 0 && _address.isEmpty) {
                                        _addressError = null;
                                      }
                                    });
                                  },
                                ),
                              ],
                              ),
                              if (_showAddContactHelp)
                                Positioned(
                                  left: 0,
                                  right: 0,
                                  top: 62,
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Color.lerp(addressFillColor, Colors.white, 0.08),
                                      borderRadius: BorderRadius.circular(14),
                                    ),
                                    constraints: const BoxConstraints(minHeight: 48, maxHeight: 48),
                                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                    child: FittedBox(
                                      fit: BoxFit.scaleDown,
                                      alignment: Alignment.center,
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        crossAxisAlignment: CrossAxisAlignment.center,
                                        children: [
                                          SvgPicture.string(
                                            _ZASHI_CONTACT_GLYPH,
                                            width: 40,
                                            height: 40,
                                            colorFilter: ColorFilter.mode(Theme.of(context).colorScheme.onSurface, BlendMode.srcIn),
                                          ),
                                          const SizedBox(width: 8),
                                          Text(
                                            'Add contact by tapping on the contact icon.',
                                            maxLines: 1,
                                            softWrap: false,
                                            style: (Theme.of(context).textTheme.bodyMedium ?? const TextStyle()).copyWith(
                                              fontFamily: balanceFontFamily,
                                              color: Theme.of(context).colorScheme.onSurface,
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
                      ),
                      const Gap(12),
                      if (isShielded && customSendSettings.memo)
                        Align(
                          alignment: Alignment.center,
                          child: FractionallySizedBox(
                            widthFactor: 0.96,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Message',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleSmall
                                      ?.copyWith(fontFamily: balanceFontFamily),
                                ),
                                const Gap(8),
                                InputMemo(
                                  _memo,
                                  key: memoKey,
                                  onChanged: (v) => _memo = v!,
                                  custom: custom,
                                ),
                                // Removed extra reply-to UA display per request
                              ],
                            ),
                          ),
                        ),
                      if (numReceivers > 1 &&
                          custom &&
                          customSendSettings.recipientPools)
                        FieldUA(rp,
                            name: 'recipient_pools',
                            label: S.of(context).receivers,
                            onChanged: (v) => setState(() => rp = v!),
                            radio: false,
                            pools: addressPools),
                      Gap(8),
                      if (widget.single &&
                          custom &&
                          customSendSettings.pools &&
                          !isTex)
                        PoolSelection(
                          _pools,
                          key: poolKey,
                          balances: aa.poolBalances,
                          onChanged: (v) => setState(() => _pools = v!),
                        ),
                      Gap(8),
                      // AmountPicker removed
                      Gap(8),
                      const Gap(12),
                      if (_addressIsValid && _amount.value > 0 && _amount.value <= spendable && appStore.proverReady)
                        Align(
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
                                  onTap: send,
                                  child: Center(
                                    child: Text(
                                      'Review',
                                      style: (Theme.of(context).textTheme.titleSmall ?? const TextStyle()).copyWith(
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
                      if (_addressIsValid && _amount.value > 0 && _amount.value <= spendable && !appStore.proverReady)
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const SizedBox(width: 8),
                              const SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(Color(0xFFF4B728)),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text('Preparing prover…', style: Theme.of(context).textTheme.bodySmall),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        )));
  }

  send() async {
    final form = formKey.currentState!;
    if (form.validate()) {
      form.save();
      logger.d(
          'send $_address $rp $_amount $_pools ${_memo.reply} ${_memo.subject} ${_memo.memo}');
      // Preserve thread context (fromThread/threadIndex/threadCid/display) if present
      final prev = widget.sendContext;
      final sc = SendContext(
        _address,
        _pools,
        _amount,
        _memo,
        marketPrice.price,
        prev?.display,
        prev?.fromThread ?? false,
        prev?.threadIndex,
        prev?.threadCid,
      );
      SendContext.instance = sc;
      // Prepare memo with potential hidden header before assembling recipient
      MemoData effectiveMemo = _memo;
      try {
        final scExtra = widget.sendContext;
        if (scExtra?.fromThread == true) {
          String? cid = scExtra?.threadCid;
          if (cid == null || cid.isEmpty) {
            try { cid = WarpApi.getProperty(aa.coin, 'contact_cid_' + aa.id.toString()); } catch (_) {}
          }
          if (cid != null && cid.isNotEmpty) {
            int mySeq = 1;
            try {
              final s0 = WarpApi.getProperty(aa.coin, 'cid_my_seq_' + cid).trim();
              final v0 = int.tryParse(s0);
              mySeq = (v0 != null && v0 > 0) ? (v0 + 1) : 1;
            } catch (_) { mySeq = 1; }
            try { WarpApi.setProperty(aa.coin, 'cid_my_seq_' + cid, mySeq.toString()); } catch (_) {}
            final amt = _amount.value;
            String header = 'v1; type=payment; conversation_id=' + cid + '; seq=' + mySeq.toString() + (amt > 0 ? '; amount_zat=' + amt.toString() : '');
            final bodyOnly = (effectiveMemo.memo).trim();
            effectiveMemo = MemoData(effectiveMemo.reply, effectiveMemo.subject, header + '\n\n' + bodyOnly);
          }
        }
      } catch (_) {}
      final builder = RecipientObjectBuilder(
        address: _address,
        pools: rp,
        amount: _amount.value,
        feeIncluded: _amount.deductFee,
        replyTo: effectiveMemo.reply,
        subject: effectiveMemo.subject,
        memo: effectiveMemo.memo,
      );
      final recipient = Recipient(builder.toBytes());
      if (widget.single) {
        try {
          final plan = await load(() => WarpApi.prepareTx(
                aa.coin,
                aa.id,
                [recipient],
                _pools,
                coinSettings.replyUa,
                appSettings.anchorOffset,
                coinSettings.feeT,
              ));
          if (plan == null || (plan is String && plan.isEmpty)) {
            showMessageBox2(context, S.of(context).error, 'Failed to prepare transaction plan.');
            return;
          }
          GoRouter.of(context).go('/account/txplan?tab=account', extra: plan);
        } catch (e) {
          try { logger.e('prepareTx failed: ' + e.toString()); } catch (_) {}
          showMessageBox2(context, S.of(context).error, e.toString());
        }
      } else {
        GoRouter.of(context).pop(recipient);
      }
    }
  }

  _onAddress(String? v) {
    if (v == null) return;
    final puri = WarpApi.decodePaymentURI(aa.coin, v);
    if (puri != null) {
      final sc = SendContext(puri.address!, _pools, Amount(puri.amount, false),
          MemoData(false, '', puri.memo!));
      _didUpdateSendContext(sc);
    } else {
      _address = v;
      _didUpdateAddress(v);
    }
    setState(() {});
  }

  void _didUpdateSendContext(SendContext? sendContext) {
    if (sendContext == null) return;
    _address = sendContext.address; // real underlying address
    _pools = sendContext.pools;
    _amount = sendContext.amount;
    _memo = sendContext.memo ??
        MemoData(appSettings.includeReplyTo != 0, '', '');
    // Show display text if provided (e.g., contact name), otherwise show the address
    _sendToTopController.text = (sendContext.display?.isNotEmpty ?? false)
        ? sendContext.display!
        : sendContext.address;
    memoKey.currentState?.setMemoBody(_memo.memo);
    // If launched from a thread and we will inject a payment header, pre-reserve bytes in the counter
    if (sendContext.fromThread == true) {
      final cid = (sendContext.threadCid ?? '').trim();
      final int amt = _amount.value;
      // Rough header: v1; type=payment; conversation_id=<cid>; seq=<nn>[; amount_zat=<amt>]\n\n
      // We don’t know seq yet; reserve up to 10 chars for seq and 2 for key/punct.
      final headerFixed = 'v1; type=payment; conversation_id=${cid}; '.length + '\n\n'.length;
      final amountPart = (amt > 0) ? ('; amount_zat=${amt}'.length) : 0;
      // conservative reservation: 12 chars for seq/in_reply_to punctuation and value
      final reserved = headerFixed + amountPart + 12;
      memoKey.currentState?.setReservedBytes(reserved.clamp(0, 512));
    } else {
      memoKey.currentState?.setReservedBytes(0);
    }
    _didUpdateAddress(_address);
  }

  _didUpdateAddress(String? address) {
    if (address == null) return;
    isTex = false;
    var address2 = address;
    try {
      address2 = WarpApi.parseTexAddress(aa.coin, address2);
      isTex = true;
      _pools = 1;
      poolKey.currentState?.setPools(1);
    } on String {}
    final receivers = address.isNotEmpty
        ? WarpApi.receiversOfAddress(aa.coin, address2)
        : 0;
    isShielded = receivers & 6 != 0;
    addressPools = receivers & coinSettings.receipientPools;
    rp = addressPools;
    // Inline validation UI
    final bool fromThread = widget.sendContext?.fromThread ?? false;
    if (address.isEmpty) {
      _addressIsValid = false;
      _cancelAddContactHint();
      // Suppress error text in thread-launched mode
      _addressError = fromThread ? null : (_amount.value > 0 ? 'Enter Zcash Address' : null);
    } else {
      final validUnderlying = isTex || WarpApi.validAddress(aa.coin, address2);
      // In thread-launched mode, the visual field shows a name; treat underlying address as valid and suppress error text
      if (fromThread) {
        _addressError = null;
        _addressIsValid = (addressPools & 6) != 0 && (validUnderlying || isTex);
      } else {
        _addressError = validUnderlying ? null : S.of(context).invalidAddress;
        _addressIsValid = validUnderlying && (addressPools & 6) != 0; // memo-capable (Sapling/Orchard)
      }
      if (_addressIsValid) _showAddContactHint();
    }

    // Load per-contact reply-to UA if this address matches a stored contact
    _contactReplyToUA = null;
    try {
      for (final c in contacts.contacts) {
        final t = c.unpack();
        if ((t.address ?? '') == address) {
          final prop = WarpApi.getProperty(aa.coin, 'contact_rt_' + t.id.toString());
          if (prop.isNotEmpty) {
            _contactReplyToUA = prop;
          }
          break;
        }
      }
    } catch (_) {}
  }

  void _showAddContactHint() {
    _cancelAddContactHint();
    setState(() => _showAddContactHelp = true);
    _addContactTimer = Timer(const Duration(milliseconds: 2000), () {
      if (!mounted) return;
      setState(() => _showAddContactHelp = false);
    });
  }

  void _cancelAddContactHint() {
    _addContactTimer?.cancel();
    _addContactTimer = null;
    if (_showAddContactHelp) setState(() => _showAddContactHelp = false);
  }

  _toggleCustom() {
    setState(() => custom = !custom);
  }

  void _setAddressFromTop(String v) {
    _sendToTopController.text = v;
    _onAddress(v);
  }
}

class _SuffixChip extends StatelessWidget {
  final Widget icon;
  final VoidCallback onTap;
  final Color backgroundColor;
  final Color borderColor;

  const _SuffixChip({
    required this.icon,
    required this.onTap,
    required this.backgroundColor,
    required this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    final radius = BorderRadius.circular(10);
    return Material(
      color: backgroundColor,
      shape: RoundedRectangleBorder(borderRadius: radius, side: BorderSide(color: borderColor)),
      child: InkWell(
        onTap: onTap,
        borderRadius: radius,
        child: SizedBox(
          width: 36,
          height: 36,
          child: Center(
            child: icon,
          ),
        ),
      ),
    );
  }
}

class ZashiAmountRow extends StatefulWidget {
  final int initialAmount;
  final String fiatCode;
  final ValueChanged<int> onAmountChanged;
  final int availableZatoshis;

  const ZashiAmountRow({super.key, required this.initialAmount, required this.fiatCode, required this.availableZatoshis, required this.onAmountChanged});

  @override
  State<ZashiAmountRow> createState() => _ZashiAmountRowState();
}

class _ZashiAmountRowState extends State<ZashiAmountRow> {
  final TextEditingController _zecCtl = TextEditingController();
  final TextEditingController _fiatCtl = TextEditingController();
  double? _fxRate;
  late final NumberFormat _zecFmt = NumberFormat.decimalPatternDigits(locale: Platform.localeName, decimalDigits: decimalDigits(appSettings.fullPrec));
  late final NumberFormat _fiatFmt = NumberFormat.decimalPatternDigits(locale: Platform.localeName, decimalDigits: 2);
  bool _updating = false;
  bool _syncing = false;
  bool _insufficient = false;

  @override
  void initState() {
    super.initState();
    if (widget.initialAmount > 0) {
      _zecCtl.text = amountToString2(widget.initialAmount);
    } else {
      _zecCtl.text = '';
    }
    _fiatCtl.text = '';
    _updateFx();
    // Kick off a quick background refresh so the USD field is fresh on first load
    // and never sits indefinitely on "Syncing...".
    // If it fails or times out, we fall back to "Tap to Sync...".
    Future.microtask(_bootstrapPrice);
  }

  Future<void> _updateFx() async {
    // Prefer the store's last fetched price to avoid a second network call
    final cached = marketPrice.price;
    if (cached != null) {
      if (!mounted) return;
      setState(() => _fxRate = cached);
      _syncFiatFromZec();
      return;
    }
    final c = coins[aa.coin];
    final fx = await getFxRate(c.currency, widget.fiatCode);
    if (!mounted) return;
    setState(() => _fxRate = fx);
    _syncFiatFromZec();
  }

  bool _isFreshNow() {
    final ts = marketPrice.timestamp;
    return ts != null && DateTime.now().difference(ts).inSeconds <= 120;
  }

  Future<void> _triggerSyncAndFx() async {
    if (_syncing) return;
    setState(() => _syncing = true);
    try {
      await marketPrice.update().timeout(const Duration(seconds: 8));
      // Use updated store price immediately
      if (mounted) setState(() => _fxRate = marketPrice.price);
      _syncFiatFromZec();
    } finally {
      if (mounted) setState(() => _syncing = false);
    }
  }

  Future<void> _bootstrapPrice() async {
    if (_syncing) return;
    // Seed from any cached value first, so UI can display USD quickly
    if (marketPrice.price != null && mounted) {
      setState(() => _fxRate = marketPrice.price);
      _syncFiatFromZec();
    }
    setState(() => _syncing = true);
    try {
      await marketPrice.update().timeout(const Duration(seconds: 4));
      if (mounted) setState(() => _fxRate = marketPrice.price);
      _syncFiatFromZec();
    } catch (_) {
      // ignore; UI will show Tap to Sync... if still stale
    } finally {
      if (mounted) setState(() => _syncing = false);
    }
  }

  void _syncFiatFromZec() {
    if (_fxRate == null) return;
    try {
      final raw = _zecCtl.text.trim();
      _updating = true;
      if (raw.isEmpty) {
        _fiatCtl.text = '';
        _insufficient = false;
      } else {
        final z = _zecFmt.parse(raw).toDouble();
        final fiat = z * _fxRate!;
        _fiatCtl.text = _fiatFmt.format(fiat);
        final valueZats = (z * 100000000).round();
        _insufficient = valueZats > widget.availableZatoshis;
      }
    } catch (_) {
      _fiatCtl.text = '';
      _insufficient = false;
    }
    _updating = false;
  }

  void _syncZecFromFiat() {
    if (_fxRate == null) return;
    try {
      final raw = _fiatCtl.text.trim();
      _updating = true;
      if (raw.isEmpty) {
        _zecCtl.text = '';
        _insufficient = false;
      } else {
        final f = _fiatFmt.parse(raw).toDouble();
        // Compute zatoshis directly from USD to avoid intermediate precision loss
        final int valueZats = ((f * 100000000) / _fxRate!).round();
        // Display ZEC with up to 8 decimals (trim trailing zeros)
        _zecCtl.text = decimalToStringTrim(valueZats / 100000000.0);
        _insufficient = valueZats > widget.availableZatoshis;
      }
    } catch (_) {
      _zecCtl.text = '';
      _insufficient = false;
    }
    _updating = false;
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final addressFillColor = const Color(0xFF2E2C2C);
    final balanceFontFamily = t.textTheme.displaySmall?.fontFamily;
    final balanceTextColor = t.extension<ZashiThemeExt>()?.balanceAmountColor ?? const Color(0xFFBDBDBD);
    // Container background is removed; we use TextField filled decoration to match the address field
    final boxDecoration = BoxDecoration(borderRadius: BorderRadius.circular(14));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            // ZEC box
            Expanded(
              child: Theme(
                data: t.copyWith(
                  textSelectionTheme: TextSelectionThemeData(
                    selectionColor: Colors.transparent,
                    selectionHandleColor: t.colorScheme.onSurface,
                  ),
                ),
                child: TextField(
                  controller: _zecCtl,
                  keyboardType: const TextInputType.numberWithOptions(decimal: true),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(RegExp(r'[0-9.,]')),
                  ],
                  textAlignVertical: TextAlignVertical.center,
                  cursorColor: balanceTextColor,
                  style: (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                    fontFamily: balanceFontFamily,
                    color: balanceTextColor,
                  ),
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: addressFillColor,
                    hintText: 'ZEC',
                    hintStyle: (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                      fontFamily: balanceFontFamily,
                      fontWeight: FontWeight.w400,
                      color: balanceTextColor.withOpacity(0.7),
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                    ),
                    errorText: _insufficient ? 'Insufficient funds' : null,
                    errorStyle: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(color: Theme.of(context).colorScheme.error),
                  ),
                  onChanged: (_) {
                    if (_updating) return;
                    _syncFiatFromZec();
                    final txt = _zecCtl.text.trim();
                    final z = txt.isEmpty ? 0.0 : _zecFmt.parse(txt).toDouble();
                    final value = (z * 100000000).round();
                    widget.onAmountChanged(value);
                  },
                ),
              ),
            ),
            const SizedBox(width: 8),
            // arrows (placeholder two arrows)
            Column(
              children: const [
                Icon(Icons.keyboard_double_arrow_right, size: 18),
                Icon(Icons.keyboard_double_arrow_left, size: 18),
              ],
            ),
            const SizedBox(width: 8),
            // Fiat box
            Expanded(
              child: Observer(builder: (_) {
                // Gate USD input by FX availability, freshness (<= 2m), and not currently syncing
                final bool isFresh = _isFreshNow();
                final bool usdEnabled = _fxRate != null && isFresh && !_syncing;
                final String hint = _syncing
                    ? 'Syncing...'
                    : (!usdEnabled ? 'Tap to Sync...' : widget.fiatCode);
                return Theme(
                  data: t.copyWith(
                    textSelectionTheme: TextSelectionThemeData(
                      selectionColor: Colors.transparent,
                      selectionHandleColor: t.colorScheme.onSurface,
                    ),
                  ),
                  child: Stack(
                    children: [
                      TextField(
                        controller: _fiatCtl,
                        enabled: usdEnabled,
                        keyboardType: const TextInputType.numberWithOptions(decimal: true),
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[0-9.,]')),
                        ],
                        textAlignVertical: TextAlignVertical.center,
                        cursorColor: balanceTextColor,
                        style: (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                          fontFamily: balanceFontFamily,
                          color: balanceTextColor,
                        ),
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: addressFillColor,
                          hintText: hint,
                          hintStyle: (t.textTheme.bodyMedium ?? const TextStyle()).copyWith(
                            fontFamily: balanceFontFamily,
                            fontWeight: FontWeight.w400,
                            color: balanceTextColor.withOpacity(0.7),
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                          ),
                          disabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: _insufficient ? BorderSide(color: Theme.of(context).colorScheme.error, width: 1.2) : BorderSide.none,
                          ),
                          errorText: _insufficient ? 'Insufficient funds' : null,
                          errorStyle: (t.textTheme.bodySmall ?? const TextStyle()).copyWith(color: Theme.of(context).colorScheme.error),
                        ),
                        onChanged: (_) {
                          if (_updating) return;
                          if (_fxRate == null) return;
                          try {
                            final raw = _fiatCtl.text.trim();
                            if (raw.isEmpty) {
                              _zecCtl.text = '';
                              _insufficient = false;
                              widget.onAmountChanged(0);
                            } else {
                              final f = _fiatFmt.parse(raw).toDouble();
                              final int valueZats = ((f * 100000000) / _fxRate!).round();
                              _zecCtl.text = decimalToStringTrim(valueZats / 100000000.0);
                              _insufficient = valueZats > widget.availableZatoshis;
                              widget.onAmountChanged(valueZats);
                            }
                          } catch (_) {
                            _zecCtl.text = '';
                            _insufficient = false;
                            widget.onAmountChanged(0);
                          }
                        },
                      ),
                      if (!usdEnabled)
                        Positioned.fill(
                          child: Material(
                            color: Colors.transparent,
                            child: InkWell(
                              borderRadius: BorderRadius.circular(14),
                              onTap: _triggerSyncAndFx,
                            ),
                          ),
                        ),
                    ],
                  ),
                );
              }),
            ),
          ],
        ),
      ],
    );
  }
}

// Exact Zashi glyphs (inside 36x36 viewport). Box is provided by _SuffixChip.
const String _ZASHI_CONTACT_GLYPH =
    '<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g transform="translate(0.5,0.5)">\n'
    '    <path d="M10.5 24.667C12.446 22.602 15.089 21.333 18 21.333C20.911 21.333 23.553 22.602 25.5 24.667M21.75 14.25C21.75 16.321 20.071 18 18 18C15.929 18 14.25 16.321 14.25 14.25C14.25 12.179 15.929 10.5 18 10.5C20.071 10.5 21.75 12.179 21.75 14.25Z" stroke="#231F20" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter" fill="none"/>\n'
    '  </g>\n'
    '</svg>';

const String _ZASHI_QR_GLYPH =
    '<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">\n'
    '  <g transform="translate(0.5,0.5)">\n'
    '    <path d="M13.833 18H18V22.167M10.508 18H10.5M14.675 22.167H14.667M18.008 25.5H18M25.508 18H25.5M10.5 22.167H11.75M20.917 18H22.583M10.5 25.5H14.667M18 9.667V14.667M22.667 25.5H24.167C24.633 25.5 24.867 25.5 25.045 25.409C25.202 25.329 25.329 25.202 25.409 25.045C25.5 24.867 25.5 24.633 25.5 24.167V22.667C25.5 22.2 25.5 21.967 25.409 21.788C25.329 21.632 25.202 21.504 25.045 21.424C24.867 21.333 24.633 21.333 24.167 21.333H22.667C22.2 21.333 21.967 21.333 21.788 21.424C21.632 21.504 21.504 21.632 21.424 21.788C21.333 21.967 21.333 22.2 21.333 22.667V24.167C21.333 24.633 21.333 24.867 21.424 25.045C21.504 25.202 21.632 25.329 21.788 25.409C21.967 25.5 22.2 25.5 22.667 25.5ZM22.667 14.667H24.167C24.633 14.667 24.867 14.667 25.045 14.576C25.202 14.496 25.329 14.368 25.409 14.212C25.5 14.033 25.5 13.8 25.5 13.333V11.833C25.5 11.367 25.5 11.133 25.409 10.955C25.329 10.798 25.202 10.671 25.045 10.591C24.867 10.5 24.633 10.5 24.167 10.5H22.667C22.2 10.5 21.967 10.5 21.788 10.591C21.632 10.671 21.504 10.798 21.424 10.955C21.333 11.133 21.333 11.367 21.333 11.833V13.333C21.333 13.8 21.333 14.033 21.424 14.212C21.504 14.368 21.632 21.504 21.788 21.632C21.967 21.788 22.2 21.967 22.667 21.967ZM11.833 14.667H13.333C13.8 14.667 14.033 14.667 14.212 14.576C14.368 14.496 14.496 14.368 14.576 14.212C14.667 14.033 14.667 13.8 14.667 13.333V11.833C14.667 11.367 14.667 11.133 14.576 10.955C14.496 10.798 14.368 10.671 14.212 10.591C14.033 10.5 13.8 10.5 13.333 10.5H11.833C11.367 10.5 11.133 10.5 10.955 10.591C10.798 10.671 10.671 10.798 10.591 10.955C10.5 11.133 10.5 11.367 10.5 11.833V13.333C10.5 13.8 10.5 14.033 10.591 14.212C10.671 14.368 10.798 14.496 10.955 14.576C11.133 14.667 11.367 14.667 11.833 14.667Z" stroke="#231F20" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="miter" fill="none"/>\n'
    '  </g>\n'
    '</svg>';
