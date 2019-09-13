<template>
  <div class="page">
    <div class="traffic">
      <div class="item red" :class="{active: current=='1'}"><span v-if="current == '1'">{{ currentTime }}</span></div>
      <div class="item yellow" :class="{active: current=='2'}"><span v-if="current == '2'">{{ currentTime }}</span></div>
      <div class="item green" :class="{active: current=='3'}"><span v-if="current == '3'">{{ currentTime }}</span></div>
    </div>
  </div>
</template>

<script>
import Router from "vue-router";

class State {
  constructor(name, dur, link, next) {
    this.name = name;
    this.dur = dur;
    this.link = link;
    this.next = next;
  }
}

class Constroller {
  trigger(state, callback) {
    callback(state);
    setTimeout(() => {
      this.trigger(state.next, callback);
    }, state.dur * 1000);
  }
}

var mainLink;

export default {
  data() {
    return {
      current: "",
      currentTime: 0,
      timer: null
    };
  },
  mounted() {
    var constroller = new Constroller();

    var red = new State("red", 10, "1");
    var yellowR = new State("yellow", 3, "2");
    var yellowG = new State("yellow", 3, "2");
    var green = new State("green", 15, "3");

    red.next = yellowR;
    yellowR.next = green;
    green.next = yellowG;
    yellowG.next = red;

    if (this.$route.path == "/") {
      mainLink = red;
    }
    if (this.$route.path == "/1") {
      mainLink = red;
    }
    if (this.$route.path == "/2") {
      mainLink = yellowR;
    }
    if (this.$route.path == "/3") {
      mainLink = green;
    }

    constroller.trigger(mainLink, state => {
      this.current = state.link;
      this.currentTime = state.dur;
      this.$router.push(this.current);
    });

    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    }
  }
};
</script>

<style>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.traffic {
  padding: 20px;
  background-color: #000;
  border-radius: 10px;
}

.item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: #c1c1c1;
  opacity: 0.3;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #000;
}
.item.red {
  background: red;
}
.item.yellow {
  background: yellow;
}
.item.green {
  background: green;
}
.item:last-child {
  margin-bottom: 0;
}
.item.active {
  opacity: 1;
}
</style>
