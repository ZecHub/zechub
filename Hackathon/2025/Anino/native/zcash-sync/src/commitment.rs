use crate::chain::DecryptedNote;
use byteorder::WriteBytesExt;
use std::io::{Read, Write};
use zcash_encoding::{Optional, Vector};
use zcash_primitives::merkle_tree::{CommitmentTree, Hashable};
use zcash_primitives::sapling::Node;

/*
Same behavior and structure as CommitmentTree<Node> from librustzcash
It represents the data required to build a merkle path from a note commitment (leaf)
to the root.
The Merkle Path is the minimal set of nodes needed to recalculate the Merkle root
that includes our note.
It starts with our note commitment (because it is already a hash, it doesn't need
to be hashed). The value is stored in either `left` or `right` slot depending on the parity
of the note index. If there is a sibling, its value is in the other slot.
`parents` is the list of hashes that are siblings to the nodes along the path to the root.
If a hash has no sibling yet, then the parent is None. It means that the placeholder hash
value should be used there.

Remark: It's possible to have a grand parent but no parent.
 */
#[derive(Clone)]
pub struct CTree {
    pub(crate) left: Option<Node>,
    pub(crate) right: Option<Node>,
    pub(crate) parents: Vec<Option<Node>>,
}

/*
Witness is the data required to maintain the Merkle Path of a given note after more
notes are added.
Once a node has two actual children values (i.e. not a placeholder), its value
is constant because leaves can't change.
However, it doesn't mean that our Merkle Path is immutable. As the tree fills up,
previous entries that were None could end up getting a value.
- `tree` is the Merkle Path at the time the note is inserted. It does not change
- `filled` are the hash values that replace the "None" values in `tree`. It gets populated as
more notes are added and the sibling sub trees fill up
- `cursor` is a sibling subtree that is not yet full. It is tracked as a sub Merkle Tree

Example:
Let's say the `tree` has parents [ hash, None, hash ] and left = hash, right = None.
Based on this information, we know the position is 1010b = 10 (11th leaf)

                   o
           /              \
        hash              o
     /        \          /   \
    *          *        o     .
  /   \      /  \     /   \
  *    *    *    *  hash  o
 /\   /\   /\   /\   /\   /\
0  1 2  3 4  5 6  7 8  9 10 .

legend:
o is a hash value that we calculate as part of the merkle path verification
. is a placeholder hash and denotes a non existent node

We have two missing nodes (None):
- the `right` node,
- the 2nd parent

When node 11 comes, `filled` gets the value since it is filling the first None.
Then when node 12 comes, we are starting to fill a new sub tree in `cursor`
cursor -> left = 12, right = None, parents = []
After node 13, cursor continues to fill up:
cursor -> left = 12, right = 13, parents = []
With node 14, the cursor tree gains one level
cursor -> left = 14, right = None, parents = [hash(12,13)]
With node 15, the subtree is full, `filled` gets the value of the 2nd parent
and the cursor is empty
With node 16, the tree gains a level but `tree` remains the same (it is immutable).
Instead, a new cursor starts. Eventually, it fills up and a new value
gets pushed into `filled`.
*/
#[derive(Clone)]
pub struct Witness {
    pub position: usize,
    pub tree: CTree, // commitment tree at the moment the witness is created: immutable
    pub filled: Vec<Node>, // as more nodes are added, levels get filled up: won't change anymore
    pub cursor: CTree, // partial tree which still updates when nodes are added

    // not used for decryption but identifies the witness
    pub id_note: u32,
    pub note: Option<DecryptedNote>,
}

impl Witness {
    pub fn new(position: usize, id_note: u32, note: Option<DecryptedNote>) -> Witness {
        Witness {
            position,
            id_note,
            note,
            tree: CTree::new(),
            filled: vec![],
            cursor: CTree::new(),
        }
    }

    pub fn read<R: Read>(id_note: u32, mut reader: R) -> std::io::Result<Self> {
        let tree = CTree::read(&mut reader)?;
        let filled = Vector::read(&mut reader, |r| Node::read(r))?;
        let cursor = Optional::read(&mut reader, CTree::read)?;

        let mut witness = Witness {
            position: 0,
            id_note,
            tree,
            filled,
            cursor: cursor.unwrap_or_else(CTree::new),
            note: None,
        };
        witness.position = witness.tree.get_position() - 1;

        Ok(witness)
    }

    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        self.tree.write(&mut writer)?;
        Vector::write(&mut writer, &self.filled, |w, n| n.write(w))?;
        if self.cursor.left == None && self.cursor.right == None {
            writer.write_u8(0)?;
        } else {
            writer.write_u8(1)?;
            self.cursor.write(writer)?;
        };
        Ok(())
    }
}

impl CTree {
    pub fn new() -> CTree {
        CTree {
            left: None,
            right: None,
            parents: vec![],
        }
    }

    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        Optional::write(&mut writer, self.left, |w, n| n.write(w))?;
        Optional::write(&mut writer, self.right, |w, n| n.write(w))?;
        Vector::write(&mut writer, &self.parents, |w, e| {
            Optional::write(w, *e, |w, n| n.write(w))
        })
    }

    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let left = Optional::read(&mut reader, Node::read)?;
        let right = Optional::read(&mut reader, Node::read)?;
        let parents = Vector::read(&mut reader, |r| Optional::read(r, Node::read))?;

        Ok(CTree {
            left,
            right,
            parents,
        })
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

    pub fn clone_trimmed(&self, depth: usize) -> CTree {
        let mut tree = self.clone();
        tree.parents.truncate(depth);
        if let Some(None) = tree.parents.last() {
            // Remove trailing None
            tree.parents.truncate(depth - 1);
        }
        tree
    }

    pub fn to_commitment_tree(&self) -> CommitmentTree<Node> {
        let mut bb: Vec<u8> = vec![];
        self.write(&mut bb).unwrap();
        CommitmentTree::<Node>::read(&*bb).unwrap()
    }
}
