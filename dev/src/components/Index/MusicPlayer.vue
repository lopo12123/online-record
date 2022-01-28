<template>
    <div id="music-player">
        <div class="show-progress">
            <el-progress :percentage="30" color="#00ffff"
                         :stroke-width="3" :show-text="false" />
        </div>
        <i class="iconfont icon-shangyishoushangyige" @click="doOperate('Prev')" />
        <i class="iconfont icon-24gl-pause" @click="doOperate('Pause')" />
        <i class="iconfont icon-24gl-play" @click="doOperate('Play')" />
        <i class="iconfont icon-shangyishoushangyige1" @click="doOperate('Next')" />
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { ElProgress } from "element-plus";

type PlayState = 'Playing' | 'Pause'
type OperateButton = 'Play' | 'Pause' | 'Prev' | 'Next'

export default defineComponent({
    name: "MusicPlayer",
    components: {
        ElProgress
    },
    setup() {
        const playState: Ref<PlayState> = ref('Playing')
        const playProgress: Ref<number> = ref(0)

        const doOperate = (op: OperateButton) => {
            switch(op) {
                case "Prev":
                    console.log('prev')
                    break
                case "Pause":
                    // do pause
                    playState.value = 'Pause'
                    break
                case "Play":
                    // do play
                    playState.value = 'Playing'
                    break
                case "Next":
                    console.log('next')
                    break
            }
        }

        return {
            playState, playProgress,
            doOperate,
        }
    }
})
</script>

<style lang="scss" scoped>
#music-player {
    position: relative;
    width: 200px;
    height: 40px;
    //border: solid 1px red;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .show-progress {
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: -3px;
        left: 0;
        opacity: 0.5;
    }

    > i {
        position: relative;
        width: 26px;
        height: 26px;
        border: solid 2px aqua;
        border-radius: 5px;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        user-select: none;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 0.8;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
            border-color: #909399;
            color: #909399;
        }
        25% {
            transform: rotate(90deg);
            border-color: #67c23a;
            color: #67c23a;
        }
        50% {
            transform: rotate(180deg);
            border-color: #e6a23c;
            color: #e6a23c;
        }
        75% {
            transform: rotate(270deg);
            border-color: #f56c6c;
            color: #f56c6c;
        }
        100% {
            transform: rotate(360deg);
            border-color: #909399;
            color: #909399;
        }
    }
}
</style>
