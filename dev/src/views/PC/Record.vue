<template>
    <div id="record">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Record",
})
</script>

<style lang="scss" scoped>
#record {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
