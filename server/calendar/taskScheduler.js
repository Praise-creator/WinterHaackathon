const moment = require('moment');

// Scheduling function
function scheduleTask(task) {
  const startMoment = moment(task.startDate); // Task's start date
  const endMoment = moment(task.endDate); // Task's end date
  const blocksPerWeek = Math.ceil(task.duration / 2); // Number of 2-hour blocks required per week
  const totalWeeks = moment.duration(endMoment.diff(startMoment)).weeks() + 1; // Calculate total number of weeks

  let scheduledEvents = [];

  // Loop through each week and create events
  for (let i = 0; i < totalWeeks; i++) {
    let currentWeekStart = startMoment.clone().add(i, 'weeks');

    for (let j = 0; j < blocksPerWeek; j++) {
      const eventStart = currentWeekStart.clone().add(j * 2, 'hours').toISOString(); // Adding 2 hours per block
      const eventEnd = currentWeekStart.clone().add((j + 1) * 2, 'hours').toISOString(); // Each block is 2 hours

      scheduledEvents.push({
        summary: task.name,
        start: { dateTime: eventStart, timeZone: 'America/New_York' },
        end: { dateTime: eventEnd, timeZone: 'America/New_York' },
      });
    }
  }

  return scheduledEvents;
}

module.exports = {
  scheduleTask
};
