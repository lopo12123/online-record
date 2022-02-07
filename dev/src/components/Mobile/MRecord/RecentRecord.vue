<template>
    <div class="recent-record">
        <el-button v-if="!ifList" type="info" style="width: 100%" @click="requestList">Query All records</el-button>

        <div v-if="ifList" class="list-view">
            <div v-if="loading" style="color: #8c939d">loading...</div>
            <div class="record-item" v-for="(item, index) in recordList" :key="index">
                <span class="date">{{ item.date }}</span>
                <span :class="['value', item.inOrOut]">{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref, ref} from "vue";
import {ElButton, ElNotification} from "element-plus";
import {getAllRecords} from "@/script/REST_Api";
import {UserState} from "@/App.vue";
import {useRouter} from "vue-router";

interface SimpleRecord {
    date: string
    value: string
    inOrOut: 'IN' | 'OUT'
}

export default defineComponent({
    name: "RecentRecord",
    components: {
        ElButton,
    },
    setup() {
        const recordList: Ref<SimpleRecord[]> = ref([])

        const router = useRouter()
        const userState = inject('userState') as Ref<UserState>
        if(!userState.value.login) {
            router.push({ name: 'MHome' })
        }

        const ifList = ref(false)
        const loading = ref(false)
        const requestList = () => {
            loading.value = true
            ifList.value = true

            getAllRecords(userState.value.userToken)
                .then((list) => {
                    recordList.value = list.map((item) => {
                        return {
                            date: item.date,
                            value: (item.flow === 'IN' ? '+' : '-') + item.value,
                            inOrOut: item.flow
                        }
                    })
                    loading.value = false
                })
                .catch((err) => {
                    ElNotification({
                        title: '',
                        message: err.toString(),
                        position: 'bottom-right'
                    })
                    loading.value = false
                })
        }

        return {
            recordList,
            ifList, loading,
            requestList
        }
    }
})
</script>

<style lang="scss" scoped>
.recent-record {
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > .list-view {
        position: relative;
        width: 100%;
        height: fit-content;

        > .record-item {
            position: relative;
            width: 100%;
            height: 32px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            > .date {
                color: #8c939d;
            }

            > .IN {
                color: #ff4d51;
            }
            > .OUT {
                color: #13ce66;
            }
        }
    }
}
</style>
