const { execSync } = require("child_process");
const { existsSync } = require("fs");

function executeZingoQuickSend(recipients) {
  const command = "quicksend";
  const params = {};
  const zingoPath = "~/zingolib/target/release/zingo-cli";
  const resolvedPath = zingoPath.replace(
    "~",
    process.env.HOME || "/home/" + process.env.USER
  );

  if (!existsSync(resolvedPath)) {
    throw new Error(`zingo-cli not found at ${resolvedPath}`);
  }

  // 📝 Ensure each recipient has amount in zatoshis and default memo
  const sanitizedRecipients = recipients.map((r) => ({
    address: r.address,
    amount: Math.ceil(Number(r.amount)), // already in zatoshis
    memo: r.memo || "Sent from the ZEC bounty app!", // default memo
  }));

  // Build JSON string exactly as CLI expects
  const jsonString = JSON.stringify(sanitizedRecipients);

  const args = [
    `--server ${params.server || "http://127.0.0.1:8137"}`,
    `--data-dir ${params.dataDir || "/mnt/d/zaino/zebra/.cache/zaino"}`,
    command,
    `'${jsonString}'`,
  ].join(" ");

  console.log(args);

  try {
    // 1️⃣ Run CLI and capture full output
    const rawOutput = execSync(`${resolvedPath} ${args}`, {
      stdio: "pipe",
    }).toString();

    // 2️⃣ Strip ANSI color codes
    const noAnsi = rawOutput.replace(/\u001b\[[0-9;]*m/g, "");

    // 3️⃣ Extract JSON blocks (any {…} including newlines)
    const jsonBlocks = noAnsi.match(/\{[\s\S]*?\}/g) || [];

    // 4️⃣ Parse each JSON block safely
    const parsed = jsonBlocks
      .map((block) => {
        try {
          return JSON.parse(block);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    // 5️⃣ Return array if >1 objects, or object if just 1
    if (parsed.length === 1) return parsed[0];
    return parsed;
  } catch (error) {
    throw new Error(
      `Zingo CLI error: ${error.stderr?.toString() || error.message}`
    );
  }
}

module.exports = executeZingoQuickSend;
