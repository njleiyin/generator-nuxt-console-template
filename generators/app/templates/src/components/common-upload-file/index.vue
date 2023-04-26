<template>
  <el-upload
    multiple
    :headers="headers"
    :action="uploadUrl"
    :before-remove="beforeRemove"
    :limit="max"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
    :file-list="fileList"
    :accept="accept"
    :disabled="disabled"
  >
    <div slot="tip" class="el-upload__tip">{{ tips }}</div>
    <el-button :disabled="disabled" size="small" type="primary">上传</el-button>
  </el-upload>
</template>

<script>
import { mapState } from 'vuex'

import { getDomainByEnv } from '@/utils'
import api from '@/const/api'

const { baseCenter } = api

export default {
  props: {
    // v-model 绑定的值
    value: {
      type: [Array, String],
      default: '',
    },
    // 最大可上传数量
    max: {
      type: Number,
      default: 9,
    },
    // 上传文件类型，默认word，excel
    accept: {
      type: String,
      default: '.doc,.docx,.xlsx,.xls',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 文本提示
    tips: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      uploadUrl: `${getDomainByEnv()}${baseCenter.uploadFile}`,
    }
  },
  computed: {
    ...mapState(['token']),
    headers() {
      return {
        Authorization: this.token,
      }
    },
    fileList: {
      get() {
        if (!this.value) {
          return []
        }
        return this.value
      },
      set(val) {
        // 触发v-model绑定值更新
        this.$emit('input', val)
      },
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 超过限制提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.max} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    handleSuccess(response, file, fileList) {
      // 处理下response数据，不然层级太深
      this.fileList = fileList.map((item) => ({
        ...item,
        response: item.response.data || item.response,
      }))
      this.$emit('outFileRes', { response, fileList }) // 上传成功后将参数传出去给父组件
    },
    // todo 预览
    handlePreview() {},
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>

<style lang="less" scoped></style>
