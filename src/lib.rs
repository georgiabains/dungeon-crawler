use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sum_test(a: usize, b: usize) -> usize {
    return a + b;
}