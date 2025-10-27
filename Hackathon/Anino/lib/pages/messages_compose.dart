import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:warp_api/warp_api.dart';
import '../accounts.dart';
import '../appsettings.dart';
import '../coin/coins.dart';
import 'accounts/send.dart';
import 'utils.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:warp_api/data_fb_generated.dart';

import '../store2.dart';

class ComposeMessagePanel extends StatefulWidget {
  const ComposeMessagePanel({Key? key}) : super(key: key);

  @override
  State<ComposeMessagePanel> createState() => _ComposeMessagePanelState();
}

class _ComposeMessagePanelState extends State<ComposeMessagePanel> {
  // Debug/diagnostic toggles
  final bool _debugNoAnimations = false; // Step B: minimal fade for last bubble only
  final bool _debugPaintBanner = false;
  final TextEditingController _toController = TextEditingController();
  final FocusNode _toFocus = FocusNode();
  final TextEditingController _messageController = TextEditingController();
  final FocusNode _messageFocus = FocusNode();
  int? _selectedContactId;
  final ScrollController _threadController = ScrollController();
  int _lastThreadCount = 0;
  bool _pendingJustAdded = false;
  bool _chatWarnDismissed = false;
  // Local optimistic echoes to avoid flicker on refresh
  final List<ZMessage> _localEchoes = <ZMessage>[];
  bool _showJumpToLatest = false;
  int _newSinceAway = 0;
  int _outgoingSinceAway = 0;
  int _lastOutgoingCount = 0;
  static const double _jumpThresholdPx = 120.0;

  ContactT? _resolveSelectedContact() {
    try {
      if (_selectedContactId != null) {
        for (final c in contacts.contacts) {
          final t = c.unpack();
          if (t.id == _selectedContactId) return t;
        }
      }
      final q = _toController.text.trim();
      if (q.isEmpty) return null;
      final lower = q.toLowerCase();
      // Resolve by exact name or address match
      final exact = contacts.contacts.where((c) {
        final t = c.unpack();
        final n = (t.name ?? '').trim().toLowerCase();
        final a = (t.address ?? '').trim();
        return n == lower || a == q;
      }).map((c) => c.unpack()).toList(growable: false);
      if (exact.length == 1) return exact.first;
      // Resolve by unique fuzzy match (name/address contains query)
      final fuzzy = contacts.contacts.where((c) {
        final t = c.unpack();
        final n = (t.name ?? '').trim().toLowerCase();
        final a = (t.address ?? '').trim().toLowerCase();
        return n.contains(lower) || a.contains(lower);
      }).map((c) => c.unpack()).toList(growable: false);
      if (fuzzy.length == 1) return fuzzy.first;
    } catch (_) {}
    return null;
  }

  bool _hasConversationWith(ContactT contact) {
    try {
      final addr = contact.safeAddress;
      if (addr.isEmpty) return false;
      for (final m in aa.messages.items) {
        try {
          final from = (m as dynamic).from as String?; // fallback to dynamic to avoid SDK diffs
          final to = (m as dynamic).recipient as String?; // ZMessage.recipient is used elsewhere
          if ((from != null && from == addr) || (to != null && to == addr)) return true;
        } catch (_) {
          // As an additional fallback, check known fields
          try {
            final from2 = (m as dynamic).from as String?;
            final to2 = (m as dynamic).to as String?;
            if ((from2 != null && from2 == addr) || (to2 != null && to2 == addr)) return true;
          } catch (_) {}
        }
      }
    } catch (_) {}
    return false;
  }

  String _generateConversationId() {
    final rnd = Random.secure();
    final bytes = List<int>.generate(10, (_) => rnd.nextInt(256));
    return base64Url.encode(bytes).replaceAll('=', '');
  }

  bool _inviteSending = false;
  bool _acceptSending = false;

