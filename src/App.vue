<template>
  <v-app>
    <v-container fill-height  grid-list-xs text-xs-center>
      <router-view xs12 md6></router-view>
      <router-view xs12 md6></router-view>
    </v-container>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
