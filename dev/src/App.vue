<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent, provide, Ref, ref} from "vue";

export type UserState = {
    login: boolean
    account: string
    userToken: string
}

export default defineComponent({
    name: 'App',
    setup() {
        const userState: Ref<UserState> = ref({
            login: false,
            account: '',
            userToken: ''
        })

        provide<Ref<UserState>>('userState', userState)
    }
})
</script>
