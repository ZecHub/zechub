use std::collections::BTreeMap;
use std::sync::{Arc, Mutex};
use std::time::Duration;

use anyhow::{anyhow, bail, Context, Result};
use rusqlite::{params, Connection, OptionalExtension};
use uuid::Uuid;

use crate::frost;
use crate::models::{
    CeremonyView, CreateVaultRequest, ParticipantView, TransactionView, VaultView,
};

pub type Db = Arc<Mutex<Connection>>;

pub fn now_iso() -> String {
    chrono::Utc::now().to_rfc3339()
}

fn new_id() -> String {
    Uuid::new_v4().to_string()
}

// ---------------------------------------------------------------------
// Vault creation + real DKG orchestration
// ---------------------------------------------------------------------

pub async fn create_vault(db: Db, req: CreateVaultRequest) -> Result<VaultView> {
    let max_signers = req.participants.len() as u16;
    let min_signers = req.threshold;
    if min_signers < 2 || max_signers < min_signers {
        bail!("threshold must be >= 2 and <= total participants");
    }

    let vault_id = new_id();
    let ceremony_id = new_id();
    let created_at = now_iso();

    let mut participant_ids: Vec<String> = Vec::with_capacity(max_signers as usize);
    {
        let conn = db.lock().unwrap();
        conn.execute(
            "INSERT INTO vaults (id, name, threshold, total_participants, status, group_public_key_hex, dkg_ceremony_id, created_at)
             VALUES (?1, ?2, ?3, ?4, 'generating', NULL, ?5, ?6)",
            params![vault_id, req.name, min_signers, max_signers, ceremony_id, created_at],
        )?;

        for (idx, p) in req.participants.iter().enumerate() {
            let pid = new_id();
            let frost_identifier = (idx as u16) + 1;
            conn.execute(
                "INSERT INTO participants (id, vault_id, frost_identifier, name, role, key_package_hex, public_share_hex)
                 VALUES (?1, ?2, ?3, ?4, ?5, NULL, NULL)",
                params![pid, vault_id, frost_identifier, p.name, p.role],
            )?;
            participant_ids.push(pid);
        }

        conn.execute(
            "INSERT INTO ceremonies (id, vault_id, kind, phase, signer_participant_ids_json, message, signature_hex, verifying_key_hex, verified, error, created_at, completed_at)
             VALUES (?1, ?2, 'dkg', 'awaiting_round1', ?3, NULL, NULL, NULL, NULL, NULL, ?4, NULL)",
            params![ceremony_id, vault_id, serde_json::to_string(&participant_ids)?, created_at],
        )?;
    }

    // Real DKG runs in the background; the frontend polls the ceremony.
    let db_bg = db.clone();
    let vault_id_bg = vault_id.clone();
    let ceremony_id_bg = ceremony_id.clone();
    let participant_ids_bg = participant_ids.clone();
    tokio::spawn(async move {
        if let Err(e) = run_dkg_task(
            db_bg,
            vault_id_bg,
            ceremony_id_bg,
            max_signers,
            min_signers,
            participant_ids_bg,
        )
        .await
        {
            tracing::error!("DKG ceremony failed: {e:?}");
        }
    });

    let conn = db.lock().unwrap();
    get_vault_view(&conn, &vault_id)
}

