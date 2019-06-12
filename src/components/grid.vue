<template>
        <v-app>
            <v-container>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-alert :value="show" type="success" transition="scale-transition">绑定:value=show，过渡效果</v-alert>
                    </v-flex >
                    <v-flex xs12>
                        <v-alert value="true" type="info" outline>Outline</v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-alert icon="new_releases" value="true" type="info">自定义图标</v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-alert value="true" type="warning">普通样式警告框</v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-alert value="true" type="error" :dismissible="dis">切换是否可关闭</v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-alert value="true" color="success">不带type表示没有图标的alert</v-alert>
                    </v-flex>

                </v-layout>
                <v-layout>
                    <v-btn color="primary" @click="changediss">改变是否能关闭</v-btn>
                    <v-btn color="primary" @click="changeshow">改变是否显示</v-btn>
                </v-layout>
            </v-container>
        </v-app>
</template>

<script>
    export default {
        name: "grid",
        data:function(){
            return {
                dis: false,
                show: false
            }
        },
        methods:{
            changediss: function () {
                this.dis = !this.dis;
            },
            changeshow: function () {
                this.show = !this.show;
            }
        }
    }
</script>

<style scoped>

</style>
