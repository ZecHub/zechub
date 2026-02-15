# ZEC Bounties × GitHub – Clarified Answers

This document provides clear, opinionated clarifications on how ZEC Bounties currently integrates with GitHub, and the design rationale behind these decisions.

---

## 1. How does ZEC Bounties interact with GitHub?

**GitHub is used strictly for authentication (login) purposes.**

- GitHub OAuth is used to enable **passwordless authentication**
- ZEC Bounties does not read from, write to, or manage any GitHub repositories
- No GitHub permissions are requested beyond basic identity information

### Rationale for Using GitHub

- The majority of technical contributors already maintain GitHub accounts
- Some bounties will, by nature, require:
  - Forking repositories
  - Making commits
  - Submitting pull requests
- Adopting GitHub early avoids identity fragmentation and redundant onboarding flows later

At present, GitHub functions solely as an identity provider.

---

## 2. Can we allow public read-only access?

**Short answer:** Yes — and after further evaluation, this is a reasonable enhancement.

The platform was initially designed with **authenticated access only**, based on the following assumptions:

- Users must be authenticated to apply for bounties
- Read-only users cannot submit work or claim rewards

Under this model, public access was not considered essential.

However, upon further consideration, enabling **public read-only access** provides additional value **without altering participation requirements**.

### Benefits of Public Read-Only Access

- **Transparency:** Allows the public to understand what ZEC Bounties is about
- **Discovery:** Enables prospective contributors to explore the platform before committing to signup
- **Trust:** Allows reviewers and community members to observe activity without friction
- **Onboarding clarity:** Users gain context and expectations prior to authentication

### What Remains Unchanged

- Applying for bounties still requires authentication
- Submissions and reward claims remain gated
- No additional permissions or access rights are introduced

This represents a refinement of visibility, not a change in access control philosophy.

---

## 3. How do we handle contributors who cannot use GitHub?

GitHub usage is **mandatory**.

ZEC Bounties is designed primarily for **technical and semi-technical contributions**, where:

- Repository interaction is common
- Version control is a foundational tool
- Collaboration often occurs through GitHub-based workflows

Even contributors engaged in non-code tasks may eventually need GitHub access when working alongside developers.

Accordingly, GitHub is treated as:

> **A baseline tool requirement, not an exclusionary barrier**

This approach avoids:

- Fragmented submission mechanisms
- Manual or inconsistent verification processes
- Long-term workflow divergence

---

## 4. Is GitHub only used for authentication?

**Yes — at present.**

Current scope:

- GitHub is used exclusively for passwordless login
- No pull request tracking
- No repository synchronization
- No automated work verification

### Future Authentication Extensions

GitHub currently serves as the sole authentication provider due to its ubiquity and alignment with expected contributor workflows.

Additional authentication providers (e.g., X/Twitter or Discord) **may be considered in the future if—and only if—they become a demonstrated necessity**. Any such addition would be evaluated against:

- Clear and sustained user demand
- Measurable improvements to onboarding or accessibility
- No compromise to platform security or architectural simplicity

Until such criteria are met, authentication will remain intentionally limited to GitHub.

---

## Final Positioning (Summary)

- GitHub is used **only for authentication**
- GitHub authentication is **mandatory**
- Public read-only access is **being considered**
- No GitHub repository access is required or requested
- Additional authentication providers may be added if justified

This design keeps ZEC Bounties:

- Focused
- Secure
- Transparent
- Aligned with real-world contributor workflows
