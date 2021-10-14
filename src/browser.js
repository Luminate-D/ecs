(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ECS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class Component {}
},{}],2:[function(require,module,exports){
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
},{"./entity":3,"./system":4}],3:[function(require,module,exports){
const Component = require('./component');

module.exports = class Entity {
    constructor(id) {
        if(isNaN(id)) throw new Error('Entity ID must be a Number');

        this.id = id;
        this.components = new Set();
    }

    addComponent(component) {
        if(!(component instanceof Component)) throw new Error('Argument must be a Component instance');
        this.components.add(component);
    }

    removeComponent(component) {
        if(!(component instanceof Component)) throw new Error('Argument must be a Component instance');
        this.components.remove(component);
    }

    hasComponent(component) {
        if(!Component.isPrototypeOf(component)) throw new Error('Argument must be a Component prototype');
        return Array.from(this.components).find(a => a instanceof component);
    }

    getComponent(component) {
        if(!Component.isPrototypeOf(component)) throw new Error('Argument must be a Component prototype');
        return Array.from(this.components).find(a => a instanceof component);
    }
}
},{"./component":1}],4:[function(require,module,exports){
module.exports = class System {
    filter(entity) { return true; }
    update(deltaTime, entities) {
        return true;
    }
}
},{}],5:[function(require,module,exports){
module.exports = {
    Entity: require('./models/entity'),
    Component: require('./models/component'),
    System: require('./models/system'),
    EntityComponentSystem: require('./models/ecs')
}
},{"./models/component":1,"./models/ecs":2,"./models/entity":3,"./models/system":4}]},{},[5])(5)
});
