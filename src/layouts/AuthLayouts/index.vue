<template>
    <div class="auth-layouts d-flex justify-center align-center">
        <div class="auth-layouts__form">
            <h2 class="title">Авторизация</h2>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Headers from '@/components/header/index'

export default {
    name: 'AuthLayouts',
    components: {
        Headers
    }
}
</script>
<style lang="scss" scoped>
    .auth-layouts {
        height: 100vh;
        width: 100%;

        &__form {
            padding-top: 15px;
            max-width: 400px;
            width: 100%;
            box-shadow: 1px 1px 10px 10px #F0F0F0;
        }
    }
</style>