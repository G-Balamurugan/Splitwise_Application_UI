<template>
  <div v-if="notifications.length > 0" ref="notificationContainer" class="notification-container">
    <div  class="close-button"> <!-- Added class to the button -->
      <i @click="closeNotification" class="mdi mdi-close "></i> <!-- Close icon, you can replace it with your preferred icon -->
    </div>
    
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notification-item"
      @click="notificationClick(notification.groupId)"
    >
      <div class="notification-message">{{ notification.information }}</div>
      <div class="notification-date">
        {{ formatCreatedDate(notification.createdDate) }}
      </div>
    </div>
  </div>
</template>

<script src="./js/notification.js"></script>

<style scoped>
.notification-container {
  position: fixed;
  top: 63px;
  width: 400px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 290px;
  overflow-y: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 0px 0px 25px 25px;
}

@media (max-width: 430px) {
  .notification-container {
    width: 90%;
  }
}

.notification-item {
  margin-bottom: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background-color: #f0f0f0;
}

.close-button {
  display: flex;
  justify-content: flex-end;
  padding: 0px 20px;
  padding: 5px;
  cursor: pointer;
}
</style>
