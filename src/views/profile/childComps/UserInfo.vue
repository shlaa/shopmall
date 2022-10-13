<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img src="@/assets/img/profile/avatar.svg" class="privateImage-svg left">
      </slot>
      <div class="login-info">
        <slot name="user-nickname">
          <div class="login-text">登录/注册</div>
        </slot>
        <img src="@/assets/img/common/arrow-left.svg" class="right-icon">
        <div class="phone">
          <span>
            <img src="@/assets/img/profile/phone.svg" class="icon-mobile">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;

  }

  .right-icon {
    width: 20px;
    height: 18px;
    float: right;
  }

  .login-info {
    color: #fff;
    /*margin: 10px 0 0 10px;*/
  }

  .login-text {
    margin-left: 80px;
  }

  .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 90px;
    font-weight: 300;
  }

  .phone span {
    margin-right: 3px;
  }

  .icon-mobile {
    position: absolute;
    width: 20px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>