  Future<void> _sendInvite(ContactT contact) async {
    try {
      // Require Display Name (first name) before sending chat request
      if (!_hasDisplayName()) {
        final proceed = await _promptDisplayNameNeeded();
        if (proceed) _goToDisplayNamePrompt();
        return;
      }
      // Show non-blocking warning immediately
      try {
        scheduleMicrotask(() { _maybeShowChatWarning(); });
      } catch (_) {}
      if (_inviteSending) return;
      _inviteSending = true;
      setState(() {});
      final address = contact.safeAddress;
      if (address.isEmpty) {
        showSnackBar('Selected contact has no address');
        _inviteSending = false;
        setState(() {});
        return;
      }
      // Require Orchard-capable receiver (bit 4)
      final receivers = WarpApi.receiversOfAddress(aa.coin, address);
      final hasOrchard = (receivers & 4) != 0;
      if (!hasOrchard) {
        showSnackBar('Contact address is not Orchard-capable');
        _inviteSending = false;
        setState(() {});
        return;
      }

      // Get per-contact reply_to_ua from Contact Info (do not auto-generate here)
      String rtKey = 'contact_rt_' + contact.id.toString();
      String cidKey = 'contact_cid_' + contact.id.toString();
      String replyToUA = '';
      try { replyToUA = WarpApi.getProperty(aa.coin, rtKey); } catch (_) {}
      if (replyToUA.isEmpty) {
        showSnackBar('Reply-to address not set for this contact. Open Contact Info to set it.');
        _inviteSending = false;
        setState(() {});
        return;
      }

      // Get or create conversation_id
      String cid = '';
      try { cid = WarpApi.getProperty(aa.coin, cidKey); } catch (_) {}
      if (cid.isEmpty) {
        cid = _generateConversationId();
        try { WarpApi.setProperty(aa.coin, cidKey, cid); } catch (_) {}
      }
      // Persist inviter-side metadata so accept processing can resolve placeholder contact
      try { WarpApi.setProperty(aa.coin, 'cid_inviter_contact_id_' + cid, contact.id.toString()); } catch (_) {}
      try {
        final inviteContactName = (contact.name ?? '').trim();
        if (inviteContactName.isNotEmpty) {
          // Preserve original placeholder name for deletion later
          WarpApi.setProperty(aa.coin, 'cid_invite_name_' + cid, inviteContactName);
          // Also use it as current cid title until accept arrives
          WarpApi.setProperty(aa.coin, 'cid_name_' + cid, inviteContactName);
        }
      } catch (_) {}

      // Build verbose header line (include my display name)
      String fn = '';
      String ln = '';
      try { fn = WarpApi.getProperty(aa.coin, 'my_first_name').trim(); } catch (_) {}
      try { ln = WarpApi.getProperty(aa.coin, 'my_last_name').trim(); } catch (_) {}
      // Derive target contact fields from stored contact name and address
      final targetNameCombined = (contact.name ?? '').trim();
      String targetFirst = '';
      String targetLast = '';
      if (targetNameCombined.isNotEmpty) {
        final sp = targetNameCombined.split(RegExp(r"\s+"));
        targetFirst = sp.isNotEmpty ? sp.first : '';
        targetLast = sp.length > 1 ? sp.sublist(1).join(' ') : '';
      }
      targetFirst = targetFirst.replaceAll(';', ' ').trim();
      targetLast = targetLast.replaceAll(';', ' ').trim();

      final header = 'v1; type=invite; conversation_id=' + cid + '; seq=1; reply_to_ua=' + replyToUA +
          (fn.isNotEmpty ? '; first_name=' + fn : '') + (ln.isNotEmpty ? '; last_name=' + ln : '') +
          '; target_first_name=' + targetFirst +
          '; target_last_name=' + targetLast +
          '; target_address=' + address;
      final memo = header + '\n\n';

      // Optimistic message in thread (pending)
      final pending = ZMessage(
        -1,
        0,
        false,
        '',
        address,
        address,
        'Sending…',
        memo,
        DateTime.now(),
        aa.height,
        true,
      );
      try {
        aa.messages.items = List<ZMessage>.from(aa.messages.items)..add(pending);
        _pendingJustAdded = true;
        // Keep a local echo to render even if DB refresh drops it temporarily
        _localEchoes.add(pending);
        // Push a global echo for the MESSAGES list union
        try { optimisticEchoes.add(pending); } catch (_) {}
      } catch (_) {}

      // Do NOT close the overlay; switch to in-place chat view
      setState(() {});

      // Prepare, sign, and broadcast minimal-amount memo tx inline
      final int recipientPools = 4; // Orchard only
      final builder = RecipientObjectBuilder(
        address: address,
        pools: recipientPools,
        amount: 1, // 1 zatoshi minimal to carry memo
        feeIncluded: false,
        replyTo: false,
        subject: '',
        memo: memo,
      );
      final recipient = Recipient(builder.toBytes());
      final plan = await WarpApi.prepareTx(
        aa.coin,
        aa.id,
        [recipient],
        7, // spend from any pool
        coinSettings.replyUa,
        appSettings.anchorOffset,
        coinSettings.feeT,
      );
      final signedTx = await WarpApi.signOnly(aa.coin, aa.id, plan);
      final _ = WarpApi.broadcast(aa.coin, signedTx);

      // Warning already shown non-blocking above

      // Mark as Sent and trigger a quick sync to replace with DB message
      try {
        final updated = aa.messages.items.toList();
        final idx = updated.lastIndexWhere((m) => identical(m, pending));
        if (idx >= 0) {
          final sent = ZMessage(
            pending.id,
            pending.txId,
            pending.incoming,
            pending.fromAddress,
            pending.sender,
            pending.recipient,
            'Sent',
            pending.body,
            pending.timestamp,
            pending.height,
            pending.read,
          );
          updated[idx] = sent;
          aa.messages.items = updated;
          // Update local echo to Sent as well
          try {
            final hi = _indexOfEchoByHeader(pending.body);
            if (hi >= 0) _localEchoes[hi] = sent;
          } catch (_) {}
          // Update global echo copy if present
          try {
            final key = _headerKey(pending.body);
            for (int i = optimisticEchoes.length - 1; i >= 0; i--) {
              if (_headerKey(optimisticEchoes[i].body) == key) {
                optimisticEchoes[i] = sent; break;
              }
            }
          } catch (_) {}
        }
      } catch (_) {}

      // Defer to background auto-sync; avoid immediate refresh that can drop optimistic bubble
      // try { triggerManualSync(); } catch (_) {}
      _inviteSending = false;
      setState(() {});
      _scrollToBottom();
    } catch (e) {
      showSnackBar('Failed to start chat request');
      _inviteSending = false;
      setState(() {});
    }
  }

  Map<String, String> _parseHeader(String body) {
    try {
      final firstLine = body.split('\n').first.trim();
      if (!firstLine.startsWith('v1;')) return const {};
      final parts = firstLine.split(';');
      final Map<String, String> m = {};
      for (final raw in parts) {
        final t = raw.trim();
        if (t.isEmpty) continue;
        final i = t.indexOf('=');
        if (i > 0) {
          final k = t.substring(0, i).trim();
          final v = t.substring(i + 1).trim();
          if (k.isNotEmpty) m[k] = v;
        }
      }
      return m;
    } catch (_) {
      return const {};
    }
  }

