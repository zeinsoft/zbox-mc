import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import account from './modules/account';
import auth from './modules/auth';
import common from './modules/common';
import category from './modules/category';
import inspectItem from './modules/inspectItem';
import admin from './modules/admin';
import organization from './modules/organization'
import sensor from './modules/sensor'
import config from './modules/config'


import task from './modules/task'
import script from './modules/script'
import playbook from './modules/playbook'
import target from './modules/target'
import product from './modules/product'

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    common,
    category,
    inspectItem,
    admin,
    organization,
    sensor,
    config,


    task,
    script,
    playbook,
    target,
    product,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : [],
});
