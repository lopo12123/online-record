<template>
    <div id="nav-bar">

        <user-box />

        <date-time-box />

        <div class="version-info">
            v {{ version }}
        </div>

        <music-player />

        <div class="nav-bar-button" @click="goto('Home')">
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { version } from "../../../package.json";
import UserBox from "@/components/PC/UserBox.vue";
import DateTimeBox from "@/components/PC/DateTimeBox.vue";
import MusicPlayer from "@/components/PC/MusicPlayer.vue";

type ButtonType = 'Home' | 'GitHub' | 'NPM'

export default defineComponent({
    name: "NavBar",
    components: {
        UserBox, DateTimeBox, MusicPlayer
    },
    setup() {
        const router = useRouter()

        const goto = (to: ButtonType) => {
            switch(to) {
                case "Home":
                    router.push({ name: 'Home' })
                    break
                case "GitHub":
                    window.open('https://github.com/lopo12123', '_blank')
                    break
                case "NPM":
                    window.open('https://www.npmjs.com/~lopo12123', '_blank')
                    break
            }
        }

        return {
            version,
            goto
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#nav-bar {
    @include scrollBarStyle();
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
    overflow-x: auto;
    overflow-y: hidden;

    > *:not(:first-child) {
        margin-left: 30px;
    }

    > .version-info {
        font-size: 14px;
        font-family: "UniDream-LED";
        user-select: none;
    }

    > .nav-bar-button {
        position: relative;
        width: 80px;
        min-width: 80px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border: solid 2px aqua;
        border-radius: 20px 5px 20px 5px;
        font-size: 16px;
        font-family: "Curlz MT";
        user-select: none;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
        opacity: 0.5;
    }
}
</style>
