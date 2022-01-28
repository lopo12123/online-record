<template>
    <div id="nav-bar">
        <date-time-box />

        <div class="nav-bar-button">
            Home
        </div>

        <div class="nav-bar-button" @click="goto('GitHub')">
            GitHub
        </div>

        <div class="nav-bar-button" @click="goto('NPM')">
            NPM
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {useRouter} from "vue-router";
import DateTimeBox from "@/components/Index/DateTimeBox.vue";

type ButtonType = 'Home' | 'GitHub' | 'NPM'

export default defineComponent({
    name: "NavBar",
    components: {
        DateTimeBox
    },
    setup() {
        const router = useRouter()

        const currentActive: Ref<ButtonType> = ref('Home')
        const goto = (to: ButtonType) => {
            switch(to) {
                case "Home":
                    router.push({ path: '/' })
                    break
                case "GitHub":
                    window.open('https://github.com/lopo12123')
                    break
                case "NPM":
                    window.open('https://www.npmjs.com/~lopo12123', '_blank')
                    break
            }
        }

        return {
            currentActive, goto
        }
    }
})
</script>

<style lang="scss" scoped>
#nav-bar {
    position: relative;
    width: calc(100% - 80px);
    height: 100%;
    padding: 0 40px;
    background-color: #000000;
    box-shadow: 0 5px 10px 5px #000000;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > .nav-bar-button {
        position: relative;
        width: 80px;
        height: 32px;
        margin-left: 30px;
        text-align: center;
        line-height: 32px;
        border: solid 2px aqua;
        border-radius: 20px 5px 20px 5px;
        font-size: 14px;
        user-select: none;
        cursor: pointer;

        &:hover {
            opacity: 0.9;
        }
        opacity: 0.5;
    }
}
</style>
