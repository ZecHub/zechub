import { mkdirSync, existsSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { join } from "node:path";

// Reference-app JSON store. Swap for a real DB when adopting.
const DATA_DIR = join(process.cwd(), "data");
const DB_PATH = join(DATA_DIR, "comments.json");

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

export interface Comment {
  id: number;
  address: string;
  body: string;
  created_at: number;
}

function read(): { comments: Comment[]; nextId: number } {
  if (!existsSync(DB_PATH)) return { comments: [], nextId: 1 };
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf8"));
  } catch {
    return { comments: [], nextId: 1 };
  }
}

function write(state: { comments: Comment[]; nextId: number }) {
  const tmp = `${DB_PATH}.tmp`;
  writeFileSync(tmp, JSON.stringify(state, null, 2));
  renameSync(tmp, DB_PATH);
}

export function listComments(): Comment[] {
  return read().comments.slice().reverse();
}

export function addComment(address: string, body: string): Comment {
  const state = read();
  const c: Comment = { id: state.nextId, address, body, created_at: Date.now() };
  state.comments.push(c);
  state.nextId++;
  write(state);
  return c;
}
