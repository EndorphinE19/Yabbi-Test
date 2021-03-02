<template>
    <div class="default-layouts">
        <headers>
            <b-button
            v-if="visibleCreateButton"
            @click="$router.push('/create-post', () => {})">
                Создать
            </b-button>
        </headers>
        <div class="default-layouts__container d-flex justify-center align-start">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Headers from '@/components/header/index'

export default {
    name: 'DefaultLayouts',
    components: {
        Headers
    },
    computed: {
        ...mapGetters(['GETTERS_CURRENT_USER']),
        visibleCreateButton() {
            if (this.GETTERS_CURRENT_USER !== null)
                return this.GETTERS_CURRENT_USER.role === 'writer' && this.$route.name !== 'CreatePost'
        }
    },
    mounted() {
        if (localStorage.getItem('user') && (this.$store.getters.GETTERS_CURRENT_USER === null)) this.GET_USER_INFO()
    },
    methods: {
        ...mapActions(['GET_USER_INFO'])
    }
}
</script>