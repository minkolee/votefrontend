<template>
    <vote :vote="vote" :expire="vote.expireTime" @new-voted="handleVote"></vote>
</template>

<script>
    import vote from '../components/Vote.vue'
    import axios from 'axios'

    export default {
        components: {
            vote
        },
        data: function () {
            return {
                vote: {},
            }
        },

        created:function () {
            let token = this.$store.state.token
            axios.get('http://localhost:8080/api/vote', {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                this.$store.commit('setVote', res.data)
                this.vote = res.data
            }).catch(() => {
                this.$router.push('/login')
            });
        },
        methods:{
            handleVote() {
                let token = this.$store.state.token
                axios.get('http://localhost:8080/api/vote', {
                    headers: {
                        Authorization: token
                    }
                }).then(res => {
                    /* eslint-disable */
                    // console.log(res)
                    this.$store.commit('setVote')
                    this.vote = res.data
                }).catch(() => {
                    this.$router.push('/login')
                });
            }
        }
    }
</script>
