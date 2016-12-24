<style lang="css" scoped>
    div {
        background-color: #00a2ed;
        padding-bottom: 6px;
    }

    nav {
        height: 60px;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        align-content: flex-end;
        border-bottom: 6px solid #3f3f3f;
    }

    nav a {
        color: #fff;
        font-size: 18px;
        display: flex;
        margin: 5px 10px;
        height: 100%;
        vertical-align: text-bottom;
        align-items: center;
    }

    .nav_rail {
        position: relative;
        top: -6px;
        width: 8px;
        height: 2px;
        margin-left: 20px;
        background-color: red;
        border-radius: 50%;
    }
</style>
<template>
    <div>
        <nav>
            <a href='/' @click.stop.prevent='berouter'>首页</a>
            <a href='/theme' @click.stop.prevent='berouter'>主题日报</a>
            <a href='/about' @click.stop.prevent='berouter'>关于</a>
        </nav>
        <div class="nav_rail" :style='navStyle'>

        </div>
    </div>
</template>
<script type='text/babel'>
    import TWEEN from 'tween.js'
    function debounce(func, wait = 20, immediate = true) {
        let timer
        return function () {
            const context = this, args = arguments

            function later() {
                timer = null

                if (!immediate) {
                    func.apply(context, args)
                }
            }

            const callNow = immediate && !timer;
            clearTimeout(timer)
            timer = setTimeout(later, wait)
            if (callNow) {
                console.log('---immediate')
                func.apply(context, args)
            }
        }
    }

    let deb

    export default{
        data(){
            return {
                navstyle: {
                    navWidth: 10,
                    x: 10
                },
                isMoving: false

            }
        },
        computed: {
            navStyle: function () {
                return {
                    width: this.navstyle.navWidth + 'px',
                    transform: `translateX(${this.navstyle.x}px)`
                }
            }
        },
        methods: {
            triggerTween(newValue){

                let startWidth = 35;

                const vm = this;

                const tween = new TWEEN.Tween({tweenningNumber: vm.navstyle.x})
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .to({tweenningNumber: newValue}, 500)
                        .onStart(function () {
                            vm.navstyle.navWidth += startWidth
                            startWidth = vm.navstyle.navWidth
                            console.log('start')
                            vm.isMoving = true
                        })
                        .onUpdate(function (c) {
                            vm.navstyle.x = this.tweenningNumber;
                            if (vm.navstyle.navWidth > 10)
                                vm.navstyle.navWidth = startWidth - startWidth * (c)

                        })
                        .onComplete(function () {
                            console.log('end==========')
                            vm.isMoving = false
                        });

                function animate(time) {
                    requestAnimationFrame(animate)
                    TWEEN.update(time)
                }

                if (!vm.isMoving) {
                    tween.start()

                    animate()
                }
            }
            ,
            berouter: function (e) {
                const target = e.target;
                this.$router.push({path: target.pathname})
                let newValue = target.offsetLeft
                deb = deb || debounce(this.triggerTween, 500);
                deb(newValue)
            }
        }
    }
</script>
