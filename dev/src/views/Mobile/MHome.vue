<template>
    <div id="m-home">
        <div class="user">
            <user-box />
        </div>

        <div class="record">
            <el-button type="info" @click="gotoPage('Record')">Enter</el-button>
        </div>

        <div class="rest">
            ...
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref} from "vue";
import {ElButton, ElMessage} from "element-plus";
import UserBox from "@/components/PC/UserBox.vue";
import {UserState} from "@/App.vue";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "MHome",
    components: {
        ElButton, UserBox
    },
    setup() {
        const router = useRouter()
        const userState = inject('userState') as Ref<UserState>

        const gotoPage = (type: 'Record') => {
            if(type === 'Record') {
                if(!userState.value.login) {
                    ElMessage({
                        type: 'info',
                        message: 'Login required'
                    })
                }
                else {
                    router.push({ name: 'MRecord' })
                }
            }
        }

        return {
            gotoPage
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#m-home {
    @include scrollBarStyle();
    position: relative;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    color: #8c939d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;

    > * {
        margin-top: 20px;
    }

    > .record {
        width: 60vw;
        height: 40px;

        .el-button {
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
