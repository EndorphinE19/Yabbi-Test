<template>
    <div class="box">
        <section class="auth-layouts__container d-flex flex-column align-start">
            <b-field
                :type="typeEmail"
                :message="emailReg.test(email) ? '' : messageErrorEmail"
                label="Эл.почта/Email">
                <b-input 
                v-model.trim="email"></b-input>
            </b-field>
            <b-field
            :type="typePassword"
            :message="messageErrorPassword"
            label="Password">
                <b-input 
                    v-model.trim="password"
                    type="password"
                    password-reveal>
                </b-input>
            </b-field>
            <b-button
            @click="auth"
            type="is-info">Войти</b-button>
        </section>  
    </div>
    
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AuthPage',
    data() {
        return {
            typeEmail: 'default',
            emailReg: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
            email: '',
            messageErrorEmail: 'Введите корректный адрес',

            typePassword: 'default',
            password: '',
            messageErrorPassword: ''
        }
    },
    methods: {
        ...mapActions(['AUTHORIZATION', 'GET_USER_INFO']),
        auth() {

            if (this.emailReg.test(this.email)) {

                if (this.password.length !== 0) {

                    this.typePassword = 'default'
                    this.messageErrorPassword = ''

                    this.AUTHORIZATION({
                        login: this.email,
                        password: this.password
                    })
                    .then(res => {
                       
                        if(res) {

                            this.GET_USER_INFO()
                            .then(() => {

                                this.$buefy.toast.open({
                                    message: 'Вы авторизованы',
                                    type: 'is-success'
                                })
                                this.$router.push('/')

                            })
                        }
                    })
                    .catch(() => {

                        this.$buefy.toast.open({
                            message: `Произошла ошибка попробуйте еще раз`,
                            type: 'is-danger'
                        })

                    })

                } else {

                    this.typePassword = 'is-danger'
                    this.messageErrorPassword = 'Заполните поле'

                }
            }
            
        }
    },
    watch: {
        email(val) {
            this.emailReg.test(val) ?
            this.typeEmail = 'is-success' :
            this.typeEmail = 'is-danger'
        },
    }
}
</script>
<style lang="scss" scoped>
    .field {
        width: 100%;
    }
</style>