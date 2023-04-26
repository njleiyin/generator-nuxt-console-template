import Vue from 'vue'

import dayjs from 'dayjs'

// 时间戳格式化
function formatDateTime(value, format = 'YYYY.MM.DD') {
  return dayjs(value).isValid() ? dayjs(value).format(format) : value
}

Vue.filter('formatDateTime', formatDateTime)
