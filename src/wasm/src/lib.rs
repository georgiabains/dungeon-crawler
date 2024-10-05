mod utils;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

type EntityIndex = usize;

/**
 * Components.
 * - Add in alphabetical order.
 */
struct Attack(u64);
struct Attributes {
    dexterity: usize,
    strength: usize,
}
struct Class(&'static str);
struct CombatCoordinate {
    x: u16,
    y: u16,
}
struct Defence(u64);
struct GearSlot(&'static str); // TODO: Figure out how to store slot. Needs to allow different positions on the body.
struct Health {
    current: f32,
    maximum: f32,
    temporary: f32,
}
struct Inventory(Vec<EntityIndex>); // TODO: Needs to be list of Item Entities only (or references to Item Entities)
struct IsConsumable(bool);
struct IsEnemy(bool);
struct IsEquippable(bool);
struct IsEquipped(bool);
struct IsPlaceable(bool);
struct IsPlayer(bool);
struct Mana(u64);
struct Name(&'static str);
struct Personality(&'static str); // TODO: Maybe splitting into separate bools makes more sense, but I'll do this for now.
struct Skill(&'static str); // TODO: This doesn't feel right. Should there by an Entity called Input? IDK.
struct Thumbnail(bool); // TODO: Figure out image storage.

/**
 * Systems.
 * - Add in alphabetical order.
 */

/**
 * Game State.
 * - Game logic.
 */

struct GameState {

    /**
     * Entities.
     */
    characters: Vec<EntityIndex>,
    items: Vec<EntityIndex>,

    /**
     * Components.
     */
    attack_components: Vec<Option<Attack>>,
    attributes_components: Vec<Option<Attributes>>,
    class_components: Vec<Option<Class>>,
    combat_coordinate_components: Vec<Option<CombatCoordinate>>,
    defence_components: Vec<Option<Defence>>,
    gear_slot_components: Vec<Option<GearSlot>>,
    health_components: Vec<Option<Health>>,
    inventory_components: Vec<Option<Inventory>>,
    is_consumable_components: Vec<Option<IsConsumable>>,
    is_enemy_components: Vec<Option<IsEnemy>>,
    is_equippable_components: Vec<Option<IsEquippable>>,
    is_equipped_components: Vec<Option<IsEquipped>>,
    is_placeable_components: Vec<Option<IsPlaceable>>,
    is_player_components: Vec<Option<IsPlayer>>,
    mana_components: Vec<Option<Mana>>,
    name_components: Vec<Option<Name>>,
    personality_components: Vec<Option<Personality>>,
    skill_components: Vec<Option<Skill>>,
    thumbnail_components: Vec<Option<Thumbnail>>,
}