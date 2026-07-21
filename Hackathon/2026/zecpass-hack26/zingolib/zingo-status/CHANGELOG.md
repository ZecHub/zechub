
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Removed

## [0.2.0] 2026-02-26

### Added
`confirmation_status::ConfirmationStatus::is_failed`
`confirmation_status::ConfirmationStatus::is_pending`

### Changed
`confirmation_status::ConfirmationStatus`:
- added `Failed` variant
- new serialized version 1 with new variant

### Removed
`confirmation_status::ConfirmationStatus::from_blockheight_and_pending_bool`
## [0.1.0] - 2026-01-09

### Changed

- `ConfirmationStatus`: removed derive Debug and added derive Eq, PartialOrd and Ord

## [0.0.1] - 2025-05-24
