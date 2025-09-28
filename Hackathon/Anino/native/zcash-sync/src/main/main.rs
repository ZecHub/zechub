use std::time::Instant;
use sync::{advance_tree, scan_all, CTree, Witness};
use zcash_client_backend::encoding::decode_extended_full_viewing_key;
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::merkle_tree::{CommitmentTree, IncrementalWitness};
use zcash_primitives::sapling::Node;

const NETWORK: Network = Network::MainNetwork;

#[tokio::main]
#[allow(dead_code)]
async fn main_scan() {
    dotenv::dotenv().unwrap();
    env_logger::init();

    let ivk = dotenv::var("IVK").unwrap();
    let fvk =
        decode_extended_full_viewing_key(NETWORK.hrp_sapling_extended_full_viewing_key(), &ivk)
            .unwrap()
            .unwrap();

    scan_all(&NETWORK, &vec![fvk]).await.unwrap();
}

#[allow(dead_code)]
fn test_increasing_notes() {
    const NUM_NODES: usize = 1000;
    const NUM_CHUNKS: usize = 50;
    const WITNESS_PERCENT: f64 = 1.0; // percentage of notes that are ours
    let witness_freq = (100.0 / WITNESS_PERCENT) as usize;

    let mut _tree1: CommitmentTree<Node> = CommitmentTree::empty();
    let mut tree2 = CTree::new();
    let mut _ws: Vec<IncrementalWitness<Node>> = vec![];
    let mut ws2: Vec<Witness> = vec![];
    let start = Instant::now();
    let mut first_block = true;
    for i in 0..NUM_CHUNKS {
        eprintln!("{}, {}", i, start.elapsed().as_millis());
        let mut nodes: Vec<_> = vec![];
        for j in 0..NUM_NODES {
            let mut bb = [0u8; 32];
            let v = i * NUM_NODES + j;
            bb[0..8].copy_from_slice(&v.to_be_bytes());
            let node = Node::new(bb);
            // tree1.append(node).unwrap();
            // for w in ws.iter_mut() {
            //     w.append(node).unwrap();
            // }
            if v % witness_freq == 0 {
                // let w = IncrementalWitness::from_tree(&tree1);
                // ws.push(w);
                ws2.push(Witness::new(v, 0, None));
            }
            nodes.push(node);
        }
        let (new_tree, new_witnesses) = advance_tree(&tree2, &ws2, &mut nodes, first_block);
        first_block = false;
        tree2 = new_tree;
        ws2 = new_witnesses;
    }

    let (_, new_witnesses) = advance_tree(&tree2, &ws2, &mut [], false);
    ws2 = new_witnesses;
    println!("# witnesses = {}", ws2.len());
}

fn mk_node(pos: usize) -> Node {
    let mut bb = [0u8; 32];
    bb[0..8].copy_from_slice(&pos.to_be_bytes());

    Node::new(bb)
}

fn test_increasing_gap(run_normal: bool, run_warp: bool) {
    const NUM_CHUNKS: usize = 20;
    const NUM_WITNESS: usize = 20;

    let mut tree1: CommitmentTree<Node> = CommitmentTree::empty();
    let mut tree2 = CTree::new();
    let mut ws: Vec<IncrementalWitness<Node>> = vec![];
    let mut ws2: Vec<Witness> = vec![];

    // Add our received notes
    let mut pos = 0usize;
    let mut nodes: Vec<_> = vec![];
    let mut first_block = true;
    for _ in 0..NUM_WITNESS {
        let node = mk_node(pos);
        if run_normal {
            tree1.append(node).unwrap();
            for w in ws.iter_mut() {
                w.append(node).unwrap();
            }
            let w = IncrementalWitness::from_tree(&tree1);
            ws.push(w);
        }
        ws2.push(Witness::new(pos, 0, None));
        nodes.push(node);
        pos += 1;
    }

    if run_warp {
        let (new_tree, new_witnesses) = advance_tree(&tree2, &ws2, &mut nodes, first_block);
        first_block = false;
        tree2 = new_tree;
        ws2 = new_witnesses;
    }

    let start = Instant::now();
    let mut node_count = 2usize;
    for i in 0..NUM_CHUNKS {
        let mut nodes: Vec<_> = vec![];
        for _ in 0..node_count {
            let node = mk_node(pos);
            if run_normal {
                tree1.append(node).unwrap();
                for w in ws.iter_mut() {
                    w.append(node).unwrap();
                }
            }
            nodes.push(node);
            pos += 1;
        }

        if run_warp {
            let (new_tree, new_witnesses) = advance_tree(&tree2, &ws2, &mut nodes, first_block);
            tree2 = new_tree;
            ws2 = new_witnesses;
        }
        node_count *= 2;
        eprintln!("{}, {}, {}", i, node_count, start.elapsed().as_millis());
    }

    if run_warp {
        let (_, new_witnesses) = advance_tree(&tree2, &ws2, &mut [], false);
        ws2 = new_witnesses;
    }

    println!("# witnesses = {}", ws2.len());
}

fn main() {
    test_increasing_gap(false, true);
    test_increasing_gap(true, false);
}
