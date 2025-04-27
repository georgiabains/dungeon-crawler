mod utils;

use bevy::prelude::App;
use bevy::prelude::Commands;
use bevy::prelude::Component;
use bevy::app::Startup;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

/**
 * New Game.
 */
#[wasm_bindgen]
pub fn new_game() {
    println!("new game");
    App::new()
        .add_systems(Startup, create_player)
        .run();
}

type EntityIndex = usize;

/**
 * Components.
 * - Add in alphabetical order.
 */
#[derive(Component)]
struct Action(&'static str);

#[derive(Component)]
struct Attack(u64);

#[derive(Component)]
struct Attributes {
    dexterity: usize,
    strength: usize,
}

#[derive(Component)]
struct Class(&'static str);

#[derive(Component)]
struct CombatCoordinate {
    x: u16,
    y: u16,
}

#[derive(Component)]
struct Defence(u64);

#[derive(Component)]
struct Difficulty(u16); // My decision on what enemies are harder than others; apply to each entitity differently based on Class

#[derive(Component)]
struct DifficultyModifier(f32); // Player-selected; 0 is easiest

#[derive(Component)]
struct GearSlot(&'static str); // TODO: Figure out how to store slot. Needs to allow different positions on the body.

#[derive(Component)]
struct Health {
    current: f32,
    maximum: f32,
    temporary: f32,
}
// Faction? IsLeader? HasLeader?

#[derive(Component)]
struct Equipped(Vec<EntityIndex>);

#[derive(Component)]
struct Inventory(Vec<EntityIndex>);

#[derive(Component)]
struct IsConsumable(bool);

#[derive(Component)]
struct IsEnemy(bool);

#[derive(Component)]
struct IsEquippable(bool);

#[derive(Component)]
struct IsPlaceable(bool);

#[derive(Component)]
struct IsPlayer(bool);

#[derive(Component)]
struct IsTargetable(bool);

#[derive(Component)]
struct ItemsOnDeath(Vec<EntityIndex>);

#[derive(Component)]
struct Level(u32);

#[derive(Component)]
struct Mana(u64);

#[derive(Component)]
struct Name(String);

#[derive(Component)]
struct Personality(&'static str); // TODO: Maybe splitting into separate bools makes more sense, but I'll do this for now.

#[derive(Component)]
struct Thumbnail(bool); // TODO: Figure out image storage.

#[derive(Component)]
struct Value(u64); // Gold

#[derive(Component)]
struct Weight(u64);

#[derive(Component)]
struct Xp(u32);

/**
 * Bundles.
 * - Helpful groups of components for spawning Entities.
 * - Not for querying.
 * - Add in alphabetical order.
 */

/**
 * Systems.
 * - Add in alphabetical order.
 */
fn create_player(mut commands: Commands) {
    println!("test");
    commands.spawn(IsPlayer(true));
}