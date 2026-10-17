<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Team_Sponsor_Onboarding_Kit.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Team and sponsor onboarding kit

This guide is for Zcash teams and sponsors considering a small, clearly scoped contribution through [ZEC Bounties](https://bounties.zechub.wiki/). It explains the current team workflow; it is not a sponsorship offer, grant, escrow agreement, or promise that a bounty will be funded or paid automatically.

Platform behavior can change. Before sending a material amount, check the live [Teams](https://bounties.zechub.wiki/docs/teams), [Creators](https://bounties.zechub.wiki/docs/creators), [Bounty amounts](https://bounties.zechub.wiki/docs/bounty-amounts), [Addresses](https://bounties.zechub.wiki/docs/addresses), and [FAQ](https://bounties.zechub.wiki/docs/faq) pages.

## Quick start for a team

### 1. Sign in and create a team

1. Sign in to [ZEC Bounties](https://bounties.zechub.wiki/) and choose **Team** during onboarding if you will post and manage work for a group. On ordinary accounts, the initial role choice is not self-service afterward. If you selected the wrong role, contact platform support; do not create a second account to work around it.
2. Open [Teams](https://bounties.zechub.wiki/teams) and create a team. The form requires a team name, X/Twitter link, and Discord link; a description and additional links can also be added.
3. Invite team members and assign access deliberately:
   - **OWNER:** full team control, including team wallet management and deleting the team.
   - **ADMIN:** can manage team settings, members, and team bounties.
   - **MEMBER:** can participate but cannot manage team settings or the wallet.
4. Team verification is separate from account and team creation. **Three different platform admins must verify the team before it can post team bounties.** Team OWNER or ADMIN status does not grant platform-admin privileges. Ask through the platform's support/community channels how to request verification.

### 2. Set up and fund the team wallet

A team wallet is needed to pay team bounties from the team. It is separate from a member's personal payout address. The team wallet is operated through the platform's configured Zcash wallet service; it is not a separate escrow account.

1. In the team console, an OWNER or ADMIN can open the wallet controls and create a new wallet. Select **Mainnet** for real ZEC payments. The team can also import a wallet, but do not import a personal or high-balance wallet.
2. Before funding the wallet, understand the wallet service's hosting, access, backup, and recovery arrangements. If those arrangements are unclear or unsuitable for your sponsor's requirements, pause and ask platform maintainers before depositing funds. Start with a small test deposit.
3. Use the address shown in the team's wallet controls. Confirm that the wallet is on **Mainnet**, verify the address carefully, and check that the deposit appears in the wallet before relying on the balance for a bounty. Do not send funds to a team member's personal payout address by mistake.
4. Keep an internal record of the sponsor, approved amount, intended bounties, and the person responsible for reviewing and paying them. Do not promise that listing a bounty reserves funds or guarantees a payout.

**Recovery phrases:** Never send a seed phrase or spending key to a maintainer or another person. The wallet UI offers an import flow that submits a 24-word phrase to initialize the wallet and says the phrase is not stored. Only use that flow if your team accepts the trust involved; prefer creating a dedicated team wallet, and never import a personal wallet containing funds you do not intend to manage through the platform. Keep any recovery information under the team's secure custody process.

Team-wallet creation, replacement, and import are consequential operations. Replacing a wallet can remove the existing wallet and its transaction data. Confirm the selected team and wallet before making changes.

### 3. Scope and post a bounty

Post from the verified team's console. The team bounty form requires a title, category, ZEC reward, deadline, and description. Team bounties created through the current team workflow are marked approved on creation; verification is still required, and a team's privacy setting can affect who sees its bounties. After posting, confirm the bounty appears with the intended visibility and details.

Write one task that a contributor can start and a reviewer can judge. Include:

- **Problem and audience:** what needs doing and who benefits.
- **Deliverables:** for example, a pull request, reviewed guide, tested report, or editable design source.
- **Acceptance criteria:** observable checks that define complete work.
- **Scope and exclusions:** what is included and what is not.
- **Reviewer and contact:** who answers questions and reviews the submission.
- **Deadline:** the form records a date, not a time of day. Put any time and time zone expectations in the description.
- **Reward:** the agreed amount in ZEC and, optionally, the USD planning target and date used to convert it.

The form takes a **ZEC** amount, not USD. Use the current [Bounty amounts](https://bounties.zechub.wiki/docs/bounty-amounts) intervals as planning guidance:

| Interval | Suggested USD planning range | Example fit |
| --- | --- | --- |
| XS | $15–$25 | Small copy edit or broken-link fix |
| S | $25–$50 | Short guide or translation |
| M | $50–$120 | Substantial guide, tutorial, or medium application change |
| L | $120–$250 | Multi-file feature, wallet/tooling task, or longer research |
| XL | $250–$400 | Large approved PR or multi-day engineering task |

Pick a target within the appropriate interval, then divide by a current public ZEC/USD spot price and enter the result in ZEC. The live team form accepts decimal amounts; the guide recommends rounding to four decimal places. USD is only a planning reference: the bounty and payout are denominated in ZEC. Recheck the conversion if the rate moves at least 20%, more than seven days pass, or payment is about to run. Do not reduce or otherwise change an agreed reward after assignment without discussing and agreeing it with the contributor.

Keep the first bounty narrow. A sponsor should approve its scope, reward, and funding before it is posted; do not post exploratory work as if a budget or sponsor has already been secured.

### 4. Review work and pay the contributor

1. Contributors apply or are assigned through the platform, then submit their work for review. Compare the submission with the bounty's published acceptance criteria. A deadline passing is not evidence that the work is complete.
2. If changes are needed, explain what is missing and give the contributor a chance to address it. Record the review and mark the work complete only when it meets the agreed criteria.
3. Before paying, confirm the team wallet has enough available ZEC on the same chain as the bounty. For Mainnet payouts, the contributor needs a valid Unified Address (UA) with at least one shielded receiver; transparent-only addresses are not accepted.
4. An OWNER or ADMIN can use the team's payment controls for eligible completed bounties. **Authorizing a team-wallet payment sends the payment; it is not just a request for a later platform-admin approval.** Confirm the selected bounties, total, chain, and recipient details before confirming.
5. Check the payment result and transaction history. If the wallet reports an unknown outcome or times out, **do not retry immediately**: the send may have succeeded. Check the team's wallet history and payment records, then contact platform support if the result remains unclear.

Payouts go to the contributor's registered UA, not to the team's address. The platform records payment status and transaction information, but a transaction ID does not reveal all details of a shielded transaction. See [Addresses](https://bounties.zechub.wiki/docs/addresses) and [Privacy & payments](https://bounties.zechub.wiki/docs/privacy-payments).

## Ready-to-adapt bounty templates

These templates are starting points, not approved scopes or guaranteed budgets. Replace every bracketed field, choose an interval from the live [Bounty amounts](https://bounties.zechub.wiki/docs/bounty-amounts) guidance, and enter the final reward in ZEC.

### Documentation

**Suggested planning interval:** S ($25–$50) for a short page or M ($50–$120) for substantial work.

**Title:** Improve the [topic] guide for [audience]

**Description:**

Our [users/developers] need help with [specific problem]. Update or create [page or section] at [repository or docs URL] so [audience] can [specific outcome].

**Deliverables**

- A pull request or published document at [location].
- Any commands, screenshots, or references needed to verify the instructions.
- A short note identifying sources checked and unresolved questions.

**Acceptance criteria**

- The work covers [specific requirements] and excludes [out-of-scope items].
- A reviewer can verify the steps or claims using the supplied references.
- The deliverable follows [project style or documentation requirements].

- **Deadline:** [date; include time and time zone in the description if needed]
- **Reward:** [ZEC amount] (optional USD planning target: [$ amount], spot checked [date])
- **Reviewer/questions:** [name or team role and contact channel]
### Development

**Suggested planning interval:** M ($50–$120) for a contained change or L ($120–$250) for multi-file work. Use XL only for a task that genuinely fits its current range; work above the published XL range needs separate maintainer agreement.

**Title:** Implement [one specific improvement] in [project]

**Description:**

Implement [specific behavior] in [repository] to address [user problem]. Keep the bounty limited to this change; [larger follow-up] is out of scope unless agreed before work begins.

**Deliverables**

- A pull request against [repository and target branch].
- Tests covering the changed behavior.
- Brief usage or setup notes if the change affects users or contributors.

**Acceptance criteria**

- [State expected behavior in a testable sentence.]
- [Name relevant tests/checks and expected result.]
- The change does not include [explicit exclusions].
- The reviewer can evaluate the result against the criteria above; merging follows the project's normal review and release process.

- **Deadline:** [date; include time and time zone in the description if needed]
- **Reward:** [ZEC amount] (optional USD planning target: [$ amount], spot checked [date])
- **Reviewer/questions:** [name or team role and contact channel]

### Design

**Suggested planning interval:** S ($25–$50) for a small asset or M ($50–$120) for a larger, multi-state deliverable.

**Title:** Design [asset or screen] for [product or campaign]

**Description:**

Create [specific asset/screen] for [audience, channel, and purpose]. Use [brand guide or references] and account for [accessibility, privacy, small-screen, or other constraints].

**Deliverables**

- Editable source file in [Figma, SVG, or other agreed format].
- Exports in [formats and dimensions].
- A note identifying fonts, image assets, and any licensing or attribution requirements.

**Acceptance criteria**

- The design includes [required screens, states, or sizes].
- Text and controls are legible at [target size] and meet [specified contrast/accessibility requirement].
- The source file is editable and the required assets can be reused by [team].

- **Deadline:** [date; include time and time zone in the description if needed]
- **Reward:** [ZEC amount] (optional USD planning target: [$ amount], spot checked [date])
- **Reviewer/questions:** [name or team role and contact channel]
