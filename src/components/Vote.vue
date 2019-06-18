<template>
    <v-container>
        <v-layout v-if="voted" align- justify-center>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">投票结果</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <h3 class="body-1 fixed" v-cloak v-if="this.expire-(new Date()).getTime()>=0">投票截止<br>{{day}}:{{hr}}:{{min}}:{{sec}}</h3>
                <h3 class="body-1 fixed" v-cloak v-if="this.expire-(new Date()).getTime()<0">投票已截止</h3>
            </v-flex>
        </v-layout>
        <v-layout v-if="vote.totalVotes !== -1" justify-center>
            <v-flex text-xs-center>
                <v-chip>总票数{{vote.totalVotes}}</v-chip>
            </v-flex>
        </v-layout>

        <v-layout v-if="!voted">
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">请先投票然后查看投票结果</h2>
            </v-flex>
        </v-layout>
        <v-layout v-for="(voteItem, index) in voteWithPercent" :key="index" justify-center align-center wrap>
            <v-flex xs12 sm12 md3 class="pa-0 ma-0">
                <v-layout justify-end>
                    <v-flex text-xs-left mr-3 text-sm-left text-md-right>
                        <label v-if="voted"><span class="body-1 ma-1">{{voteItem.name}}</span><span class="ma-1 primary--text">{{voteItem.score}}票</span><span class="ma-1 error--text">{{((voteItem.percent)*100).toFixed(2)}}</span>%
                            <input type="checkbox" v-if="voted" v-model="votenames" :value="voteItem.name" >
                        </label>
                        <label v-if="!voted">{{voteItem.name}}
                            <input type="checkbox" v-if="!voted" v-model="votenames" :value="voteItem.name" >
                        </label>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md8>
                <v-progress-linear
                        v-if="voted"
                        :color="voteItem.color"
                        height="10"
                        :value="voteItem.percent*100"
                        background-color="rgba(230,230,230,0.6)"
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
                day: 0, hr: 0, min: 0, sec: 0,
                colors:{
                    color0:'#FB8C00',
                    color1: '#D32F2F',
                    color2: '#D81B60',
                    color3: '#8E24AA',
                    color4: '#5E35B1',
                    color5: '#3949AB',
                    color6: '#1E88E5',
                    color7: '#039BE5',
                    color8: '#00ACC1',
                    color9: '#00897B',
                    color10: '#43A047',
                    color11: '#7CB342',
                    color12: '#7CB342',
                    color13: '#C0CA33',
                    color14: '#FFB300',
                    color15: '#F4511E',
                }
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
            voteWithPercent: function () {
                let votes = this.vote.votes;
                if (votes!== undefined) {
                    votes.forEach((voteItem, index) =>{
                        if (this.vote.totalVotes <= 0) {
                            voteItem.percent = 0
                        } else {
                            voteItem.percent = voteItem.score / this.vote.totalVotes
                            voteItem.color = this.colors['color'+index % 16];
                        }
                    });
                } else {
                    votes = []
                }

                return votes
            }
        },
        methods: {
            comeToVote: function () {
                // eslint-disable-next-line
                // console.log(this.voteWithPercent)
                // eslint-disable-next-line
                // console.log("当前的votes对象是" + this.vote)
                // eslint-disable-next-line
                // console.log('发送的投票对象是' + JSON.stringify(this.voteSentToBackend))
                axios.post('http://localhost:8080/api/vote', this.voteSentToBackend, {
                    headers: {
                        Authorization: this.$store.state.token
                    }
                }).then(res => {
                    // eslint-disable-next-line
                    // console.log(res)
                    this.$emit('new-voted', res.data);
                }).catch((err) => {
                    // eslint-disable-next-line
                    if (err.response.status === 406) {
                        this.errorOccured = true;
                        // eslint-disable-next-line
                        // console.log(this.errorOccured)
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
            let _this = this;
            setInterval(function () {
                _this.$emit('new-voted',0)
            }, 3000);
        }
    }
</script>

<style scoped>
    .v-input__control {
        width: 100%!important;
    }
</style>
