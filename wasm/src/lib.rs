mod utils;

use uuid::{NoContext, Timestamp, Uuid};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

#[wasm_bindgen]
pub struct Entity {
    current_hp: u32,
    total_hp: u32,
    attack: u32,
    name: String,
    // Adding an alive/dead state here might make things simpler
}

#[wasm_bindgen]
impl Entity {
    pub fn new(current_hp_val: u32, total_hp_val: u32, attack_val: u32, name_val: String) -> Entity {
        Entity {
            current_hp: current_hp_val,
            total_hp: total_hp_val,
            attack: attack_val,
            name: name_val,
        }
    }

    pub fn get_current_hp(&self) -> u32 {
        self.current_hp
    }

    pub fn get_total_hp(&self) -> u32 {
        self.total_hp
    }

    pub fn get_attack(&self) -> u32 {
        self.attack
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn set_current_hp(&mut self, new_hp: u32) {
        Self::reduce_current_hp(Self::borrow_current_hp(self), new_hp)
    }

    fn reduce_current_hp(current_hp: &mut u32, reduce_value: u32) {
        if reduce_value > *current_hp {
            *current_hp = 0;
            return
        }

        *current_hp = *current_hp - reduce_value
    }

    fn borrow_current_hp(&mut self) -> &mut u32 {
        &mut self.current_hp
    }
}

#[wasm_bindgen]
pub struct Class {
    name: String,
    health: Option<Health>
}

#[wasm_bindgen]
impl Class {
    pub fn new(name: String) -> Class {
        Class {
            name: name.clone(),
            health: Self::set_health(name)
        }       
    }

    fn set_health(name: String) -> Option<Health> {
        match name.as_str() {
            "Mage" => Some(Health{
                current: 40, 
                maximum: 40, 
                temporary: 0,
            }),
            "Thief" => Some(Health{
                current: 50, 
                maximum: 40, 
                temporary: 0,
            }),
            "Warrior" => Some(Health{
                current: 60, 
                maximum: 40, 
                temporary: 0,
            }),
            &_ => None
        }
    }
}

pub struct Health {
    current: u32,
    maximum: u32,
    temporary: u32,
}

impl Health {
    pub fn new(current: u32, maximum: u32, temporary: u32) -> Health {
        Health {
            current,
            maximum,
            temporary
        }
    }

    pub fn get_current(&self) -> u32 {
        self.current
    }

    pub fn get_maximum(&self) -> u32 {
        self.maximum
    }

    pub fn get_temporary(&self) -> u32 {
        self.temporary
    }

    pub fn set_temporary(&mut self, temporary: u32) {
        self.temporary = temporary
    }

    // TODO: Setting current health can be increase and/or decrease
}

pub struct Item {
    name: String,
    uuid: Uuid,
}

pub trait Unique {
    fn generate_uuid() -> Uuid;
}

impl Unique for Item {
    fn generate_uuid() -> Uuid {
        let ts = Timestamp::now(NoContext);
        return Uuid::new_v7(ts)
    }
}

impl Item {
    pub fn new(name: String) -> Item {
        Item {
            name,
            uuid: Item::generate_uuid()
        }
    }
}