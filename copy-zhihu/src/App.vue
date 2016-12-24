<template>
    <div id="app">
        <headerbar></headerbar>
        <router-link to='/' exact></router-link>
        <transition>
            <keep-live>
                <router-view></router-view>
            </keep-live>
        </transition>
    </div>
</template>

<script type="text/babel">
    import axios from 'axios'
    import Header from './components/HeaderBar.vue'
    import ListView from './components/ListView.vue'
    export default {
        name: 'app',
        components: {
            'headerbar': Header, 'list-view': ListView
        },

        beforeMount: function () {
            /*代理问题,所以先使用实体数据*/
            this.$root.axios.get('/latest')
                    .then(res => {
                        // console.table(res)
                    }).catch(err => {
            })
        },
        data: function () {
            return {
                currentRoute: window.location.pathname
            }
        },
        computed: {},


    }
</script>

<style lang="css">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
    }

    @media all and(max-width: 1550px) {
        #app {
            margin: auto;
            background-color: aqua;
        }
    }


</style>