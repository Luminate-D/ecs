const Entity = require('./entity');
const System = require('./system');

module.exports = class EntityComponentSystem {
    constructor() {
        this.entities = new Set();
        this.systems = new Set();
    }

    update(deltaTime) {
        if(isNaN(deltaTime)) throw new Error('deltaTime must be a number, got:' + typeof deltaTime);
        for(let system of this.systems) {
            system.update(deltaTime, this.getEntities(system.filter));
        }
    }

    getEntities(filter) {
        if(typeof filter != 'function') throw new Error('Argument must be a function, got:' + typeof filter)
        return Array.from(this.entities).filter(filter);
    }

    addEntity(entity) {
        if(!(entity instanceof Entity)) throw new Error('Argument must be an Entity instance');
        this.entities.add(entity);
    }

    removeEntity(entity) {
        if(!(entity instanceof Entity)) throw new Error('Argument must be an Entity instance');
        this.entities.delete(entity);
    }

    getEntity(id) {
        if(isNaN(id)) throw new Error('id must be a number, got:' + typeof id);
        return Array.from(this.entities).find(entity => entity.id == id);
    }

    hasEntity(entity) {
        if(!(entity instanceof Entity)) throw new Error('Argument must be an Entity instance');
        return this.entities.has(entity);
    }

    addSystem(system) {
        if(!(system instanceof System)) throw new Error('Argument must be a System instance');
        this.systems.add(system);
    }

    removeSystem(system) {
        if(!(system instanceof System)) throw new Error('Argument must be a System instance');
        this.systems.delete(system);
    }

    getSystem(system) {
        if(!System.isPrototypeOf(system)) throw new Error('Argument must be a System prototype');
        return Array.from(this.systems).find(a => a instanceof system);
    }

    hasSystem(system) {
        if(!(system instanceof System)) throw new Error('Argument must be a System instance');
        return this.systems.has(system);
    }
}