  bool _hasOutgoingAcceptForCid(String cid) {
    try {
      for (final m in aa.messages.items) {
        final mm = m;
        if (!mm.incoming) {
          final hdr = _parseHeader(mm.body);
          if ((hdr['type'] ?? '') == 'accept' && (hdr['conversation_id'] ?? '') == cid) return true;
        }
      }
    } catch (_) {}
    return false;
  }

  ({bool hasInvite, String? cid, int? inviteSeq, String? replyUA}) _pendingInviteFrom(ContactT c) {
    try {
      final addr = c.safeAddress;
      if (addr.isEmpty) return (hasInvite: false, cid: null, inviteSeq: null, replyUA: null);
      for (final m in aa.messages.items.reversed) {
        final mm = m;
        final from = mm.fromAddress ?? '';
        if (mm.incoming && from == addr) {
          final hdr = _parseHeader(mm.body ?? '');
          if ((hdr['type'] ?? '') == 'invite') {
            final cid = hdr['conversation_id'];
            if (cid != null && cid.isNotEmpty && !_hasOutgoingAcceptForCid(cid)) {
              int? seq;
              try { seq = int.parse(hdr['seq'] ?? '1'); } catch (_) { seq = 1; }
              final rtu = (hdr['reply_to_ua'] ?? '').trim();
              return (hasInvite: true, cid: cid, inviteSeq: seq, replyUA: rtu.isEmpty ? null : rtu);
            }
          }
        }
      }
    } catch (_) {}
    return (hasInvite: false, cid: null, inviteSeq: null, replyUA: null);
  }

  Future<void> _sendAccept(ContactT contact) async {
    try {
      // Require Display Name (first name) before accepting chat request
      if (!_hasDisplayName()) {
        final proceed = await _promptDisplayNameNeeded();
        if (proceed) _goToDisplayNamePrompt();
        return;
      }
      if (_acceptSending) return;
      final pending = _pendingInviteFrom(contact);
      if (!pending.hasInvite || pending.cid == null) {
        showSnackBar('No pending invite found');
        return;
      }
      // Require per-contact reply_to_ua (my UA for this peer)
      final rtKey = 'contact_rt_' + contact.id.toString();
      String replyToUA = '';
      try { replyToUA = WarpApi.getProperty(aa.coin, rtKey); } catch (_) {}
      if (replyToUA.isEmpty) {
        showSnackBar('Reply-to address not set for this contact. Open Contact Info to set it.');
        return;
      }

      _acceptSending = true;
      setState(() {});

      // Persist conversation id for this contact
      try { WarpApi.setProperty(aa.coin, 'contact_cid_' + contact.id.toString(), pending.cid!); } catch (_) {}
      // Destination must be inviter's reply_to_ua from the invite header
      final address = (pending.replyUA ?? '').trim();
      if (address.isEmpty) {
        showSnackBar('Invite is missing reply-to address');
        _acceptSending = false;
        setState(() {});
        return;
      }
      // Validate Orchard capability
      try {
        final rcv = WarpApi.receiversOfAddress(aa.coin, address);
        if ((rcv & 4) == 0) {
          showSnackBar('Invite reply-to address is not Orchard-capable');
          _acceptSending = false;
          setState(() {});
          return;
        }
      } catch (_) {
        showSnackBar('Invalid reply-to address in invite');
        _acceptSending = false;
        setState(() {});
        return;
      }

      final inReplyTo = pending.inviteSeq ?? 1;
      String fn = '';
      String ln = '';
      try { fn = WarpApi.getProperty(aa.coin, 'my_first_name').trim(); } catch (_) {}
      try { ln = WarpApi.getProperty(aa.coin, 'my_last_name').trim(); } catch (_) {}
      final header = 'v1; type=accept; conversation_id=' + pending.cid! + '; seq=2; in_reply_to_seq=' + inReplyTo.toString() + '; reply_to_ua=' + replyToUA +
          (fn.isNotEmpty ? '; first_name=' + fn : '') + (ln.isNotEmpty ? '; last_name=' + ln : '');
      final memo = header + '\n\n';

      // Optimistic message in thread (pending)
      final optimistic = ZMessage(
        -1,
        0,
        false,
        '',
        address,
        address,
        'Sending…',
        memo,
        DateTime.now(),
        aa.height,
        true,
      );
      try {
        aa.messages.items = List<ZMessage>.from(aa.messages.items)..add(optimistic);
      } catch (_) {}
      setState(() {});

      final int recipientPools = 4; // Orchard only
      final builder = RecipientObjectBuilder(
        address: address,
        pools: recipientPools,
        amount: 1,
        feeIncluded: false,
        replyTo: false,
        subject: '',
        memo: memo,
      );
      final recipient = Recipient(builder.toBytes());
      final plan = await WarpApi.prepareTx(
        aa.coin,
        aa.id,
        [recipient],
        7,
        coinSettings.replyUa,
        appSettings.anchorOffset,
        coinSettings.feeT,
      );
      final signedTx = await WarpApi.signOnly(aa.coin, aa.id, plan);
      final _ = WarpApi.broadcast(aa.coin, signedTx);
      // Persist my seq counter for this cid so subsequent messages start after accept
      try { WarpApi.setProperty(aa.coin, 'cid_my_seq_' + pending.cid!, '2'); } catch (_) {}

      try { triggerManualSync(); } catch (_) {}
      _acceptSending = false;
      setState(() {});
      _scrollToBottom();
    } catch (e) {
      showSnackBar('Failed to accept chat request');
      _acceptSending = false;
      setState(() {});
    }
  }

