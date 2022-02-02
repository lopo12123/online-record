<template>
    <div id="music-player">
        <!-- region hidden audio -->
        <audio ref="audioRef" :src="audioSrc"
               @timeupdate="updateProgress"
               @ended="doOperate('Next')"
               style="display: none" />
        <!-- endregion -->

        <!-- region audio controls -->
        <div class="show-progress">
            <el-progress :percentage="playProgress" color="#00ffff"
                         :stroke-width="3" :show-text="false"
                         :style="`opacity: ${playState === 'Playing' ? '0.8' : '0.5'}`"/>
        </div>
        <span class="player-logo" title="点击前往音乐界面" @click="doOperate('Jump')">lopo</span>
        <i class="iconfont icon-shangyishoushangyige" @click="doOperate('Prev')" />
        <i :class="['iconfont', 'icon-24gl-pause', {'i-active': playState === 'Pause'}]" @click="doOperate('Pause')" />
        <i :class="['iconfont', 'icon-24gl-play', {'i-active': playState === 'Playing'}]" @click="doOperate('Play')" />
        <i class="iconfont icon-shangyishoushangyige1" @click="doOperate('Next')" />
        <!-- endregion -->

        <!-- region one note dialog -->
        <el-dialog
            v-if="visible" v-model="visible" width="fit-content"
            :show-close="false" :destroy-on-close="true"
            @close="oneNoteClose">
            <div class="one-note">
                <div>{{ noteStr }}</div>
                <br>
                <div style="text-align: right">{{ fromStr }}</div>
            </div>
            <template #footer>
                <div class="close-info">
                    Click anywhere else to close.
                </div>
            </template>
        </el-dialog>
        <!-- endregion -->
    </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import { ElProgress, ElDialog } from "element-plus";
import { music } from "../../../public/manifest.json";
import {useRouter} from "vue-router";

type NoteObj = {
    dateString: string  // xxxx/xx/xx
    hitokoto: string
    from: string |null
    from_who: string | null
}
type PlayState = 'Playing' | 'Pause'
type OperateButton = 'Jump' | 'Play' | 'Pause' | 'Prev' | 'Next'

export default defineComponent({
    name: "MusicPlayer",
    components: {
        ElProgress, ElDialog
    },
    setup() {
        const router = useRouter()

        // region play pointer and progress and operates
        let playIndex = Math.floor(Math.random() * music.length)  // the index of current played song
        const audioRef: Ref<HTMLAudioElement|null> = ref(null)
        const audioSrc = ref(music[playIndex].path)

        const playState: Ref<PlayState> = ref('Pause')
        const playProgress: Ref<number> = ref(0)

        const updateProgress = (e: any) => {
            playProgress.value = parseInt((e.target.currentTime * 100 / e.target.duration).toFixed(0))
            playProgress.value = isNaN(playProgress.value) ? 0 :playProgress.value
        }
        const doOperate = (op: OperateButton) => {
            if(!audioRef.value) return
            switch(op) {
                case "Jump":
                    router.push({ name: 'Music' })
                    break
                case "Prev":  // do prev
                    playIndex = (playIndex === 0) ? (music.length - 1) : (playIndex - 1)
                    audioSrc.value = music[playIndex].path
                    break
                case "Pause":  // do pause
                    audioRef.value!.pause()
                    playState.value = 'Pause'
                    break
                case "Play":  // do play
                    playState.value = 'Playing'
                    audioRef.value!.play()
                    break
                case "Next":  // do next
                    playIndex = (playIndex === music.length - 1) ? 0 : (playIndex + 1)
                    playProgress.value = 0
                    audioRef.value!.src = music[playIndex].path
                    break
            }
        }
        // endregion

        // region one note
        const visible = ref(true)
        const noteStr = ref('')
        const fromStr = ref('')
        const noteStorage = localStorage.getItem('oneNote')  // last note
        try {
            if(!noteStorage) throw new Error('no storage')
            const noteObj = JSON.parse(noteStorage)
            if(noteObj.dateString !== new Date().toLocaleDateString()) throw new Error('out of date')
            let { hitokoto, from, from_who } = noteObj
            noteStr.value = hitokoto
            fromStr.value = (from ? '-- '+from : '') + (from_who ? '《'+from_who+'》' : '')
            visible.value = true
        }
        catch (e) {
            fetch('https://v1.hitokoto.cn?c=d&c=k')
                .then((buf) => buf.json())
                .then((res) => {
                    let { hitokoto, from, from_who } = res
                    noteStr.value = hitokoto
                    fromStr.value = (from ? '-- '+from : '') + (from_who ? '《'+from_who+'》' : '')
                    visible.value = true
                    localStorage.setItem('oneNote', JSON.stringify({
                        dateString: new Date().toLocaleDateString(),
                        hitokoto: hitokoto,
                        from: from,
                        from_who: from_who
                    } as NoteObj))
                })
                .catch(() => { /** error */ })
        }
        const oneNoteClose = () => {
            // doOperate('Play')
        }
        // endregion

        return {
            audioRef, audioSrc,
            playState, playProgress,
            updateProgress, doOperate,
            visible, noteStr, fromStr, oneNoteClose
        }
    }
})
</script>

<style lang="scss" scoped>
#music-player {
    position: relative;
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .show-progress {
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: -3px;
        left: 0;
    }

    > .player-logo {
        color: aqua;
        font-family: "Curlz MT";
        user-select: none;
        cursor: pointer;
        opacity: 1;
        &:hover {
            opacity: 0.8;
        }
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
    .i-active {
        opacity: 0.8;
    }

    .one-note {
        position: relative;
        width: 300px;
        padding: 20px 30px;
        background-color: #343434;
        border-radius: 10px;
        color: #00ffff;
    }
    .close-info {
        position: relative;
        text-align: center;
        font-size: 14px;
        color: #00ffff80;
        user-select: none;
    }
}
</style>
