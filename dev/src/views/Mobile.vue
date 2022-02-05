<template>
    <div id="mobile">
        <router-view />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Mobile"
})
</script>

<style lang="scss" scoped>
#mobile {
    position: relative;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
}
</style>
