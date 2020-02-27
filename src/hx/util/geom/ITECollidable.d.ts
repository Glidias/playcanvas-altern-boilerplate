
import systems_collisions_ITCollidable from "./../../systems/collisions/ITCollidable";
import systems_collisions_IECollidable from "./../../systems/collisions/IECollidable";

declare namespace util.geom {

interface ITECollidable extends systems_collisions_ITCollidable, systems_collisions_IECollidable {

}

}

export default ITECollidable;