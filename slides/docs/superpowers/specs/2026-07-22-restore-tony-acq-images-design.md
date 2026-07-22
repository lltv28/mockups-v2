# Restore Tony Robbins and ACQ AI Images Design

## Goal

Restore the Tony Robbins and ACQ AI cards to the exact images used before the July 22 screenshot replacements.

## Approved changes

- Restore `tony-robbins.png` and `alex-hormozi.png` from commit `ce0f5cf`.
- Remove the ACQ-only media wrapper and 130% zoom styles.
- Add version queries to both restored image references to prevent stale browser caches.
- Restore their original official image URLs in `SOURCES.md`.
- Keep Grant Cardone and Dr. Mark Hyman unchanged.

## Verification

Add a failing regression test for the original file hashes and unzoomed markup, then run all slide tests, the build, and desktop/mobile visual checks.
