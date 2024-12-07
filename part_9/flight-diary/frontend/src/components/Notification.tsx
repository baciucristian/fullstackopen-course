import { NotificationProps } from '../types';

const Notification = ({ message, color }: NotificationProps): JSX.Element | null => {
	if (message === null) {
		return null;
	}

	const notificationStyle = {
		color: color || 'green',
	};

	return (
		<div className="notification" style={notificationStyle}>
			{message}
		</div>
	);
};

export default Notification;
