<template>
  <div class="home">
      <posts
      :currentUser="GETTERS_CURRENT_USER" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Posts from '../components/posts/index'

export default {
  name: 'Home',
  components: {
   Posts
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['GETTERS_CURRENT_USER'])
  },
}
</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
  }
</style>
