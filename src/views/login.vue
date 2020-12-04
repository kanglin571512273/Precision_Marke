<template>
  <div class="login-box">
    <div class="bg-class">
      <div class="bg-font">Welcome</div>
      <div class="bg-font">Back</div>
    </div>
    <div class="login">
      <div class="right-login">
        <div class="login-font">登录</div>
        <div class="login-input">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'userName',
                  {
                    rules: [{ required: true, message: '请输入手机号/工号' }],
                    initialValue: 'admin',
                  },
                ]"
                placeholder="请输入手机号/工号"
                allow-clear
                size="large"
                :maxLength="20"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: '请输入密码' }],
                  },
                ]"
                type="password"
                placeholder="请输入密码"
                size="large"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  },
                ]"
              >
                记住密码
              </a-checkbox>

              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { labelData, customData } from "../utils/data";
import Vue from "vue";
import { Form, Input, Icon, Button, Checkbox } from "ant-design-vue";
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Checkbox);
export default {
  data() {
    return {
      name: "admin",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // 存token
          localStorage.setItem("token", true);
          // 存客户详情数据
          let custom = customData();
          localStorage.setItem("customData", JSON.stringify(custom));
          // 存lable数据
          let label = labelData();
          localStorage.setItem("labelData", JSON.stringify(label));

          this.$router.push({
            path: "/marketingManage",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
}
.bg-class {
  width: 40%;
  height: 100%;
  background: url("../assets/image/background.png") no-repeat;
  background-size: cover;
}
.bg-font {
  font-weight: 600;
  color: #ffffff;
  line-height: 125px;
  font-size: 90px;
  text-align: right;
  margin-right: 40px;
}
.login {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  .right-login {
    width: 580px;
    .login-font {
      font-size: 36px;
      color: #333333;
      line-height: 50px;
      font-weight: 600;
      margin-bottom: 80px;
    }
    .login-input {
      width: 580px;
    }
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
  max-height: 88px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-checkbox-wrapper-checked {
  float: left;
}
.ant-btn-primary {
  font-size: 26px;
  margin-top: 80px;
  background: #0060ff;
  border-radius: 31px;
  height: 62px;
}
</style>
