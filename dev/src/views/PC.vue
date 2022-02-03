<template>
    <div id="PC">
        <div class="nav-bar-container">
            <nav-bar />
        </div>

        <div class="body-container">
            <div class="body-menu">
                <el-menu
                    default-active="Home"
                    text-color="#ffffff"
                    active-text-color="#ffd04b"
                    background-color="#545c64">

                    <el-menu-item
                        index="Home"
                        @click="jumpTo(false, 'Home')">
                        <i class="iconfont icon-home" /> Home
                    </el-menu-item>

                    <el-sub-menu
                        index="Tools">
                        <template #title>
                            <i class="iconfont icon-Function" /> Tools
                        </template>

                        <el-menu-item
                            index="Record"
                            @click="jumpTo(false, 'Record')">
                            Record
                        </el-menu-item>

                        <el-menu-item
                            index="Resize"
                            @click="jumpTo(false, 'Resize')">
                            Resize
                        </el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu
                        index="Links">
                        <template #title>
                            <i class="iconfont icon-link" /> Links
                        </template>

                        <el-menu-item
                            index="GitHub"
                            @click="jumpTo(true, 'GitHub')">
                            <i class="iconfont icon-github" /> GitHub
                        </el-menu-item>

                        <el-menu-item
                            index="NPM"
                            @click="jumpTo(true, 'NPM')">
                            <i class="iconfont icon-npm" /> NPM
                        </el-menu-item>

                        <el-menu-item
                            index="Mail"
                            @click="jumpTo(true, 'Mail')">
                            <i class="iconfont icon-email" /> Mail
                        </el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </div>

            <div class="body-main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMenu, ElSubMenu, ElMenuItem } from "element-plus";
import NavBar from "@/components/PC/NavBar.vue";
import {useRouter} from "vue-router";

type OuterPage = 'GitHub' | 'NPM' | 'Mail'

export default defineComponent({
    name: "PC",
    components: {
        ElMenu, ElSubMenu, ElMenuItem,
        NavBar
    },
    setup() {
        const router = useRouter()

        const jumpTo = (outer: boolean, name: string | OuterPage) => {
            if(!outer) {
                router.push({ name: name })
            }
            else {
                switch (name) {
                    case "GitHub":
                        window.open('https://github.com/lopo12123', '_blank')
                        break
                    case "NPM":
                        window.open('https://www.npmjs.com/~lopo12123', '_blank')
                        break
                    case "Mail":
                        const aTag = document.createElement('a')
                        aTag.href = 'mailto:lopoflyfly@gmail.com'
                        aTag.click()
                        break
                }
            }
        }

        return {
            jumpTo
        }
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
        z-index: 10;
        width: 100%;
        height: 60px;
    }

    > .body-container {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);

        > .body-menu {
            position: relative;
            width: 300px;
            height: 100%;
            display: inline-block;
            vertical-align: top;

            :deep(.el-menu) {
                position: relative;
                width: 100%;
                height: 100%;
                font-family: "Let's go Digital";

                .iconfont {
                    margin-right: 5px;
                }
            }
        }

        > .body-main {
            position: relative;
            width: calc(100% - 300px);
            height: 100%;
            display: inline-block;
            vertical-align: top;
        }
    }
}
</style>
