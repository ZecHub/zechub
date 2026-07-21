#![allow(missing_docs)]
#![forbid(unsafe_code)]
//! `ZingoLib`
//! Zingo backend library

use crate::config::ChainType;

pub mod config;
pub mod data;
pub mod lightclient;
pub mod utils;
pub mod wallet;

#[cfg(test)]
pub mod mocks;
#[cfg(any(test, feature = "testutils"))]
pub mod testutils;

pub use zingo_common_components::protocol::ActivationHeights;

// This line includes the generated `git_description()` function directly into this scope.
include!(concat!(env!("OUT_DIR"), "/git_description.rs"));

#[macro_use]
extern crate rust_embed;
/// Embedded zcash-params.
#[derive(RustEmbed)]
#[folder = "zcash-params/"]
pub struct SaplingParams;

/// Developer donation address
pub const DEVELOPER_DONATION_ADDRESS: &str = "u1w47nzy4z5g9zvm4h2s4ztpl8vrdmlclqz5sz02742zs5j3tz232u4safvv9kplg7g06wpk5fx0k0rx3r9gg4qk6nkg4c0ey57l0dyxtatqf8403xat7vyge7mmen7zwjcgvryg22khtg3327s6mqqkxnpwlnrt27kxhwg37qys2kpn2d2jl2zkk44l7j7hq9az82594u3qaescr3c9v";
/// Zennies for zingo donation address
pub const ZENNIES_FOR_ZINGO_DONATION_ADDRESS: &str = "u1p32nu0pgev5cr0u6t4ja9lcn29kaw37xch8nyglwvp7grl07f72c46hxvw0u3q58ks43ntg324fmulc2xqf4xl3pv42s232m25vaukp05s6av9z76s3evsstax4u6f5g7tql5yqwuks9t4ef6vdayfmrsymenqtshgxzj59hdydzygesqa7pdpw463hu7afqf4an29m69kfasdwr494";
/// Zennies for zingo donation address (testnet)
pub const ZENNIES_FOR_ZINGO_TESTNET_ADDRESS: &str = "utest19zd9laj93deq4lkay48xcfyh0tjec786x6yrng38fp6zusgm0c84h3el99fngh8eks4kxv020r2h2njku6pf69anpqmjq5c3suzcjtlyhvpse0aqje09la48xk6a2cnm822s2yhuzfr47pp4dla9rakdk90g0cee070z57d3trqk87wwj4swz6uf6ts6p5z6lep3xyvueuvt7392tww";
/// Zennies for zingo donation address (regtest)
pub const ZENNIES_FOR_ZINGO_REGTEST_ADDRESS: &str = "uregtest14emvr2anyul683p43d0ck55c04r65ld6f0shetcn77z8j7m64hm4ku3wguf60s75f0g3s7r7g89z22f3ff5tsfgr45efj4pe2gyg5krqp5vvl3afu0280zp9ru2379zat5y6nkqkwjxsvpq5900kchcgzaw8v8z3ggt5yymnuj9hymtv3p533fcrk2wnj48g5vg42vle08c2xtanq0e";
/// Zennies for zingo donation amount
pub const ZENNIES_FOR_ZINGO_AMOUNT: u64 = 1_000_000;

/// Gets the appropriate zennies for zingo donation address for the given chain type.
#[must_use]
pub fn get_zennies_for_zingo_address(chain_type: ChainType) -> &'static str {
    match chain_type {
        ChainType::Mainnet => ZENNIES_FOR_ZINGO_DONATION_ADDRESS,
        ChainType::Testnet => ZENNIES_FOR_ZINGO_TESTNET_ADDRESS,
        ChainType::Regtest(_) => ZENNIES_FOR_ZINGO_REGTEST_ADDRESS,
    }
}
