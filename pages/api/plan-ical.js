import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function formatICSDate(d) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICSText(s) {
  return String(s || "").replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
}

export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(400).send("Missing slug");

  let plan;
  try { plan = await redis.get(`lawn:share:${slug}`); } catch {}
  if (!plan) return res.status(404).send("Plan not found");

  const now = new Date();
  const year = now.getFullYear();
  const location = plan.location || "your lawn";

  let ics = "BEGIN:VCALENDAR\r\n";
  ics += "VERSION:2.0\r\n";
  ics += "PRODID:-//Perfect Lawn Advisor//Chris Izworski//EN\r\n";
  ics += "CALSCALE:GREGORIAN\r\n";
  ics += "METHOD:PUBLISH\r\n";
  ics += `X-WR-CALNAME:Lawn Care Plan: ${escapeICSText(location)}\r\n`;
  ics += `X-WR-CALDESC:Personalized lawn care schedule for ${escapeICSText(location)} by Chris Izworski\r\n`;

  // Immediate 60-day tasks
  (plan.tasks || []).forEach((task, i) => {
    // Distribute tasks across next 60 days
    const daysOut = Math.floor((i + 1) * (60 / (plan.tasks.length + 1)));
    const taskDate = new Date(now);
    taskDate.setDate(taskDate.getDate() + daysOut);
    taskDate.setHours(9, 0, 0, 0);
    const endDate = new Date(taskDate);
    endDate.setHours(10, 0, 0, 0);

    ics += "BEGIN:VEVENT\r\n";
    ics += `UID:lawn-task-${slug}-${i}@lawn.chrisizworski.com\r\n`;
    ics += `DTSTAMP:${formatICSDate(now)}\r\n`;
    ics += `DTSTART:${formatICSDate(taskDate)}\r\n`;
    ics += `DTEND:${formatICSDate(endDate)}\r\n`;
    ics += `SUMMARY:🌿 ${escapeICSText(task.title)}\r\n`;
    let desc = task.detail || "";
    if (task.timing) desc += `\nTiming: ${task.timing}`;
    if (task.product) desc += `\nProduct: ${task.product}`;
    desc += `\n\nView full plan: https://lawn.chrisizworski.com/plan/${slug}`;
    ics += `DESCRIPTION:${escapeICSText(desc)}\r\n`;
    ics += `LOCATION:${escapeICSText(location)}\r\n`;
    ics += "BEGIN:VALARM\r\n";
    ics += "TRIGGER:-PT2H\r\n";
    ics += "ACTION:DISPLAY\r\n";
    ics += `DESCRIPTION:${escapeICSText(task.title)}\r\n`;
    ics += "END:VALARM\r\n";
    ics += "END:VEVENT\r\n";
  });

  // Annual calendar items (set for next year's occurrence)
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  (plan.calendar || []).forEach((item, i) => {
    if (typeof item.month !== "number") return;
    const eventDate = new Date(year, item.month, 15, 10, 0, 0);
    if (eventDate < now) eventDate.setFullYear(year + 1);
    const endDate = new Date(eventDate);
    endDate.setHours(11, 0, 0, 0);

    ics += "BEGIN:VEVENT\r\n";
    ics += `UID:lawn-cal-${slug}-${i}@lawn.chrisizworski.com\r\n`;
    ics += `DTSTAMP:${formatICSDate(now)}\r\n`;
    ics += `DTSTART:${formatICSDate(eventDate)}\r\n`;
    ics += `DTEND:${formatICSDate(endDate)}\r\n`;
    ics += `SUMMARY:🌱 ${monthNames[item.month]} lawn task: ${item.task}\r\n`;
    ics += `DESCRIPTION:${escapeICSText(`Annual ${item.task} task for ${location}. View full plan: https://lawn.chrisizworski.com/plan/${slug}`)}\r\n`;
    ics += "RRULE:FREQ=YEARLY\r\n";
    ics += "END:VEVENT\r\n";
  });

  ics += "END:VCALENDAR\r\n";

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="lawn-plan-${slug}.ics"`);
  res.send(ics);
}