  bool _hasDisplayName() {
    try {
      final first = WarpApi.getProperty(aa.coin, 'my_first_name');
      return first.trim().isNotEmpty;
    } catch (_) {
      return false;
    }
  }

  void _goToDisplayNamePrompt() {
    try {
      GoRouter.of(context).push('/contacts_overlay/display_name');
    } catch (_) {}
  }

  Future<bool> _promptDisplayNameNeeded() async {
    try {
      bool confirmed = false;
      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (ctx) {
          return AlertDialog(
            title: const Text('Display Name Needed'),
            content: const Text('Please create a display name.'),
            actions: [
              TextButton(
                onPressed: () { confirmed = true; Navigator.of(ctx).pop(); },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
      return confirmed;
    } catch (_) {
      return true;
    }
  }

  Future<void> _maybeShowChatWarning() async {
    try {
      if (_chatWarnDismissed) return;
      try {
        final v = WarpApi.getProperty(aa.coin, 'chat_warn_dismissed');
        _chatWarnDismissed = (v == '1' || v.toLowerCase() == 'true');
        if (_chatWarnDismissed) return;
      } catch (_) {}

      bool dontShow = false;
      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (ctx) {
          bool localDontShow = false;
          return StatefulBuilder(
            builder: (ctx2, setStateDialog) {
              return AlertDialog(
                title: const Text('WARNING!'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Do not close Anino until your message has been successfully sent!'),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Checkbox(
                          value: localDontShow,
                          onChanged: (v) {
                            setStateDialog(() { localDontShow = v ?? false; });
                          },
                        ),
                        const Expanded(child: Text("Don't show again")),
                      ],
                    ),
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () {
                      dontShow = localDontShow;
                      Navigator.of(ctx2).pop();
                    },
                    child: const Text('OK'),
                  ),
                ],
              );
            },
          );
        },
      );
      if (dontShow) {
        try { WarpApi.setProperty(aa.coin, 'chat_warn_dismissed', '1'); } catch (_) {}
        _chatWarnDismissed = true;
      }
    } catch (_) {}
  }

  void _scrollToBottom([bool force = false]) {
    try {
      // Guard against repeated scheduling on every build
      if (_scrollPending) return;
      _scrollPending = true;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _scrollPending = false;
        if (!_threadController.hasClients) return;
        if (force || _isNearBottom()) {
          _threadController.animateTo(
            _threadController.position.maxScrollExtent, // compose thread is not reversed
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOut,
          );
        }
      });
    } catch (_) {}
  }
  bool _scrollPending = false;

  bool _isNearBottom() {
    try {
      if (!_threadController.hasClients) return true;
      final position = _threadController.position;
      final double delta = position.maxScrollExtent - position.pixels;
      return delta <= _jumpThresholdPx;
    } catch (_) {
      return true;
    }
  }

  void _onThreadScroll() {
    try {
      final bool near = _isNearBottom();
      if (near) {
        if (_showJumpToLatest || _newSinceAway != 0) {
          setState(() {
            _showJumpToLatest = false;
            _newSinceAway = 0;
          });
        }
      } else {
        if (!_showJumpToLatest) {
          setState(() {
            _showJumpToLatest = true;
          });
        }
      }
    } catch (_) {}
  }

  @override
  void initState() {
    super.initState();
    _threadController.addListener(_onThreadScroll);
    // Auto-focus the To: input when the panel opens
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _toFocus.requestFocus();
    });
    // Ensure contacts are loaded for suggestions
    try { contacts.fetchContacts(); } catch (_) {}
    // Load persistent warning preference
    try {
      final v = WarpApi.getProperty(aa.coin, 'chat_warn_dismissed');
      _chatWarnDismissed = (v == '1' || v.toLowerCase() == 'true');
    } catch (_) {}
  }

  @override
  void dispose() {
    _toController.dispose();
    _toFocus.dispose();
    _messageController.dispose();
    _messageFocus.dispose();
    try { _threadController.dispose(); } catch (_) {}
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    final bool isWide = size.width >= 800;
    final double panelWidth = isWide ? 420.0 : size.width;
    final double kb = context.keyboardInset;

    final Color bg = theme.colorScheme.surface;
    final Color onBg = theme.colorScheme.onSurface;

    // Title styles
    final TextStyle? messagesTitleStyle = theme.appBarTheme.titleTextStyle ??
        theme.textTheme.titleLarge ??
        theme.textTheme.titleMedium ??
        theme.textTheme.bodyMedium;
    final TextStyle? reducedTitleStyle = (messagesTitleStyle?.fontSize != null)
        ? messagesTitleStyle!.copyWith(fontSize: messagesTitleStyle.fontSize! * 0.75)
        : messagesTitleStyle;

    final contact = _resolveSelectedContact();
    // Default to "new" when no contact is selected, so we don't show
    // the pending TextField placeholder on the NEW MESSAGE screen.
    bool isNewConversation = true;
    if (contact != null) {
      try {
        final cid = WarpApi.getProperty(aa.coin, 'contact_cid_' + contact.id.toString());
        if (cid.isEmpty) {
          isNewConversation = true;
        } else {
          bool hasAnyThread = false;
          try {
            for (final m in aa.messages.items) {
              final body = (m as dynamic).body as String?;
              final hdr = _parseHeader(body ?? '');
              if ((hdr['conversation_id'] ?? '') == cid) { hasAnyThread = true; break; }
            }
          } catch (_) {}
          // Treat as new if we have a stored cid but no messages for it
          isNewConversation = !hasAnyThread;
        }
      } catch (_) {
        isNewConversation = true;
      }
    }
    final bool inChatMode = contact != null && (!isNewConversation || _inviteSending);
    final bool isAccepted = contact != null ? _isChatAccepted(contact!) : false;

    final Widget header = SizedBox(
      height: 56,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Left back arrow in chat mode
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.only(left: 4),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 150),
                switchInCurve: Curves.easeOut,
                switchOutCurve: Curves.easeIn,
                child: inChatMode
                    ? IconButton(
                        key: const ValueKey('back-chat'),
                        tooltip: 'Back',
                        icon: const Icon(Icons.arrow_back),
                        onPressed: () => GoRouter.of(context).pop(),
                      )
                    : const SizedBox(width: 48, height: 48, key: ValueKey('back-empty')),
              ),
            ),
          ),
          // Centered title, matching Messages
          Align(
            alignment: Alignment.center,
            child: Text(
              inChatMode
                  ? ((contact?.safeName.isNotEmpty ?? false)
                      ? contact!.safeName
                      : (contact?.safeAddress.isNotEmpty ?? false)
                          ? centerTrim(contact!.safeAddress, leading: 6, length: 20)
                          : 'CHAT')
                  : 'NEW MESSAGE',
              style: reducedTitleStyle,
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          // Top-right Cancel, same style as title
          Align(
            alignment: Alignment.centerRight,
            child: Padding(
              padding: const EdgeInsets.only(right: 8),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 150),
                switchInCurve: Curves.easeOut,
                switchOutCurve: Curves.easeIn,
                child: inChatMode
                    ? const SizedBox(key: ValueKey('cancel-empty'))
                    : TextButton(
                        key: const ValueKey('cancel-visible'),
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all(Colors.transparent),
                          overlayColor: MaterialStateProperty.resolveWith((states) {
                            if (states.contains(MaterialState.pressed)) {
                              return onBg.withOpacity(0.14);
                            }
                            if (states.contains(MaterialState.hovered) || states.contains(MaterialState.focused)) {
                              return onBg.withOpacity(0.10);
                            }
                            return Colors.transparent;
                          }),
                          foregroundColor: MaterialStateProperty.all(reducedTitleStyle?.color),
                        ),
                        onPressed: () => GoRouter.of(context).pop(),
                        child: Text('Cancel', style: reducedTitleStyle),
                      ),
              ),
            ),
          ),
        ],
      ),
    );

    final Widget toRow = Padding(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // "To:" label styled like the Messages title
          Text('To:', style: reducedTitleStyle),
          const Gap(8),
          // Recipient field styled exactly like the Messages search box
          Expanded(
            child: Builder(builder: (context) {
              const Color searchFill = Color(0xFF2E2C2C);
              final Color onSurf = theme.colorScheme.onSurface;
              return TextField(
                controller: _toController,
                focusNode: _toFocus,
                autofocus: false,
                textInputAction: TextInputAction.search,
                cursorColor: onSurf,
                decoration: InputDecoration(
                  hintText: 'Recipient name',
                  suffixIcon: _toController.text.isEmpty
                      ? null
                      : IconButton(
                          icon: Icon(Icons.close, color: onSurf.withOpacity(0.85)),
                          onPressed: () {
                            _toController.clear();
                            setState(() { _selectedContactId = null; });
                            _toFocus.requestFocus();
                          },
                        ),
                  filled: true,
                  fillColor: searchFill,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
                  enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
                  focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
                ),
                style: (theme.textTheme.bodyMedium ?? const TextStyle()).copyWith(color: onSurf),
                onChanged: (_) => setState(() { _selectedContactId = null; }),
              );
            }),
          ),
          const Gap(8),
          // White outlined plus-in-circle icon (no fill)
          IconButton(
            onPressed: () async {
              try {
                final picked = await GoRouter.of(context).push('/contacts_overlay/pick');
                if (picked is Contact) {
                  final t = picked.unpack();
                  setState(() {
                    _selectedContactId = t.id;
                    _toController.text = t.safeName;
                  });
                  _messageFocus.requestFocus();
                }
              } catch (_) {}
            },
            tooltip: 'Add recipient',
            icon: const Icon(Icons.add_circle_outline, color: Colors.white),
          ),
        ],
      ),
    );

    final Widget suggestions = _buildSuggestions(theme);
    final Widget inputBar = _buildBottomInput(theme, isNewConversation, contact);

    final Widget panel = Material(
      color: bg,
      elevation: 8,
      child: SafeArea(
        child: Stack(
          children: [
            Column(
              mainAxisSize: MainAxisSize.max,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                header,
                if (!inChatMode) toRow,
                if (!inChatMode) suggestions,
                const Divider(height: 1),
                Expanded(
                  child: inChatMode && contact != null
                      ? _buildThread(theme, contact)
                      : const SizedBox.shrink(),
                ),
                _buildBottomInput(theme, isNewConversation, contact, isAccepted),
              ],
            ),
            // Jump-to-latest chevron overlay
            Positioned(
              right: 16,
              bottom: kb + 88,
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 180),
                switchInCurve: Curves.easeOut,
                switchOutCurve: Curves.easeIn,
                child: (inChatMode && _showJumpToLatest)
                    ? Stack(
                        clipBehavior: Clip.none,
                        children: [
                          _buildJumpToLatestButton(theme),
                          if (_outgoingSinceAway > 0)
                            Positioned(
                              top: -2,
                              right: -2,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF4B728),
                                  borderRadius: BorderRadius.circular(10),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.9),
                                      blurRadius: 6,
                                      offset: const Offset(0, 0),
                                    ),
                                  ],
                                ),
                                child: Text(
                                  _outgoingSinceAway > 99 ? '99+' : _outgoingSinceAway.toString(),
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                            ),
                        ],
                      )
                    : const SizedBox.shrink(),
              ),
            ),
          ],
        ),
      ),
    );

    return Stack(
      fit: StackFit.expand,
      children: [
        // Scrim
        if (!inChatMode)
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () {
              if (!inChatMode) {
                try { GoRouter.of(context).pop(); } catch (_) {}
              }
            },
            child: Container(color: Colors.black.withOpacity(0.45)),
          ),
        // Slide-in panel aligned to the right
        Align(
          alignment: Alignment.centerRight,
          child: ConstrainedBox(
            constraints: BoxConstraints.tightFor(width: panelWidth, height: size.height),
            child: panel,
          ),
        ),
        if (_debugPaintBanner)
          Positioned(
            top: 6,
            left: 6,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.red.withOpacity(0.25),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('PAINT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
            ),
          ),
      ],
    );
  }

  bool _isChatAccepted(ContactT contact) {
    try {
      // Accepted if there exists any memo with header type=accept for this conversation_id
      String cid = '';
      try { cid = WarpApi.getProperty(aa.coin, 'contact_cid_' + contact.id.toString()); } catch (_) {}
      if (cid.isEmpty) return false;
      for (final m in aa.messages.items) {
        try {
          final body = (m as dynamic).body as String?;
          if (body == null) continue;
          final hdr = _parseHeader(body);
          if ((hdr['conversation_id'] ?? '') == cid && (hdr['type'] ?? '') == 'accept') return true;
        } catch (_) {}
      }
    } catch (_) {}
    return false;
  }
}

