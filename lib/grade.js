// Compute a shareable lawn care grade from a plan

const ZONE_DIFFICULTY = {
  "3a": 5, "3b": 5, "4a": 4, "4b": 4,
  "5a": 3, "5b": 3, "6a": 2, "6b": 2,
  "7a": 2, "7b": 2, "8a": 3, "8b": 3,
  "9a": 4, "9b": 4, "10a": 4, "10b": 4,
  "11": 5, "12a": 5, "12b": 5,
};

const SEASON_MONTHS = {
  spring: [2,3,4], summer: [5,6,7], fall: [8,9,10], winter: [11,0,1],
};

export function computeGrade(plan) {
  if (!plan) return null;
  let score = 70;
  const reasons = [];

  const zoneKey = (plan.zone || "").replace(/zone\s*/i, "").toLowerCase().trim();
  const diff = ZONE_DIFFICULTY[zoneKey] || 3;
  if (diff >= 4) { score += 5; reasons.push(`Challenging ${plan.zone} climate`); }
  if (diff <= 2) { score += 3; reasons.push(`Favorable ${plan.zone} growing conditions`); }

  const now = new Date().getMonth();
  const planSeason = (plan.season || "").toLowerCase();
  if (SEASON_MONTHS[planSeason] && SEASON_MONTHS[planSeason].includes(now)) {
    score += 8;
    reasons.push("Recommendations match current season");
  }

  const taskCount = (plan.tasks || []).length;
  if (taskCount >= 6) { score += 6; reasons.push(`${taskCount} specific action items`); }
  else if (taskCount >= 4) { score += 3; }

  const calCount = (plan.calendar || []).length;
  if (calCount >= 10) { score += 4; reasons.push("Full 12-month calendar"); }

  if (plan.urgentTask) { score += 4; reasons.push("Time-sensitive action flagged"); }
  if (plan.propertyNotes) { score += 3; reasons.push("Property-specific analysis"); }

  const tipCount = (plan.tips || []).length;
  if (tipCount >= 3) { score += 3; reasons.push(`${tipCount} hyperlocal tips`); }

  score = Math.min(100, Math.max(0, score));

  return {
    score,
    grade: score >= 95 ? "A+" : score >= 90 ? "A" : score >= 85 ? "A-"
         : score >= 80 ? "B+" : score >= 75 ? "B" : score >= 70 ? "B-"
         : score >= 65 ? "C+" : score >= 60 ? "C" : score >= 55 ? "C-"
         : score >= 50 ? "D" : "F",
    reasons: reasons.slice(0, 4),
    color: score >= 90 ? "#2d6a2d" : score >= 80 ? "#4a7c59" : score >= 70 ? "#7ab648"
         : score >= 60 ? "#c17f24" : "#c14a4a",
  };
}

export function makePlanSlug() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let slug = "";
  for (let i = 0; i < 8; i++) slug += chars[Math.floor(Math.random() * chars.length)];
  return slug;
}
