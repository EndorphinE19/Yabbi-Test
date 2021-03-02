<template>
    <div class="update-post">
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
                @click="updatePost"
                type="is-info">Обновить</b-button>
            </template>
        </work-post>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import WorkPost from '../components/workPost/index'

export default {
    name: 'UpdatePost',
    components: {
        WorkPost
    },
    data() {
        return {
            name: '',
            content: ''
        }
    },
    computed: {
        ...mapGetters(['GETTERS_POST'])
    },
    mounted() {
        this.GET_POST(this.$route.params.id)
    },
    methods: {
        ...mapActions(['GET_POST', 'UPDATE_POTS']),
        updatePost() {
            this.UPDATE_POTS({
                id:this.$route.params.id,
                content: {
                    title: this.name,
                    description: this.content,
                    updateAt: new Date().toISOString()
                }
            })
            .then(res => {

                if(res) {

                    this.$buefy.toast.open({
                        message: 'Пост был обновлен',
                        type: 'is-success'
                    })

                    this.$router.push('/', () => {})

                }

            })
            .catch(() => {

                this.$buefy.toast.open({
                    message: 'Ошибка при обновлении поста',
                    type: 'is-danger'
                })

            })
        }
    },
    watch: {
        GETTERS_POST(val) {
            this.name = val.title
            this.content = val.description
        }
    }
}
</script>
<style scoped>
    .update-post {
        max-width: 600px;
        width: 100%;
    }
</style>
