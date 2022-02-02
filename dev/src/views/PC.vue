<template>
    <div id="PC">
        <div class="nav-bar-container">
            <nav-bar />
        </div>

        <div class="body-container">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import NavBar from "@/components/PC/NavBar.vue";

export default defineComponent({
    name: "PC",
    components: {
        NavBar
    }
})
</script>

<style lang="scss" scoped>
#PC {
    position: relative;
    width: 100%;
    height: 100%;

    > .nav-bar-container {
        position: relative;
        width: 100%;
        height: 59px;
    }

    > .body-container {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>
