<template>
    <div id="user-box">
        <div class="user-box-icon" @click="doLogin('show')"
             v-loading="loading" element-loading-background="transparent">
            <span>{{ userState.login ? userState.account : '?' }}</span>
        </div>

        <el-dialog v-model="dialogVisible" width="300px">
            <div class="login-or-register-dialog">
                <el-input v-model="account"><template #prepend>&nbsp;Account&nbsp;</template></el-input>
                <el-input v-model="password"><template #prepend>Password</template></el-input>
                <div class="btn-group">
                    <el-button type="info" @click="doLogin('register')">Sign Up</el-button>
                    <el-button type="primary" @click="doLogin('login')">Sign In</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from "vue";
import {ElDialog, ElInput, ElButton, ElMessage} from "element-plus";
import { UserState } from "@/App.vue";
import {addNewUser, getAllUsers} from "@/script/REST_Api";
import {v4 as UUID} from "uuid";

export default defineComponent({
    name: "UserBox",
    components: {
        ElDialog, ElInput, ElButton
    },
    setup() {
        const userState = inject('userState') as Ref<UserState>

        // if token exist, try login in
        const loading = ref(false)
        const userToken = localStorage.getItem('userToken')
        if(!!userToken && !userState.value.login) {
            loading.value = true
            getAllUsers()
                .then((userList) => {
                    let exist = userList.find((item) => { return item.token === userToken })
                    if(!!exist) {
                        ElMessage({
                            type: 'info',
                            message: `Welcome Back, ${exist.account}!`
                        })
                        userState.value = {
                            login: true,
                            account: exist.account.slice(0, 1).toUpperCase(),
                            userToken: exist.token
                        }
                    }
                    else {
                        localStorage.removeItem('userToken')
                    }
                    loading.value = false
                })
                .catch((err) => {
                    loading.value = false
                    ElMessage({
                        type: 'error',
                        message: err.toString()
                    })
                })
        }

        const dialogVisible = ref(false)
        const account = ref('')
        const password = ref('')
        const doLogin = (type: 'show' | 'login' | 'register') => {
            switch (type) {
                case 'show':
                    account.value = ''
                    password.value = ''
                    dialogVisible.value = true
                    return
                case 'login':
                    dialogVisible.value = false
                    if(account.value.trim() === '' || password.value.trim() === '') {
                        ElMessage({
                            type: 'info',
                            message: 'Account/Password cannot be empty'
                        })
                    }
                    loading.value = true
                    getAllUsers()
                        .then((userList) => {
                            let exist = userList.find((item) => { return item.account === account.value && item.password === password.value })
                            if(!!exist) {
                                localStorage.setItem('userToken', exist.token)
                                userState.value = {
                                    login: true,
                                    account: exist.account.slice(0, 1).toUpperCase(),
                                    userToken: exist.token
                                }
                                ElMessage({
                                    type: 'info',
                                    message: `Welcome Back, ${exist.account}!`
                                })
                            }
                            else {
                                ElMessage({
                                    type: 'info',
                                    message: 'Incorrect account or password, please try again'
                                })
                            }
                            loading.value = false
                        })
                        .catch((err) => {
                            loading.value = false
                            ElMessage({
                                type: 'error',
                                message: err.toString()
                            })
                        })
                    break
                case 'register':
                    dialogVisible.value = false
                    if(account.value.trim() === '' || password.value.trim() === '') {
                        ElMessage({
                            type: 'info',
                            message: 'Account/Password cannot be empty'
                        })
                    }
                    loading.value = true
                    const newUser = {
                        account: account.value,
                        password: password.value,
                        token: UUID()
                    }
                    addNewUser(newUser)
                        .then(() => {
                            localStorage.setItem('userToken', newUser.token)
                            userState.value = {
                                login: true,
                                account: newUser.account.slice(0, 1).toUpperCase(),
                                userToken: newUser.token
                            }
                            loading.value = false
                        })
                        .catch((err) => {
                            loading.value = false
                            ElMessage({
                                type: 'error',
                                message: err.toString()
                            })
                        })
                    break
            }
        }

        return {
            userState, loading,
            dialogVisible, account, password,
            doLogin
        }
    }
})
</script>

<style lang="scss" scoped>
#user-box {
    position: relative;
    width: 40px;
    height: 40px;

    .user-box-icon {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #ffffff99;
        color: #ffffff;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
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
