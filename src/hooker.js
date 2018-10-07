
const debounceQueue = [];

/**
 * This allows for easy hooking of RPG Maker MV events.
 * While not having to copy them to your own commands!
 *
 * @param className
 * @param methodName
 * @param before
 * @param after
 */
export default function hooker(className, methodName, before, after) {
    if (!window[className]) {
        throw "Class does not exist";
    }
    let classContext = window[className];
    if (!classContext.prototype[methodName]) {
        throw "Method does not exist in the class prototype";
    }

    let original = classContext.prototype[methodName];
    classContext.prototype[methodName] = function () {
        if (!!before) {
            before.apply(this, arguments);
        }
        original.apply(this, arguments);
        if (!!after) {
            after.apply(this, arguments);
        }
    }
}

