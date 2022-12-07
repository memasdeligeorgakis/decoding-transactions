mod utils;

use borsh::*;
use namada::types::token::Transfer;
use namada::types::transaction::TxResult;
use serde;
use serde::ser::Serialize;
use wasm_bindgen::prelude::JsValue;
use wasm_bindgen::prelude::*;

struct TransactionInBlock {
    pub gas_used: String,
    pub initialized_accounts: Vec<String>,
}

#[wasm_bindgen]
pub fn decode_transactions(transactions: &[u8]) -> JsValue {
    let tx_result_result = TxResult::try_from_slice(transactions);

    if let Ok(tx_result) = tx_result_result {
        return serde_wasm_bindgen::to_value(&tx_result.gas_used).unwrap();
    } else {
        let error_result =
            serde_wasm_bindgen::to_value("error @ namada-utils/src/lib.rs:decode_transaction");
        return error_result.unwrap();
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
