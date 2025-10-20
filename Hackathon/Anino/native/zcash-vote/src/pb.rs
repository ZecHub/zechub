#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Candidate {
    #[prost(string, tag="1")]
    pub address: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub choice: ::prost::alloc::string::String,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Election {
    #[prost(string, tag="1")]
    pub name: ::prost::alloc::string::String,
    #[prost(uint32, tag="2")]
    pub start_height: u32,
    #[prost(uint32, tag="3")]
    pub end_height: u32,
    #[prost(string, tag="4")]
    pub question: ::prost::alloc::string::String,
    #[prost(message, repeated, tag="5")]
    pub candidates: ::prost::alloc::vec::Vec<Candidate>,
    #[prost(bool, tag="6")]
    pub signature_required: bool,
}
