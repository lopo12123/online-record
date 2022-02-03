<template>
    <el-carousel id="home-carousel" height="350px">
        <el-carousel-item class="carousel-item">
            <img src="@/assets/unmasked.png" alt="">
        </el-carousel-item>

        <el-carousel-item class="carousel-item">
            <img src="@/assets/holy.png" alt="">
        </el-carousel-item>

        <el-carousel-item class="carousel-item">
            <img src="@/assets/a-game.png" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElCarousel, ElCarouselItem } from "element-plus";

export default defineComponent({
    name: "HomeCarousel",
    components: {
        ElCarousel, ElCarouselItem
    },
})
</script>

<style lang="scss" scoped>
#home-carousel {
    position: relative;
    width: 100%;
    height: 350px;

    .carousel-item {
        > img {
            position: relative;
            width: 100%;
            opacity: 0.7;
        }
    }
}
</style>
