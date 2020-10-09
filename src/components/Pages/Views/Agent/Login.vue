<template>
  <div class="login-page">
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="validate(form)">
                <card type="login">
                  <h3 slot="header" class="header text-center">로그인</h3>

                  <fg-input v-model="form.userName" addon-left-icon="nc-icon nc-single-02" placeholder="이름"
                            name="이름"
                            v-validate="modelValidations.userName"
                            :error="getError('이름')"></fg-input>

                  <fg-input v-model="form.userId" addon-left-icon="nc-icon nc-key-25" placeholder="사번"
                            type="password"
                            name="사번"
                            v-validate="modelValidations.userId"
                            :error="getError('사번')"></fg-input>

                  <p-button native-type="submit" slot="footer" type="warning" round block class="mb-3">로그인</p-button>
                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Checkbox, Button } from 'src/components/UIComponents';
  import AppFooter from 'src/components/Pages/Views/Layout/AppFooter'

  export default {
    components: {
      Card,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button,
      AppFooter
    },
    created: function () {
      this.form.ssoKey = this.$route.query.sso_key;
      this.form.pcId = this.$route.query.pc_id;
    },
    methods: {
        getError (fieldName) {
            return this.errors.first(fieldName)
        },
        validate (form) {
            this.$validator.validateAll().then(isValid => {
                if(isValid) this.$store.dispatch('auth/login', form);
            })
        }
    },
    data() {
      return {
        form: {
          userName: null,
          userId: null,
          ssoKey: null,
          pcId: null,
        },
        modelValidations: {
          userName: {
              required: true
          },
          userId: {
              required: true
          }
        }
      }
    }
  }
</script>
<style scoped>
  .full-page-background {
    background-color: whitesmoke;
    opacity: 0.7;
  }
</style>
