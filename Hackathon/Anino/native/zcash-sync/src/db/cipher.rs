use rusqlite::{Connection, OptionalExtension};

pub fn set_db_passwd(connection: &Connection, passwd: &str) -> anyhow::Result<()> {
    connection
        .query_row(&format!("PRAGMA key = '{}'", passwd), [], |_| Ok(()))
        .optional()?;
    Ok(())
}

pub fn check_passwd(connection: &Connection, passwd: &str) -> anyhow::Result<bool> {
    set_db_passwd(connection, passwd)?;
    let c = connection.query_row("SELECT COUNT(*) FROM sqlite_master", [], |row| {
        let c: u32 = row.get(0)?;
        Ok(c)
    });
    Ok(c.is_ok())
}

pub fn clone_db_with_passwd(src: &Connection, new_path: &str, passwd: &str) -> anyhow::Result<()> {
    src.execute(
        &format!(
            "ATTACH DATABASE '{}' AS encrypted KEY '{}'",
            new_path, passwd
        ),
        [],
    )?;
    src.query_row("SELECT sqlcipher_export('encrypted')", [], |_row| Ok(()))?;
    src.execute("DETACH DATABASE encrypted", [])?;
    Ok(())
}
