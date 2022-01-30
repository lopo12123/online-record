<template>
    <div id="music">
        <img class="music-bg" src="@/assets/pointAndLine.png" alt="">
        <div class="music-list-container">
            <el-table height="100%" row-class-name="my-table-row"
                      size="small" :data="listData"
                      @selection-change="checkChanged">
                <el-table-column type="selection" width="50px" />
                <el-table-column type="index" label="No." width="80px"/>
                <el-table-column prop="name" label="Name" width="200px" />
                <el-table-column prop="size" label="Size" width="120px" />
                <el-table-column width="150px">
                    <template #header>
                        <el-button size="small" type="text" @click="doDownload('selected', 'zipped')">download selected</el-button>
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="text" @click="doDownload(scope.row.path, scope.row.name)">download this one</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import { ElTable, ElTableColumn, ElButton, ElMessage } from "element-plus";
import { music } from "../../public/manifest.json";

interface TableDataItem {
    name: string
    path: string
    size: string
}

export default defineComponent({
    name: "Music",
    components: {
        ElTable, ElTableColumn, ElButton
    },
    setup() {
        const listData: Ref<TableDataItem[]> = ref([])
        let selectedList: string[] = []

        music.forEach((item) => {
            listData.value.push({
                ...item,
                // selected: true
            })
        })

        const checkChanged = (selection: TableDataItem[]) => {
            selectedList = selection.map((item) => {
                return item.path
            })
        }
        const doDownload = (path: string | 'selected', name: string) => {
            if(path === 'selected') {
                ElMessage({
                    type: 'warning',
                    message: 'not support yet'
                })
                // todo solve this with jsZip
                console.log(selectedList)
            }
            else {
                const aTag = document.createElement('a')
                aTag.download = name+'.mp3'
                aTag.target = '_blank'
                aTag.href = path
                aTag.click()
            }
        }

        return {
            listData,
            checkChanged, doDownload
        }
    }
})
</script>

<style lang="scss" scoped>
#music {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .music-bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        top: 0;
        left: 0;
        filter: blur(5px);
        display: block;
    }
    .music-list-container {
        position: relative;
        width: 600px;
        height: calc(100% - 100px);
        box-shadow: 10px 10px 50px 5px #00000033;
        background: none;
        display: block;
        overflow: hidden;

        :deep(.el-table) {
            background: none;
            .my-table-row {
                background: #cccccc1a;
                color: #999999;
            }
        }
        :deep(.el-table__body-wrapper) {
            overflow: hidden;
        }
    }
}
</style>
