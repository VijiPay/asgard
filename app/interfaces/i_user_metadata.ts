export interface UserMetadata {
	lastAction?: string;
	preferences?: {
		theme?: "light" | "dark";
		notifications?: boolean;
	};
}
