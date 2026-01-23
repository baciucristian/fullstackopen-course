type NotificationProps = {
	message: string;
	color: string;
};

const Notification = ({ message, color }: NotificationProps) => {
	const notificationStyle = {
		color: color,
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	if (message === '') {
		return null;
	}

	return (
		<div className="notification" style={notificationStyle}>
			{message}
		</div>
	);
};

export default Notification;
