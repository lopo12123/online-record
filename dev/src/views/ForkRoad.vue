<template>
    <div id="fork-road">
        <span>Fork Road Here</span>
        <span>Platform: <b>{{ platform }}</b> (Auto Detected)</span>
        <span>The Page Will Redirect in <b>{{ timeLeft }}</b> seconds</span>
        <span @click="doJump">Jump Right Now</span>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "ForkRoad",
    setup() {
        const router = useRouter()

        const platform = ref('')
        const timeLeft = ref(5)

        platform.value = navigator.platform
        let timerId = setInterval(() => {
            if(timeLeft.value === 0) {
                doJump()

                return
            }
            timeLeft.value -= 1
        }, 1_000)

        const doJump = () => {
            clearInterval(timerId)
            switch (platform.value.toLowerCase()) {
                case 'android':
                case 'iphone':
                case 'macintel':
                    router.push({ name: 'Mobile' })
                    break
                case 'win32':
                default:
                    router.push({ name: 'PC' })
                    break
            }
        }

        return {
            platform, timeLeft, doJump
        }
    }
})
</script>

<style lang="scss" scoped>
#fork-road {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > span {
        height: 30px;
        color: #8c939d;
        font-size: 12px;
        line-height: 30px;
        display: block;
    }

    > span:last-child {
        color: #3a8ee6;
        text-decoration: underline;
        user-select: none;
        cursor: pointer;
    }
}
</style>
