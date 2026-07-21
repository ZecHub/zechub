# Paypunk — Current Task

## ⚠️ CRITICAL: STOP AFTER EACH STEP. DO NOT CONTINUE. ⚠️

Do nothing. Read the lowest-numbered step file in `./project/todo/` that has not yet been moved to `./project/done/`. Execute ONLY that step. Then **STOP**.

## Execution rules — FOLLOW EXACTLY:

1. Read the next step file (lowest number still in `./project/todo/`)
2. Implement ONLY what that step describes — no more, no less
3. Run `cargo build` — if it fails, fix it
4. Run `cargo test` — if it fails, fix it
5. `git add -A && git commit -m "<descriptive message>"`
6. **STOP. DO NOT READ OR EXECUTE THE NEXT GOAL.**
7. Move the completed step from `./project/todo/` to `./project/done/`
9. **QUIT. WAIT FOR INSTRUCTION BEFORE CONTINUING.**

## Why

Each step is independently verifiable. Skipping ahead or combining steps will break the verification process and introduce hard-to-find bugs. Each step must compile and pass all tests on its own before the next step begins.
