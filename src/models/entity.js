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