extension on ContactT {
  String get safeName => (name ?? '').trim();
  String get safeAddress => (address ?? '').trim();
}

extension _StringMatch on String {
  bool containsCi(String q) => toLowerCase().contains(q.toLowerCase());
}

extension _LetExt<T> on T {
  R let<R>(R Function(T it) fn) => fn(this);
}

extension _ClampInt on int {
  int clampInt(int min, int max) => this < min ? min : (this > max ? max : this);
}

extension _BoolX on bool {
  bool get not => !this;
}

extension _MediaQueryInsets on BuildContext {
  double get keyboardInset => MediaQuery.of(this).viewInsets.bottom;
}

extension _ThemeX on ThemeData {
  Color get onSurfaceFaded => colorScheme.onSurface.withOpacity(0.7);
}

extension _ComposeUI on _ComposeMessagePanelState {
  Widget _buildThread(ThemeData theme, ContactT contact) {
    // Build union(DB, localEchoes) and de-dupe by header line if present
    final List<ZMessage> unionList = () {
      try {
        final db = aa.messages.items;
        final Map<String, ZMessage> byKey = {};
        for (final m in db) {
          final key = _headerKey((m as dynamic).body as String?);
          if (key != null) byKey[key] = m;
        }
        for (final e in _localEchoes) {
          final key = _headerKey(e.body);
          if (key == null) continue;
          // Prefer DB copy if already present, else keep echo
          byKey.putIfAbsent(key, () => e);
        }
        final list = db.toList();
        // Append echoes that are not yet in DB
        for (final e in _localEchoes) {
          final key = _headerKey(e.body);
          if (key != null && !list.any((m) => _headerKey((m as dynamic).body as String?) == key)) {
            list.add(e);
          }
        }
        return list;
      } catch (_) {
        return aa.messages.items;
      }
    }();
    // 1) Primary: match by contact address against sender/recipient variants
    List<ZMessage> messages = unionList.where((m) {
      try {
        final from = (m as dynamic).fromAddress as String?;
        final to = (m as dynamic).recipient as String?;
        final addr = contact.safeAddress;
        return (from != null && from == addr) || (to != null && to == addr);
      } catch (_) {
        try {
          final from2 = (m as dynamic).from as String?;
          final to2 = (m as dynamic).to as String?;
          final addr = contact.safeAddress;
          return (from2 != null && from2 == addr) || (to2 != null && to2 == addr);
        } catch (_) {
          return false;
        }
      }
    }).toList(growable: false);

    // 2) Fallback: if empty, try conversation_id associated to this contact (when available)
    if (messages.isEmpty) {
      try {
        final cid = WarpApi.getProperty(aa.coin, 'contact_cid_' + contact.id.toString());
        if (cid.isNotEmpty) {
          messages = unionList.where((m) {
            try {
              final hdr = _parseHeader((m as dynamic).body as String? ?? '');
              return (hdr['conversation_id'] ?? '') == cid;
            } catch (_) {
              return false;
            }
          }).toList(growable: false);
        }
      } catch (_) {}
    }

    // 3) Last resort: if still empty, show recent messages so the panel isn't a blank screen
    if (messages.isEmpty) {
      try {
        messages = unionList.length <= 200
            ? unionList.toList(growable: false)
            : unionList.sublist(unionList.length - 200).toList(growable: false);
      } catch (_) {
        messages = unionList;
      }
    }

    // Auto-scroll when new items are added, but only if near bottom
    // Track outgoing counts to build a badge when scrolled away
    try {
      final int currentOutgoing = messages.where((mm) => !(((mm as dynamic).incoming as bool?) ?? false)).length;
      final bool near = _threadController.hasClients ? _isNearBottom() : true;
      if (near) {
        _outgoingSinceAway = 0;
        _newSinceAway = 0;
      } else {
        // Only increment outgoing counter when new outgoing bubbles arrive while away
        final int outDiff = (currentOutgoing - _lastOutgoingCount).clamp(0, 999);
        if (outDiff > 0) _outgoingSinceAway = (_outgoingSinceAway + outDiff).clamp(0, 999);
        // Maintain existing new-rows indicator behavior
        final int totalDiff = (messages.length - _lastThreadCount).clamp(0, 999);
        if (totalDiff > 0) _newSinceAway = (_newSinceAway + totalDiff).clamp(0, 999);
        if (outDiff > 0 || totalDiff > 0) {
          scheduleMicrotask(() {
            if (!mounted) return;
            setState(() { _showJumpToLatest = true; });
          });
        }
      }
      _lastOutgoingCount = currentOutgoing;
      _lastThreadCount = messages.length;
      if (near) {
        _scrollToBottom();
      }
    } catch (_) {}

    return Observer(builder: (_) {
      // Build a local list and feed AnimatedList-like insert via AnimatedSwitcher per item
      final list = messages;
      if (list.isEmpty) {
        return Center(
          child: Text(
            'No messages to display',
            style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.onSurface),
          ),
        );
      }
      return ListView.builder(
        controller: _threadController,
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 8),
        itemCount: list.length,
        itemBuilder: (context, index) {
          final m = list[index] as dynamic;
          final incoming = (m.incoming as bool?) ?? false;
          final body = (m.body as String?) ?? '';
          final statusText = body == 'Sending…' || body == 'Sent' || body == 'Failed' ? body : null;

          final bubbleCore = Container(
            decoration: BoxDecoration(
              color: incoming ? const Color(0xFF2E2C2C) : const Color(0xFFF4B728),
              borderRadius: BorderRadius.circular(16),
              boxShadow: incoming
                  ? []
                  : [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.94),
                        blurRadius: 5,
                        offset: const Offset(0, 2),
                      ),
                    ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (statusText != null)
                  Text(
                    statusText,
                    style: TextStyle(
                      color: incoming ? Colors.white70 : Colors.black87,
                      fontWeight: FontWeight.w600,
                    ),
                  )
                else
                  Text(
                    (m.body as String?) ?? '',
                    style: TextStyle(
                      color: incoming ? Colors.white : Colors.black,
                    ),
                  ),
              ],
            ),
          );

          final bool animateThis = !_debugNoAnimations && index == list.length - 1 && _isNearBottom();
          final Widget bubbleAnimated = animateThis
              ? TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0.0, end: 1.0),
                  duration: const Duration(milliseconds: 180),
                  curve: Curves.easeOutCubic,
                  onEnd: () { _pendingJustAdded = false; },
                  builder: (context, t, child) => Opacity(opacity: t, child: child),
                  child: bubbleCore,
                )
              : bubbleCore;

          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              mainAxisAlignment:
                  incoming ? MainAxisAlignment.start : MainAxisAlignment.end,
              children: [
                Flexible(child: bubbleAnimated),
              ],
            ),
          );
        },
      );
    });
  }

  Widget _buildJumpToLatestButton(ThemeData theme) {
    final Color fill = const Color(0xFFF4B728);
    return Semantics(
      button: true,
      label: 'Jump to latest',
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: fill,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.94),
                  blurRadius: 5,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Material(
              color: Colors.transparent,
              shape: const CircleBorder(),
              child: InkWell(
                customBorder: const CircleBorder(),
                onTap: () {
                  _scrollToBottom(true);
                  setState(() { _newSinceAway = 0; _outgoingSinceAway = 0; });
                },
                child: const Center(
                  child: Icon(Icons.keyboard_arrow_down_rounded, color: Colors.black, size: 26),
                ),
              ),
            ),
          ),
          if (_newSinceAway > 0)
            Positioned(
              top: -2,
              right: -2,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFFF4B728),
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.9),
                      blurRadius: 6,
                      offset: const Offset(0, 0),
                    ),
                  ],
                ),
                child: Text(
                  _newSinceAway > 99 ? '99+' : _newSinceAway.toString(),
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  // Extract a stable key from the first header line
  String? _headerKey(String? body) {
    try {
      if (body == null) return null;
      final first = body.split('\n').first.trim();
      if (!first.startsWith('v1;')) return null;
      return first; // full header line is sufficient to de-dupe
    } catch (_) {
      return null;
    }
  }

  int _indexOfEchoByHeader(String body) {
    final key = _headerKey(body);
    if (key == null) return -1;
    for (int i = 0; i < _localEchoes.length; i++) {
      if (_headerKey(_localEchoes[i].body) == key) return i;
    }
    return -1;
  }
  Widget _buildSuggestions(ThemeData theme) {
    if (_selectedContactId != null) return const SizedBox.shrink();
    final q = _toController.text.trim();
    if (q.isEmpty) return const SizedBox.shrink();
    final all = contacts.contacts;
    final query = q.toLowerCase();
    final List<Contact> matches = all.where((c) {
      final t = c.unpack();
      final name = (t.name ?? '').toLowerCase();
      final addr = (t.address ?? '').toLowerCase();
      return name.contains(query) || addr.contains(query);
    }).take(12).toList(growable: false);
    if (matches.isEmpty) return const SizedBox.shrink();

    final Color divider = theme.dividerColor.withOpacity(0.10);
    return Container(
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: divider)),
      ),
      constraints: const BoxConstraints(maxHeight: 220),
      child: ListView.separated(
        shrinkWrap: true,
        itemCount: matches.length,
        separatorBuilder: (_, __) => Divider(height: 1),
        itemBuilder: (context, index) {
          final t = matches[index].unpack();
          return ListTile(
            dense: false,
            title: Text(t.safeName.isEmpty ? '(Unnamed)' : t.safeName),
            subtitle: t.safeAddress.isEmpty ? null : Text(t.safeAddress, maxLines: 1, overflow: TextOverflow.ellipsis),
            onTap: () {
              setState(() {
                _selectedContactId = t.id;
                _toController.text = t.safeName;
              });
              _messageFocus.requestFocus();
            },
          );
        },
      ),
    );
  }

  Widget _buildBottomInput(ThemeData theme, bool isNewConversation, ContactT? contact, [bool isAccepted = false]) {
    final Color onSurf = theme.colorScheme.onSurface;
    const Color bubbleFill = Color(0xFF2E2C2C);
    final double kb = context.keyboardInset;
    final bool baseCanSend = _toController.text.trim().isNotEmpty && _messageController.text.trim().isNotEmpty;
    final bool showSendCircle = baseCanSend && !isNewConversation && isAccepted;
    return AnimatedPadding(
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOut,
      padding: EdgeInsets.only(bottom: kb),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Grey plus circle (left of the message input)
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF565656),
              ),
              child: Material(
                color: Colors.transparent,
                shape: const CircleBorder(),
                child: InkWell(
                  customBorder: const CircleBorder(),
                  onTap: () {
                    // Reserved for future: attachments, actions, etc.
                  },
                  child: const Center(
                    child: Icon(Icons.add, color: Colors.white, size: 20),
                  ),
                ),
              ),
            ),
            const Gap(8),
            Expanded(
              child: contact == null
                  // No recipient selected yet: allow typing normally
                  ? TextField(
                      controller: _messageController,
                      focusNode: _messageFocus,
                      enabled: true,
                      minLines: 1,
                      maxLines: 5,
                      keyboardType: TextInputType.multiline,
                      textInputAction: TextInputAction.newline,
                      cursorColor: onSurf,
                      decoration: InputDecoration(
                        hintText: 'Type a message',
                        filled: true,
                        fillColor: bubbleFill,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                      ),
                      style: (theme.textTheme.bodyMedium ?? const TextStyle()).copyWith(color: onSurf),
                      onChanged: (_) => setState(() {}),
                    )
                  : (() {
                      final pending = _pendingInviteFrom(contact);
                      // In New Message panel, do not offer Accept; only allow sending invite if new
                      if (isNewConversation) {
                        return _InviteButton(
                          label: 'Send chat request',
                          onTap: () => _sendInvite(contact),
                        );
                      }
                      return null;
                    })() ??
                      // Recipient selected, request exists: pending until accepted
                      TextField(
                          controller: _messageController,
                          focusNode: _messageFocus,
                          enabled: isAccepted,
                          minLines: 1,
                          maxLines: 5,
                          keyboardType: TextInputType.multiline,
                          textInputAction: TextInputAction.newline,
                          cursorColor: onSurf,
                          decoration: InputDecoration(
                            hintText: isAccepted ? 'Type a message' : 'Chat request pending',
                            filled: true,
                            fillColor: bubbleFill,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                          ),
                          style: (theme.textTheme.bodyMedium ?? const TextStyle()).copyWith(color: onSurf.withOpacity(isAccepted ? 1.0 : 0.6)),
                          onChanged: (_) => setState(() {}),
                        ),
            ),
            const Gap(8),
            // Send circle fades in only when both recipient and message are filled
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 200),
              switchInCurve: Curves.easeOut,
              switchOutCurve: Curves.easeIn,
              transitionBuilder: (child, anim) => FadeTransition(opacity: anim, child: child),
              child: showSendCircle
                  ? Container(
                      key: const ValueKey('send-visible'),
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: const Color(0xFFF4B728),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.94),
                            blurRadius: 5,
                            offset: const Offset(0, 2),
                            spreadRadius: 0,
                          ),
                        ],
                      ),
                      child: Material(
                        color: Colors.transparent,
                        shape: const CircleBorder(),
                        child: InkWell(
                          customBorder: const CircleBorder(),
                          onTap: _onSend,
                          child: const Center(
                            child: Icon(Icons.arrow_upward, color: Colors.black, size: 20),
                          ),
                        ),
                      ),
                    )
                  : const SizedBox(key: ValueKey('send-hidden'), width: 40, height: 40),
            ),
          ],
        ),
      ),
    );
  }

  void _onSend() {
    final text = _messageController.text.trim();
    if (text.isEmpty) return;
    // For now, just clear the field; sending is wired elsewhere.
    _messageController.clear();
    _messageFocus.requestFocus();

    // Compose view is not reversed; preserve position if not near bottom
    final bool wasNearBottom = _isNearBottom();
    double preserveOffset = 0.0;
    try {
      if (_threadController.hasClients) {
        final pos = _threadController.position;
        preserveOffset = (pos.maxScrollExtent - pos.pixels);
      }
    } catch (_) {}
  }
}

class _InviteButton extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;
  const _InviteButton({required this.label, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      decoration: BoxDecoration(
        color: const Color(0xFFF4B728),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.94),
            blurRadius: 5,
            offset: const Offset(0, 2),
            spreadRadius: 0,
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: onTap,
          child: Center(
            child: Text(
              label,
              style: const TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ),
    );
  }
}


