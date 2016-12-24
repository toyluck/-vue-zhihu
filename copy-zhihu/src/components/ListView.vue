<template>
    <div id="list">
        <div v-if="daysData"
             class="day-container"
             ref="daycontainer"
             v-for='dayData in daysData'
        >
            <h2>{{dayData.date}}</h2>
            <div class="stories-container">
                <Item v-if='dayData.top_stories'
                      v-for='story in dayData.top_stories'
                      :storyevent='story'
                      :story='story'
                      v-on:readcontent='readcontent'>
                </Item>
            </div>
        </div>
        <more-button :url='currentDate'>加载更多</more-button>
    </div>
</template>

<script type='text/babel'>
    import Item from './Item.vue'
    import MoreButton from './MoreButton.vue'
    export default{
        data(){
            return {
                daysData: {
                    type: Array,
                    default: []
                }
            }
        },
        computed: {
            currentDate: function () {
                return this.daysData ? this.daysData[daysData.length - 1]
                                .date : 0
            }
        }
        ,
        components: {Item, 'more-button': MoreButton},
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
                        this.daysData.push(res.data)
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