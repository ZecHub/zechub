use crate::Hash;
use byteorder::WriteBytesExt;
use group::Curve;
use rayon::prelude::*;
use std::io::{Read, Write};
use std::marker::PhantomData;
use zcash_encoding::{Optional, Vector};

pub type Node = [u8; 32];

pub trait Hasher: Clone + Sync {
    type Extended: Curve + Clone + Send;

    fn uncommited_node() -> Node;
    fn node_combine(&self, depth: u8, left: &Node, right: &Node) -> Node;

    fn node_combine_extended(&self, depth: u8, left: &Node, right: &Node) -> Self::Extended;
    fn normalize(&self, extended: &[Self::Extended]) -> Vec<Node>;

    fn empty_roots(&self, height: usize) -> Vec<Hash> {
        let mut roots = vec![];
        let mut cur = Self::uncommited_node();
        roots.push(cur);
        for depth in 0..height {
            cur = self.node_combine(depth as u8, &cur, &cur);
            roots.push(cur);
        }
        roots
    }
}

#[derive(Clone)]
pub struct CTree {
    pub left: Option<Node>,
    pub right: Option<Node>,
    pub parents: Vec<Option<Node>>,
}

impl CTree {
    pub fn new() -> Self {
        CTree {
            left: None,
            right: None,
            parents: vec![],
        }
    }

    pub fn get_position(&self) -> usize {
        let mut p = 0usize;
        for parent in self.parents.iter().rev() {
            if parent.is_some() {
                p += 1;
            }
            p *= 2;
        }
        if self.left.is_some() {
            p += 1;
        }
        if self.right.is_some() {
            p += 1;
        }
        p
    }

    pub fn clone_trimmed(&self, depth: usize) -> Self {
        let mut tree = self.clone();
        tree.parents.truncate(depth);
        if let Some(None) = tree.parents.last() {
            // Remove trailing None
            tree.parents.truncate(depth - 1);
        }
        tree
    }

    pub fn root<H: Hasher>(&self, height: usize, empty_roots: &[Node], hasher: &H) -> Node {
        if self.left.is_none() {
            return empty_roots[height];
        }
        // merge the leaves
        let left = self.left.unwrap_or(H::uncommited_node());
        let right = self.right.unwrap_or(H::uncommited_node());
        let mut cur = hasher.node_combine(0, &left, &right);
        // merge the parents
        let mut depth = 1u8;
        for p in self.parents.iter() {
            if let Some(ref left) = p {
                cur = hasher.node_combine(depth, left, &cur);
            } else {
                cur = hasher.node_combine(depth, &cur, &empty_roots[depth as usize]);
            }
            depth += 1;
        }
        // fill in the missing levels
        for d in depth as usize..height {
            cur = hasher.node_combine(d as u8, &cur, &empty_roots[d]);
        }
        cur
    }

    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let left = Optional::read(&mut reader, node_read)?;
        let right = Optional::read(&mut reader, node_read)?;
        let parents = Vector::read(&mut reader, |r| Optional::read(r, node_read))?;

        Ok(CTree {
            left,
            right,
            parents,
        })
    }

    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        Optional::write(&mut writer, self.left, |w, n| node_write(&n, w))?;
        Optional::write(&mut writer, self.right, |w, n| node_write(&n, w))?;
        Vector::write(&mut writer, &self.parents, |w, e| {
            Optional::write(w, *e, |w, n| node_write(&n, w))
        })?;
        Ok(())
    }

    pub fn from_bytes(bytes: &[u8]) -> std::io::Result<Self> {
        Self::read(bytes)
    }
}

fn node_read<R: Read>(mut r: R) -> std::io::Result<Node> {
    let mut hash = [0u8; 32];
    r.read(&mut hash)?;
    Ok(hash)
}

fn node_write<W: Write>(node: &Node, mut w: W) -> std::io::Result<()> {
    w.write_all(node)
}

#[derive(Clone)]
pub struct Witness {
    pub position: usize,
    pub tree: CTree, // commitment tree at the moment the witness is created: immutable
    pub filled: Vec<Node>, // as more nodes are added, levels get filled up: won't change anymore
    pub cursor: CTree, // partial tree which still updates when nodes are added

    // not used for decryption but identifies the witness
    pub id_note: u32,
    pub cmx: [u8; 32],
}

impl Witness {
    pub fn new(position: usize, id_note: u32, cmx: &[u8; 32]) -> Witness {
        Witness {
            position,
            id_note,
            tree: CTree::new(),
            filled: vec![],
            cursor: CTree::new(),
            cmx: cmx.clone(),
        }
    }

