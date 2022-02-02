<template>
    <div class="timeline-comment"
         v-loading="loading"
         element-loading-background="#00000033">
        <el-timeline class="comment-list">
            <el-timeline-item
                v-for="item in comments" :key="item.date"
                :timestamp="item.date" color="#cccccc">
                <b>{{ item.author }}</b>: {{ item.comment }}
            </el-timeline-item>
        </el-timeline>
        <div class="add-comment">
            <input
                class="comment-ipt"
                v-model="commentText"
                placeholder="leave your comments here"/>

            <input
                class="author-ipt"
                v-model="commentAuthor"
                placeholder="name to show (optional)"/>

            <span class="submit-btn" @click="commentEnter">Submit</span>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {ElTimeline, ElTimelineItem, ElInput, ElButton, ElMessage} from "element-plus";
import {appendComment, getTargetFileJson} from "@/script/REST_Api";

interface Comment {
    date: string
    author: string
    comment: string
}

export default defineComponent({
    name: "TimelineComment",
    components: {
        ElTimeline, ElTimelineItem, ElInput, ElButton
    },
    setup() {
        const loading = ref(false)
        const comments: Ref<Comment[]> = ref([])
        const reloadCommentList = () => {
            loading.value = true
            getTargetFileJson('comment.json')
                .then(({ fileJson }) => {
                    comments.value = JSON.parse(fileJson)
                    loading.value = false
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'fail to get comments'
                    })
                    loading.value = false
                })
        }

        reloadCommentList()
        const commentText = ref('')
        const commentAuthor = ref('')
        const commentEnter = () => {
            if(commentText.value.trim() === '') {
                ElMessage({
                    type: 'info',
                    message: 'comment must not be empty'
                })
                return
            }

            const newComment = {
                date: new Date().toLocaleString('zh-cn', {hour12: false}),
                author: commentAuthor.value.trim() === '' ? 'Anonymous' : commentAuthor.value,
                comment: commentText.value
            }
            commentAuthor.value = ''
            commentText.value = ''

            loading.value = true
            appendComment(newComment)
                .then((res) => {
                    console.log(res)
                    reloadCommentList()
                })
                .catch(() => {
                    loading.value = true
                })
        }

        return {
            loading, comments,
            commentText, commentAuthor,
            commentEnter
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

.timeline-comment {
    position: relative;
    width: calc(100% - 20px);
    height: 100%;
    padding-left: 20px;

    .comment-list {
        @include scrollBarStyle();
        position: relative;
        width: 100%;
        height: calc(100% - 90px);
        overflow-x: hidden;
        overflow-y: auto;
    }

    .add-comment {
        position: relative;
        width: calc(100% - 20px);
        height: 70px;
        padding-right: 20px;
        margin: 10px 0;

        > input {
            position: relative;
            height: 30px;
            border: none;
            outline: none;
            border-bottom: solid 1px #aaaaaa;
            background-color: transparent;
            font-family: "Let's go Digital";
            &::placeholder {
                color: #aaaaaa;
                //font-family: "Let's go Digital";
            }
        }
        > .comment-ipt {
            width: 100%;
        }
        > .author-ipt {
            width: calc(100% - 80px);
        }
        > .submit-btn {
            position: relative;
            width: 60px;
            height: 30px;
            margin-left: 20px;
            color: #999999;
            font-family: "Let's go Digital";
            line-height: 40px;
            text-align: center;
            user-select: none;
            cursor: pointer;
            display: inline-block;
            vertical-align: top;
            &:hover {
                color: #666666;
            }
            &:active {
                color: #3a8ee6;
            }
        }
    }
}
</style>
