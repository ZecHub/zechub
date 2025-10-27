use anyhow::Result;
use orchard::vote::{calculate_merkle_paths, Frontier, OrchardHash};
use pasta_curves::{group::ff::PrimeField as _, Fp};
use rusqlite::Connection;

pub fn list_nf_ranges(connection: &Connection) -> Result<Vec<Fp>> {
    let mut s = connection.prepare("SELECT hash FROM nfs")?;
    let rows = s.query_map([], |r| {
        let v = r.get::<_, [u8; 32]>(0)?;
        let v = Fp::from_repr(v).unwrap();
        Ok(v)
    })?;
    let mut nfs = rows.collect::<Result<Vec<_>, _>>()?;
    nfs.sort();
    let nf_tree = build_nf_ranges(nfs);
    Ok(nf_tree)
}

pub fn compute_nf_root(connection: &Connection) -> Result<OrchardHash> {
    let nf_tree = list_nf_ranges(connection)?;
    let (nf_root, _) = calculate_merkle_paths(0, &[], &nf_tree);

    Ok(OrchardHash(nf_root.to_repr()))
}

pub fn list_cmxs(connection: &Connection) -> Result<Vec<Fp>> {
    let mut s = connection.prepare("SELECT hash FROM cmxs ORDER BY id_cmx")?;
    let rows = s.query_map([], |r| {
        let v = r.get::<_, [u8; 32]>(0)?;
        let v = Fp::from_repr(v).unwrap();
        Ok(v)
    })?;
    let cmx_tree = rows.collect::<Result<Vec<_>, _>>()?;
    Ok(cmx_tree)
}

pub fn compute_cmx_root(connection: &Connection) -> Result<(OrchardHash, Option<Frontier>)> {
    let cmx_tree = list_cmxs(connection)?;
    let (cmx_root, frontier) = if cmx_tree.is_empty() {
        let (cmx_root, _) = calculate_merkle_paths(0, &[], &[]);
        (cmx_root, None)
    } else {
        let end_position = cmx_tree.len() - 1;
        let leaf = cmx_tree[end_position];
        let (cmx_root, mps) = calculate_merkle_paths(0, &[end_position as u32], &cmx_tree);
        let mp = &mps[0];
        let ommers = mp
            .path
            .iter()
            .map(|o| OrchardHash(o.to_repr()))
            .collect::<Vec<_>>();

        let frontier = Frontier {
            position: mp.position,
            leaf: OrchardHash(leaf.to_repr()),
            ommers,
        };
        (cmx_root, Some(frontier))
    };
    Ok((OrchardHash(cmx_root.to_repr()), frontier))
}

pub fn build_nf_ranges(nfs: impl IntoIterator<Item = Fp>) -> Vec<Fp> {
    let mut prev = Fp::zero();
    let mut leaves = vec![];
    for r in nfs {
        // Skip empty ranges when nfs are consecutive
        // (with statistically negligible odds)
        if prev < r {
            // Ranges are inclusive of both ends
            let a = prev;
            let b = r - Fp::one();

            leaves.push(a);
            leaves.push(b);
        }
        prev = r + Fp::one();
    }
    if prev != Fp::zero() {
        // overflow when a nullifier == max
        let a = prev;
        let b = Fp::one().neg();

        leaves.push(a);
        leaves.push(b);
    }
    leaves
}
