import router from './router';
import store from './store';

/**
 * It takes a module name and a module object as arguments. If the module object has a store property,
 * it registers the store with the store module. If the module object has a router property, it
 * registers the router with the router module
 * @param name - The name of the module.
 * @param module - The module object that you want to register.
 */
const registerModule = (name, module) => {
  if (module.store) {
    store.registerModule(name, module.store);
  }

  if (module.router) {
    module.router(router);
  }
};

/**
 * It takes in an object of modules and registers them with the store.
 * @param modules - an object containing the modules to register.
 */
export const registerModules = (modules) => {
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey];
    registerModule(moduleKey, module);
  });
};
