//! Contains structs for querying a database about notes.

use zcash_protocol::{PoolType, ShieldedProtocol};

/// Selects received notes by how they been spent
#[derive(Clone, Copy)]
pub struct OutputSpendStatusQuery {
    /// will the query include unspent notes?
    pub unspent: bool,
    /// will the query include `pending_spent` notes?
    pub pending_spent: bool,
    /// will the query include spent notes?
    pub spent: bool,
}
impl OutputSpendStatusQuery {
    /// a query that accepts notes of any spent status
    #[must_use]
    pub fn any() -> Self {
        Self {
            unspent: true,
            pending_spent: true,
            spent: true,
        }
    }
    /// a query that only accepts unspent notes
    #[must_use]
    pub fn only_unspent() -> Self {
        Self {
            unspent: true,
            pending_spent: false,
            spent: false,
        }
    }
    /// a query that only accepts `pending_spent` notes
    #[must_use]
    pub fn only_pending_spent() -> Self {
        Self {
            unspent: false,
            pending_spent: true,
            spent: false,
        }
    }
    /// a query that only accepts spent notes
    #[must_use]
    pub fn only_spent() -> Self {
        Self {
            unspent: false,
            pending_spent: false,
            spent: true,
        }
    }
    /// a query that accepts `pending_spent` or spent notes
    #[must_use]
    pub fn spentish() -> Self {
        Self {
            unspent: false,
            pending_spent: true,
            spent: true,
        }
    }
}

/// Selects received notes by pool
#[derive(Clone, Copy)]
pub struct OutputPoolQuery {
    /// will the query include transparent coins?
    pub transparent: bool,
    /// will the query include sapling notes?
    pub sapling: bool,
    /// will the query include orchard notes?
    pub orchard: bool,
}
impl OutputPoolQuery {
    /// a query that accepts outputs from any pool.
    #[must_use]
    pub fn any() -> Self {
        Self {
            transparent: true,
            sapling: true,
            orchard: true,
        }
    }
    /// a query that accepts notes from a shielded pool.
    #[must_use]
    pub fn shielded() -> Self {
        Self {
            transparent: false,
            sapling: true,
            orchard: true,
        }
    }
    /// a query that will match only a specific pool.
    #[must_use]
    pub fn one_pool(pool_type: PoolType) -> Self {
        match pool_type {
            PoolType::Transparent => Self {
                transparent: true,
                sapling: false,
                orchard: false,
            },
            PoolType::Shielded(ShieldedProtocol::Sapling) => Self {
                transparent: false,
                sapling: true,
                orchard: false,
            },
            PoolType::Shielded(ShieldedProtocol::Orchard) => Self {
                transparent: false,
                sapling: false,
                orchard: true,
            },
        }
    }
}

/// Selects received notes by any properties
#[derive(Clone, Copy)]
pub struct OutputQuery {
    /// selects spend status properties
    /// the query is expected to match note with ANY of the specified `spend_stati` AND ANY of the specified pools
    pub spend_status: OutputSpendStatusQuery,
    /// selects pools
    pub pools: OutputPoolQuery,
}

impl OutputQuery {
    /// a query that accepts all notes.
    #[must_use]
    pub fn any() -> Self {
        Self {
            spend_status: OutputSpendStatusQuery::any(),
            pools: OutputPoolQuery::any(),
        }
    }
    /// a query that accepts all notes.
    #[must_use]
    pub fn only_unspent() -> Self {
        Self {
            spend_status: OutputSpendStatusQuery {
                unspent: true,
                pending_spent: false,
                spent: false,
            },
            pools: OutputPoolQuery::any(),
        }
    }

    /// build a query, specifying each stipulation
    #[must_use]
    pub fn stipulations(
        unspent: bool,
        pending_spent: bool,
        spent: bool,
        transparent: bool,
        sapling: bool,
        orchard: bool,
    ) -> Self {
        Self {
            spend_status: OutputSpendStatusQuery {
                unspent,
                pending_spent,
                spent,
            },
            pools: OutputPoolQuery {
                transparent,
                sapling,
                orchard,
            },
        }
    }
    /// will the query include unspent notes?
    #[must_use]
    pub fn unspent(&self) -> bool {
        self.spend_status.unspent
    }
    /// will the query include `pending_spent` notes?
    #[must_use]
    pub fn pending_spent(&self) -> bool {
        self.spend_status.pending_spent
    }
    /// will the query include spent notes?
    #[must_use]
    pub fn spent(&self) -> bool {
        self.spend_status.spent
    }
    /// will the query include transparent notes? (coins)
    #[must_use]
    pub fn transparent(&self) -> bool {
        self.pools.transparent
    }
    /// will the query include sapling notes?
    #[must_use]
    pub fn sapling(&self) -> bool {
        self.pools.sapling
    }
    /// will the query include orchard notes?
    #[must_use]
    pub fn orchard(&self) -> bool {
        self.pools.orchard
    }
}
