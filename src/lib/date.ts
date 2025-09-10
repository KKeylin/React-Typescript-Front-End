import { format } from "date-fns";

export const toYMD = (d: Date) => format(d, "yyyy-MM-dd");

export const ymdToLocalDate = (ymd: string): Date => {

	const [y, m, d] = ymd.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
};

export const startOfTodayLocal = () => {
	const t = new Date();
	t.setHours(0, 0, 0, 0);
	return t;
};

export const getDueInfo = (ymd?: string) => {
	if (!ymd) return null;
	const date = ymdToLocalDate(ymd);
	const today = startOfTodayLocal();
	const past = date < today;
	const msPerDay = 24 * 60 * 60 * 1000;
	const daysLate = past ? Math.ceil((today.getTime() - date.getTime()) / msPerDay) : 0;
	return { past, daysLate, date };
};
