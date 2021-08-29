<template>
  <div class="info">
    <div class="table">
      <div class="row">
        <div class="row-25 qr">
          <qrcode-vue :size="500" :value="qrValue" :margin="2" />
          <p>{{ qrValue }}</p>
        </div>
        <div class="row-75 gameinfo">
          <table>
            <tr>
              <th>Game code:</th>
              <th>{{ gameCode }}</th>
            </tr>
            <tr>
              <th>Password:</th>
              <th>{{ password }}</th>
            </tr>
          </table>

          <table>
            <tr>
              <td>Number of participants:</td>
              <td>{{ participantCount }}</td>
            </tr>
            <tr>
              <td>Number of duels:</td>
              <td>{{ duelCount }}</td>
            </tr>
            <tr>
              <td>Last update:</td>
              <td>{{ updateTime }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      gameCode: localStorage.getItem("code"),
      password: localStorage.getItem("password"),

      participantCount: 0,
      duelCount: 0,
      updateTime: "",

      qrValue: JSON.stringify({
        c: localStorage.getItem("code"),
        p: localStorage.getItem("password"),
      }),
    };
  },
  components: {
    QrcodeVue,
  },
  mounted() {
    this.getLoadTime();
  },
  methods: {
    getLoadTime() {
      const t = new Date();
      this.updateTime =
        t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    },
  },
};
</script>

<style scoped lang="scss">
.info {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.qr {
  vertical-align: middle;

  canvas {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  p {
    margin-top: 0;
    padding-top: 0;
  }
  padding-right: 10px;
}

.gameinfo {
  text-align: left;
  vertical-align: middle;
  border-left: 1px solid #ccc;

  table {
    margin-left: 5%;
    padding: 10px;

    th {
      font-size: 200%;
      padding-right: 10px;
    }

    td {
      padding-right: 10px;
    }
  }
}
</style>