    pub fn auth_path<H: Hasher>(
        &self,
        height: usize,
        empty_roots: &[Node],
        hasher: &H,
    ) -> Vec<Node> {
        let mut filled_iter = self.filled.iter();
        let mut cursor_used = false;
        let mut next_filler = move |depth: usize| {
            if let Some(f) = filled_iter.next() {
                *f
            } else if !cursor_used {
                cursor_used = true;
                self.cursor.root(depth, empty_roots, hasher)
            } else {
                empty_roots[depth]
            }
        };

        let mut auth_path = vec![];
        if let Some(left) = self.tree.left {
            if self.tree.right.is_some() {
                auth_path.push(left);
            } else {
                auth_path.push(next_filler(0));
            }
        }
        for i in 1..height {
            let p = if i - 1 < self.tree.parents.len() {
                self.tree.parents[i - 1]
            } else {
                None
            };

            if let Some(node) = p {
                auth_path.push(node);
            } else {
                auth_path.push(next_filler(i));
            }
        }
        auth_path
    }

    pub fn read<R: Read>(id_note: u32, mut reader: R) -> std::io::Result<Self> {
        let tree = CTree::read(&mut reader)?;
        let filled = Vector::read(&mut reader, |r| node_read(r))?;
        let cursor = Optional::read(&mut reader, |r| CTree::read(r))?;
        let mut cmx = [0u8; 32];
        reader.read(&mut cmx)?;

        let mut witness = Witness {
            position: 0,
            id_note,
            tree,
            filled,
            cursor: cursor.unwrap_or_else(CTree::new),
            cmx,
        };
        witness.position = witness.tree.get_position() - 1;

        Ok(witness)
    }

    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        self.tree.write(&mut writer)?;
        Vector::write(&mut writer, &self.filled, |w, n| node_write(&n, w))?;
        if self.cursor.left == None && self.cursor.right == None {
            writer.write_u8(0)?;
        } else {
            writer.write_u8(1)?;
            self.cursor.write(&mut writer)?;
        };
        writer.write_all(&self.cmx)?;
        Ok(())
    }

    pub fn from_bytes(id_note: u32, bytes: &[u8]) -> std::io::Result<Self> {
        Self::read(id_note, bytes)
    }
}

pub struct TreeCheckpoint {
    pub tree: CTree,
    pub witnesses: Vec<Witness>,
}

trait Builder {
    type Context;
    type Output;

    fn collect(&mut self, commitments: &[Node], context: &Self::Context) -> usize;
    fn up(&mut self);
    fn finished(&self) -> bool;
    fn finalize(self, context: &Self::Context) -> Self::Output;
}

struct CTreeBuilder<H: Hasher> {
    left: Option<Node>,
    right: Option<Node>,
    prev_tree: CTree,
    next_tree: CTree,
    start: usize,
    total_len: usize,
    depth: u8,
    offset: Option<Node>,
    first_block: bool,
    hasher: H,
}

impl<H: Hasher> Builder for CTreeBuilder<H> {
    type Context = ();
    type Output = CTree;

    fn collect(&mut self, commitments: &[Node], _context: &()) -> usize {
        assert!(self.right.is_none() || self.left.is_some()); // R can't be set without L

        let offset: Option<Node>;
        let m: usize;

        if self.left.is_some() && self.right.is_none() {
            offset = self.left;
            m = commitments.len() + 1;
        } else {
            offset = None;
            m = commitments.len();
        };

        let n = if self.total_len > 0 {
            if self.depth == 0 {
                if m % 2 == 0 {
                    self.next_tree.left = Some(*Self::get(commitments, m - 2, &offset));
                    self.next_tree.right = Some(*Self::get(commitments, m - 1, &offset));
                    m - 2
                } else {
                    self.next_tree.left = Some(*Self::get(commitments, m - 1, &offset));
                    self.next_tree.right = None;
                    m - 1
                }
            } else if m % 2 == 0 {
                self.next_tree.parents.push(None);
                m
            } else {
                let last_node = Self::get(commitments, m - 1, &offset);
                self.next_tree.parents.push(Some(*last_node));
                m - 1
            }
        } else {
            0
        };
        assert_eq!(n % 2, 0);

        self.offset = offset;
        n
    }

    fn up(&mut self) {
        let h = if self.left.is_some() && self.right.is_some() {
            Some(
                self.hasher
                    .node_combine(self.depth, &self.left.unwrap(), &self.right.unwrap()),
            )
        } else {
            None
        };
        let (l, r) = match self.prev_tree.parents.get(self.depth as usize) {
            Some(Some(p)) => (Some(*p), h),
            Some(None) => (h, None),
            None => (h, None),
        };

        self.left = l;
        self.right = r;

        assert!(self.start % 2 == 0 || self.offset.is_some());
        self.start /= 2;

        self.depth += 1;
    }

    fn finished(&self) -> bool {
        self.depth as usize >= self.prev_tree.parents.len()
            && self.left.is_none()
            && self.right.is_none()
    }

