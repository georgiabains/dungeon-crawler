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
struct DifficultyModifier(f32); // Player-selected; 0 is easiest
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
#[wasm_bindgen]
struct Name(String);
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
 */
#[wasm_bindgen]
 pub struct GameState {
    entityCounter: EntityIndex,

    /**
     * Entities.
     */
    entities: Vec<EntityIndex>,

    /**
     * Components.
     */
    // All of these component vecs must be the same length, which is the current
    // number of entities.
    action_components: Vec<Option<Action>>,
    attack_components: Vec<Option<Attack>>,
    attributes_components: Vec<Option<Attributes>>,
    class_components: Vec<Option<Class>>,
    combat_coordinate_components: Vec<Option<CombatCoordinate>>,
    defence_components: Vec<Option<Defence>>,
    difficulty_components: Vec<Option<Difficulty>>,
    difficulty_modifier_components: Vec<Option<DifficultyModifier>>,
    equipped_components: Vec<Option<Equipped>>,
    gear_slot_components: Vec<Option<GearSlot>>,
    health_components: Vec<Option<Health>>,
    inventory_components: Vec<Option<Inventory>>,
    is_consumable_components: Vec<Option<IsConsumable>>,
    is_enemy_components: Vec<Option<IsEnemy>>,
    is_equippable_components: Vec<Option<IsEquippable>>,
    is_placeable_components: Vec<Option<IsPlaceable>>,
    is_player_components: Vec<Option<IsPlayer>>,
    is_targetable_components: Vec<Option<IsTargetable>>,
    items_on_death_components: Vec<Option<ItemsOnDeath>>,
    level_components: Vec<Option<Level>>,
    mana_components: Vec<Option<Mana>>,
    name_components: Vec<Option<Name>>,
    personality_components: Vec<Option<Personality>>,
    thumbnail_components: Vec<Option<Thumbnail>>,
    value_components: Vec<Option<Value>>,
    weight_components: Vec<Option<Weight>>,
    xp_components: Vec<Option<Xp>>,

    // char 0
    // attack_components[0] = attack value for character at characters[0]
}

#[wasm_bindgen]
impl GameState {
    pub fn new() -> GameState {
        GameState {
            entityCounter: 0,
            entities: Vec::<EntityIndex>::new(),
            action_components: Vec::<Option<Action>>::new(),
            attack_components: Vec::<Option<Attack>>::new(),
            attributes_components: Vec::<Option<Attributes>>::new(),
            class_components: Vec::<Option<Class>>::new(),
            combat_coordinate_components: Vec::<Option<CombatCoordinate>>::new(),
            defence_components: Vec::<Option<Defence>>::new(),
            difficulty_components: Vec::<Option<Difficulty>>::new(),
            difficulty_modifier_components: Vec::<Option<DifficultyModifier>>::new(),
            equipped_components: Vec::<Option<Equipped>>::new(),
            gear_slot_components: Vec::<Option<GearSlot>>::new(),
            health_components: Vec::<Option<Health>>::new(),
            inventory_components: Vec::<Option<Inventory>>::new(),
            is_consumable_components: Vec::<Option<IsConsumable>>::new(),
            is_enemy_components: Vec::<Option<IsEnemy>>::new(),
            is_equippable_components: Vec::<Option<IsEquippable>>::new(),
            is_placeable_components: Vec::<Option<IsPlaceable>>::new(),
            is_player_components: Vec::<Option<IsPlayer>>::new(),
            is_targetable_components: Vec::<Option<IsTargetable>>::new(),
            items_on_death_components: Vec::<Option<ItemsOnDeath>>::new(),
            level_components: Vec::<Option<Level>>::new(),
            mana_components: Vec::<Option<Mana>>::new(),
            name_components: Vec::<Option<Name>>::new(),
            personality_components: Vec::<Option<Personality>>::new(),
            thumbnail_components: Vec::<Option<Thumbnail>>::new(),
            value_components: Vec::<Option<Value>>::new(),
            weight_components: Vec::<Option<Weight>>::new(),
            xp_components: Vec::<Option<Xp>>::new(),
        }
    }

    pub fn get_entities(&self) -> Vec<EntityIndex> {
        println!("{:?}", &self.entities);
        self.entities.clone()
    }

    pub fn add_entity(&mut self) {
        // push number to `entities`
        self.entities.push(self.entityCounter);
        self.entityCounter += 1;

        // push None to all components to reserve that spot for valid data
        self.action_components.push(None);
        self.attack_components.push(None);
        self.attributes_components.push(None);
        self.class_components.push(None);
        self.combat_coordinate_components.push(None);
        self.defence_components.push(None);
        self.difficulty_modifier_components.push(None);
        self.equipped_components.push(None);
        self.gear_slot_components.push(None);
        self.health_components.push(None);
        self.inventory_components.push(None);
        self.is_consumable_components.push(None);
        self.is_enemy_components.push(None);
        self.is_equippable_components.push(None);
        self.is_placeable_components.push(None);
        self.is_player_components.push(None);
        self.is_targetable_components.push(None);
        self.items_on_death_components.push(None);
        self.level_components.push(None);
        self.mana_components.push(None);
        self.name_components.push(None);
        self.personality_components.push(None);
        self.thumbnail_components.push(None);
        self.value_components.push(None);
        self.weight_components.push(None);
        self.xp_components.push(None);
    }

    // very specfic example
    pub fn add_name_to_entity(&mut self, entity_index: usize, name: String) {
        let new_name = Name(name);
        self.name_components[entity_index] = Some(new_name);
    }
}