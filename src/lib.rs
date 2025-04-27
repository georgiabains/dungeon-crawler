use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_test() -> String {
    "Hello from wasm! test".to_string()
}