<template>
        <v-layout align-center row wrap fill-height>
            <v-flex v-for="n in 4" :key="n" xs12 md6 lg3 xl3>
                <v-card dark color="primary">
                    <v-card-text>1</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
    export default {
        name: "grid"
    }
</script>

<style scoped>

</style>
