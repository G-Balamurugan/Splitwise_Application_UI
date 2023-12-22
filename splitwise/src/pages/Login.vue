<template>
  <v-container>
    <v-row class="d-flex align-center justify-center" style="margin-top: 150px;">
      <v-col cols="12" sm="8" md="4">
        <v-card style="height: 350px; border-radius: 30px;">
          <v-card-title class="text-center" style="margin: 20px 0px;">Login</v-card-title>
          <v-card-text style="height: 250px">
            <v-form @submit.prevent="login" ref="form">
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                type="number"
                :rules="phoneNumberRules"
                required
                inputmode="numeric"
                max="10"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
              ></v-text-field>

              <p v-if=(loginStatus)></p>

              <div class="d-flex justify-center" style="margin-top: 25px">
                <v-btn type="submit" @submit="login" color="primary"
                  >Login</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./js/login.js"></script>

<style scoped>

</style>
