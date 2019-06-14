<template>
        <vote :vote="vote"></vote>
</template>

<script>
    import vote from '../components/Vote.vue'

    export default {
        components: {
            vote
        }
        ,
        data:function () {
            return {
                vote:{
                    "votes": [
                        {
                            "name": "VoteItemA",
                            "score": 0
                        },
                        {
                            "name": "VoteItemB",
                            "score": 0
                        },
                        {
                            "name": "VoteItemC",
                            "score": 0
                        },
                        {
                            "name": "VoteItemD",
                            "score": 0
                        },
                        {
                            "name": "VoteItemE",
                            "score": 0
                        }
                    ],
                    "totalVotes": 0
                }
            }
        }
    }
</script>
