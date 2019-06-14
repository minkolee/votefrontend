<template>
    <v-app>
        <v-toolbar app :color="toolbarColor" class="white--text">
            <v-toolbar-title>柚子投票</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat class="white--text" value="vote" @click="clickOnVote">Vote</v-btn>
                <v-btn flat class="white--text" value="login" @click="clickOnLogin">Login</v-btn>
                <v-btn flat class="white--text" value="about" @click="clickOnAbout">About</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
                <router-view></router-view>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                buttonValue: ""
            }
        },
        computed: {
            toolbarColor: function () {
                if (this.buttonValue === 'vote') {
                    return 'blue'
                } else if (this.buttonValue === 'login') {
                    return "purple";
                } else if (this.buttonValue === 'about') {
                    return "teal";
                } else return 'orange';
            }
        },
        methods:{
            clickOnVote: function () {
                this.buttonValue="vote"
                this.$router.push('/')
            },
            clickOnLogin: function () {
                this.buttonValue="login"
                this.$router.push('/login')
            },
            clickOnAbout: function () {
                this.buttonValue="about"
                this.$router.push('/about')
            }
        }
    }
</script>
