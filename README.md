# เจช่วยหวาน 60/40 — v1.1.1
Static PWA, no dependencies. Money stored as integer satang. Monthly quota is the payer's subsidy, not purchase total. No carryover. Existing transactions retain their actual split; edits to amount or month recompute only that entry against available quota, not other entries. Settings change current month and defaults for future unconfigured months. Historical months with saved config remain unchanged. Local single-device data, no sync or real money transfer.

## Deploy
Extract ZIP, upload contents (index.html at repository root), GitHub Settings > Pages > Deploy from a branch > main / root. Open HTTPS URL once online, then install via browser menu (iOS Safari Share > Add to Home Screen). For local test run `python3 -m http.server 8000` in this directory, open http://localhost:8000; do not open index.html via file://.

## Upgrade
Keep origin, database name `jay-chuay-thai-v1`, and install URL stable. Increment SW CACHE on every release; close all app tabs/PWA and reopen to activate waiting worker. Increment IndexedDB schema version only for migrations; never delete database. Backup JSON before upgrade. Browser/site data clearing, OS storage eviction or different browser/device can lose or isolate data. Restore replaces all data after validation, not merge. Theme forces light color scheme, although external accessibility/inversion or browser forced-dark overrides are outside app control.

## Test checklist
- Fresh month: 1000 baht. Add 500: subsidy 300, user 200, left 700. Add 1200: subsidy capped 700, user 500, left 0.
- Edit/delete and verify totals; existing other transactions unchanged. History month switch. Change each theme and reload. Backup, reset, restore; malformed JSON rejected. Test offline after SW activation, on real iOS and Android. Test upgrade with existing data.


Known update note: if an installed PWA or browser tab still shows old branding, fully close the app, reopen once online, or reinstall the PWA after backup; old service-worker caches from previous versions may delay visible updates until the new worker activates.

## Personalization v1.1.1
Three theme-specific icons and manifests. All manifests resolve to the same app ID, start URL and scope. Theme selection persists per device. Favicon, apple-touch-icon and manifest references update immediately; installed launcher icons are controlled by the browser/OS and may not update without reinstalling. Back up before removing an installed app; do not clear site data. No cloud sync in this release.

### v1.1.1 Mobile UI hotfix
Explicit 16px editor input text, no automatic text field focus, constrained date input width, and visual viewport-aware bottom sheet. Pinch zoom remains enabled for accessibility.