    fn finalize(self, _context: &()) -> CTree {
        if self.total_len > 0 {
            self.next_tree
        } else {
            self.prev_tree
        }
    }
}

impl<H: Hasher> CTreeBuilder<H> {
    fn new(prev_tree: &CTree, len: usize, first_block: bool, hasher: H) -> Self {
        let start = prev_tree.get_position();
        CTreeBuilder {
            left: prev_tree.left,
            right: prev_tree.right,
            prev_tree: prev_tree.clone(),
            next_tree: CTree::new(),
            start,
            total_len: len,
            depth: 0,
            offset: None,
            first_block,
            hasher,
        }
    }

    #[inline(always)]
    fn get_opt<'a>(
        commitments: &'a [Node],
        index: usize,
        offset: &'a Option<Node>,
    ) -> Option<&'a Node> {
        if offset.is_some() {
            if index > 0 {
                commitments.get(index - 1)
            } else {
                offset.as_ref()
            }
        } else {
            commitments.get(index)
        }
    }

    #[inline(always)]
    fn get<'a>(commitments: &'a [Node], index: usize, offset: &'a Option<Node>) -> &'a Node {
        Self::get_opt(commitments, index, offset).unwrap()
    }

    fn adjusted_start(&self, prev: &Option<Node>) -> usize {
        if prev.is_some() {
            self.start - 1
        } else {
            self.start
        }
    }
}

fn combine_level<H: Hasher>(
    commitments: &mut [Node],
    offset: Option<Node>,
    n: usize,
    depth: u8,
    hasher: &H,
) -> usize {
    assert_eq!(n % 2, 0);

    let nn = n / 2;
    let next_level = if nn > 100 {
        batch_level_combine(commitments, offset, nn, depth, hasher)
    } else {
        single_level_combine(commitments, offset, nn, depth, hasher)
    };

    commitments[0..nn].copy_from_slice(&next_level);
    nn
}

fn batch_level_combine<H: Hasher>(
    commitments: &mut [Node],
    offset: Option<Node>,
    nn: usize,
    depth: u8,
    hasher: &H,
) -> Vec<Node> {
    let hash_extended: Vec<_> = (0..nn)
        .into_par_iter()
        .map(|i| {
            hasher.node_combine_extended(
                depth,
                CTreeBuilder::<H>::get(commitments, 2 * i, &offset),
                CTreeBuilder::<H>::get(commitments, 2 * i + 1, &offset),
            )
        })
        .collect();
    hasher.normalize(&hash_extended)
}

fn single_level_combine<H: Hasher>(
    commitments: &mut [Node],
    offset: Option<Node>,
    nn: usize,
    depth: u8,
    hasher: &H,
) -> Vec<Node> {
    (0..nn)
        .into_par_iter()
        .map(|i| {
            hasher.node_combine(
                depth,
                CTreeBuilder::<H>::get(commitments, 2 * i, &offset),
                CTreeBuilder::<H>::get(commitments, 2 * i + 1, &offset),
            )
        })
        .collect()
}

struct WitnessBuilder<H: Hasher> {
    witness: Witness,
    p: usize,
    inside: bool,
    _phantom: PhantomData<H>,
}

impl<H: Hasher> WitnessBuilder<H> {
    fn new(tree_builder: &CTreeBuilder<H>, prev_witness: &Witness, count: usize) -> Self {
        let position = prev_witness.position;
        // log::info!("Witness::new - {} {},{}", position, tree_builder.start, tree_builder.start + count);
        let inside = position >= tree_builder.start && position < tree_builder.start + count;
        WitnessBuilder {
            witness: prev_witness.clone(),
            p: position,
            inside,
            _phantom: PhantomData::default(),
        }
    }
}

impl<H: Hasher> Builder for WitnessBuilder<H> {
    type Context = CTreeBuilder<H>;
    type Output = Witness;

