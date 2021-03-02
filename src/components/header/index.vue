<template>
    <div class="header d-flex justify-end">
        <div class="header__buttons buttons">
            <slot></slot>
            <b-button
            @click="logOut" 
            type="is-info">
                {{GETTERS_AUTH ? 'Выйти' : 'Войти'}}
            </b-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    name: 'HeaderComponents',
    computed: {
        ...mapGetters(['GETTERS_AUTH'])
    },
    methods: {
        ...mapActions(['LOGOUT']),
        ...mapMutations(['UPDATE_AUTH', 'UPDATE_ROLE']),
        logOut() {

            if (this.GETTERS_AUTH) {
                this.LOGOUT()
                this.UPDATE_ROLE('')
                this.$router.push('/auth', () => {})
            }
            
            this.$router.push('/auth', () => {})
        }
    }
}
</script>
<style scoped>
    .header {
        padding: 15px 10px;
        max-width: 100%;
        width: 100%;
    }
</style>
