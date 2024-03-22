<template>
  <div class="dashboard">
    <h1>Welcome to Your Dashboard</h1>
    <div class="calendar-outline">
      <!-- Month and Year Display with Navigation -->
      <div class="calendar-header">
        <button @click="prevMonth" class="nav-button">&lt;</button>
        <div class="month-year">{{ currentMonth }} {{ currentYear }}</div>
        <button @click="nextMonth" class="nav-button">&gt;</button>
      </div>
      <!-- Days of the Week -->
      <div class="week-names">
        <div class="week-name">Sun</div>
        <div class="week-name">Mon</div>
        <div class="week-name">Tue</div>
        <div class="week-name">Wed</div>
        <div class="week-name">Thu</div>
        <div class="week-name">Fri</div>
        <div class="week-name">Sat</div>
      </div>
      <!-- Days of the Month -->
      <div class="calendar-body">
        <div v-for="week in weeksInMonth" :key="week" class="week">
          <div v-for="day in 7" :key="day" class="day" :class="{ 'non-current-month': week[day - 1] === '' }">
            <span v-if="week[day - 1] !== undefined" class="day-number">{{ week[day - 1] }}</span>
            <input
              v-if="week[day - 1] !== undefined"
              type="text"
              v-model="notes[week[day - 1]]"
              class="note-input"
              :placeholder="'Enter note for ' + week[day - 1]"
              @mouseenter="showInput(week[day - 1])"
              @mouseleave="hideInput(week[day - 1])"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const currentDate = new Date(2024, 2); // March 2024
    return {
      currentMonth: currentDate.toLocaleString('default', { month: 'long' }),
      currentYear: currentDate.getFullYear(),
      weeksInMonth: this.getWeeksInMonth(currentDate),
      notes: {},
    };
  },
  methods: {
    getWeeksInMonth(date) {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const weeks = [[]];
      let currentWeek = 0;
      let currentDay = 1;
      for (let i = 0; i < firstDay; i++) {
        weeks[currentWeek].push('');
      }
      for (let i = firstDay; i < 7; i++) {
        weeks[currentWeek].push(currentDay++);
      }
      while (currentDay <= daysInMonth) {
        currentWeek++;
        weeks.push([]);
        for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
          weeks[currentWeek].push(currentDay++);
        }
      }
      return weeks;
    },
    prevMonth() {
      const currentMonth = new Date(this.currentYear, this.monthToNumber(this.currentMonth) - 1);
      this.updateCalendar(currentMonth);
    },
    nextMonth() {
      const currentMonth = new Date(this.currentYear, this.monthToNumber(this.currentMonth) + 1);
      this.updateCalendar(currentMonth);
    },
    updateCalendar(date) {
      this.currentMonth = date.toLocaleString('default', { month: 'long' });
      this.currentYear = date.getFullYear();
      this.weeksInMonth = this.getWeeksInMonth(date);
    },
    monthToNumber(month) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months.indexOf(month);
    },
    showInput(day) {
      if (!this.notes.hasOwnProperty(day)) {
        this.$set(this.notes, day, ''); // Initialize note if it doesn't exist
      }
    },
    hideInput(day) {
      if (this.notes[day] === '') {
        delete this.notes[day]; // Remove note if empty
      }
    },
  }
};
</script>

<style>
.dashboard {
  text-align: center;
  padding: 20px;
}

.calendar-outline {
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: inline-block;
  width: 100%; /* Make calendar fill the width */
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.nav-button {
  background-color: #f0f0f0;
  border: none;
  color: #555;
  font-size: 1.5em;
  cursor: pointer;
}

.month-year {
  font-size: 1.5em;
  font-weight: bold;
}

.week-names {
  display: flex;
}

.week-name {
  flex: 1;
  padding: 10px;
  font-weight: bold;
  background-color: #f0f0f0;
  text-align: center; /* Center-align day names */
}

.calendar-body {
  display: flex;
  flex-direction: column;
}

.week {
  display: flex;
}

.day {
  flex: 1;
  position: relative;
  padding: 10px;
  background-color: #fff;
  border-right: 1px solid #ccc; /* Add right border to each day */
  border-bottom: 1px solid #ccc; /* Add bottom border to each day */
  text-align: center; /* Center-align day content */
}

.day-number {
  font-size: 1.2em;
  font-weight: bold;
}

.non-current-month {
  color: #ccc; /* Dim non-current month days */
}

.day:hover {
  background-color: #f9f9f9; /* Change background color on hover */
}

.note-input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  display: none;
}

.day:hover .note-input {
  display: block; /* Show input field on hover */
}

/* Add additional styling as needed */
</style>
