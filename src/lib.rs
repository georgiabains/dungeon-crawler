use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_test() -> String {
    "Hello from wasm! test".to_string()
}

type EntityIndex = usize;

struct Attack(u64);

#[wasm_bindgen]
struct Name(String);

#[wasm_bindgen]
pub struct GameState {
    entityCounter: EntityIndex,
    entities: Vec<EntityIndex>,
    name_components: Vec<Option<Name>>
}

#[wasm_bindgen]
impl GameState {
    #[wasm_bindgen(constructor)]
    pub fn new() -> GameState {
        GameState {
            entityCounter: 0,
            entities: Vec::<EntityIndex>::new(),
            name_components: Vec::<Option<Name>>::new()
        }
    }

    #[wasm_bindgen]
    pub fn get_entities(&self) -> Vec<EntityIndex> {
        println!("{:?}", &self.entities);
        self.entities.clone()
    }

    #[wasm_bindgen]
    pub fn add_entity(&mut self) {
        self.name_components.push(None)
    }

    #[wasm_bindgen]
    pub fn add_name_to_entity(&mut self, entity_index: usize, name: String) {
        let new_name = Name(name);
        self.name_components[entity_index] = Some(new_name);
    }
}