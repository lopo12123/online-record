<template>
    <div id="home">
        <img class="home-bg" src="@/assets/home-bg.png" alt="">
        <el-container class="home-container">
            <el-aside class="left-panel">
                <div class="carousel-container">
                    <home-carousel />
                </div>
                <div class="message-board-container">
                    <timeline-comment />
                </div>
            </el-aside>
            <el-main>
                these are buttons click to jump
                <span>todos: </span> <br>
                <span>1. cost record </span> <br>
                <span>2. image resize </span> <br>
                <span>... </span>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElContainer, ElAside, ElMain } from "element-plus";
import HomeCarousel from "@/components/Home/HomeCarousel.vue";
import TimelineComment from "@/components/Home/TimelineComment.vue";

export default defineComponent({
    name: "Home",
    components: {
        ElContainer, ElAside, ElMain,
        HomeCarousel, TimelineComment
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#home {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .home-bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        filter: blur(5px);
        opacity: 0.3;
        display: block;
    }

    .home-container {
        position: relative;
        width: 100%;
        height: calc(100% - 20px);
        margin-top: 20px;

        .left-panel {
            @include scrollBarStyle();
            position: relative;
            width: 300px;
            height: 100%;
            overflow-x: hidden;

            .carousel-container {
                position: relative;
                width: 300px;
                height: 350px;
            }

            .message-board-container {
                position: relative;
                width: 300px;
                height: calc(100% - 360px);
                margin-top: 10px;
            }
        }
    }
}
</style>
