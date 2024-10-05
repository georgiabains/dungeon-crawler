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
struct Action(&'static str);
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
struct Difficulty(u16); // My decision on what enemies are harder than others; apply to each entitity differently based on Class
struct DifficultyModifier(f16); // Player-selected; 0 is easiest
struct GearSlot(&'static str); // TODO: Figure out how to store slot. Needs to allow different positions on the body.
struct Health {
    current: f32,
    maximum: f32,
    temporary: f32,
}
// Faction? IsLeader? HasLeader?
struct Equipped(Vec<EntityIndex>);
struct Inventory(Vec<EntityIndex>);
struct IsConsumable(bool);
struct IsEnemy(bool);
struct IsEquippable(bool);
struct IsPlaceable(bool);
struct IsPlayer(bool);
struct IsTargetable(bool);
struct ItemsOnDeath(Vec<EntityIndex>);
struct Level(u32);
struct Mana(u64);
struct Name(&'static str);
struct Personality(&'static str); // TODO: Maybe splitting into separate bools makes more sense, but I'll do this for now.
struct Thumbnail(bool); // TODO: Figure out image storage.
struct Value(u64); // Gold
struct Weight(u64);
struct Xp(u32);

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
    entities: Vec<EntityIndex>,

    /**
     * Components.
     */
    // All of these component vecs must be the same length, which is the current
    // number of entities.
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

    // char 0
    // attack_components[0] = attack value for character at characters[0]

}