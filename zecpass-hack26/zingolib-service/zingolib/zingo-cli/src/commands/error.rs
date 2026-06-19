//! Errors associated with the commands interface

use std::fmt;

#[derive(Debug)]
pub(crate) enum CommandError {
    ArgsNotJson(json::Error),
    ArgNotJsonOrValidAddress,
    SingleArgNotJsonArray(String),
    JsonArrayNotObj(String),
    EmptyJsonArray,
    ParseIntFromString(std::num::ParseIntError),
    UnexpectedType(String),
    MissingKey(String),
    InvalidArguments,
    IncompatibleMemo,
    InvalidMemo(String),
    NonJsonNumberForAmount(String),
    ConversionFailed(zingolib::utils::error::ConversionError),
    MissingZenniesForZingoFlag,
    ZenniesFlagNonBool(String),
}

impl fmt::Display for CommandError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        use CommandError::{
            ArgNotJsonOrValidAddress, ArgsNotJson, ConversionFailed, EmptyJsonArray,
            IncompatibleMemo, InvalidArguments, InvalidMemo, JsonArrayNotObj, MissingKey,
            MissingZenniesForZingoFlag, NonJsonNumberForAmount, ParseIntFromString,
            SingleArgNotJsonArray, UnexpectedType, ZenniesFlagNonBool,
        };

        match self {
            ArgsNotJson(e) => write!(f, "failed to parse argument. {e}"),
            ArgNotJsonOrValidAddress => write!(
                f,
                "argument cannot be converted to a valid address or parsed as json."
            ),
            SingleArgNotJsonArray(e) => {
                write!(f, "argument cannot be parsed to a json array. {e}")
            }
            JsonArrayNotObj(e) => {
                write!(f, "argument cannot be a json array. {e}")
            }
            ZenniesFlagNonBool(e) => {
                write!(f, "Argument must be a JSON bool. {e}")
            }
            EmptyJsonArray => write!(f, "json array has no arguments"),
            ParseIntFromString(e) => write!(f, "failed to parse argument. {e}"),
            UnexpectedType(e) => write!(f, "arguments cannot be parsed to expected type. {e}"),
            MissingKey(key) => write!(f, "json array is missing \"{key}\" key."),
            InvalidArguments => write!(f, "arguments given are invalid."),
            IncompatibleMemo => {
                write!(f, "memo's cannot be sent to transparent addresses.")
            }
            InvalidMemo(e) => write!(f, "failed to interpret memo. {e}"),
            NonJsonNumberForAmount(e) => write!(f, "invalid argument. expected a number. {e}"),
            ConversionFailed(e) => write!(f, "conversion failed. {e}"),
            MissingZenniesForZingoFlag => {
                write!(f, "Zennies flag must be set to 'true' or 'false'.")
            }
        }
    }
}

impl std::error::Error for CommandError {}
