<template>
    <vote :vote="vote"></vote>
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
                vote: {
                    votes:[],
                    totalVotes: 0
                },
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
        }
    }
</script>
