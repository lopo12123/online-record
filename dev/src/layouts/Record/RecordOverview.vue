<template>
    <div id="record-overview">
        <div class="overview-banner-container">
            日期 金额 进/出 关键字
        </div>

        <div class="overview-table-container">
            <el-table ref="tableRef" :data="tableData" height="100%"
                      border empty-text="No Record">
                <el-table-column width="50px" type="index" label="No." fixed="left" />
                <el-table-column width="100px" prop="value" label="Value" />
                <el-table-column width="200px" prop="date" label="Date" />
                <el-table-column width="60px" prop="flow" label="Flow" />
                <el-table-column width="150px" prop="type" label="Type" />
                <el-table-column prop="note" label="Note" />
                <el-table-column width="100px" label="Operate" fixed="right">
                    <template #default>
                        <el-button type="text" size="small">Edit</el-button>
                        <el-button type="text" size="small">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="overview-pager-container">
            <el-pagination
                background layout="prev, pager, next"
                :page-size="30" :total="totalPage"
                v-model:current-page="currentPage"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject, onUnmounted, Ref, ref} from "vue";
import {ElMessage, ElTable, ElTableColumn, ElButton, ElPagination} from "element-plus";
import {UserState} from "@/App.vue";
import {getAllRecords, RecordItem} from "@/script/REST_Api";
import {parseDate} from "@/script";

export default defineComponent({
    name: "RecordOverview",
    components: {
        ElTable, ElTableColumn, ElButton, ElPagination
    },
    setup() {
        const userState = inject('userState') as UserState

        const loading = ref(false)
        const tableRef: Ref<typeof ElTable | null> = ref(null)
        const tableData: Ref<RecordItem[]> = ref([])
        const currentPage = ref(1)
        const totalPage = ref(0)

        if(!userState.login) {
            ElMessage({
                type: 'info',
                message: 'You are not logged in, please log in first'
            })
        }
        else {
            // try get all records, and create new empty db if not exist
            // getAllRecords()

        }
        // todo fake date
        tableData.value = [
            {
                value: 100,
                date: parseDate(Date.now()),
                flow: 'IN',
                type: 'alipay',
                note: 'get 100'
            },
            {
                value: 100,
                date: parseDate(Date.now()),
                flow: 'IN',
                type: 'alipay',
                note: 'get 100'
            },
            {
                value: 100,
                date: parseDate(Date.now()),
                flow: 'IN',
                type: 'alipay',
                note: 'get 100'
            },
        ]

        const doLayout = () => {
            if(!!tableRef.value) tableRef.value!.doLayout()
        }
        window.addEventListener('resize', doLayout)
        onUnmounted(() => {
            window.removeEventListener('resize', doLayout)
        })

        return {
            loading, tableRef,
            tableData,
            currentPage, totalPage
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#record-overview {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .overview-banner-container {
        position: relative;
        width: calc(100% - 40px);
        height: 60px;
        background-color: #ffffff;
    }

    .overview-table-container {
        position: relative;
        width: calc(100% - 40px);
        height: calc(100% - 180px);
        background-color: #ffffff;

        .el-table {
            @include scrollBarStyle();
        }
    }

    .overview-pager-container {
        position: relative;
        width: calc(100% - 40px);
        height: 40px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>
