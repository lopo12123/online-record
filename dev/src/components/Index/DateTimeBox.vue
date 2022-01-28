<template>
    <div id="date-time-box">
        <span class="time-str"> {{ timeStr }} </span>
        <span class="date-str"> {{ dateStr }} </span>
        <span class="day-str"> {{ dayStr }} </span>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
    name: "DateTimeBox",
    setup() {
        const weekdayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

        const dateStr = ref('')
        const timeStr = ref('')
        const dayStr = ref('')
        const updateTime = () => {
            dateStr.value = new Date()
                .toLocaleDateString('zh-cn')
                .split('/')
                .map((item) => {
                    return parseInt(item) < 10 ? '0'+item : item
                })
                .join('-')

            timeStr.value = new Date()
                .toLocaleTimeString('zh-cn', { hour12: false })

            dayStr.value = weekdayMap[new Date().getDay()]
        }

        updateTime()
        setInterval(updateTime, 1_000)

        return {
            dateStr, timeStr, dayStr
        }
    }
})
</script>

<style lang="scss" scoped>
#date-time-box {
    position: relative;
    width: 190px;
    height: 40px;
    color: aqua;
    font-family: UniDream-LED;

    > span {
        user-select: none;
        display: inline-block;
    }
    > .time-str {
        position: absolute;
        width: 120px;
        height: 40px;
        top: 0;
        left: 0;
        font-size: 36px;
        line-height: 40px;
        text-align: center;
    }
    > .date-str {
        position: absolute;
        width: 70px;
        height: 20px;
        bottom: 0;
        right: 0;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
    }
    > .day-str {
        position: absolute;
        width: 70px;
        height: 20px;
        top: 0;
        right: 0;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
    }
}
</style>