async fn run_dkg_task(
    db: Db,
    vault_id: String,
    ceremony_id: String,
    max_signers: u16,
    min_signers: u16,
    participant_ids: Vec<String>,
) -> Result<()> {
    // Phase delays represent round-trip latency between separate participant
    // devices in a real deployment. The DKG computation itself, run below, is
    // genuinely real (frost-core DKG over reddsa::frost::redpallas) -- see
    // frost.rs's module doc for the disclosed single-process simplification.
    set_ceremony_phase(&db, &ceremony_id, "awaiting_round1")?;
    tokio::time::sleep(Duration::from_millis(500)).await;
    set_ceremony_phase(&db, &ceremony_id, "awaiting_round2")?;
    tokio::time::sleep(Duration::from_millis(500)).await;
    set_ceremony_phase(&db, &ceremony_id, "finalizing")?;
    tokio::time::sleep(Duration::from_millis(300)).await;

    let dkg_result = tokio::task::spawn_blocking(move || frost::run_dkg(max_signers, min_signers))
        .await
        .context("DKG task panicked")?;

    match dkg_result {
        Ok(output) => {
            let group_pub_hex = hex::encode(
                output
                    .public_key_package
                    .serialize()
                    .map_err(|e| anyhow!("failed to serialize public key package: {e:?}"))?,
            );

            let conn = db.lock().unwrap();
            conn.execute(
                "UPDATE vaults SET group_public_key_hex = ?1, status = 'ready' WHERE id = ?2",
                params![group_pub_hex, vault_id],
            )?;

            for (idx, pid) in participant_ids.iter().enumerate() {
                let frost_id: frost::Identifier = ((idx as u16) + 1)
                    .try_into()
                    .map_err(|e| anyhow!("bad identifier: {e:?}"))?;
                let key_package = output
                    .key_packages
                    .get(&frost_id)
                    .context("missing key package for participant")?;
                let key_hex = hex::encode(
                    key_package
                        .serialize()
                        .map_err(|e| anyhow!("failed to serialize key package: {e:?}"))?,
                );
                conn.execute(
                    "UPDATE participants SET key_package_hex = ?1 WHERE id = ?2",
                    params![key_hex, pid],
                )?;
            }

            conn.execute(
                "UPDATE ceremonies SET phase = 'complete', completed_at = ?1 WHERE id = ?2",
                params![now_iso(), ceremony_id],
            )?;
        }
        Err(e) => {
            let conn = db.lock().unwrap();
            conn.execute(
                "UPDATE ceremonies SET phase = 'failed', error = ?1, completed_at = ?2 WHERE id = ?3",
                params![format!("{e:?}"), now_iso(), ceremony_id],
            )?;
            conn.execute("UPDATE vaults SET status = 'failed' WHERE id = ?1", params![vault_id])?;
        }
    }

    Ok(())
}

fn set_ceremony_phase(db: &Db, ceremony_id: &str, phase: &str) -> Result<()> {
    let conn = db.lock().unwrap();
    conn.execute(
        "UPDATE ceremonies SET phase = ?1 WHERE id = ?2",
        params![phase, ceremony_id],
    )?;
    Ok(())
}

// ---------------------------------------------------------------------
// Real signing ceremonies (send + recovery share the same real machinery)
// ---------------------------------------------------------------------

pub async fn start_signing_ceremony(
    db: Db,
    vault_id: String,
    kind: &'static str,
    message: String,
    signer_participant_ids: Vec<String>,
    send_details: Option<(String, String)>, // (amount, recipient), only for kind == "send"
) -> Result<String> {
    let (threshold, group_pub_hex, participant_rows) = {
        let conn = db.lock().unwrap();
        let (threshold, status, group_pub_hex): (u16, String, Option<String>) = conn
            .query_row(
                "SELECT threshold, status, group_public_key_hex FROM vaults WHERE id = ?1",
                params![vault_id],
                |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)),
            )
            .context("vault not found")?;
        if status != "ready" {
            bail!("vault is not ready (DKG not complete)");
        }
        let group_pub_hex = group_pub_hex.context("vault missing group public key")?;

        let mut stmt = conn.prepare(
            "SELECT id, frost_identifier, key_package_hex FROM participants WHERE vault_id = ?1",
        )?;
        let rows: Vec<(String, u16, Option<String>)> = stmt
            .query_map(params![vault_id], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)))?
            .collect::<rusqlite::Result<_>>()?;
        (threshold, group_pub_hex, rows)
    };

    if (signer_participant_ids.len() as u16) < threshold {
        bail!(
            "need at least {} signers, got {}",
            threshold,
            signer_participant_ids.len()
        );
    }

    let ceremony_id = new_id();
    let created_at = now_iso();
    {
        let conn = db.lock().unwrap();
        conn.execute(
            "INSERT INTO ceremonies (id, vault_id, kind, phase, signer_participant_ids_json, message, signature_hex, verifying_key_hex, verified, error, created_at, completed_at)
             VALUES (?1, ?2, ?3, 'awaiting_round1', ?4, ?5, NULL, NULL, NULL, NULL, ?6, NULL)",
            params![
                ceremony_id,
                vault_id,
                kind,
                serde_json::to_string(&signer_participant_ids)?,
                message,
                created_at
            ],
        )?;
    }

    let db_bg = db.clone();
    let ceremony_id_bg = ceremony_id.clone();
    let vault_id_bg = vault_id.clone();
    tokio::spawn(async move {
        if let Err(e) = run_signing_task(
            db_bg,
            vault_id_bg,
            ceremony_id_bg,
            kind,
            message,
            group_pub_hex,
            participant_rows,
            signer_participant_ids,
            send_details,
        )
        .await
        {
            tracing::error!("signing ceremony failed: {e:?}");
        }
    });

    Ok(ceremony_id)
}

