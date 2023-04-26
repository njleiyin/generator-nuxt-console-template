<script>
export default {
  created() {
    const { path, name, params, query } = this.$route.query

    let formatParams
    let formatQuery

    if (params) {
      formatParams = JSON.parse(params)
    }

    if (query) {
      formatQuery = JSON.parse(query)
    }

    this.$router.replace({ path, name, params: formatParams, query: formatQuery })
  },
  render(h) {
    return h()
  },
}
</script>