    fn collect(&mut self, commitments: &[Node], context: &CTreeBuilder<H>) -> usize {
        let offset = context.offset;
        let depth = context.depth;

        let tree = &mut self.witness.tree;
        if self.inside {
            let rp = self.p - context.adjusted_start(&offset);
            if depth == 0 {
                if self.p % 2 == 1 {
                    tree.left = Some(*CTreeBuilder::<H>::get(commitments, rp - 1, &offset));
                    tree.right = Some(*CTreeBuilder::<H>::get(commitments, rp, &offset));
                } else {
                    tree.left = Some(*CTreeBuilder::<H>::get(commitments, rp, &offset));
                    tree.right = None;
                }
            } else if self.p % 2 == 1 {
                tree.parents
                    .push(Some(*CTreeBuilder::<H>::get(commitments, rp - 1, &offset)));
            } else if self.p != 0 {
                tree.parents.push(None);
            }
        }

        let right = if depth != 0 && !context.first_block {
            context.right
        } else {
            None
        };
        // println!("D {}", depth);
        // println!("O {:?}", offset.map(|r| hex::encode(r.repr)));
        // println!("R {:?}", right.map(|r| hex::encode(r.repr)));
        // for c in commitments.iter() {
        //     println!("{}", hex::encode(c.repr));
        // }
        let p1 = self.p + 1;
        // println!("P {} P1 {} S {} AS {}", self.p, p1, context.start, context.adjusted_start(&right));
        let has_p1 = p1 >= context.adjusted_start(&right) && p1 < context.start + commitments.len();
        if has_p1 {
            let p1 =
                CTreeBuilder::<H>::get(commitments, p1 - context.adjusted_start(&right), &right);
            if depth == 0 {
                if tree.right.is_none() {
                    self.witness.filled.push(*p1);
                }
            } else if depth as usize > tree.parents.len()
                || tree.parents[depth as usize - 1].is_none()
            {
                self.witness.filled.push(*p1);
            }
        }
        0
    }

    fn up(&mut self) {
        self.p /= 2;
    }

    fn finished(&self) -> bool {
        false
    }

    fn finalize(mut self, context: &CTreeBuilder<H>) -> Witness {
        if context.total_len == 0 {
            self.witness.cursor = CTree::new();

            let mut final_position = context.prev_tree.get_position() as u32;
            let mut witness_position = self.witness.tree.get_position() as u32;
            assert_ne!(witness_position, 0);
            witness_position -= 1;

            // look for first not equal bit in MSB order
            final_position = final_position.reverse_bits();
            witness_position = witness_position.reverse_bits();
            let mut bit: i32 = 31;
            // reverse bits because it is easier to do in LSB
            // it should not underflow because these numbers are not equal
            while bit >= 0 {
                if final_position & 1 != witness_position & 1 {
                    break;
                }
                final_position >>= 1;
                witness_position >>= 1;
                bit -= 1;
            }
            // look for the first bit set in final_position after
            final_position >>= 1;
            bit -= 1;
            while bit >= 0 {
                if final_position & 1 == 1 {
                    break;
                }
                final_position >>= 1;
                bit -= 1;
            }
            if bit >= 0 {
                self.witness.cursor = context.prev_tree.clone_trimmed(bit as usize)
            }
        }
        self.witness
    }
}

pub struct WarpProcessor<H> {
    prev_tree: CTree,
    prev_witnesses: Vec<Witness>,
    first_block: bool,
    hasher: H,
}

impl<H: Hasher> WarpProcessor<H> {
    pub fn new(hasher: H) -> WarpProcessor<H> {
        WarpProcessor {
            prev_tree: CTree::new(),
            prev_witnesses: vec![],
            first_block: true,
            hasher,
        }
    }

    pub fn initialize(&mut self, prev_tree: &CTree, prev_witnesses: &[Witness]) {
        self.first_block = true;
        self.prev_tree = prev_tree.clone();
        self.prev_witnesses = prev_witnesses.to_vec();
    }

    pub fn add_nodes(&mut self, nodes: &mut [Node], new_witnesses: &[Witness]) {
        log::info!("Adding {} cmx", nodes.len());
        if nodes.is_empty() {
            return;
        }
        self.prev_witnesses.extend_from_slice(new_witnesses);
        let (t, ws) = self.advance_tree(nodes);
        self.first_block = false;
        self.prev_tree = t;
        self.prev_witnesses = ws;
    }

    pub fn finalize(&mut self) -> (CTree, Vec<Witness>) {
        if self.first_block {
            (self.prev_tree.clone(), self.prev_witnesses.clone())
        } else {
            let (t, ws) = self.advance_tree(&mut []);
            (t, ws)
        }
    }

    fn advance_tree(&self, mut commitments: &mut [Node]) -> (CTree, Vec<Witness>) {
        let mut builder = CTreeBuilder::<H>::new(
            &self.prev_tree,
            commitments.len(),
            self.first_block,
            self.hasher.clone(),
        );
        let mut witness_builders: Vec<_> = self
            .prev_witnesses
            .iter()
            .map(|witness| WitnessBuilder::new(&builder, witness, commitments.len()))
            .collect();
        while !commitments.is_empty() || !builder.finished() {
            let n = builder.collect(commitments, &());
            for b in witness_builders.iter_mut() {
                b.collect(commitments, &builder);
            }
            let nn = combine_level(commitments, builder.offset, n, builder.depth, &self.hasher);
            builder.up();
            for b in witness_builders.iter_mut() {
                b.up();
            }
            commitments = &mut commitments[0..nn];
        }

        let witnesses = witness_builders
            .into_iter()
            .map(|b| b.finalize(&builder))
            .collect();
        let tree = builder.finalize(&());
        (tree, witnesses)
    }
}
