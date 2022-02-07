<template>
    <div id="m-record">
        <div class="record-form">
            <div class="record-item">
                <span>Value</span>
                <el-input class="ipt-container" type="number" v-model="newRecord.value" />
            </div>
            <div class="record-item">
                <span>Flow</span>
                <el-radio-group class="ipt-container" v-model="newRecord.flow">
                    <el-radio-button label="IN" />
                    <el-radio-button label="OUT" />
                </el-radio-group>
            </div>
            <div class="record-item">
                <span>Type</span>
                <el-input class="ipt-container" v-model="newRecord.type" />
            </div>
            <div class="record-item">
                <span>Note</span>
                <el-input class="ipt-container" v-model="newRecord.note" />
            </div>
            <div class="record-item">
                <el-button style="width: 100%;" type="success" @click="createNewRecord">Submit</el-button>
            </div>
        </div>
        <div class="record-overview">
            <recent-record />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive, Ref} from "vue";
import {UserState} from "@/App.vue";
import {useRouter} from "vue-router";
import {ElButton, ElInput, ElNotification, ElRadioButton, ElRadioGroup} from "element-plus";
import RecentRecord from "@/components/Mobile/MRecord/RecentRecord.vue";
import {addRecords, RecordItem} from "@/script/REST_Api";
import {v4 as UUID} from "uuid";
import {parseDate} from "@/script";

export default defineComponent({
    name: "MRecord",
    components: {
        ElInput, ElButton,
        ElRadioGroup, ElRadioButton,
        RecentRecord
    },
    setup() {
        const router = useRouter()
        const userState = inject('userState') as Ref<UserState>

        if(!userState.value.login) {
            ElNotification({
                title: '',
                message: 'You are not logged in, please log in first',
                position: 'bottom-right'
            })
            router.push({ name: 'MHome' })
        }

        const newRecord = reactive({
            value: '',
            flow: 'IN',
            type: '',
            note: ''
        })
        const createNewRecord = () => {
            if(newRecord.value.trim() === '') {
                ElNotification({
                    title: '',
                    message: 'Value cannot be empty',
                    position: 'bottom-right'
                })
                return
            }

            const recordToAdd: RecordItem = {
                uuid: UUID(),
                value: newRecord.value+'',
                date: parseDate(Date.now()),
                flow: newRecord.flow as ('IN' | 'OUT'),
                type: newRecord.type,
                note: newRecord.note
            }
            ElNotification({
                title: '',
                message: 'Adding new record',
                position: 'bottom-right'
            })
            addRecords(userState.value.userToken, recordToAdd)
                .then(() => {
                    ElNotification({
                        title: '',
                        message: 'Add new record successfully',
                        position: 'bottom-right'
                    })
                })
                .catch((err) => {
                    ElNotification({
                        type: 'error',
                        message: err.toString(),
                        position: 'bottom-right'
                    })
                })
        }

        return {
            newRecord, createNewRecord
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#m-record {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    > .record-form {
        position: relative;
        width: 260px;
        max-width: 70vw;
        margin-top: 20px;
        height: fit-content;

        > .record-item {
            position: relative;
            width: 100%;
            height: 32px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            > span {
                position: relative;
                width: 60px;
                height: 32px;
                color: #8c939d;
                font-weight: bold;
                line-height: 32px;
                display: inline-block;
                vertical-align: top;
            }
            > .ipt-container {
                position: relative;
                width: 160px;
                display: inline-block;
                vertical-align: top;
            }
        }
    }
    > .record-overview {
        @include scrollBarStyle();
        position: relative;
        width: 260px;
        max-width: 70vw;
        max-height: 200px;
        margin-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
