<template>
    <v-container>
        <v-layout v-if="voted" justify-center>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">投票结果</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <h3 class="display-2" v-if="this.expire-(new Date()).getTime()>=0">还有{{day}}天{{hr}}小时{{min}}分钟{{sec}}秒投票截止</h3>
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
                            <input type="checkbox" v-if="voted" v-model="votenames" :value="voteItem.name" >

                        </label>
                        <label v-if="!voted">{{voteItem.name}}
                            <input type="checkbox" v-if="!voted" v-model="votenames" :value="voteItem.name" >
                        </label>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs11 sm6 md7>
                <v-progress-linear
                        v-if="voted"
                        color="red"
                        height="10"
                        :value="voteItem.score"
                        background-color="rgba(250,250,250,0)"
                ></v-progress-linear>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-btn color="primary" @click="comeToVote">投票</v-btn>
        </v-layout>
        <v-snackbar
                v-model="errorOccured"
                :timeout="3000"
                top
                auto-height

        >您已经投过票</v-snackbar>
    </v-container>
</template>

<script>
    import axios from 'axios'

    function VoteItem(name,score=0) {
        this.name = name
        this.score = score;
    }
    // 代码重写，抛自定义事件，还是接受prop
    export default {
        name: "Vote",
        props :{
            vote:{
                type: Object
            },
            expire: {
                type: Number,
                default: 0
            }

        },
        data: function () {
            return {
                votenames:[],
                errormessage: "",
                errorOccured: false,
                day: 0, hr: 0, min: 0, sec: 0
            }
        },
        computed:{
            voted:function () {
                return this.vote.totalVotes !== -1;
            },
            voteSentToBackend: function () {
                var temp = [];
                this.votenames.map(votename => temp.push(
                    new VoteItem(votename, 0)
                ));

                var o = {};
                o.votes = temp;
                return o;
            },
        },
        methods: {
            comeToVote: function () {
                // eslint-disable-next-line
                console.log("当前的votes对象是" + this.vote)
                // eslint-disable-next-line
                console.log('发送的投票对象是' + JSON.stringify(this.voteSentToBackend))
                axios.post('http://localhost:8080/api/vote', this.voteSentToBackend, {
                    headers: {
                        Authorization: this.$store.state.token
                    }
                }).then(res => {
                    // eslint-disable-next-line
                    console.log(res)
                    this.$emit('new-voted', res.data);
                }).catch((err) => {
                    // eslint-disable-next-line
                    if (err.response.status === 406) {
                        this.errorOccured = true;
                        // eslint-disable-next-line
                        console.log(this.errorOccured)
                    } else {
                        this.$router.push('/login')
                    }
                });
            },
            countdown: function() {
                let mesc = this.expire-(new Date()).getTime()
                let day = parseInt(mesc / 1000 / 60 / 60 / 24);
                let hr = parseInt(mesc / 1000 / 60 / 60 % 24)
                let min = parseInt(mesc / 1000 / 60 % 60)
                let sec = parseInt(mesc / 1000 % 60)
                this.day = day
                this.hr = hr > 9 ? hr : '0' + hr
                this.min = min > 9 ? min : '0' + min
                this.sec = sec > 9 ? sec : '0' + sec
                const that = this
                setTimeout(function () {
                    that.countdown()
                }, 1000)
            }
        },
        mounted() {
            this.countdown();
        }
    }
</script>

<style scoped>
    .v-input__control {
        width: 100%!important;
    }
</style>
