<template>
    <div id="record-overview">
        <div class="overview-banner-container">
            banner
        </div>

        <div class="overview-table-container">
            table here
        </div>

        <div class="overview-pager-container">
            <el-pagination
                background layout="prev, pager, next"
                :page-size="30" :total="1000"
                v-model:current-page="currentPage"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import { ElPagination } from "element-plus";

export default defineComponent({
    name: "RecordOverview",
    components: {
        ElPagination
    },
    setup() {
        const currentPage = ref(1)

        return {
            currentPage
        }
    }
})
</script>

<style lang="scss" scoped>
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
