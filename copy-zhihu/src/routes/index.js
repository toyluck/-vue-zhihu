/**
 * Created by hyc on 2016/12/21.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Story from '../components/Story.vue'
import ListView from '../components/ListView.vue'
Vue.use(Router)
const routes = [
    {path: '/', component: ListView},
    {path: '/story/:id', component: Story}
]
export default new Router({
    mode: 'history',
    routes
})