<template>
  <v-container style="height: 100%;">
    <v-row class="d-flex justify-center" style=" position: relative; align-items: center; height: 100%;">
      <v-col cols="12" lg="4" sm="8" md="6" xl="4" class="position-relative z-index-2 login-container">
        <v-icon size="48" class="position-absolute" style="top: 10px; left: 50%; z-index: 1;">
          mdi-login
        </v-icon>

        <v-card style="border-radius: 30px; position: relative; height: 330px;">
          <div class="login-cred">
          <v-card-title class="text-center" style="margin: 20px 0px;">Login</v-card-title>
          <v-card-text >
            <v-form @submit.prevent="login" ref="form" class="form-class">
              <!-- Phone Number Input with Icon -->
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                type="number"
                :rules="phoneNumberRules"
                required
                inputmode="numeric"
                max="10"
                prepend-icon="mdi-phone"
              ></v-text-field>

              <!-- Password Input with Icon -->
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
                prepend-icon="mdi-lock"
              ></v-text-field>

              <!-- <p v-if="(loginStatus)"></p> -->

              <p v-if="loginStatus === 'failed'" class="error-message">Invalid credentials. Please try again.</p>

              <v-row class="d-flex justify-center" style="margin-top: 15px">
                <v-btn type="submit" @submit="login" color="#1B4242">Login</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./js/login.js"></script>

<style scoped>
body {
    background-color: green; 
  }

  .login-container {
    background-color: #5C8374; 
    border-radius: 10px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
    padding: 20px; 
    padding-top: 65px;
    height: 420px;
    /* height: 65%; */
  }
  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
    transform: translateX(-50%);
  }

  .z-index-2 {
    z-index: 2;
  }

  .login-cred {
    height: 100%;
    border-radius: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  
  .form-class {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.error-message {
    color: red;
    text-align: center;
    opacity: 1;
  }


</style>
