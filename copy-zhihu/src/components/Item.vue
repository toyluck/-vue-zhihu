<template>
    <div @click='readcontent' class="item-div">
        <img :src='imapath'>
        <span class="item-span">
            {{story.title}}
        </span>
    </div>
</template>

<script type="text/babel">
    export default{
        data(){
            return {
                imapath: ''
            }
        },
        components: {},
        props: {
            story: {
                type: Object
            }
        },
        methods: {
            readcontent: function () {
                // this.$emit('storyevent', this.story)
                const router = this.$router
                        , story = this.story
                router.push({path: '/story/' + story.id})
            }
        },
        created(){
            // console.table(this.story)
            console.log('===============================')
            this.$root.covImg(this.story.image, function (res) {
                console.table(res)
                this.imapath = res.url
            }.bind(this))

        }


    }
</script>
<style lang="css">
    .item-div {
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        cursor: pointer;
        transition: all 0.5s;
        background-color: white;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        margin: 5px;
    }

    .item-div:hover {
        transform: translateZ(20px);
        box-shadow: 5px -2px 25px rgba(0, 0, 0, 0.2),
        inset 0 0 15px rgba(0, 0, 0, 0.12);
    }

    img {
        width: 100%;
        height: 80%;
        border: none;
        outline: none;
    }

    .item-span {
        display: flex;
        line-height: 26px;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex: 1;
        padding: 10px;
    }

    @media only  screen and(min-width: 550px) {
        .item-div {
            margin: auto;
            background-color: aqua;
        }
    }
</style>