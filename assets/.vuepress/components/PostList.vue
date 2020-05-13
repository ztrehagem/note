<template>
  <div class="post-list">
    <ul>
      <li v-for="post in $page.$posts" :key="post.uri">
        <a :href="post.uri">{{ post.title }}</a>
        <time :datetime="post.date | dateISO">{{ post.date | date }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  filters: {
    date(str) {
      return new Date(str).toLocaleDateString()
    },

    dateISO(str) {
      return new Date(str).toISOString()
    },
  },
}
</script>
