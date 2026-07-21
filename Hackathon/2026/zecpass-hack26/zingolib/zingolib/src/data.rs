//! This is a mod for data structs that will be used across all sections of zingolib.

pub mod proposal;

/// Return type for fns that poll the status of task handles.
pub enum PollReport<T, E> {
    /// Task has not been launched.
    NoHandle,
    /// Task is not complete.
    NotReady,
    /// Task has completed successfully or failed.
    Ready(Result<T, E>),
}

/// transforming data related to the destination of a send.
pub mod receivers {
    use zcash_address::ZcashAddress;
    use zcash_client_backend::zip321::Payment;
    use zcash_client_backend::zip321::TransactionRequest;
    use zcash_client_backend::zip321::Zip321Error;
    use zcash_protocol::memo::MemoBytes;
    use zcash_protocol::value::Zatoshis;

    /// A list of Receivers
    pub type Receivers = Vec<Receiver>;

    /// The superficial representation of the the consumer's intended receiver
    #[derive(Clone, Debug, PartialEq)]
    pub struct Receiver {
        pub recipient_address: ZcashAddress,
        pub amount: Zatoshis,
        pub memo: Option<MemoBytes>,
    }
    impl Receiver {
        /// Create a new Receiver
        pub(crate) fn new(
            recipient_address: ZcashAddress,
            amount: Zatoshis,
            memo: Option<MemoBytes>,
        ) -> Self {
            Self {
                recipient_address,
                amount,
                memo,
            }
        }
    }
    impl From<Receiver> for Payment {
        fn from(receiver: Receiver) -> Self {
            Payment::new(
                receiver.recipient_address,
                Some(receiver.amount),
                receiver.memo,
                None,
                None,
                vec![],
            )
            .expect("memo compatibility checked in 'parse_send_args'")
        }
    }

    /// Creates a [`zcash_client_backend::zip321::TransactionRequest`] from receivers.
    /// Note this fn is called to calculate the `spendable_shielded` balance
    /// shielding and TEX should be handled mutually exclusively
    pub fn transaction_request_from_receivers(
        receivers: Receivers,
    ) -> Result<TransactionRequest, Zip321Error> {
        // If this succeeds:
        //  * zingolib learns whether there is a TEX address
        //  * if there's a TEX address it's readable.
        let payments = receivers
            .into_iter()
            .map(std::convert::Into::into)
            .collect();

        TransactionRequest::new(payments)
    }
}
