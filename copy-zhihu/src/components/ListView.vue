<template>
    <div id="list">
        <div v-if="daysData" class="day-container" ref="daycontainer">
            <h2>{{daysData.date}}</h2>
            <div class="stories-container">
                <Item v-if='daysData.top_stories'
                      v-for='story in daysData.top_stories'
                      :storyevent='story'
                      :story='story'
                      v-on:readcontent='readcontent'>
                </Item>
            </div>
        </div>

    </div>
</template>

<script type='text/babel'>
    import Item from './Item.vue'
    import latest from '../data/latest'

    export default{
        data(){
            return {
                daysData: {
                    type: Object
                }
            }
        },
        components: {Item},
        props: {},
        methods: {
            readcontent: function (contentId) {
                console.table(contentId)
            }
        },
        created(){
            this.$root.axios.get('/latest')
                    .then(res => {
                        // console.table(res)
                        console.log('-----------')
                        console.log(this.daysData)

                        this.daysData = res.data
                        console.log(this.daysData)

                    }).catch(err => {

            })
        },
        mounted(){
            // console.table(this.daysData)
        }
    }
</script>
<style lang="css" scoped>
    .day-container {
        justify-content: center;
        padding: 20px 10%;
    }

    .stories-container {
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and(max-width: 1550px) {
        body {
            margin: auto;
            background-color: aqua;
        }
    }
</style>