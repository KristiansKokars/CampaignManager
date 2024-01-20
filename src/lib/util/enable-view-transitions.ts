import { onNavigate } from '$app/navigation';

export function enableViewTransitionsForSupportedBrowsers() {
	onNavigate((navigation) => {
		// @ts-expect-error TS types do not have startViewTransition available yet
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-expect-error TS types do not have startViewTransition available yet
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
}
