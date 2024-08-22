export function getAuthIdandStrategy(
	input: string | null,
): { type: string; id: string } | null {
	if (input === null) return null;
	let type: string;

	if (input.startsWith("google")) {
		type = "google";
	} else if (input.startsWith("facebook")) {
		type = "facebook";
	} else {
		return null;
	}
	const id = input.slice(type.length);

	return { type, id };
}
