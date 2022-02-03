<template>
    <div id="account-check">
        <el-timeline class="timeline-container">
            <el-timeline-item v-for="(item, index) in infoList" :key="index">
                <span class="timeline-item">{{ item }}</span>
            </el-timeline-item>
        </el-timeline>
        <div class="jump-or-rechoose">
            <span @click="doEnter">Enter</span>
            <span @click="dialogVisible=true">Sign as Another</span>
        </div>

        <el-dialog v-model="dialogVisible" width="300px">
            <div class="login-or-register-dialog">
                <el-input v-model="account"><template #prepend>&nbsp;Account&nbsp;</template></el-input>
                <el-input v-model="password"><template #prepend>Password</template></el-input>
                <div class="btn-group">
                    <el-button type="info" @click="loginOrRegister('register')">Sign Up</el-button>
                    <el-button type="primary" @click="loginOrRegister('login')">Sign In</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { ElTimeline, ElTimelineItem, ElDialog, ElInput, ElButton, ElMessage } from "element-plus";
import { addNewUser, getAllUsers } from "@/script/REST_Api";
import { v4 as UUID } from "uuid";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "AccountCheck",
    components: {
        ElTimeline, ElTimelineItem, ElDialog, ElInput, ElButton
    },
    setup() {
        const router = useRouter()

        const infoList: Ref<string[]> = ref([])
        const ifOk = ref(false)
        const doEnter = () => {
            if(!ifOk.value) {
                ElMessage({
                    type: 'info',
                    message: 'You are not logged in'
                })
            }
            else {
                router.push({ name: 'RecordOverview' })
            }
        }

        // 1. detect local account
        infoList.value.push('Detecting local account information')
        const userToken = localStorage.getItem('userToken')
        if(!userToken) {
            infoList.value.push('Local account not found, please sign in/sign up')
            setTimeout(() => {
                dialogVisible.value = true
            }, 500)
        }
        else {
            ifOk.value = true
            infoList.value.push('Local account detected, you can enter or sign as another')
        }

        // 2. login or register
        const dialogVisible = ref(false)
        const account = ref('')
        const password = ref('')
        const loginOrRegister = (type: 'login' | 'register') => {
            if(account.value.trim() === '' || password.value.trim() === '') {
                ElMessage({
                    type: 'info',
                    message: 'Account/Password must not be empty'
                })
                return
            }

            dialogVisible.value = false
            infoList.value.push('Authenticating with remote database')
            if(type === 'login') {
                getAllUsers()
                    .then((userList) => {
                        let exist = userList.find((item) => {
                            return (item.account === account.value) && (item.password === password.value)
                        })
                        if(!exist) {
                            infoList.value.push('Incorrect account or password, please try again')
                            ElMessage({
                                type: 'info',
                                message: 'Incorrect account or password, please try again'
                            })
                            setTimeout(() => {
                                dialogVisible.value = true
                            }, 500)
                        }
                        else {
                            localStorage.setItem('userToken', exist.token)
                            infoList.value.push('Login successful')
                            ifOk.value = true
                            ElMessage({
                                type: 'info',
                                message: 'Login successfully'
                            })
                        }
                    })
                    .catch((err) => {
                        ElMessage({
                            type: 'error',
                            message: err.toString()
                        })
                    })
            }
            else if(type === 'register') {
                const newUser = {
                    account: account.value,
                    password: password.value,
                    token: UUID()
                }
                infoList.value.push('Registering new account')
                addNewUser(newUser)
                    .then(() => {
                        localStorage.setItem('userToken', newUser.token)
                        infoList.value.push('Register successful')
                        ifOk.value = true
                        ElMessage({
                            type: 'info',
                            message: 'Register successfully'
                        })
                    })
                    .catch((err) => {
                        ElMessage({
                            type: 'error',
                            message: err.toString()
                        })
                        setTimeout(() => {
                            dialogVisible.value = true
                        }, 500)
                    })
            }
        }


        return {
            infoList, ifOk, doEnter,
            dialogVisible, account, password,
            loginOrRegister
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixins.scss";

#account-check {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > .timeline-container {
        @include scrollBarStyle();
        position: relative;
        width: 300px;
        max-height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
        .timeline-item {
            color: #8c939d;
            font-size: 14px;
        }
    }

    .jump-or-rechoose {
        position: relative;
        width: 250px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > span {
            color: #3a8ee6;
            text-decoration: underline;
            user-select: none;
            cursor: pointer;
        }
    }

    .login-or-register-dialog {
        width: 260px;
        height: 160px;
        padding: 20px;
        border-radius: 5px;
        background-color: #fcfcfc;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        > .btn-group {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
    }
}
</style>
