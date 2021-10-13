# EntityComponentSystem
Install using this command:
```sh
$ npm install @luminate-d/ecs
```

### Usage example
```js
const ECS = require('@luminate-d/ecs'); // Import library

// Create custom component
class MyComponent extends ECS.Component {
    constructor() {
        this.something = true;
    }
}

// Create custom system
class MySystem extends ECS.System {
    filter(entity) { // filter what entities system will handle
        if(entity.hasComponent(MyComponent)) return true;
        return false;
    }
    
    update(deltaTime, entities) {
        entities.forEach(entity => {
            console.log('Updating entity', entity);
        });
    }
}
const ecs = new ECS.EntityComponentSystem(); // create ecs instance
const system = new MySystem(); // create system instance

ecs.addSystem(system); // add system to ecs

let idCounter = 0;
const entity = new ECS.Entity(idCounter++); // create entity
entity.addComponent(new MyComponent()); // add component to entity
system.addEntity(entity); // add entity to the system

// update system
let lastUpdate = Date.now();
setInterval(() => {
    let delta = lastUpdate - Date.now();
    lastUpdate = Date.now();
    
    ecs.update(delta);
}, 1000 / 60);
```

### Documentation
### Entity
`entity.id` - Id of the entity
`entity.components` - Components attached to the entity

`entity.addComponent(component: Component)` - Attach component instance to the entity
`entity.removeComponent(component: Component)` - Remove component from entity
`entity.hasComponent(component: Type<Component>): boolean` - Does entity contain this component
`entity.getComponent(component: Type<Component>): Component` - Returns component attached to the entity if it is present

### System
`system.filter(entity: Entity): boolean` - Returns true when system **will** handle this entity
`system.update(deltaTime: number, entities: Set<Entity> | Array<Entity>)` - Updates each entity

### EntityComponentSystem

`ecs.entities` - Set of entities added to ECS
`ecs.systems` - Set of systems added to ECS

`ecs.update(deltaTime: number)` - Update each system with only entities they can handle
`ecs.getEntities(filter: () => boolean): Array<Entity>` - Returns filtered entities
`ecs.addEntity(entity: Entity)` - Add entity to the ECS
`ecs.removeEntity(entity: Entity)` - Remove entity from the ECS
`ecs.getEntity(id: number): Entity | null` - Returns entity by id if its present
`ecs.hasEntity(entity: Entity): boolean` - Does ECS contain entity

`ecs.addSystem(system: System)` - Add system to ECS
`ecs.removeSystem(system: System)` - Remove system from ECS
`ecs.hasSystem(system: System): boolean` - Does ECS contain system
`ecs.getSystem(system: Type<System>): System | null` - Returns system if its present inside ecs
