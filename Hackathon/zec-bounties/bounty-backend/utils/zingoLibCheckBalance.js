const { execSync } = require("child_process");
const { existsSync } = require("fs");

function executeZingoCheckBalance(command, params) {
  const zingoPath = "~/zingolib/target/release/zingo-cli";
  const resolvedPath = zingoPath.replace(
    "~",
    process.env.HOME || "/home/" + process.env.USER
  );

  if (!existsSync(resolvedPath)) {
    throw new Error(`zingo-cli not found at ${resolvedPath}`);
  }

  const args = [
    `--server ${params.server || "http://127.0.0.1:8137"}`,
    `--data-dir ${params.dataDir || "/mnt/d/zaino/zebra/.cache/zaino"}`,
    command,
  ].join(" ");

  try {
    // Run CLI and capture output
    const rawOutput = execSync(`${resolvedPath} ${args}`, {
      stdio: "pipe",
    }).toString();

    // 1️⃣ Remove ANSI color codes
    const noAnsi = rawOutput.replace(/\u001b\[[0-9;]*m/g, "");

    // 2️⃣ Extract JSON blocks using regex (matches anything starting with `{` and ending with `}`)
    const jsonBlocks = noAnsi.match(/\{[\s\S]*?\}/g) || [];

    // 3️⃣ Parse each JSON block
    const parsed = jsonBlocks
      .map((block) => {
        try {
          return JSON.parse(block);
        } catch {
          return null;
        }
      })
      .filter(Boolean); // remove failed parses

    // 4️⃣ If only one JSON object, return it directly. Otherwise return array.
    if (parsed.length === 1) return parsed[0];
    return parsed;
  } catch (error) {
    throw new Error(
      `Zingo CLI error: ${error.stderr?.toString() || error.message}`
    );
  }
}

module.exports = executeZingoCheckBalance;
