import Pusher from 'pusher-js';
import { PUBLIC_PUSHER_APP_KEY, PUBLIC_PUSHER_CLUSTER } from '$env/static/public';

export const pusher = new Pusher(PUBLIC_PUSHER_APP_KEY, {
	cluster: PUBLIC_PUSHER_CLUSTER
});
