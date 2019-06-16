<template>
    <v-container>
        <v-layout v-if="voted" justify-center>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">投票</h2>
            </v-flex>
        </v-layout>
        <v-layout v-if="!voted">
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">请先投票然后查看投票结果</h2>
            </v-flex>
        </v-layout>
        <v-layout v-for="(voteItem, index) in vote.votes" :key="index" justify-center align-center wrap>
            <v-flex xs12 sm3 md2 class="pa-0 ma-0">
                <v-layout justify-end>
                    <v-flex offset-xs-1>
                        <label v-if="voted">{{voteItem.name}}&nbsp;{{voteItem.score}}票
                            <input type="checkbox" v-if="voted" v-model="votes" :value="voteItem.name" >

                        </label>
                        <label v-if="!voted">{{voteItem.name}}
                            <input type="checkbox" v-if="!voted" v-model="votes" :value="voteItem.name" >
                        </label>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs11 sm6 md7>
                <v-progress-linear
                        v-if="voted"
                        color="red"
                        height="10"
                        value="45"
                        background-color="rgba(250,250,250,0)"
                ></v-progress-linear>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-btn color="primary" @click="comeToVote">投票</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Vote",
        props :{
            vote:{
                type: Object
            },
        },
        data : function () {
            return {
                votes: []
            }
        },
        computed:{
            voted:function () {
                return this.vote.totalVotes !== -1;
            }
        },
        methods: {
            comeToVote: function () {
                // eslint-disable-next-line
                console.log(this.votes)
            }
        }
    }
</script>

<style scoped>
    .v-input__control {
        width: 100%!important;
    }
</style>
