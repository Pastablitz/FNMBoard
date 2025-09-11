import VueRouter from "vue-router";
import Mixin from './mixin'
import Index from './components/Index.vue';
import Menu from './components/Menu.vue';
import FNMBoard from './components/FNMBoard.vue';
import Sming from './components/Sming.vue';
import FlexPlayground from './components/FlexPlayground.vue';
import Button from './components/Button.vue';
import Toggle from './components/Toggle.vue';
import Icon from './components/Icon.vue';
import RosterModal from './components/RosterModal.vue';
import Nameplate from './components/Nameplate.vue';
import Fighter from './components/Fighter.vue';
import Roster from './components/Roster.vue';
import Dicelist from './components/Dicelist.vue';
import DiceBoard from './components/Diceboard.vue';
import BossBoard from './components/Bossboard.vue';
import Bossplate from './components/Bossplate.vue';
import BossRoster from './components/BossRoster.vue';
import BossRosterModal from './components/BossRosterModal.vue';
import Boss from './components/Boss.vue';
import MineSweeper from './components/mine-sweeper/MineSweeper.vue';
import MineBoard from './components/mine-sweeper/Mineboard.vue';
import MineCell from './components/mine-sweeper/MineCell.vue';
import Sandpit from './components/Sandpit.vue';



if (typeof Vue !== 'undefined') {
  Vue.mixin(Mixin);
  Vue.component('v-index', Index);
  Vue.component('v-menu', Menu);
  Vue.component('v-FNMBoard', FNMBoard);
  Vue.component('v-sming', Sming);
  Vue.component('v-flex-playground', FlexPlayground);
  Vue.component('v-button', Button);
  Vue.component('v-toggle', Toggle);
  Vue.component('v-icon', Icon);
  Vue.component('v-roster-modal', RosterModal);
  Vue.component('v-nameplate', Nameplate);
  Vue.component('v-fighter', Fighter);
  Vue.component('v-roster', Roster);
  Vue.component('v-dicelist', Dicelist);
  Vue.component('v-diceboard', DiceBoard);
  Vue.component('v-boss', Boss);
  Vue.component('v-bossboard', BossBoard);
  Vue.component('v-bossplate', Bossplate);
  Vue.component('v-bossroster', BossRoster);
  Vue.component('v-bossroster-modal', BossRosterModal);
  Vue.component('v-mineboard', MineBoard);
  Vue.component('v-minesweeper', MineSweeper);
  Vue.component('v-minecell', MineCell);
  Vue.component('v-sandpit', Sandpit);

}

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: FNMBoard },
    { path: '/diceboard', component: DiceBoard },
    { path: '/flex', component: FlexPlayground },
    { path: '/bossboard', component: BossBoard },
    { path: '/mineboard', component: MineBoard },
    { path: '/sming', component: Sming },
    { path: '/sandpit', component: Sandpit },

  ]
});

window.eventBus = new Vue();
Vue.prototype.$bus = window.eventBus;

const app = new Vue({ router }).$mount('#app');