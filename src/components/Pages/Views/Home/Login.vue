<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="validate(form)">
                <card type="login">
                  <h3 slot="header" class="header text-center">안녕하세요.</h3>

                  <fg-input v-model="form.adminId" addon-left-icon="nc-icon nc-single-02" placeholder="아이디"
                            name="아이디"
                            v-validate="modelValidations.adminId"
                            :error="getError('아이디')"></fg-input>

                  <fg-input v-model="form.password_plain" addon-left-icon="nc-icon nc-key-25" placeholder="패스워드"
                            type="password"
                            name="패스워드"
                            v-validate="modelValidations.password_plain"
                            :error="getError('패스워드')"></fg-input>

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
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from 'src/components/Pages/Views/Layout/AppFooter'
  import Vue from 'vue';

  export default {
    components: {
      Card,
      AppNavbar,
      AppFooter,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button
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
          adminId: null,
          password: null,
          password_plain:null
        },
        modelValidations: {
          adminId: {
              required: true
          },
          password_plain: {
              required: true,
              min: 4
          }
        }
      }
    }
  }
</script>
<style scoped>
  .full-page-background {
    background-color: black;
    background-image: url(/static/img/background/background-2.jpg);
    /*opacity: 0.7;*/
  }
</style>
