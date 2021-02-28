<template>
    <div class="box post">
        <div class="d-flex flex-column align-start">
            <slot name="form-element"></slot>
            <slot name="create"></slot>
            <slot name="change"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WorkPostComponents',
}
</script>
<style scoped>
    .field {
        width: 100%;
    }
</style>
