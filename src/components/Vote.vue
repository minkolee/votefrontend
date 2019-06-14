<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">投票</h2>
            </v-flex>
        </v-layout>
        <v-layout v-for="(voteItem, index) in vote.votes" key="index" justify-center align-center wrap>
            <v-flex xs12 sm3 md2 class="pa-0 ma-0">
                <v-layout justify-end>
                    <v-flex offset-xs-1>
                        <v-checkbox class="text-xs-right" :label="voteItem.name + '  '+ voteItem.score+'票'"></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs11 sm6 md7>
                <v-progress-linear
                        color="red"
                        height="10"
                        value="45"
                        background-color="rgba(250,250,250,0)"
                ></v-progress-linear>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "Vote",
        props :{
            vote:{
                type: Object
            }
        }
    }
</script>

<style scoped>
    .v-input__control {
        width: 100%!important;
    }
</style>
