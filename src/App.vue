<template>
  <div id="app">
    <component :is="layouts">
      <router-view/>
    </component>
  </div>
</template>

<script>
import DefaultLayouts from './layouts/DefaultLayouts/index'
import AuthLayouts from './layouts/AuthLayouts'

export default {
  components: {
    DefaultLayouts,
    AuthLayouts
  },
  computed: {
    layouts() {
       return `${this.$route.meta.layouts}-layouts`
    }
  }
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.field {
  text-align: left;
}

.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.flex-wrap {
  flex-wrap: wrap;
}
.align-center {
  align-items:center;
}
.align-end {
  align-items: flex-end;
}
.align-self-start {
  align-self: flex-start;
}
.align-self-end {
  align-self: flex-end;
}
.align-start {
  align-items: flex-start;
}
.justify-between {
  justify-content: space-between;
}
.justify-center {
  justify-content: center;
}
.justify-around {
  justify-content: space-around;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
</style>
