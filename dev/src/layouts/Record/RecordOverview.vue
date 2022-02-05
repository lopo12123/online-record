<template>
    <div id="record-overview">
        <div class="overview-banner-container">
            <el-dropdown @command="handleSort">
                <el-button type="info" plain>
                    <i class="iconfont icon-sort" />
                    <span style="margin-left: 5px">sort</span>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="value,asc"><i class="iconfont icon-iconasc" /> value</el-dropdown-item>
                        <el-dropdown-item command="value,desc"><i class="iconfont icon-iconsort" /> value</el-dropdown-item>
                        <el-dropdown-item command="date,asc"><i class="iconfont icon-iconasc" /> date</el-dropdown-item>
                        <el-dropdown-item command="date,desc"><i class="iconfont icon-iconsort" /> date</el-dropdown-item>
                        <el-dropdown-item command="reset,none" divided><i class="iconfont icon-record" /> reset</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <div class="overview-table-container">
            <el-table ref="tableRef" v-loading="loading"
                      :data="tableData" height="100%"
                      border empty-text="No Record">
                <el-table-column width="50px" type="index" label="No." fixed="left" />
                <el-table-column width="100px" prop="value" label="Value" />
                <el-table-column width="200px" prop="date" label="Date" />
                <el-table-column width="60px" label="Flow">
                    <template #default="scope">
                        <el-tag :type="scope.row.flow === 'IN' ? 'success' : 'danger'">
                            {{ scope.row.flow === 'IN' ? '入' : '出' }}
                        </el-tag>
                    </template>
                </el-table-column>
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
import {computed, defineComponent, inject, onUnmounted, Ref, ref} from "vue";
import {ElMessage, ElDropdown, ElDropdownMenu, ElDropdownItem, ElTable, ElTableColumn, ElButton, ElTag, ElPagination} from "element-plus";
import {UserState} from "@/App.vue";
import {getAllRecords, initRecordDatabase, RecordItem} from "@/script/REST_Api";
import {parseDate} from "@/script";

export default defineComponent({
    name: "RecordOverview",
    components: {
        ElDropdown, ElDropdownMenu, ElDropdownItem,
        ElTable, ElTableColumn,
        ElButton, ElTag,
        ElPagination
    },
    setup() {
        // region ElTable: doLayout
        const doLayout = () => {
            if(!!tableRef.value) tableRef.value!.doLayout()
        }
        window.addEventListener('resize', doLayout)
        onUnmounted(() => {
            window.removeEventListener('resize', doLayout)
        })
        // endregion

        const userState = inject('userState') as Ref<UserState>

        const loading = ref(false)
        const tableRef: Ref<typeof ElTable | null> = ref(null)

        const currentPage = ref(1)
        const totalPage = ref(1)

        const originData: Ref<RecordItem[]> = ref([])  // origin data - must be const
        const operateData: Ref<RecordItem[]> = ref([])  // a copy of origin data - used to do operate
        const tableData = computed(() => {
            return operateData.value.slice(currentPage.value * 30 - 30, currentPage.value * 30)
        })

        if(!userState.value.login) {
            ElMessage({
                type: 'info',
                message: 'You are not logged in, please log in first'
            })
        }
        else {
            // try get all records, and create new empty db if not exist
            loading.value = true
            getAllRecords(userState.value.userToken)
                .then((recordList) => {
                    originData.value = JSON.parse(JSON.stringify(recordList))
                    operateData.value = JSON.parse(JSON.stringify(recordList))
                    loading.value = false
                })
                .catch((err1) => {
                    if(err1.toString() === 'Error: ENotFound') {
                        ElMessage({
                            type: 'info',
                            message: 'This is the first login, the database will automatically created in few seconds'
                        })
                        initRecordDatabase(userState.value.userToken)
                            .then(() => {
                                ElMessage({
                                    type: 'info',
                                    message: 'Database created successfully'
                                })
                                loading.value = false
                            })
                            .catch((err2) => {
                                ElMessage({
                                    type: 'error',
                                    message: err2.toString()
                                })
                                loading.value = false
                            })
                    }
                    else {
                        ElMessage({
                            type: 'error',
                            message: err1.toString()
                        })
                        loading.value = false
                    }
                })
        }

        // region banner operate
        const handleSort = (combinedArgs: string) => {
            const [sortItem, type] = combinedArgs.split(',') as ['value'|'date'|'reset', 'asc'|'desc'|'none']
            switch (sortItem) {
                case 'reset':  // do reset
                    operateData.value = JSON.parse(JSON.stringify(originData.value))
                    break
                case 'value':  // do value sort
                    operateData.value.sort((a, b) => {
                        return (a.value - b.value) * (type === 'asc' ? 1 : -1)
                    })
                    break
                case 'date':  // do date sort
                    operateData.value.sort((a, b) => {
                        return (parseDate(a.date) - parseDate(b.date)) * (type === 'asc' ? 1 : -1)
                    })
                    break
            }
        }
        // endregion

        return {
            loading, tableRef,
            handleSort,
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
        @include scrollBarStyle();
        position: relative;
        width: calc(100% - 40px);
        height: 60px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;
        > * {
            margin-left: 20px;
        }
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