#[allow(clippy::too_many_arguments)]
async fn run_signing_task(
    db: Db,
    vault_id: String,
    ceremony_id: String,
    kind: &'static str,
    message: String,
    group_pub_hex: String,
    participant_rows: Vec<(String, u16, Option<String>)>,
    signer_participant_ids: Vec<String>,
    send_details: Option<(String, String)>,
) -> Result<()> {
    set_ceremony_phase(&db, &ceremony_id, "awaiting_round1")?;
    tokio::time::sleep(Duration::from_millis(400)).await;
    set_ceremony_phase(&db, &ceremony_id, "awaiting_round2")?;
    tokio::time::sleep(Duration::from_millis(400)).await;
    set_ceremony_phase(&db, &ceremony_id, "aggregating")?;
    tokio::time::sleep(Duration::from_millis(300)).await;

    let result: Result<(frost::Signature, frost::VerifyingKey)> = (|| {
        let public_key_package = frost::PublicKeyPackage::deserialize(&hex::decode(&group_pub_hex)?)
            .map_err(|e| anyhow!("failed to deserialize public key package: {e:?}"))?;

        let mut key_packages: BTreeMap<frost::Identifier, frost::KeyPackage> = BTreeMap::new();
        let mut signer_ids: Vec<frost::Identifier> = Vec::new();
        for (pid, frost_id, key_hex) in &participant_rows {
            if !signer_participant_ids.contains(pid) {
                continue;
            }
            let key_hex = key_hex
                .as_ref()
                .context("participant has no key share yet (DKG incomplete)")?;
            let id: frost::Identifier = (*frost_id)
                .try_into()
                .map_err(|e| anyhow!("bad identifier: {e:?}"))?;
            let key_package = frost::KeyPackage::deserialize(&hex::decode(key_hex)?)
                .map_err(|e| anyhow!("failed to deserialize key package: {e:?}"))?;
            key_packages.insert(id, key_package);
            signer_ids.push(id);
        }

        let signing = frost::run_signing_ceremony(
            message.as_bytes(),
            &key_packages,
            &signer_ids,
            &public_key_package,
        )?;
        Ok((signing.signature, signing.randomized_verifying_key))
    })();

    match result {
        Ok((signature, verifying_key)) => {
            let sig_hex = hex::encode(
                signature
                    .serialize()
                    .map_err(|e| anyhow!("failed to serialize signature: {e:?}"))?,
            );
            let vk_hex = hex::encode(
                verifying_key
                    .serialize()
                    .map_err(|e| anyhow!("failed to serialize verifying key: {e:?}"))?,
            );
            let verified = frost::verify_signature(message.as_bytes(), &signature, &verifying_key);

            let conn = db.lock().unwrap();
            conn.execute(
                "UPDATE ceremonies SET phase = 'complete', signature_hex = ?1, verifying_key_hex = ?2, verified = ?3, completed_at = ?4 WHERE id = ?5",
                params![sig_hex, vk_hex, verified as i32, now_iso(), ceremony_id],
            )?;

            if kind == "send" {
                // Explicitly-mocked ledger entry -- real shielded broadcast is
                // out of scope (see README). The authorization signature this
                // references is real.
                if let Some((amount, recipient)) = &send_details {
                    let txid = format!("mock-{}", &sig_hex[..16.min(sig_hex.len())]);
                    conn.execute(
                        "INSERT INTO transactions (id, vault_id, tx_type, amount, counterparty, ceremony_id, txid_placeholder, timestamp)
                         VALUES (?1, ?2, 'send', ?3, ?4, ?5, ?6, ?7)",
                        params![new_id(), vault_id, amount, recipient, ceremony_id, txid, now_iso()],
                    )?;
                }
            }
        }
        Err(e) => {
            let conn = db.lock().unwrap();
            conn.execute(
                "UPDATE ceremonies SET phase = 'failed', error = ?1, completed_at = ?2 WHERE id = ?3",
                params![format!("{e:?}"), now_iso(), ceremony_id],
            )?;
        }
    }

    Ok(())
}

// ---------------------------------------------------------------------
// Read helpers
// ---------------------------------------------------------------------

