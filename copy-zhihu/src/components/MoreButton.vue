<style lang='css'>

</style>
<template>
    <div>
        <button @click="pullData">
            <slot v-show='isPulling===false'></slot>
            {{isPulling?'Loading':''}}
        </button>
    </div>
</template>

<script type='text/babel'>
    export default{
        data(){
            return {
                isPulling: false
            }
        },
        components: {},
        props: {
            loadFunction: {
                type: Function

            },
            url: {
                type: String
            }
        },
        methods: {
            pullData: function () {
                console.table(this.url)
                this.isPulling = true
                this.$root.axios.get(this.url)
                        .then(res => {
                            this.isPulling = false
                        }).catch(err => {
                    this.isPulling = false
                })
            }
        }
    }
</script>