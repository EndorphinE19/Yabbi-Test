<template>
    <div class="create-post">
        <work-post>
            <template v-slot:form-element>
                <b-field label="Название поста">
                    <b-input v-model.trim="name"></b-input>
                </b-field>
                <b-field label="Контент поста">
                    <b-input v-model.trim="content"></b-input>
                </b-field>
            </template>
            <template v-slot:create>
                <b-button
                @click="addPost"
                type="is-info">Создать</b-button>
            </template>
        </work-post>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import WorkPost from '../components/workPost/index'

export default {
    name: 'CreatePost',
    components: {
        WorkPost
    },
    data() {
        return {
            name: '',
            content: ''
        }
    },
    methods: {

        ...mapActions(['CREATE_POST', 'GET_POST']),

        addPost() {

            this.CREATE_POST({
                title: this.name,
                description: this.content,
                claps: 0,
                createdAt: new Date().toISOString(),
                updateAt: "",
                userId: Number(localStorage.getItem('user'))
            })
            .then(() => {

                this.$buefy.toast.open({
                    message: 'Пост успешно создан',
                    type: 'is-success'
                })

                this.$router.push('/')

            })
            .catch(() => {

                this.$buefy.toast.open({
                    message: 'Ошибка при создании поста, попробуйте позже',
                    type: 'is-danger'
                })

            })

        }
    }
}
</script>
<style lang="scss" scoped>
    .create-post {
        max-width: 600px;
        width: 100%;
    }
</style>
