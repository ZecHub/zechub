import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addContact,
  exportMyContact,
  listContacts,
  removeContact,
  setContactAlias,
  AppError,
  ContactDto,
} from "../ipc/commands";

/** Inline-editable alias cell for the address book. */
function AliasCell({ contact, onSaved }: { contact: ContactDto; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(contact.alias ?? "");

  const save = async () => {
    await setContactAlias(contact.pubkey, value.trim());
    setEditing(false);
    onSaved();
  };

  if (editing) {
    return (
      <div className="row" style={{ gap: 6 }}>
        <input
          type="text"
          autoFocus
          placeholder="Nickname"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
          style={{ marginBottom: 0, padding: "4px 8px" }}
        />
        <button onClick={save} style={{ padding: "5px 10px" }}>
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="row" style={{ gap: 6 }}>
      <span className={contact.alias ? undefined : "dim"}>
        {contact.alias || "—"}
      </span>
      <button
        className="icon-btn"
        title="Edit nickname"
        aria-label="Edit nickname"
        onClick={() => {
          setValue(contact.alias ?? "");
          setEditing(true);
        }}
      >
        ✎
      </button>
    </div>
  );
}

export default function Contacts() {
  const queryClient = useQueryClient();
  const contacts = useQuery({ queryKey: ["contacts"], queryFn: listContacts });
  const [newContact, setNewContact] = useState("");
  const [newAlias, setNewAlias] = useState("");
  const [myName, setMyName] = useState("");
  const [myContact, setMyContact] = useState<ContactDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["contacts"] });

  const add = useMutation({
    mutationFn: () => addContact(newContact.trim(), newAlias.trim() || undefined),
    onSuccess: () => {
      setNewContact("");
      setNewAlias("");
      setError(null);
      invalidate();
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });

  const remove = useMutation({
    mutationFn: removeContact,
    onSuccess: invalidate,
  });

  return (
    <div>
      <h2>Contacts</h2>

      <div className="card">
        <h3>Share your contact</h3>
        <p className="dim">
          Export your contact string and send it to the people you want to run
          FROST with (and import theirs below).
        </p>
        <div className="row">
          <input
            type="text"
            placeholder="Your display name"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
          />
          <button
            disabled={!myName.trim()}
            onClick={async () => setMyContact(await exportMyContact(myName.trim()))}
          >
            Export
          </button>
        </div>
        {myContact && (
          <div style={{ marginTop: 12 }}>
            <div className="mono">{myContact.text}</div>
            <div className="row" style={{ marginTop: 8 }}>
              <button
                className="secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(myContact.text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Import a contact</h3>
        <label>Contact string</label>
        <textarea
          rows={3}
          placeholder="zffrost1..."
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
        />
        <label>Alias / nickname (optional)</label>
        <input
          type="text"
          placeholder="e.g. Alice's laptop — a local label only you see"
          value={newAlias}
          onChange={(e) => setNewAlias(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button
          disabled={!newContact.trim() || add.isPending}
          onClick={() => add.mutate()}
        >
          Import
        </button>
      </div>

      <div className="card">
        <h3>Address book</h3>
        {contacts.data?.length ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Alias</th>
                <th>Public key</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.data.map((c) => (
                <tr key={c.pubkey}>
                  <td>{c.name}</td>
                  <td>
                    <AliasCell contact={c} onSaved={invalidate} />
                  </td>
                  <td className="dim mono-cell">{c.pubkey.slice(0, 16)}…</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="danger" onClick={() => remove.mutate(c.pubkey)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="dim">No contacts yet.</p>
        )}
      </div>
    </div>
  );
}
