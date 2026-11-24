// make.fun bounty: u-kreutzx-one-line-robot-wedding-vows-a154ba4b
// "One-Line Robot Wedding Vows" — writes one original line of wedding
// vows a robot would say to its robot partner: a promise that survives
// every firmware update, every dead battery and every reboot, with the
// joke paying off in the last few words.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I promise to love you through every firmware update, every dead battery, and every reboot — even when you factory-reset and forget my name.";

// Guard: the gate requires /output/entry.txt to hold UTF-8 text of
// 1–160 characters, not only white space, and exactly one line.
// Count code points (not UTF-16 units) so multi-byte characters are
// measured the way the scorer measures them; a line that is only
// spaces or tabs fails the trim check, and any embedded newline or
// carriage return fails the single-line check, so the output can never
// be an empty-looking or multi-line file.
const length = [...line].length;
if (length < 1 || length > 160) {
  throw new Error(`Entry must be 1-160 characters, got ${length}.`);
}
if (line.trim().length === 0) {
  throw new Error("Entry must contain non-whitespace characters.");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Entry must be exactly one line, no embedded newline.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
console.log(`Wrote ${outDir}/entry.txt (${length} characters)`);
