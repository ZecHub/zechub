Problem: App closes during "Sending Transaction". Two distinct failures observed:

- UI error: "Prover not initialized. Call init_prover() before signing." (handled with lazy init + gating)
- Backend panic: Option::unwrap() at native/zcash-sync/src/note_selection/builder.rs:232

What I tried so far:
- Added lazy prover init in Submit page and set appStore.proverReady.
- Gated Review button on proverReady in Send page.
- Rebuilt native lib and copied .so into bundle lib; relaunched from bundle.
- Partially removed unwraps earlier; panic persists at builder.rs.

Next:
- Remove remaining unwrap()s in builder.rs and return proper errors.
- Rebuild native lib, ensure the correct .so is loaded in the bundle.

