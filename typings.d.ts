interface Type<T> extends Function { new (...args: any[]): T; }
type Nullable<T> = T | null;

export interface Component {}

export class Entity {
    public id: number;
    public components: Set<Component>;

    public constructor(id: number);

    public addComponent(component: Component): void;
    public removeComponent(component: Component): void;
    public hasComponent(component: Type<Component>): boolean;
    public getComponent(component: Type<Component>): Component;

}

export class System {
    public filter(entity: Entity): boolean;
    public update(deltaTime: number, entities: Set<Entity> | Array<Entity>): void;
}

export class EntityComponentSystem {
    public entities: Set<Entity>;
    public systems: Set<System>;

    public update(deltaTime: number): void;

    public getEntities(filter: () => boolean): Array<Entity>;
    public addEntity(entity: Entity): void;
    public removeEntity(entity: Entity): void;
    public getEntity(id: number): Nullable<Entity>;
    public hasEntity(entity: Entity): boolean;

    public addSystem(system: System): void;
    public removeSystem(system: System): void;
    public hasSystem(system: System): boolean;
    public getSystem(system: Type<System>): System;
}