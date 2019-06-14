<template>
    <v-container fill-height>
        <v-layout justify-center align-center>
            <v-flex xs10 sm9 md7 lg6 xl4 class="mb-5">
                <h2 class="display-3 text-xs-center">Please Login</h2>
                <v-layout wrap row justify-center>
                    <v-flex text-xs-center xs8>
                        <v-alert type="error" :value="loginFailed" outline>用户名或密码错误</v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                                v-model="username"
                                label="Username"
                                type="text"
                                required
                                @blur="$v.username.$touch()"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                @blur="$v.password.$touch()"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                        <v-btn :disabled="$v.$invalid" @click="handleLogin">Login</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "LoginForm",
        data: function () {
            return {
                username: "",
                password: ""
            }
        },
        computed: {
            loginFailed: function () {
                return window.location.href.endsWith('error')
            }
        },
        validations: {
            username: {
                required
            },

            password: {
                required
            }
        },
        methods: {
            handleLogin: function () {
                var _this=this
                this.$store.dispatch('login',{
                    username:this.username,
                    password:this.password
                }).then(()=>_this.$router.push('/')).catch(()=>_this.$router.push('/login?error'))
            }
        }
    }
</script>

<style scoped>

</style>
