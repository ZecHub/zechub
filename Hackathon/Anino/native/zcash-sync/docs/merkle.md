The Zcash Merkle Tree is built by putting note commitments as leaves and then combining nodes using a Pedersen Hash function.

**Notes never change**. Therefore once a node has both children, its value will remain constant.

Lastly, notes are always added at the end. 

We are only interested in tracking our notes because we don't
need to validate transactions. We could check that the tree
is valid, i.e. the root matches the value published in the 
block header but that's not a requirement.

> We must be able to compute the Merkle Path of our tracked notes at the current block height.