pub fn get_vault_view(conn: &Connection, vault_id: &str) -> Result<VaultView> {
    let (id, name, threshold, total_participants, status, group_pub_hex, dkg_ceremony_id, created_at): (
        String,
        String,
        u16,
        u16,
        String,
        Option<String>,
        String,
        String,
    ) = conn
        .query_row(
            "SELECT id, name, threshold, total_participants, status, group_public_key_hex, dkg_ceremony_id, created_at FROM vaults WHERE id = ?1",
            params![vault_id],
            |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?, r.get(4)?, r.get(5)?, r.get(6)?, r.get(7)?)),
        )
        .context("vault not found")?;

    let mut stmt = conn.prepare(
        "SELECT id, frost_identifier, name, role, key_package_hex FROM participants WHERE vault_id = ?1 ORDER BY frost_identifier",
    )?;
    let participants = stmt
        .query_map(params![vault_id], |r| {
            let key_package_hex: Option<String> = r.get(4)?;
            Ok(ParticipantView {
                id: r.get(0)?,
                frost_identifier: r.get(1)?,
                name: r.get(2)?,
                role: r.get(3)?,
                has_key_share: key_package_hex.is_some(),
            })
        })?
        .collect::<rusqlite::Result<Vec<_>>>()?;

    Ok(VaultView {
        id,
        name,
        threshold,
        total_participants,
        status,
        group_public_key_hex: group_pub_hex,
        created_at,
        dkg_ceremony_id,
        participants,
    })
}

pub fn list_vaults(conn: &Connection) -> Result<Vec<VaultView>> {
    let mut stmt = conn.prepare("SELECT id FROM vaults ORDER BY created_at DESC")?;
    let ids: Vec<String> = stmt
        .query_map([], |r| r.get(0))?
        .collect::<rusqlite::Result<_>>()?;
    ids.iter().map(|id| get_vault_view(conn, id)).collect()
}

pub fn get_ceremony_view(conn: &Connection, ceremony_id: &str) -> Result<CeremonyView> {
    conn.query_row(
        "SELECT id, vault_id, kind, phase, signer_participant_ids_json, message, signature_hex, verifying_key_hex, verified, error, created_at, completed_at FROM ceremonies WHERE id = ?1",
        params![ceremony_id],
        |r| {
            let signer_ids_json: String = r.get(4)?;
            let verified: Option<i64> = r.get(8)?;
            Ok(CeremonyView {
                id: r.get(0)?,
                vault_id: r.get(1)?,
                kind: r.get(2)?,
                phase: r.get(3)?,
                signer_participant_ids: serde_json::from_str(&signer_ids_json).unwrap_or_default(),
                message: r.get(5)?,
                signature_hex: r.get(6)?,
                verifying_key_hex: r.get(7)?,
                verified: verified.map(|v| v != 0),
                error: r.get(9)?,
                created_at: r.get(10)?,
                completed_at: r.get(11)?,
            })
        },
    )
    .context("ceremony not found")
}

pub fn list_transactions(conn: &Connection, vault_id: &str) -> Result<Vec<TransactionView>> {
    let mut stmt = conn.prepare(
        "SELECT id, vault_id, tx_type, amount, counterparty, ceremony_id, txid_placeholder, timestamp FROM transactions WHERE vault_id = ?1 ORDER BY timestamp DESC",
    )?;
    let rows = stmt
        .query_map(params![vault_id], |r| {
            Ok(TransactionView {
                id: r.get(0)?,
                vault_id: r.get(1)?,
                tx_type: r.get(2)?,
                amount: r.get(3)?,
                counterparty: r.get(4)?,
                ceremony_id: r.get(5)?,
                txid_placeholder: r.get(6)?,
                timestamp: r.get(7)?,
            })
        })?
        .collect::<rusqlite::Result<Vec<_>>>()?;
    Ok(rows)
}

pub fn insert_receive_transaction(
    conn: &Connection,
    vault_id: &str,
    amount: &str,
    from: &str,
) -> Result<TransactionView> {
    let id = new_id();
    let txid = format!("mock-{}", &Uuid::new_v4().simple().to_string()[..16]);
    let timestamp = now_iso();
    conn.execute(
        "INSERT INTO transactions (id, vault_id, tx_type, amount, counterparty, ceremony_id, txid_placeholder, timestamp)
         VALUES (?1, ?2, 'receive', ?3, ?4, NULL, ?5, ?6)",
        params![id, vault_id, amount, from, txid, timestamp],
    )?;
    Ok(TransactionView {
        id,
        vault_id: vault_id.to_string(),
        tx_type: "receive".to_string(),
        amount: amount.to_string(),
        counterparty: from.to_string(),
        ceremony_id: None,
        txid_placeholder: txid,
        timestamp,
    })
}

pub fn vault_exists(conn: &Connection, vault_id: &str) -> Result<bool> {
    let exists: bool = conn
        .query_row(
            "SELECT EXISTS(SELECT 1 FROM vaults WHERE id = ?1)",
            params![vault_id],
            |r| r.get(0),
        )
        .optional()?
        .unwrap_or(false);
    Ok(exists)
}
