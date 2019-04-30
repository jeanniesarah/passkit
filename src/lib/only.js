'use strict';

/**
 * Returns object with only selected properties
 *
 * @template T
 * @param {T} obj
 * @param {string[]} args
 * @returns {Partial<T>}
 */
function only(obj, ...args) {
  if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) return {};
  if (arguments.length === 1) return obj;
  const properties =
    /** @type {string[]} */ (args.length === 1
      ? Array.isArray(args[0])
        ? args[0]
        : String(args[0]).split(/\s+/)
      : args);
  const res = {};
  if (properties.length < 1) return res;
  Object.defineProperties(
    res,
    properties
      .filter(prop => obj.hasOwnProperty(prop))
      .reduce(
        (result, prop) => {
          result[prop] = Object.getOwnPropertyDescriptor(obj, prop);
          return result;
        },
        /** @type {PropertyDescriptorMap} */ ({}),
      ),
  );
  return res;
}
module.exports = only;