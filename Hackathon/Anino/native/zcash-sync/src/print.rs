use std::io::{Read, Write};
use crate::sync::tree::{CTree, Witness};
use zcash_primitives::merkle_tree::{CommitmentTree, HashSer, IncrementalWitness};
use crate::sync::Node;

#[allow(dead_code)]
pub fn print_node(n: &Node) {
    println!("{:?}", hex::encode(n.repr));
}

#[allow(dead_code)]
pub fn print_tree(t: &CommitmentTree<Node>) {
    println!("{:?}", t.left.map(|n| hex::encode(n.repr)));
    println!("{:?}", t.right.map(|n| hex::encode(n.repr)));
    for p in t.parents.iter() {
        println!("{:?}", p.map(|n| hex::encode(n.repr)));
    }
}

#[allow(dead_code)]
pub fn print_witness(w: &IncrementalWitness<Node>) {
    println!("Tree");
    print_tree(&w.tree);
    println!("Filled");
    for n in w.filled.iter() {
        print_node(n);
    }
    println!("Cursor");
    w.cursor.as_ref().map(print_tree);
}

pub fn print_ctree(t: &CTree) {
    println!("Tree");
    println!("{:?}", t.left.map(|n| hex::encode(n)));
    println!("{:?}", t.right.map(|n| hex::encode(n)));
    for p in t.parents.iter() {
        println!("{:?}", p.map(|n| hex::encode(n)));
    }
}

#[allow(dead_code)]
pub fn print_witness2(w: &Witness) {
    let t = &w.tree;
    print_ctree(t);
    println!("Filled");
    for n in w.filled.iter() {
        print_node(n);
    }
    let t = &w.cursor;
    println!("Cursor");
    println!("{:?}", t.left.map(|n| hex::encode(n)));
    println!("{:?}", t.right.map(|n| hex::encode(n)));
    for p in t.parents.iter() {
        println!("{:?}", p.map(|n| hex::encode(n)));
    }
}
