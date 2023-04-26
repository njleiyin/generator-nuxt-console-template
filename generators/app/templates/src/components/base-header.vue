<template>
  <div>
    <div class="header">
      <div class="header-lt">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="handleCollapseMenu"
        ></i>
      </div>
      <div class="header-ct">
        <tags-view></tags-view>
      </div>
      <div class="header-rt">
        <el-menu
          mode="horizontal"
          text-color="#333"
          active-text-color="#000"
          background-color="#fff"
        >
          <el-submenu index="1">
            <template slot="title">
              <div class="avator">
                <img src="@/assets/images/touxiang.png" alt="" />
              </div>
              <span class="nickname">{{ user.nickName || '' }}</span>
              <i class="el-icon-caret-bottom"></i>
            </template>
            <el-menu-item index="2" @click="changePwd">修改密码</el-menu-item>
            <el-menu-item index="3" @click="logoutBtn">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <common-drawer-form
      ref="resetPasswordDrawerForm"
      :visible.sync="updatePasswordVisible"
      title="修改密码"
      :content="passwordFormContent"
      :onConfirm="onPasswordConfirm"
    ></common-drawer-form>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

import CommonDrawerForm from './common-drawer-form'
import TagsView from './tags-view'

import { checkPassword } from '@/utils/'
import { commonErrorTip } from '@/utils/validator'

export default {
  components: {
    CommonDrawerForm,
    TagsView,
  },
  inject: ['reload'],
  data() {
    return {
      updatePasswordVisible: false,
      restUserPwd: '',
      newPwd: '',
      plaformStoreListMore15: true,
    }
  },
  computed: {
    ...mapState([
      'user',
      'isCollapse',
    ]),
    ...mapGetters(['currentTenant']),
    passwordFormContent() {
      // 新密码校验
      const checkPasswordVal = (rule, value, callback) => {
        // 与新密码是否一致
        const isSame = value === this.restUserPwd
        commonErrorTip({
          allValidators: [!value, checkPassword(value), isSame],
          allErrorTips: {
            0: '密码不能为空',
            1: '密码不能相同及连续的数字、字母',
            2: '新密码不能与原密码相同',
          },
          callback,
        })
      }
      // 确认密码校验
      const checkPasswordRepeatVal = (rule, value, callback) => {
        // 与新密码是否一致
        const isSame = value !== this.newPwd
        commonErrorTip({
          allValidators: [!value, isSame],
          allErrorTips: {
            0: '确认新密码不能为空',
            1: '两次密码不同，请重新输入',
          },
          callback,
        })
      }
      return [
        {
          $id: 'restUserPwd',
          $type: 'input',
          label: '原密码',
          $el: {
            type: 'password',
            placeholder: '请输入',
          },
          rules: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
          on: {
            change: ([value]) => {
              this.restUserPwd = value
            },
          },
        },
        {
          $id: 'newPwd',
          $type: 'input',
          label: '新密码',
          $el: {
            type: 'password',
            placeholder: '请输入',
          },
          rules: [
            { min: 6, max: 20, message: '请输入6-20位的密码', trigger: 'blur' },
            {
              required: true,
              trigger: 'blur',
              validator: checkPasswordVal,
            },
          ],
          on: {
            change: ([value]) => {
              this.newPwd = value
            },
          },
        },
        {
          $id: 'confirmPwd',
          $type: 'input',
          label: '确认新密码',
          $el: {
            type: 'password',
            placeholder: '请输入',
          },
          rules: [
            { min: 6, max: 20, message: '请输入6-20位的密码', trigger: 'blur' },
            {
              required: true,
              trigger: 'blur',
              validator: checkPasswordRepeatVal,
            },
          ],
        },
      ]
    },
  },
  methods: {
    ...mapMutations(['logout', 'update']),
    ...mapActions(['login']),
    async logoutBtn() {
      try {
        this.$message.success('退出登录成功')
        this.logout()
        this.$router.replace('/login')
      } catch (err) {
        err.message && this.$message.error(err.message)
      }
    },
    changePwd() {
      this.newPwd = ''
      this.restUserPwd = ''
      this.updatePasswordVisible = true
    },
    // 侧边栏重置密码form确认回调
    async onPasswordConfirm(res) {},
    // 菜单拦展开收缩
    handleCollapseMenu() {
      this.update({
        isCollapse: !this.isCollapse,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  .header-lt {
    display: flex;
    position: relative;
    padding: 0 20px;
    flex: 0 0 64px;

    i {
      font-size: 24px;
      color: #8b95aa;
      cursor: pointer;
    }

    &::after {
      content: '';
      display: block;
      background: rgba(0, 0, 0, 0.1);
      width: 1px;
      height: 24px;
      position: absolute;
      right: 0;
    }
  }

  .header-rt {
    display: flex;
    font-weight: bold;
    font-size: 14px;
    flex: 0 0 140px;

    .avator {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      display: inline-block;
      overflow: hidden;
      margin-right: 8px;
      background-color: #051933 !important;

      img {
        width: 100%;
        display: block;
      }
    }

    .notice-last {
      position: absolute;
      z-index: 19;
      width: 400px;
      min-height: 130px;
      background: #006aff;
      color: #fff;
      top: 48px;
      right: 196px;
      border-radius: 4px;
      padding: 15px;

      &::before {
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-bottom: 7px solid #006aff;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        right: 62px;
        top: -7px;
        position: absolute;
      }

      .ntice-l-top {
        display: flex;
        font-weight: 400;

        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }

      .ntice-l-foot {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;

        .ntice-l-btn {
          width: 88px;
          height: 32px;
          cursor: pointer;
          background: #2e84ff;
          border-radius: 4px;
          color: #fff;
          text-align: center;
          line-height: 32px;
          margin-left: 16px;

          &.primary {
            color: #006aff;
            background-color: #fff;
          }
        }
      }
    }

    .notice {
      position: relative;
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 4px 0 24px;
      cursor: pointer;
      width: 102px;

      &::before {
        display: block;
        content: '';
        width: 1px;
        height: 24px;
        background: rgba(0, 0, 0, 0.1);
        left: 0;
        top: 12px;
        position: absolute;
      }

      &::after {
        display: none;
        content: '';
        width: 1px;
        height: 24px;
        background: rgba(0, 0, 0, 0.1);
        right: 0;
        top: 12px;
        position: absolute;
      }

      .notice-num {
        color: #fff;
        background-color: #fa5151;
        font-size: 9px;
        display: block;
        border-radius: 10px;
        position: absolute;
        left: 94px;
        top: 10px;
        padding: 0 4px;
      }
    }

    .el-icon-message-solid {
      margin-left: 4px;
    }

    .nickname {
      color: #333;
    }

    .dropdown-wrap {
      height: 100%;
      line-height: 48px;
      padding-left: 15px;
      cursor: pointer;
      width: 72px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }

    /deep/.el-submenu__title {
      font-size: 12px;
      height: 47px;
      line-height: 47px;
      border-bottom: none !important;

      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }

    /deep/.el-submenu__icon-arrow {
      display: none;
    }
  }

  .header-ct {
    display: flex;
    flex: 0 0 calc(100% - 220px);
    width: calc(100% - 220px);
    margin: 24px 10px 0 10px;
  }
}
</style>
