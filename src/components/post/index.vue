<template>
    <div class="post box">
        <h2 class="title">
            <slot name="title"></slot>
        </h2>
        <div class="content">
            <p>
                <slot name="content"></slot>
            </p>
        </div>
        <div class="post__footer d-flex justify-between align-center">
            <div class="post__footer-date">
                <b-field>
                    <b-tag>
                        <slot name="date"></slot>
                    </b-tag>
                </b-field>
                
            </div>
            <div class="post__footer-buttons buttons">
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PostComponents',
}
</script>
<style scoped>
    .post {
        text-align: left;
    }
</style>
