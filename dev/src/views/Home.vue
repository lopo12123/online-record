<template>
    <div id="home">
        <img class="home-bg" src="@/assets/home-bg.png" alt>
        <el-container class="home-container">
            <el-aside class="left-panel">
                <div class="calendar-container">
                    <el-calendar />
                </div>
                <div class="carousel-container">
                    <home-carousel />
                </div>
            </el-aside>
            <el-main>
                main
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElContainer, ElAside, ElMain, ElCalendar } from "element-plus";
import HomeCarousel from "@/components/Home/HomeCarousel.vue";

export default defineComponent({
    name: "Home",
    components: {
        ElContainer, ElAside, ElMain, ElCalendar,
        HomeCarousel
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
        height: calc(100% - 10px);
        margin-top: 10px;

        .left-panel {
            @include scrollBarStyle();
            position: relative;
            width: 300px;
            height: 100%;
            overflow-x: hidden;

            .calendar-container {
                position: relative;
                width: 300px;
                height: 300px;
            }

            .carousel-container {
                position: relative;
                width: 300px;
                height: 350px;
            }
        }
    }
}
</style>
