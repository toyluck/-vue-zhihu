<style src='../data/zhihu.css'>

</style>
<style lang="css" scoped>
    .story-img-place-holder {
        height: 300px;
        width: 100vh;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover
    }


</style>

<template>
    <div class="story-container">
        <div :style="storytitle" class="story-img-place-holder">

        </div>
        <!--<img :src='topImg' id="topImg">-->
        <div v-html="story.body" id="story-content">

        </div>

    </div>
</template>
<script type='text/babel'>
    import latest from '../data/latest.js'
    

    
    export default{
        data(){
            return {
                story: {
                    type: Object
                },
                topImg: String
            }
        },
        components: {},
        props: {
            id: String
        },
        created(){
            this.$root.axios.get(`/${this.$route.params.id}`)
                    .then(res => {
                        console.log('--------', this)
                        console.info(res)
                        this.story = res.data
                    }).catch(err => {
                console.error(err)
            })
        },
        computed: {
            storytitle(){
                return {
                    backgroundImage: `url(${this.topImg})`
                }
            }
        },
        watch: {
            story: function () {
                console.log('----watch  story ----------')


                setTimeout(this.covImgs, 300)
                this.$root.covImg(this.story.image, res => {
                    this.topImg = res.url
                })
            }
        },
        mounted: function () {


        },
        methods: {
            covImgs()
            {
                const nodeList = document.querySelectorAll('#story-content img');
                console.log('----watch  story ----------', nodeList)
                nodeList
                        .forEach(img => {
                            console.info(img)
                            this.$root.covImg(img.src, res => {
                                img.src = res.url
                            })
                        })
            }
        }
    }
</script>