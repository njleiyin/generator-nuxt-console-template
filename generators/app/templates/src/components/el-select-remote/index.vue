<template>
  <el-select
    v-model="selectValue"
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :clearable="clearable"
    :loading="loading"
    :multiple="multiple"
    :disabled="disabled"
    @change="onChange"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
/**
 * 下拉框组件
 * 从服务器搜索数据，输入关键字进行查找
 * Created by leiyin on 2022/10/10.
 */
import { debounce } from '@/utils/'

export default {
  props: {
    // v-model 绑定的值
    value: {
      type: [String, Array],
      default: '',
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请输入',
    },
    // 是否可以清空选项
    clearable: {
      type: Boolean,
      default: true,
    },
    // 接口地址
    url: {
      type: String,
      default: '',
    },
    // select , value,label取值
    valueKey: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
        }
      },
    },
    // change事件
    change: {
      type: Function,
      default: null,
    },
    // 接口查询字段键值
    keyword: {
      type: String,
      default: 'name',
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      options: [],
      originData: [], // 原始数据
    }
  },
  computed: {
    selectValue: {
      get() {
        return this.value
      },
      set(val) {
        // 触发v-model绑定值更新
        this.$emit('input', val)
      },
    },
  },
  methods: {
    // 监听change事件
    onChange(val) {
      const current = this.originData.find((item) => item[this.valueKey.value] === val)
      // 返回当前项json对象，方便关联其他表单处理
      this.$emit('change', val, current || {})
    },
    // 根据关键词搜索
    remoteMethod(query) {
      // 添加防抖
      debounce(this.querySearch(query), 2000)
    },
    async querySearch(queryString) {
      if (queryString === '' || !this.url) {
        this.options = []
        return
      }
      try {
        const params = { [this.keyword]: queryString }

        this.loading = true

        const res = await this.$axios.$get(this.url, { params })

        const { code, msg, data } = res

        if (+code !== 0) {
          throw new Error(msg || '操作失败')
        }

        const { value, label } = this.valueKey

        // 兼容后端接口返回null的情况
        if (!data) {
          this.options = []
          return
        }

        this.options = data.map((item) => {
          const obj = {
            value: item[value],
          }
          if (typeof label === 'function') {
            obj.label = label(item)
          } else {
            obj.label = item[label]
          }
          return obj
        })
        this.originData = data // 保存原始数据
      } catch (err) {
        err.message && this.$message.error(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
