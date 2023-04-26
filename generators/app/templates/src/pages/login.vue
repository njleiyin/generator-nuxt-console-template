<template>
  <div class="login">
    <div class="content">
      <div class="login-logo"></div>
      <div class="login-rt">
        <div class="login-rt-content">
          <img src="@/assets/images/logo.png" alt="logo" class="image" />
          <el-form-renderer ref="form" :content="content" @submit.native.prevent>
            <i slot="id:tenantId" class="el-icon-office-building"></i>
            <el-button
              type="primary"
              native-type="submit"
              class="login-btn"
              :loading="loading"
              @click.enter="sumbit"
            >
              登录
            </el-button>
          </el-form-renderer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'full',
  data() {
    return {
      content: [
        {
          $id: 'username',
          $type: 'input',
          label: '',
          $el: {
            placeholder: '输入登录账户admin',
            prefixIcon: 'el-icon-user',
            clearable: true,
          },
          rules: [{ required: true, message: '用户名错误', trigger: 'blur' }],
        },
        {
          $id: 'password',
          $type: 'input',
          label: '',
          $el: {
            placeholder: '输入密码admin',
            prefixIcon: 'el-icon-lock',
            type: 'password',
          },
          rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        },
      ],
      loading: false,
    }
  },
  methods: {
    ...mapActions(['login', 'getUserTenants']),
    async sumbit() {
      try {
        const res = await this.$refs.form.validate()

        if (!res) {
          return
        }

        const form = this.$refs.form.getFormValue()

        this.loading = true

        await this.login(form)
      } catch (err) {
        err.message && this.$message.error(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);

  .content {
    width: 1000px;
    height: 500px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 2px 20px 0 #e2eeff;
    background: #fff;
    display: flex;

    .login-logo {
      width: 600px;
      background-image: url(../assets/images/login-bg2.jpeg);
      background-size: cover;
      background-position: 0 0;
      height: 500px;

      .content-title {
        color: #fff;
        text-align: right;
        font-size: 24px;
      }
    }

    .login-rt {
      width: 350px;
      height: 500px;
      position: relative;

      .login-rt-content {
        height: auto;
        padding: 80px 0 0 60px;

        :deep(.el-form-item) {
          display: flex;
          flex-direction: column;
          width: 300px;
          margin-bottom: 10px;

          .el-form-item__content {
            margin-left: 0 !important;
            margin-bottom: 10px;

            .el-input,
            .el-select {
              width: 100%;
            }

            .el-input__inner {
              border: 1px solid rgba(0, 0, 0, 0.15);
              padding-left: 36px;
              line-height: 36px;
              height: 36px;
              border-radius: 0;
            }

            .el-input__prefix {
              .el-input__icon {
                color: rgba(0, 0, 0, 0.45);
                font-size: 18px;
              }
            }
          }
        }

        .content-title {
          height: 60px;
          font-size: 16px;
          font-weight: 500;
          color: #5e5e5e;
          -webkit-font-smoothing: auto;
          line-height: 45px;
          margin-bottom: 20px;
        }

        .input-style {
          margin-bottom: 40px;

          p {
            color: #2d303b;
          }

          input {
            width: 100%;
            height: 35px;
            line-height: 35px;
            border: none;
            border-bottom: 1px solid #d4d4d4;
          }
        }

        .login-btn {
          width: 300px;
          height: 60px;
          margin-top: 25px;
          background-color: #265997;
          border-color: #265997;
        }

        .image {
          height: 28px;
          margin-bottom: 48px;
        }

        .el-icon-office-building {
          color: rgba(0, 0, 0, 0.45);
          font-size: 17px;
          position: absolute;
          z-index: 20;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
